import { Row, SupabaseClient, run, tsToMillis } from 'common/supabase/utils'
import { Group, Topic } from 'common/group'

export const UNRANKED_GROUP_ID = 'f141b8ca-eac3-4400-962a-72973b3ceb62'
export const UNSUBSIDIZED_GROUP_ID = 'f08f4130-3410-4030-9bf5-f675e5035e9c'
export const PROD_MANIFOLD_LOVE_GROUP_ID =
  '2e9a87df-94e3-458c-bc5f-81e891b13101'

export const TOPIC_IDS_YOU_CANT_FOLLOW = [
  UNRANKED_GROUP_ID,
  UNSUBSIDIZED_GROUP_ID,
  PROD_MANIFOLD_LOVE_GROUP_ID,
]
export async function getGroup(db: SupabaseClient, groupId: string) {
  const { data } = await run(db.from('groups').select().eq('id', groupId))
  if (data && data.length > 0) {
    return convertGroup(data[0])
  } else {
    return null
  }
}

export async function userCanAccess(
  db: SupabaseClient,
  contractId: string,
  userId: string | undefined | null
) {
  if (!userId) return false

  const groupQuery = await run(
    db.from('group_contracts').select('group_id').eq('contract_id', contractId)
  )

  if (!groupQuery.data || groupQuery.data.length !== 1) return false

  const { data } = await run(
    db
      .from('group_members')
      .select()
      .eq('group_id', groupQuery.data[0].group_id)
      .eq('member_id', userId)
      .limit(1)
  )
  return data && data.length > 0
}

export async function getGroupMemberIds(db: SupabaseClient, groupId: string) {
  const { data } = await run(
    db.from('group_members').select('member_id').eq('group_id', groupId)
  )
  return data ? data.map((member) => member.member_id) : []
}
export async function getFollowedGroupsCount(
  db: SupabaseClient,
  userId: string
) {
  const { count } = await run(
    db
      .from('group_members')
      .select('group_id', { count: 'exact' })
      .eq('member_id', userId)
  )
  return count
}

export const convertGroup = (row: Row<'groups'>): Group => ({
  id: row.id,
  slug: row.slug,
  name: row.name,
  about: row.about as any,
  creatorId: row.creator_id!,
  createdTime: tsToMillis(row.created_time),
  totalMembers: row.total_members ?? 0,
  bannerUrl: row.banner_url || undefined,
  privacyStatus: row.privacy_status as any,
  importanceScore: row.importance_score ?? 0,
})

export async function getTopicsOnContract(
  contractId: string,
  db: SupabaseClient
) {
  const { data } = await run(
    db
      .from('group_contracts')
      .select(
        'groups (id, name, slug, importance_score, privacy_status, total_members)'
      )
      .eq('contract_id', contractId)
      .order('importance_score', {
        referencedTable: 'groups',
        ascending: false,
      })
  )

  return data
    .filter((g) => g?.groups !== null)
    .map((g) => convertGroup(g.groups as any) as Topic)
}

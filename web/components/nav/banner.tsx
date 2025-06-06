import { XIcon } from '@heroicons/react/outline'
import clsx from 'clsx'

import { IconButton } from '../buttons/button'
import { Row } from '../layout/row'
import { LogoIcon } from '../icons/logo-icon'
import { usePersistentLocalState } from 'web/hooks/use-persistent-local-state'
import Link from 'next/link'
import { ArrowRightIcon } from '@heroicons/react/solid'
import { useUser } from 'web/hooks/use-user'

export function Banner(props: {
  setShowBanner?: (show: boolean) => void
  className?: string
  children: React.ReactNode
  link?: string
  target?: '_blank' | '_self'
}) {
  const { setShowBanner, className, children, link, target = '_blank' } = props
  return (
    <Row
      className={clsx(
        className,
        'text-ink-900 bg-primary-100 z-10 justify-between gap-4'
      )}
    >
      {link ? (
        <Link
          target={target}
          href={link}
          className="pl-4"
          rel="noopener noreferrer"
        >
          {children}
        </Link>
      ) : (
        <div className={'pl-4'}>{children}</div>
      )}

      {setShowBanner && (
        <IconButton
          className={'h-8'}
          size={'sm'}
          onClick={() => {
            setShowBanner(false)
          }}
        >
          <XIcon className="text-ink-700 h-5 w-5" />
        </IconButton>
      )}
    </Row>
  )
}

export function PivotBanner(props: { hideBanner: () => void }) {
  const { hideBanner } = props
  return (
    <Banner
      className="border-primary-300 from-primary-100 to-primary-200 border bg-gradient-to-b"
      link="https://news.manifold.markets/p/exploring-cash-prizes-for-good-predictions"
      setShowBanner={hideBanner}
    >
      <Row className="gap-2">
        <LogoIcon
          className="h-6 w-6 flex-shrink-0 text-black dark:text-white"
          height={24}
          width={24}
          aria-hidden
          strokeWidth={1}
        />
        <div>
          <span className="font-semibold">Coming soon!</span> Cash prizes and
          other changes. Read more
        </div>
      </Row>
    </Banner>
  )
}

export function ManifestBanner(props: { hideBanner: () => void }) {
  const { hideBanner } = props
  return (
    <Banner
      className="border-primary-300 from-primary-100 to-primary-200 border bg-gradient-to-b"
      link="https://manifest.is"
      setShowBanner={hideBanner}
    >
      <Row className="gap-2">
        <LogoIcon
          className="h-6 w-6 flex-shrink-0 text-black dark:text-white"
          height={24}
          width={24}
          aria-hidden
          strokeWidth={1}
        />
        <div>
          <span className="font-semibold">Get tickets to Manifest 2024 🥳</span>{' '}
          — our second forecasting festival, June 7-9 in Berkeley, CA
        </div>
      </Row>
    </Banner>
  )
}

export function Manifest2025Banner(props: { hideBanner: () => void }) {
  const { hideBanner } = props
  return (
    <Banner
      className="border-primary-300 from-primary-100 to-primary-200 border bg-gradient-to-b"
      link="https://www.manifest.is/"
      setShowBanner={hideBanner}
    >
      <Row className="gap-2 py-1">
        <LogoIcon
          className="h-6 w-6 flex-shrink-0 text-black dark:text-white"
          height={24}
          width={24}
          aria-hidden
          strokeWidth={1}
        />
        <div>
          <span className="font-semibold">
            Manifest 2025 tickets available! 🎉
          </span>
        </div>
      </Row>
    </Banner>
  )
}

export function DowntimeBanner() {
  const maintainanceBannerEnabled = false
  if (!maintainanceBannerEnabled) return null
  return (
    <Banner className=" bg-primary-100 hover:bg-primary-200 dark:text-primary-800 text-primary-700  hover:text-primary-900 items-center py-2  transition-colors">
      ⚠️ Manifold will be down at 9PM PT for about 2 hours, as we upgrade our
      financial infrastructure.
    </Banner>
  )
}

export function WatchPartyBanner() {
  return (
    <Banner
      className="border-primary-300 from-primary-100 to-primary-200 my-2 border bg-gradient-to-b py-2"
      link="/tv"
    >
      🇺🇸 Join the presidential debate watch party on Manifold TV! 🇺🇸
    </Banner>
  )
}

export function StateOfTheUnionBanner() {
  return (
    <Banner
      className="border-primary-300 from-primary-100 to-primary-200 my-2 border bg-gradient-to-b py-2"
      link="https://manifold.markets/tv/86"
      target="_self"
    >
      🇺🇸 Join our State of the Union watch party{' '}
      {new Date('2024-03-05T21:00:00-05:00').toLocaleString(undefined, {
        weekday: 'long',
        hour: 'numeric',
      })}
      ! 🇺🇸
    </Banner>
  )
}

export const useBanner = (name: string) => {
  const [bannerSeen, setBannerSeen] = usePersistentLocalState<number>(
    0,
    `${name}-banner-seen`
  )

  return [!bannerSeen, () => setBannerSeen(1)] as const
}

export const FeeBanner = () => {
  const [showBanner, hideBanner] = useBanner('fee-change')
  if (!showBanner) return null
  return (
    <Banner
      className="bg-primary-100 hover:bg-primary-200 dark:text-primary-800 text-primary-700 hover:text-primary-900 items-center py-2 transition-colors"
      link="https://manifoldmarkets.notion.site/Fee-change-18b54492ea7a80a6b069d488fc3613ee"
      setShowBanner={hideBanner}
    >
      <Row className="items-center gap-2">
        <LogoIcon
          className="h-6 w-6 flex-shrink-0 text-black dark:text-white"
          height={24}
          width={24}
          aria-hidden
          strokeWidth={1}
        />
        <div>Sweepstakes fees changing on Feb 3rd. Read more</div>
      </Row>
    </Banner>
  )
}

export const TwombaBanner = () => {
  const [showBanner, hideBanner] = useBanner('twomba')
  if (!showBanner) return null
  return (
    <Banner
      className="bg-primary-100 hover:bg-primary-200  dark:text-primary-800 text-primary-700 hover:text-primary-900 items-center py-2 transition-colors"
      link="https://news.manifold.markets/p/cash-prizes-are-here"
      setShowBanner={hideBanner}
    >
      <Row className=" items-center gap-2">
        <LogoIcon
          className="h-6 w-6 flex-shrink-0 text-black dark:text-white"
          height={24}
          width={24}
          aria-hidden
          strokeWidth={1}
        />
        <div>Sweepstakes cash prizes are here! Read more</div>
      </Row>
    </Banner>
  )
}

export const ManaForeverBanner = () => {
  const [showBanner, hideBanner] = useBanner('mana-forever')
  const user = useUser()
  if (!showBanner || !user) return null
  if (user.createdTime > new Date('2025-02-12').getTime()) return null
  if (user.cashBalance < 25) return null
  return (
    <Banner
      className="bg-primary-100 hover:bg-primary-200  dark:text-primary-800 text-primary-700 hover:text-primary-900 items-center py-2 transition-colors"
      link="https://manifoldmarkets.notion.site/Mana-forever-19154492ea7a80c08410ea8c64fac67e?pvs=74"
      setShowBanner={hideBanner}
    >
      <div>
        We are shutting down sweepstakes to focus on the manaverse! See more{' '}
        <ArrowRightIcon className="ml-1 inline-block h-4 w-4" />
      </div>
    </Banner>
  )
}

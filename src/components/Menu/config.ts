import { MenuEntry } from '@pancakeswap/uikit'
import { ContextApi } from 'contexts/Localization/types'

// these icons are defined in ui-kit,
// menu icons defined inline under menu widgit in icons folder using thier Svg component(also in ui-kit)
// other icons (used elsewhere)  use svg files are under pancake-uikit\src\components\Svg\Icons
const config: (t: ContextApi['t']) => MenuEntry[] = (t) => [
  {
    label: t('Home'),
    icon: 'HomeIcon',
    href: '/',
  },
  {
    label: t('Trade'),
    icon: 'TradeIcon',
    items: [
      // {
      //   label: t('Swap (Uniswap)'),
      //   href: 'https://app.uniswap.org/#/swap',
      // },
      {
        label: t('Swap (QuickSwap)'),
        href: 'https://quickswap.exchange/#/swap',
      },
      // {
      //   label: t('Exchange (Uniswap)'),
      //   href: 'https://app.uniswap.org/#/add/v2/ETH',
      // },
      {
        label: t('Liquidity (QuickSwap)'),
        href: 'https://quickswap.exchange/#/add/0x9Bbcda2606e616659b118399A2823E8a392f55DA/undefined',
      },
      // {
      //   label: t('Exchange'),
      //   href: 'https://exchange.pancakeswap.finance/#/swap',
      // },
      // {
      //   label: t('Liquidity'),
      //   href: 'https://exchange.pancakeswap.finance/#/pool',
      // },
      // {
      //   label: t('LP Migration'),
      //   href: 'https://v1exchange.pancakeswap.finance/#/migrate',
      // },
      // {
      //   label: t('V1 Liquidity (Old)'),
      //   href: 'https://v1exchange.pancakeswap.finance/#/pool',
      // },
    ],
  },
  {
    label: t('Farms'),
    icon: 'FarmIcon',
    href: '/farms',
  },
  {
    label: t('Pools'),
    icon: 'PoolIcon',
    href: '/pools',
  },
  // {
  //   label: t('Prediction (BETA)'),
  //   icon: 'PredictionsIcon',
  //   href: '/prediction',
  // },
  // {
  //   label: t('Lottery'),
  //   icon: 'TicketIcon',
  //   href: '/lottery',
  // },
  {
    label: t('NFTs'),
    icon: 'NftIcon',
    href: '/collectibles',
  },
  // {
  //   label: t('Team Battle'),
  //   icon: 'TeamBattleIcon',
  //   href: '/competition',
  // },
  // {
  //   label: t('Teams & Profile'),
  //   icon: 'GroupsIcon',
  //   items: [
  //     {
  //       label: t('Leaderboard'),
  //       href: '/teams',
  //     },
  //     {
  //       label: t('Task Center'),
  //       href: '/profile/tasks',
  //     },
  //     {
  //       label: t('Your Profile'),
  //       href: '/profile',
  //     },
  //   ],
  // },
  {
    label: t('Charts'),
    icon: 'InfoIcon',
    items: [
        // change these links if token changes
      // {
      //   label: t('KEKTools'),
      //   href: 'https://kek.tools/t/0x9bbcda2606e616659b118399a2823e8a392f55da',
      // },
      {
        label: t('QuickChart'),
        href: 'https://quickchart.app/token/0x9bbcda2606e616659b118399a2823e8a392f55da?pairedWith=USDC',
      },
      {
        label: t('Polychart'),
        href: 'https://app.polychart.io/explorer/polygon/0xE9C29fAa9Ba030Df89Dcc4eFDCBF50168bAE4a58',
      },
      // {
      //   label: t('Tokens'),
      //   href: 'https://pancakeswap.info/tokens',
      // },
      // {
      //   label: t('Pairs'),
      //   href: 'https://pancakeswap.info/pairs',
      // },
      // {
      //   label: t('Accounts'),
      //   href: 'https://pancakeswap.info/accounts',
      // },
    ],
  },
  // {
  //   label: t('IFO'),
  //   icon: 'IfoIcon',
  //   href: '/ifo',
  // },
  {
    label: t('More'),
    icon: 'MoreIcon',
    items: [
      {
        label: t('Contact'),
        href: 'https://bcharityfi.gitbook.io/bcharity/help/socials',
      },
      // {
      //   label: t('Voting'),
      //   href: 'https://voting.pancakeswap.finance',
      // },
      {
        label: t('Github'),
        href: 'https://github.com/BCharity-Net',
      },
      {
        label: t('Docs'),
        href: 'https://bcharityfi.gitbook.io/bcharity/',
        // href: 'https://docs.pancakeswap.finance',
      },
      // {
      //   label: t('Blog'),
      //   href: 'https://pancakeswap.medium.com',
      // },
      // {
      //   label: t('Merch'),
      //   href: 'https://pancakeswap.creator-spring.com/',
      // },
    ],
  },
]

export default config

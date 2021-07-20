import { ContextApi } from 'contexts/Localization/types'
import { PageMeta } from './types'

export const DEFAULT_META: PageMeta = {
  title: 'BCharity',
  description: 'Better transparency and accountability for charity tokenomics ecosystem.\n',
  image: 'public/logo.png',
}

export const getCustomMeta = (path: string, t: ContextApi['t']): PageMeta => {
  switch (path) {
    case '/s':
      return {
        title: `${t('Home')} | ${t('BCharity')}`,
      }
    case '/':
      return {
        title: `${t('Home')} | ${t('BCharity')}`,
      }
    case '/competition':
      return {
        title: `${t('Trading Battle')} | ${t('BCharity')}`,
      }
    case '/prediction':
      return {
        title: `${t('Prediction')} | ${t('BCharity')}`,
      }
    case '/farms':
      return {
        title: `${t('Farms')} | ${t('BCharity')}`,
      }
    case '/pools':
      return {
        title: `${t('Pools')} | ${t('BCharity')}`,
      }
    case '/lottery':
      return {
        title: `${t('Lottery')} | ${t('BCharity')}`,
      }
    case '/nfts':
      return {
        title: `${t('NFTs')} | ${t('BCharity')}`,
      }
    case '/ifo':
      return {
        title: `${t('Initial Farm Offering')} | ${t('BCharity')}`,
      }
    case '/teams':
      return {
        title: `${t('Leaderboard')} | ${t('BCharity')}`,
      }
    case '/profile/tasks':
      return {
        title: `${t('Task Center')} | ${t('BCharity')}`,
      }
    case '/profile':
      return {
        title: `${t('Your Profile')} | ${t('BCharity')}`,
      }
    default:
      return null
  }
}

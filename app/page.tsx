import { getPrices } from '@/lib/prices'
import HomePage from './client-page'

export const dynamic = 'force-dynamic'

export default async function Page() {
  const prices = await getPrices()
  return <HomePage prices={prices} />
}

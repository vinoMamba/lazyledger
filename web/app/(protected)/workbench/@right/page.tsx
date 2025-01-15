import { getTransactionInfoAction, SearchParams } from "@/actions/get-transaction-info"
import { TransactionPanel } from "@/components/transaction/transaction-panel";


export default async function RightPage(props: { searchParams: Promise<SearchParams> }) {
  const searchParams = await props.searchParams;
  const transactionInfo = await getTransactionInfoAction(searchParams)

  if (!transactionInfo) return null

  return (
    <div>
      <TransactionPanel transaction={transactionInfo} />
    </div>
  )
}

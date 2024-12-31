import { Transaction } from "@/components/transaction/transaction-table"
import { create } from "zustand"


type State = {
  currentTransaction: Transaction | null
}

type Actions = {
  setCurrentTransaction: (transaction: Transaction) => void
}

export const useTransaction = create<State & Actions>()((set) => ({
  currentTransaction: null,
  setCurrentTransaction: (transaction) => set({ currentTransaction: transaction })
}))

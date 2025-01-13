import { TransactionSchema } from "@/schemas/transaction"
import { create } from "zustand"
import { z } from "zod"

type State = {
  currentTransaction: z.infer<typeof TransactionSchema> | null
}

type Actions = {
  setCurrentTransaction: (transaction: z.infer<typeof TransactionSchema>) => void
}

export const useTransaction = create<State & Actions>()((set) => ({
  currentTransaction: null,
  setCurrentTransaction: (transaction) => set({ currentTransaction: transaction })
}))

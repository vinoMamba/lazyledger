package res

type TransactionItem struct {
	ID         string `json:"id"`
	Name       string `json:"name"`
	Amount     int    `json:"amount"`
	CategoryID string `json:"categoryId"`
}

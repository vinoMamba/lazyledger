package res

type TransactionItem struct {
	ID         string  `json:"id"`
	Name       string  `json:"name"`
	Amount     float64 `json:"amount"`
	CategoryID string  `json:"categoryId"`
	Type       int16   `json:"type"`
	Date       string  `json:"date"` // 2025-01-01
	Remark     string  `json:"remark"`
}

package res

import "time"

type TransactionItem struct {
	ID         string    `json:"id"`
	Name       string    `json:"name"`
	Amount     int       `json:"amount"`
	CategoryID string    `json:"categoryId"`
	Date       time.Time `json:"date"`
}

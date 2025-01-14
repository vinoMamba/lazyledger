package req

type CreateTransactionReq struct {
	Name       string  `json:"name" validate:"required"`
	Amount     float64 `json:"amount" validate:"required"`
	CategoryId string  `json:"categoryId" validate:"required"`
	Date       string  `json:"date" validate:"required,datetime=2006-01-02"`
}

type UpdateTransactionReq struct {
	ID         string  `json:"id" validate:"required"`
	Name       string  `json:"name" validate:"required"`
	Amount     float64 `json:"amount" validate:"required"`
	CategoryId string  `json:"categoryId" validate:"required"`
	Date       string  `json:"date" validate:"required,datetime=2006-01-02"`
}

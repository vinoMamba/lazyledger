package req

type CreateTransactionReq struct {
	Name       string `json:"name" validate:"required"`
	Amount     int    `json:"amount" validate:"required"`
	CategoryId string `json:"categoryId" validate:"required"`
}

type UpdateTransactionReq struct {
	ID         string `json:"id" validate:"required"`
	Name       string `json:"name" validate:"required"`
	Amount     int    `json:"amount" validate:"required"`
	CategoryId string `json:"categoryId" validate:"required"`
}

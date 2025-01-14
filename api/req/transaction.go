package req

type CreateTransactionReq struct {
	Name       string  `json:"name" validate:"required"`
	Amount     float64 `json:"amount" validate:"required"`
	CategoryId string  `json:"categoryId" validate:"required"`
	Date       string  `json:"date" validate:"required,datetime=2006-01-02"`
	Remark     string  `json:"remark" validate:"omitempty"`
}

type UpdateTransactionRemarkReq struct {
	ID     string `json:"id" validate:"required"`
	Remark string `json:"remark" validate:"omitempty"`
}

type UpdateTransactionDateReq struct {
	ID   string `json:"id" validate:"required"`
	Date string `json:"date" validate:"required,datetime=2006-01-02"`
}

type UpdateTransactionCategoryReq struct {
	ID         string `json:"id" validate:"required"`
	CategoryId string `json:"categoryId" validate:"required"`
}

type UpdateTransactionAmountReq struct {
	ID     string  `json:"id" validate:"required"`
	Amount float64 `json:"amount" validate:"required"`
}

type UpdateTransactionNameReq struct {
	ID   string `json:"id" validate:"required"`
	Name string `json:"name" validate:"required"`
}

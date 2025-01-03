package req

type CreateCategoryReq struct {
	Name  string `json:"name"`
	Color string `json:"color"`
	Icon  string `json:"icon"`
	Type  int    `json:"type"`
}

type UpdateCategoryReq struct {
	ID    string `json:"id"`
	Name  string `json:"name"`
	Color string `json:"color"`
	Icon  string `json:"icon"`
	Type  int    `json:"type"`
}

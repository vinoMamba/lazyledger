package req

type CreateTagReq struct {
	Name  string `json:"name"`
	Color string `json:"color"`
}

type UpdateTagReq struct {
	ID    string `json:"id"`
	Name  string `json:"name"`
	Color string `json:"color"`
}

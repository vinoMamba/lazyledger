package res

type LoginWithPasswordRes struct {
	Token string `json:"token"`
}

type GetUserInfoRes struct {
	UserId    string `json:"userId"`
	Username  string `json:"username"`
	Email     string `json:"email"`
	Avatar    string `json:"avatar"`
	IsSuper   bool   `json:"isSuper"`
	CreatedAt string `json:"createdAt"`
	IsActive  bool   `json:"isActive"`
}

type GetUserListRes struct {
	PageNum  int               `json:"pageNum"`
	PageSize int               `json:"pageSize"`
	Total    int               `json:"total"`
	Items    []*GetUserInfoRes `json:"items"`
}

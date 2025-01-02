package res

type LoginWithPasswordRes struct {
	Token string `json:"token"`
}

type GetUserInfoRes struct {
	UserId    string `json:"userId"`
	Username  string `json:"username"`
	Email     string `json:"email"`
	Avatar    string `json:"avatar"`
	CreatedAt string `json:"createdAt"`
}

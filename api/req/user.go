package req

type RegisterReq struct {
	Email    string `json:"email" validate:"required,email"`
	Password string `json:"password" validate:"required,gte=6,lte=20"`
}

type LoginWithPasswordReq struct {
	Email    string `json:"email" validate:"required,email"`
	Password string `json:"password" validate:"required,gte=6,lte=20"`
}

type CreateUserReq struct {
	Username string `json:"username" validate:"required"`
	Email    string `json:"email" validate:"required,email"`
}

type UpdateUserStatusReq struct {
	UserId   string `json:"userId" validate:"required"`
	IsActive bool   `json:"isActive"`
}

type UpdateUserPasswordReq struct {
	Password string `json:"password" validate:"required,gte=6,lte=20"`
}

type UpdateUserEmailReq struct {
	Email string `json:"email" validate:"required,email"`
}

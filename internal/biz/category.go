package biz

import (
	"errors"
	"time"

	"github.com/gofiber/fiber/v3"
	"github.com/gofiber/fiber/v3/log"
	"github.com/jackc/pgx/v5/pgtype"
	"github.com/vinoMamba/lazyledger/api/req"
	"github.com/vinoMamba/lazyledger/api/res"
	"github.com/vinoMamba/lazyledger/internal/repository"
)

type CategoryBiz interface {
	CreateCategory(ctx fiber.Ctx, userId string, params *req.CreateCategoryReq) error
	UpdateCategory(ctx fiber.Ctx, userId string, params *req.UpdateCategoryReq) error
	DeleteCategory(ctx fiber.Ctx, userId string, id string) error
	GetCategoryListByCreator(ctx fiber.Ctx, userId, name string) ([]*res.CategoryItem, error)
}

type categoryBiz struct {
	*Biz
}

func NewCategoryBiz(biz *Biz) CategoryBiz {
	return &categoryBiz{Biz: biz}
}

func (b *categoryBiz) CreateCategory(ctx fiber.Ctx, userId string, params *req.CreateCategoryReq) error {

	cId, err := b.Sid.GenString()
	if err != nil {
		log.Errorf("generate category id error: %v", err)
		return errors.New("internal server error")
	}

	if err := b.Queries.InsertCategory(ctx.Context(), repository.InsertCategoryParams{
		ID:        cId,
		Name:      params.Name,
		Color:     params.Color,
		Icon:      params.Icon,
		Type:      int16(params.Type),
		CreatedBy: pgtype.Text{String: userId, Valid: true},
		CreatedAt: pgtype.Timestamp{Time: time.Now(), Valid: true},
	}); err != nil {
		log.Errorf("insert category error: %v", err)
		return errors.New("internal server error")
	}
	return nil
}

func (b *categoryBiz) UpdateCategory(ctx fiber.Ctx, userId string, params *req.UpdateCategoryReq) error {

	category, err := b.Queries.GetCategoryById(ctx.Context(), params.ID)
	if err != nil {
		log.Errorf("get category error: %v", err)
		return errors.New("internal server error")
	}

	if category.ID == "" {
		return errors.New("category not found")
	}

	if category.CreatedBy.String != userId {
		return errors.New("unauthorized")
	}

	if err := b.Queries.UpdateCategory(ctx.Context(), repository.UpdateCategoryParams{
		ID:        category.ID,
		Name:      params.Name,
		Color:     params.Color,
		Type:      int16(params.Type),
		Icon:      params.Icon,
		UpdatedBy: pgtype.Text{String: userId, Valid: true},
		UpdatedAt: pgtype.Timestamp{Time: time.Now(), Valid: true},
	}); err != nil {
		log.Errorf("update category error: %v", err)
		return errors.New("internal server error")
	}
	return nil
}

func (b *categoryBiz) DeleteCategory(ctx fiber.Ctx, userId string, id string) error {

	category, err := b.Queries.GetCategoryById(ctx.Context(), id)
	if err != nil {
		log.Errorf("get category error: %v", err)
		return errors.New("internal server error")
	}

	if category.ID == "" {
		return errors.New("category not found")
	}

	if category.CreatedBy.String != userId {
		return errors.New("unauthorized")
	}

	if err := b.Queries.DeleteCategory(ctx.Context(), repository.DeleteCategoryParams{
		ID:        category.ID,
		UpdatedBy: pgtype.Text{String: userId, Valid: true},
		UpdatedAt: pgtype.Timestamp{Time: time.Now(), Valid: true},
	}); err != nil {
		log.Errorf("delete category error: %v", err)
		return errors.New("internal server error")
	}
	return nil
}

func (b *categoryBiz) GetCategoryListByCreator(ctx fiber.Ctx, userId, name string) ([]*res.CategoryItem, error) {

	items, err := b.Queries.GetCategoryListByCreator(ctx.Context(), repository.GetCategoryListByCreatorParams{
		CreatedBy: pgtype.Text{String: userId, Valid: true},
		Name:      "%" + name + "%",
	})
	if err != nil {
		log.Errorf("get category list error: %v", err)
		return nil, errors.New("internal server error")
	}

	resItems := make([]*res.CategoryItem, 0, len(items))
	for _, item := range items {
		resItems = append(resItems, &res.CategoryItem{
			ID:    item.ID,
			Name:  item.Name,
			Color: item.Color,
			Icon:  item.Icon,
			Type:  int(item.Type),
		})
	}
	return resItems, nil
}

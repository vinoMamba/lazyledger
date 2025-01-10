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

type TagBiz interface {
	CreateTag(ctx fiber.Ctx, userId string, params *req.CreateTagReq) error
	UpdateTag(ctx fiber.Ctx, userId string, params *req.UpdateTagReq) error
	DeleteTag(ctx fiber.Ctx, userId, tagId string) error
	GetTagListByCreator(ctx fiber.Ctx, userId string) ([]*res.TagItem, error)
}

type tagBiz struct {
	*Biz
}

func NewTagBiz(biz *Biz) TagBiz {
	return &tagBiz{Biz: biz}
}

func (b *tagBiz) CreateTag(ctx fiber.Ctx, userId string, params *req.CreateTagReq) error {

	existTag, err := b.Queries.GetTagByName(ctx.Context(), params.Name)

	if err == nil || existTag.ID != "" {
		return errors.New("tag already exists")
	}

	tId, err := b.Sid.GenString()
	if err != nil {
		return err
	}

	if err := b.Queries.InsertTag(ctx.Context(), repository.InsertTagParams{
		ID:        tId,
		Name:      params.Name,
		Color:     params.Color,
		CreatedBy: pgtype.Text{String: userId, Valid: true},
		CreatedAt: pgtype.Timestamp{Time: time.Now(), Valid: true},
	}); err != nil {
		log.Errorf("insert tag error: %v", err)
		return errors.New("internal server error")
	}

	return nil
}

func (b *tagBiz) UpdateTag(ctx fiber.Ctx, userId string, params *req.UpdateTagReq) error {
	currentTag, err := b.Queries.GetTagById(ctx.Context(), params.ID)
	if err != nil {
		return errors.New("tag not found")
	}

	existTag, err := b.Queries.GetTagByName(ctx.Context(), params.Name)
	if err == nil || existTag.ID != "" {
		return errors.New("tag already exists")
	}

	if err := b.Queries.UpdateTag(ctx.Context(), repository.UpdateTagParams{
		ID:        currentTag.ID,
		Name:      params.Name,
		Color:     params.Color,
		UpdatedBy: pgtype.Text{String: userId, Valid: true},
		UpdatedAt: pgtype.Timestamp{Time: time.Now(), Valid: true},
	}); err != nil {
		log.Errorf("update tag error: %v", err)
		return errors.New("internal server error")
	}

	return nil
}

func (b *tagBiz) DeleteTag(ctx fiber.Ctx, userId, tagId string) error {

	if err := b.Queries.DeleteTag(ctx.Context(), repository.DeleteTagParams{
		ID:        tagId,
		UpdatedBy: pgtype.Text{String: userId, Valid: true},
		UpdatedAt: pgtype.Timestamp{Time: time.Now(), Valid: true},
	}); err != nil {
		log.Errorf("delete tag error: %v", err)
		return errors.New("internal server error")
	}

	return nil
}

func (b *tagBiz) GetTagListByCreator(ctx fiber.Ctx, userId string) ([]*res.TagItem, error) {
	tags, err := b.Queries.GetTagListByCreator(ctx.Context(), pgtype.Text{String: userId, Valid: true})
	if err != nil {
		return nil, err
	}

	resTags := make([]*res.TagItem, 0)
	for _, tag := range tags {
		resTags = append(resTags, &res.TagItem{
			ID:        tag.ID,
			Name:      tag.Name,
			Color:     tag.Color,
			CreatedAt: tag.CreatedAt.Time.Format(time.RFC3339),
		})
	}

	return resTags, nil
}

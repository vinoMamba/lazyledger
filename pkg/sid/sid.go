package sid

import (
	"github.com/google/wire"
	"github.com/sony/sonyflake"
)

type Sid struct {
	sf *sonyflake.Sonyflake
}

var ProviderSet = wire.NewSet(NewSid)

func NewSid() *Sid {
	sf := sonyflake.NewSonyflake(sonyflake.Settings{})
	if sf == nil {
		panic("sonyflake not created")
	}
	return &Sid{sf}
}

func (s *Sid) GenString() (string, error) {
	id, err := s.sf.NextID()
	if err != nil {
		return "", err
	}
	return IntToBase62(int(id)), nil
}

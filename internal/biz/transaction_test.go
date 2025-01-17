package biz

import (
	"fmt"
	"testing"
)

func TestRandomColor(t *testing.T) {
	color := RandomColor()
	fmt.Println(color)
}

func TestRandomEmojiByName(t *testing.T) {
	emoji := RandomEmojiByName("出行")
	fmt.Println(emoji)
}

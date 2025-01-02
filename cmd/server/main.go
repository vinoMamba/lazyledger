package main

import (
	"flag"
	"fmt"
	"log"

	"github.com/vinoMamba/lazyledger/pkg/config"
)

func main() {
	envConf := flag.String("config", "./config/config.yaml", "config file path")
	flag.Parse()
	config := config.NewConfig(*envConf)

	app, cleanup, err := NewApp(config)
	if err != nil {
		panic(err)
	}
	defer cleanup()

	log.Fatal(app.Listen(fmt.Sprintf(":%d", config.GetInt("http.port"))))
}

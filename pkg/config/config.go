package config

import "github.com/spf13/viper"

func NewConfig(configPath string) *viper.Viper {
	v := viper.New()
	v.SetConfigFile(configPath)
	if err := v.ReadInConfig(); err != nil {
		panic(err)
	}
	return v
}

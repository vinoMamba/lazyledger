.PHONY: add
add.%:
	kratos proto add api/$*/$*.proto

.PHONY: config

config.%:	
	protoc --proto_path=./app/$*/internal \
	       --proto_path=./third_party \
 	       --go_out=paths=source_relative:./app/$*/internal \
	       $(shell find ./app/$*/internal -name *.proto)

.PHONY: api
api:
	protoc --proto_path=./api \
	       --proto_path=./third_party \
 	       --go_out=paths=source_relative:./api \
 	       --go-http_out=paths=source_relative:./api \
	       --go-grpc_out=paths=source_relative:./api \
	       $(shell find api -name *.proto)


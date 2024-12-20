# .PHONY: build-linux
# build-linux:
# 	CGO_ENABLED=0 GOOS=linux GOARCH=amd64 go build -ldflags="-s -w" -o ./bin/erd ./cmd/server
# .PHONY: build-darwin
# build-darwin:
# 	CGO_ENABLED=0 GOOS=darwin GOARCH=amd64 go build -ldflags="-s -w" -o ./bin/erd ./cmd/server

# .PHONY: run
# run:
# 	make build-darwin
# 	./bin/erd


.PHONY: web
web:
	cd web && pnpm dev 

.PHONY: build-linux
build-linux:
	CGO_ENABLED=0 GOOS=linux GOARCH=amd64 go build -ldflags="-s -w" -o ./bin/lazyledger ./cmd/server
.PHONY: build-darwin
build-darwin:
	CGO_ENABLED=0 GOOS=darwin GOARCH=amd64 go build -ldflags="-s -w" -o ./bin/lazyledger ./cmd/server

.PHONY: run
run:
	make build-darwin
	./bin/lazyledger


.PHONY: web
web:
	cd web && pnpm dev 

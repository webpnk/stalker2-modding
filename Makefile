build:
	docker build -t ghcr.io/webpnk/secret-santa-monolith:latest --platform linux/amd64 -f infrastructure/production/app/production.Dockerfile .
deploy:
	docker push ghcr.io/webpnk/secret-santa-monolith:latest

build-proxy:
	docker build -t ghcr.io/webpnk/secret-santa-proxy:latest --platform linux/amd64 -f infrastructure/production/proxy/Dockerfile .
deploy-proxy:
	docker push ghcr.io/webpnk/secret-santa-proxy:latest

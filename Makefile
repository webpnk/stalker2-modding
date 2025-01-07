build:
	docker build -t ghcr.io/webpnk/secret-santa-monolith:latest --platform linux/amd64 -f infrastructure/production/app/production.Dockerfile .
deploy:
	docker push ghcr.io/webpnk/secret-santa-monolith:latest

build-proxy:
	docker build -t ghcr.io/webpnk/secret-santa-proxy:latest --platform linux/amd64 -f infrastructure/production/proxy/Dockerfile .
deploy-proxy:
	docker push ghcr.io/webpnk/secret-santa-proxy:latest

export-dev:
	npm run build && docker compose restart ssr && docker compose run --rm -e APP_ENV=production -e APP_DEBUG=false -e STATIC_MODE=true -e STATIC_ASSET_URL=https://stalker2mods.pages.dev app php artisan export && npm run post-export -- http://localhost:8008 https://stalker2mods.pages.dev

export-prod:
	make sitemap && npm run build && docker compose restart ssr && docker compose run --rm -e APP_ENV=production -e APP_DEBUG=false -e STATIC_MODE=true -e STATIC_ASSET_URL=https://stalker2mods.pro app php artisan export && npm run post-export -- http://localhost:8008 https://stalker2mods.pro

sitemap:
	docker compose run -e APP_DEBUG=false -e APP_URL=https://stalker2mods.pro -e APP_ENV=production --rm app php artisan sitemap:generate

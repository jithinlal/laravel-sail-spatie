up:
	./vendor/bin/sail up -d

down:
	./vendor/bin/sail down

dev: # run front end dev environment
	yarn run dev

migrate-fresh: # clear all tables afresh and run a migration
	./vendor/bin/sail artisan migrate:fresh

migrate-seed: # migrate with seeds
	./vendor/bin/sail artisan migrate --seed

.PHONY: up down dev migrate-fresh migrate-seed

#!/bin/sh

composer update
composer install --optimize-autoloader --no-dev

npm install
npm run build

php artisan key:generate
php artisan storage:link
chmod -R 777 storage bootstrap/cache

php artisan route:clear
php artisan cache:clear
php artisan config:clear
php artisan view:clear

php artisan config:cache
php artisan route:cache
php artisan view:cache
php artisan migrate:fresh --force
php artisan db:seed --force

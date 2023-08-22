#!/bin/sh

echo "🎬 entrypoint.sh: [$(whoami)] [PHP $(php -r 'echo phpversion();')]"

composer dump-autoload --no-interaction --no-dev --optimize

npm install
npm run build

echo "🎬 artisan commands"

# 💡 Group into a custom command e.g. php artisan app:on-deploy
cp .env.sample .env
php artisan key:generate
php artisan migrate --no-interaction --force

echo "🎬 start supervisord"

supervisord -c $LARAVEL_PATH/.deploy/config/supervisor.conf

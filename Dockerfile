ARG PHP_VERSION=${PHP_VERSION:-8.2}
FROM php:${PHP_VERSION}-fpm-alpine

# Install system dependencies
RUN apk add --no-cache dcron busybox-suid libcap curl zip unzip git bash

# Install PHP extensions
COPY --from=mlocati/php-extension-installer /usr/bin/install-php-extensions /usr/bin/
RUN install-php-extensions intl bcmath gd pdo_mysql pdo_pgsql opcache redis uuid exif pcntl zip

# Install Node.js
RUN apk update && \
    apk --update add nodejs npm

# Install composer
COPY --from=composer /usr/bin/composer /usr/bin/composer

# Set working directory
ENV LARAVEL_PATH=/srv/app
WORKDIR $LARAVEL_PATH

RUN cd /var/www && rm -rf html && ln -s /srv/app/public/ html

# Add non-root user: 'app'
ARG NON_ROOT_GROUP=${NON_ROOT_GROUP:-app}
ARG NON_ROOT_USER=${NON_ROOT_USER:-app}
RUN addgroup -S $NON_ROOT_GROUP && adduser -S $NON_ROOT_USER -G $NON_ROOT_GROUP && addgroup $NON_ROOT_USER wheel

# Switch to non-root 'app' user & install app dependencies
COPY composer.json composer.lock ./
RUN chown -R $NON_ROOT_USER:$NON_ROOT_GROUP $LARAVEL_PATH && touch .env
USER $NON_ROOT_USER
RUN composer install --prefer-dist --no-scripts --no-dev --no-autoloader && rm -rf /home/$NON_ROOT_USER/.composer

COPY --chown=$NON_ROOT_USER:$NON_ROOT_GROUP . $LARAVEL_PATH/

# Set any ENVs
ARG APP_NAME=${APP_NAME:-Laravel}
ARG APP_ENV=${APP_ENV:-local}
ARG APP_DEBUG=${APP_DEBUG:-true}
ARG APP_URL=${APP_URL:-http://localhost}

ARG LOG_CHANNEL=${LOG_CHANNEL:-stack}
ARG LOG_DEPRECATIONS_CHANNEL=${LOG_DEPRECATIONS_CHANNEL:-null}
ARG LOG_LEVEL=${debug:-debug}

ARG DB_CONNECTION=${DB_CONNECTION:-mysql}
ARG DB_HOST=${DB_HOST:-127.0.0.1}
ARG DB_PORT=${DB_PORT:-3306}
ARG DB_DATABASE=${DB_DATABASE:-laravel}
ARG DB_USERNAME=${DB_USERNAME:-root}
ARG DB_PASSWORD=${DB_PASSWORD:-password}

ARG BROADCAST_DRIVER=${BROADCAST_DRIVER:-log}
ARG CACHE_DRIVER=${CACHE_DRIVER:-file}
ARG FILESYSTEM_DISK=${FILESYSTEM_DISK:-local}
ARG QUEUE_CONNECTION=${QUEUE_CONNECTION:-sync}
ARG SESSION_DRIVER=${SESSION_DRIVER:-file}
ARG SESSION_LIFETIME=${SESSION_LIFETIME:-120}

ARG MEMCACHED_HOST=${MEMCACHED_HOST:-127.0.0.1}

ARG REDIS_HOST=${REDIS_HOST:-127.0.0.1}
ARG REDIS_PASSWORD=${REDIS_PASSWORD:-null}
ARG REDIS_PORT=${REDIS_PORT:-6379}

ARG MAIL_MAILER=${MAIL_MAILER:-smtp}
ARG MAIL_HOST=${MAIL_HOST:-mailhog}
ARG MAIL_PORT=${MAIL_PORT:-1025}
ARG MAIL_USERNAME=${MAIL_USERNAME:-null}
ARG MAIL_PASSWORD=${MAIL_PASSWORD:-null}
ARG MAIL_ENCRYPTION=${MAIL_ENCRYPTION:-null}
ARG MAIL_FROM_ADDRESS=${MAIL_FROM_ADDRESS:-hello@example.com}
ARG MAIL_FROM_NAME=${APP_NAME}

ARG AWS_ACCESS_KEY_ID=${AWS_ACCESS_KEY_ID}
ARG AWS_SECRET_ACCESS_KEY=${AWS_SECRET_ACCESS_KEY}
ARG AWS_DEFAULT_REGION=${AWS_DEFAULT_REGION:-us-east-1}
ARG AWS_BUCKET=${AWS_BUCKET}
ARG AWS_USE_PATH_STYLE_ENDPOINT=${AWS_USE_PATH_STYLE_ENDPOINT:-false}

ARG PUSHER_APP_ID=${PUSHER_APP_ID}
ARG PUSHER_APP_KEY=${PUSHER_APP_KEY}
ARG PUSHER_APP_SECRET=${PUSHER_APP_SECRET}
ARG PUSHER_HOST=${PUSHER_HOST}
ARG PUSHER_PORT=${PUSHER_PORT:-443}
ARG PUSHER_SCHEME=${PUSHER_SCHEME:-https}
ARG PUSHER_APP_CLUSTER=${PUSHER_APP_CLUSTER:-mt1}

ARG VITE_PUSHER_APP_KEY=${PUSHER_APP_KEY}
ARG VITE_PUSHER_HOST=${PUSHER_HOST}
ARG VITE_PUSHER_PORT=${PUSHER_PORT}
ARG VITE_PUSHER_SCHEME=${PUSHER_SCHEME}
ARG VITE_PUSHER_APP_CLUSTER=${PUSHER_APP_CLUSTER}

RUN cd $LARAVEL_PATH

# Start app
EXPOSE 80
COPY entrypoint.sh /

ENTRYPOINT ["sh", "/entrypoint.sh"]

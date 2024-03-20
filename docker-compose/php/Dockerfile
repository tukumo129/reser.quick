FROM php:7.4-fpm

ARG UID=1000
ARG GID=1000
RUN groupmod -g $GID www-data && \
    usermod -u $UID -g $GID www-data

ENV PHP_FPM_USER="www-data" \
    PHP_FPM_GROUP="www-data"

RUN apt-get update && apt-get install -y \
    git \
    libzip-dev \
    zip \
    unzip \
    supervisor \
    sudo \
    curl \
    rsync \
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/*

RUN docker-php-ext-install \
    pdo_mysql \
    zip

COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

RUN curl -sL https://deb.nodesource.com/setup_18.x | bash - \
    && apt-get install -y nodejs

RUN mkdir -p /var/log/supervisor \
    && touch /var/log/supervisor/supervisord.log \
    && chmod 666 /var/log/supervisor/supervisord.log \
    && echo "www-data ALL=(ALL) NOPASSWD: ALL" >> /etc/sudoers

WORKDIR /var/www
USER www-data
ENTRYPOINT /bin/bash /var/www/docker-compose/php/docker-php-entrypoint.sh

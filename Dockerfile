# Start from the PHP 8.3 FPM Alpine image
FROM php:8.3-fpm-alpine

ENV COMPOSER_ALLOW_SUPERUSER 1

# Install necessary dependencies
RUN apk add --no-cache \
    curl \
    git \
    libpng-dev \
    libjpeg-turbo-dev \
    freetype-dev \
    zip \
    unzip \
    bash \
    nodejs \
    npm \
    postgresql-dev \
    libwebp-dev \
    libzip-dev \
    icu-dev \
    libsodium-dev \
    && docker-php-ext-configure gd --with-freetype --with-jpeg --with-webp \
    && docker-php-ext-install gd pdo pdo_pgsql exif zip intl sodium

# Install Composer
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

# Set the working directory
WORKDIR /var/www

# Copy application source code only
COPY . /var/www

# Set permissions for Laravel
RUN chown -R www-data:www-data /var/www

# Install application dependencies
RUN composer install --no-dev --optimize-autoloader

RUN php artisan storage:link

# Expose port 9000 and start PHP-FPM server
EXPOSE 9000
CMD ["php-fpm"]

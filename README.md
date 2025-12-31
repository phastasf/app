# Phast Framework Skeleton

A skeleton application for [Phast Framework](https://github.com/phastasf/framework) - a lightweight, modern PHP framework built on PSR standards.

## Features

This skeleton application provides a clean starting point for building applications with Phast Framework, including:

- ✅ **PSR Standards**: Full compliance with PSR-7, PSR-11, PSR-15, PSR-3, PSR-6, PSR-16, and PSR-20
- ✅ **Routing**: Example routes demonstrating controller actions and closures
- ✅ **Controllers**: Base controller with helper methods for rendering views, JSON responses, and redirects
- ✅ **Views**: Template rendering with Phew template engine
- ✅ **Console Commands**: CLI entrypoint for running console commands
- ✅ **Error Handling**: Centralized exception handling
- ✅ **Dependency Injection**: Service container integration

## Requirements

- PHP 8.2 or higher
- Composer

## Installation

### Via Composer Create-Project

```bash
composer create-project phastasf/app my-app
cd my-app

cp .env.example .env
```

Update `.env` with your configuration settings.

### Manual Installation

1. Clone this repository:
```bash
git clone https://github.com/phastasf/app.git my-app
cd my-app
```

2. Install dependencies:
```bash
composer install
```

3. Copy the environment file:
```bash
cp .env.example .env
```

4. Update `.env` with your configuration settings.

## Project Structure

```
phast-app/
├── app/
│   └── Controllers/         # Application controllers
├── config/                  # Configuration files (optional overrides)
├── public/                  # Web server document root
│   ├── index.php            # Web entrypoint
│   └── .htaccess            # Apache rewrite rules
├── resources/
│   └── views/               # View templates
├── routes/
│   └── web.php              # Route definitions
├── storage/
│   └── logs/                # Log files
├── console                  # CLI entrypoint
└── composer.json
```

## Web Server Configuration

### Apache

The project includes an `.htaccess` file in the `public/` directory for Apache. Ensure your Apache virtual host is configured with:

- Document root pointing to the `public/` directory
- `mod_rewrite` enabled
- `AllowOverride All` set for the directory

### Nginx

For Nginx, configure your server block to point to the `public/` directory and add a rewrite rule:

```nginx
location / {
    try_files $uri $uri/ /index.php?$query_string;
}
```

## Quick Start

### Running the Development Server

```bash
php console serve
```

Or use the Composer script:

```bash
composer serve
```

Then visit `http://localhost:8000` in your browser.

### Available Routes

- `GET /` - Home page (renders welcome view)
- `GET /about` - About page (closure example)
- `GET /error` - Error handling test route

## Generator Commands

### Creating Controllers

Generate a new controller:

```bash
php console g:controller UserController
```

### Creating Migrations

Generate a new migration:

```bash
php console g:migration create_users_table
```

### Creating Jobs

Generate a new job class:

```bash
php console g:job SendEmail
```

### Running Migrations

Run database migrations:

```bash
php console migrate
```

### Running Queue Workers

Run queue workers:

```bash
php console worker
```

## Configuration

Configuration files can be placed in the `config/` directory to override framework defaults. The framework loads default configurations from the package and merges your project-specific overrides.

Environment variables are configured in the `.env` file. Copy `.env.example` to `.env` and customize the settings for your environment.

## Documentation

For complete documentation, visit the [Phast Framework documentation](https://github.com/phastasf/framework).

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is open-sourced software licensed under the [MIT license](LICENSE).

## Credits

Built with [Phast Framework](https://github.com/phastasf/framework).

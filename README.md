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
- ✅ **Docker Support**: Complete Docker setup with Traefik, MySQL, Redis, and development tools

## Requirements

- Docker and Docker Compose
- [mkcert](https://github.com/FiloSottile/mkcert) for local SSL certificates
- PHP 8.2 or higher (for local development without Docker)

## Installation

Setup project:

```bash
# create new project
composer create-project phastasf/app my-app

# go into project dir
cd my-app

# create .env file
cp .env.example .env
```

Create SSL certificates:

```bash
mkcert local.dev '*.local.dev' localhost 127.0.0.1 ::1
```

This will create certificate files (`local.dev+4.pem` and `local.dev+4-key.pem`) in the project root.

Add hostnames to `/etc/hosts`:

```bash
sudo nano /etc/hosts
```

Add the following lines:

```
127.0.0.1 web.local.dev
127.0.0.1 phpmyadmin.local.dev
127.0.0.1 mailcatcher.local.dev
127.0.0.1 redis-insight.local.dev
```

Start services:

```bash
docker compose up -d
```

## Usage

### Available Services

Once the Docker services are running, you can access:

- **Application**: [https://web.local.dev/](https://web.local.dev/)
- **Traefik Dashboard**: [http://localhost:8080](http://localhost:8080)
- **phpMyAdmin**: [https://phpmyadmin.local.dev/](https://phpmyadmin.local.dev/)
- **MailCatcher**: [https://mailcatcher.local.dev/](https://mailcatcher.local.dev/)
- **Redis Insight**: [https://redis-insight.local.dev/](https://redis-insight.local.dev/)

### Example Routes

- `GET /` - Home page (renders welcome view)
- `GET /about` - About page (closure example)
- `GET /error` - Error handling test route

### Docker Services

The Docker Compose setup includes:

- **web** - PHP 8.5 Apache container running the application
- **worker** - Queue worker container
- **mysql** - MySQL 8 database server
- **redis** - Redis 5 cache and queue backend
- **traefik** - Reverse proxy with automatic HTTPS
- **phpmyadmin** - Database management interface
- **mailcatcher** - Email testing tool
- **redis-insight** - Redis management interface

## Structure

The project structure is as explained below:

```
phast-app/
├── app/
│   ├── Controllers/         # Application controllers
│   └── Jobs/                # Queue jobs
├── config/                  # Configuration files (optional overrides)
├── .docker/                 # Docker configuration files
│   └── vhost.conf          # Apache virtual host configuration
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
├── docker-compose.yml       # Docker Compose configuration
├── Dockerfile               # PHP container definition
├── traefik.yml              # Traefik configuration
└── composer.json
```

## Generators

There are several commands included in framework:

### Create controller

Generate a new controller:

```bash
docker compose exec web php console g:controller UserController
```

### Creating migration

Generate a new migration:

```bash
docker compose exec web php console g:migration create_users_table
```

### Creating job

Generate a new job class:

```bash
docker compose exec web php console g:job SendEmail
```

### Running migrations

Run database migrations:

```bash
docker compose exec web php console migrate
```

### Running queue workers

Start a queue worker:

```bash
docker compose exec worker php console worker
```

## Configuration

Configuration files can be placed in the `config/` directory to override framework defaults. The framework loads default configurations from the package and merges your project-specific overrides.

Environment variables are configured in the `.env` file. The `.env.example` file includes default values configured for the Docker setup:

- Database connection uses `mysql` as hostname (Docker service name)
- Redis connection uses `redis` as hostname (Docker service name)
- All services are accessible via `.local.dev` domain with SSL certificates

### Database Configuration

The default database configuration in `.env.example`:

- **Host**: `mysql` (Docker service name)
- **Database**: `phastapp`
- **Username**: `phastapp`
- **Password**: `phastapp`

### Mail Configuration

MailCatcher is configured to catch all emails. Configure your `.env` to use SMTP:

```env
MAIL_DRIVER=smtp
MAIL_HOST=mailcatcher
MAIL_PORT=1025
```

## Development

### Viewing Logs

View application logs:

```bash
docker compose logs -f web
```

View worker logs:

```bash
docker compose logs -f worker
```

### Executing Commands

Run any PHP command in the web container:

```bash
docker compose exec web php console <command>
```

Access the container shell:

```bash
docker compose exec web bash
```

### Stopping Services

Stop all services:

```bash
docker compose down
```

Stop and remove volumes:

```bash
docker compose down -v
```

## Documentation

For complete documentation, visit the [Phast Framework documentation](https://github.com/phastasf/framework).

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is open-sourced software licensed under the [MIT license](LICENSE).

## Credits

Built with [Phast Framework](https://github.com/phastasf/framework).

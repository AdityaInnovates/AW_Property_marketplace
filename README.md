# AM Properties Backend

## Overview

This is the backend for the AM Properties project. The backend is built using Laravel and is designed to manage properties and agents.

## Features

- **Property Management:** The backend is designed to manage properties.
- **Agent Management:** The backend is also designed to manage agents.
- **Frontend:** Frontend is Created on React.js with tailwindCSS and UI library with inertia.js for routing

## Getting Started

1. Clone the repository:

    ```bash
    git clone <repository-url>
    cd AM-Properties_Backend
    ```

2. Install dependencies:

    ```bash
    composer install
    ```

3. Set up your PostgreSQL database:

    - Create a new PostgreSQL database:

        ```sql
        CREATE DATABASE am_properties;
        ```

    - Create a new user and grant privileges:

        ```sql
        CREATE USER your_username WITH PASSWORD 'your_password';
        GRANT ALL PRIVILEGES ON DATABASE am_properties TO your_username;
        ```

4. Update your `.env` file with the database credentials:

    ```env
    DB_CONNECTION=pgsql
    DB_HOST=127.0.0.1
    DB_PORT=5432
    DB_DATABASE=am_properties
    DB_USERNAME=your_username
    DB_PASSWORD=your_password
    ```

5. Run migrations to create the database tables:

    ```bash
    php artisan migrate
    ```

6. Start the server:
    ```bash
    php artisan serve
    ```

## Contributing

No Contributions Allowed Up untill Now!

# AM Properties Admin Panel

## Overview

This is the backend for the AM Properties project. The backend is built using Laravel and is designed to manage properties and agents.

## Features

- **Backend:** The backend is also designed to manage Users, Agents, Properties Created on PHP and postgresSQL.
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

## API Endpoints

The following API endpoints are available:

- `/api/users`:
    - `GET`: Retrieves a list of all users.
    - `GET /{id}`: Retrieves a specific user by ID.
    - `POST`: Creates a new user.
    - `PUT /{id}`: Updates an existing user.
    - `DELETE /{id}`: Deletes a user.
- `/api/properties`:
    - `GET`: Retrieves a list of all properties.
    - `GET /{id}`: Retrieves a specific property by ID.
    - `POST`: Creates a new property.
    - `PUT /{id}`: Updates an existing property.
    - `DELETE /{id}`: Deletes a property.
- `/api/deals`:
    - `GET`: Retrieves a list of all deals.
    - `GET /{id}`: Retrieves a specific deal by ID.
    - `POST`: Creates a new deal.
    - `PUT /{id}`: Updates an existing deal.
    - `DELETE /{id}`: Deletes a deal.

## Contributing

No Contributions Allowed Up untill Now!

## APIs and Frontend Integration

### Frontend Routes (routes/web.php):

- `GET /` and `/users`: Render 'UsersPage' via Inertia.
- `GET /properties`: Render 'ProperitesPage' via Inertia.
- `GET /transactions`: Render 'DealsPage' via Inertia.
- `GET /dashboard` (auth & verified middleware): Render 'dashboard' via Inertia.

### API Resource Routes (routes/properties.php):

- `/api/users` → `UserController` (RESTful resource routes)
- `/api/properties` → `PropertyController` (RESTful resource routes)
- `/api/deals` → `DealController` (RESTful resource routes)

### Controllers and Their Methods:

**a) UserController (app/Http/Controllers/Properties/UserController.php):**

- `index()`: Returns JSON list of all users.
- `show($id)`: Returns JSON of a single user by ID or 404 if not found.
- `store(Request)`: Creates a new user from request data, returns JSON of created user.
- `update(Request, $id)`: Validates and updates user by ID, returns updated user JSON or 404 if not found.
- `destroy($id)`: Deletes user by ID or returns 404 if not found.

**b) PropertyController (app/Http/Controllers/Properties/PropertyController.php):**

- `index()`: Returns JSON list of all properties with related owner and address.
- `show($id)`: Returns JSON of a single property by ID or 404 if not found.
- `store(Request)`: Creates a new property from request data, returns JSON of created property.
- `update(Request, $id)`: Updates property by ID, returns updated property JSON or 404 if not found.
- `destroy($id)`: Deletes property by ID or returns 404 if not found.

**c) DealController (app/Http/Controllers/Properties/DealController.php):**

- `index()`: Returns JSON list of all deals with related agent.user, buyer.user, and property.
- `show($id)`: Returns JSON of a single deal by ID or 404 if not found.
- `store(Request)`: Creates a new deal from request data, returns JSON of created deal.
- `update(Request, $id)`: Updates deal by ID, returns updated deal JSON or 404 if not found.
- `destroy($id)`: Deletes deal by ID or returns 404 if not found.

### Flow Summary:

- Frontend routes serve Inertia pages for users, properties, transactions, and dashboard.
- API resource routes provide RESTful endpoints for managing users, properties, and deals.
- Each resource controller handles standard CRUD operations with JSON responses.
- Relationships are eager loaded where relevant (e.g., properties with owner and address, deals with agent, buyer, and property).
- Authentication and authorization middleware protect certain frontend routes (e.g., dashboard).

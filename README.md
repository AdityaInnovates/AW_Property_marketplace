# AM Properties Admin Panel

## Overview

This is the backend for the AM Properties project. The backend is built using Laravel and is designed to manage properties and agents.

## Features

- **Backend:** The backend manages Users, Agents, Properties, Deals, Buyers, Owners, Addresses, and Property Media using PHP and PostgreSQL. It features RESTful API endpoints with full CRUD operations, Laravel's built-in authentication and authorization, and PostgreSQL as the primary database with migrations and seeders.
- **Frontend:** Frontend is built with React.js, TailwindCSS, and Inertia.js for routing.

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

3. Set up your laravel app key:
    ```bash
    php artisan key:generate
    ```
4. Set up your PostgreSQL database:

    - Create a new PostgreSQL database:

        ```sql
        CREATE DATABASE am_properties;
        ```

    - Create a new user and grant privileges:

        ```sql
        CREATE USER your_username WITH PASSWORD 'your_password';
        GRANT ALL PRIVILEGES ON DATABASE am_properties TO your_username;
        ```

5. Update your `.env` file with the database credentials:

    ```env
    DB_CONNECTION=pgsql
    DB_HOST=127.0.0.1
    DB_PORT=5432
    DB_DATABASE=am_properties
    DB_USERNAME=your_username
    DB_PASSWORD=your_password
    APP_URL=http://localhost:8000
    VITE_API_BASE_URL=http://localhost:8000/api
    ```

6. Run migrations to create the database tables:

    ```bash
    php artisan migrate
    ```

7. Start the server:
    ```bash
    composer dev
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
- `/api/agents`:
    - `GET`: Retrieves a list of all agents.
    - `GET /{id}`: Retrieves a specific agent by ID.
    - `POST`: Creates a new agent.
    - `PUT /{id}`: Updates an existing agent.
    - `DELETE /{id}`: Deletes an agent.
- `/api/buyers`:
    - `GET`: Retrieves a list of all buyers.
    - `GET /{id}`: Retrieves a specific buyer by ID.
    - `POST`: Creates a new buyer.
    - `PUT /{id}`: Updates an existing buyer.
    - `DELETE /{id}`: Deletes a buyer.
- `/api/owners`:
    - `GET`: Retrieves a list of all owners.
    - `GET /{id}`: Retrieves a specific owner by ID.
    - `POST`: Creates a new owner.
    - `PUT /{id}`: Updates an existing owner.
    - `DELETE /{id}`: Deletes an owner.
- `/api/agent-create`:
    - `POST`: Creates a new user and linked agent together.
- `/api/addresses`:
    - `GET`: Retrieves a list of all addresses.
    - `GET /{id}`: Retrieves a specific address by ID.
    - `POST`: Creates a new address.
    - `PUT /{id}`: Updates an existing address.
    - `DELETE /{id}`: Deletes an address.
- `/api/property-media`:
    - `GET`: Retrieves a list of all property media.
    - `GET /{id}`: Retrieves a specific property media by ID.
    - `POST`: Creates new property media.
    - `PUT /{id}`: Updates existing property media.
    - `DELETE /{id}`: Deletes property media.
- `/api/owner-create`:
    - `POST`: Creates a new owner.
- `/api/buyer-create`:
    - `POST`: Creates a new buyer.

## API Routes and Payload Details

The following are the main resource routes available in the API and the details of what can be posted to each route, including required and optional fields.

### Users (/api/users)

**Fields that can be posted:**

- `email` (string, required for update, unique)
- `password` (string, required for update, min 8 characters)
- `first_name` (string, required for update)
- `last_name` (string, required for update)
- `phone` (string, required for update)
- `user_type` (string, required for update)
- `preferred_contact` (string, optional)
- `profile_picture` (string, optional)
- `address` (string, optional)
- `description` (string, optional)
- `social_provider` (string, optional)
- `social_id` (string, optional)

### Properties (/api/properties)

**Fields that can be posted:**

- `title` (string, required)
- `property_type` (string, required)
- `sale_or_rent` (string, required)
- `address_id` (integer, required)
- `owner_id` (integer, required)
- `created_by_agent` (integer, optional)
- `is_verified` (boolean, optional)
- `verification_docs` (string, optional)
- `status` (string, optional, default "active")

### Deals (/api/deals)

**Fields that can be posted:**

- `property_id` (integer, required)
- `buyer_id` (integer, required)
- `agent_id` (integer, required)
- `deal_status` (string, required)
- `commission` (decimal, required)
- `commission_status` (string, required)
- `deal_date` (date, optional)

### Agents (/api/agents)

**Fields that can be posted:**

- `user_id` (integer, required)
- `agent_type` (string, required)
- `license_number` (string, optional)
- `license_expiry` (date, optional)
- `is_verified` (boolean, optional)
- `verification_docs` (string, optional)

### Agent Creation (/api/agent-create)

**Fields that can be posted:**

- User fields:
    - `email` (string, required, unique)
    - `password` (string, required, min 6 characters)
    - `first_name` (string, required)
    - `last_name` (string, required)
    - `phone` (string, optional)
    - `user_type` (string, required)
- Agent fields:
    - `agent_type` (string, required)
    - `license_number` (string, required)
    - `license_expiry` (date, required)
    - `is_verified` (boolean, optional)
    - `verification_docs` (string, optional)

**Example payload:**

```json
{
    "email": "agent@example.com",
    "password": "securepassword",
    "first_name": "John",
    "last_name": "Doe",
    "phone": "123-456-7890",
    "user_type": "agent",
    "agent_type": "real_estate",
    "license_number": "ABC123456",
    "license_expiry": "2025-12-31",
    "is_verified": true,
    "verification_docs": "url_to_docs"
}
```

### Addresses (/api/addresses)

**Fields that can be posted:**

- `street` (string, required)
- `city` (string, required)
- `state` (string, required)
- `postal_code` (string, required)
- `country` (string, required)

**Example payload:**

```json
{
    "street": "123 Main St",
    "city": "Anytown",
    "state": "CA",
    "postal_code": "12345",
    "country": "USA"
}
```

### Property Media (/api/property-media)

**Fields that can be posted:**

- `property_id` (integer, required)
- `media_type` (string, required)
- `url` (string, required)
- `description` (string, optional)

**Example payload:**

```json
{
    "property_id": 1,
    "media_type": "image",
    "url": "http://example.com/image.jpg",
    "description": "Front view of the property"
}
```

### Owner Creation (/api/owner-create)

**Fields that can be posted:**

- User fields:
    - `email` (string, required, unique)
    - `password` (string, required, min 6 characters)
    - `first_name` (string, required)
    - `last_name` (string, required)
    - `phone` (string, optional)
    - `user_type` (string, required)
- Owner fields:
    - `developer_name` (string, required)
    - `is_verified` (boolean, optional)
    - `verification_docs` (string, optional)

**Example payload:**

```json
{
    "email": "owner@example.com",
    "password": "securepassword",
    "first_name": "Jane",
    "last_name": "Smith",
    "phone": "987-654-3210",
    "user_type": "owner",
    "developer_name": "Acme Corp",
    "is_verified": false,
    "verification_docs": "url_to_docs"
}
```

### Buyer Creation (/api/buyer-create)

**Fields that can be posted:**

- User fields:
    - `email` (string, required, unique)
    - `password` (string, required, min 6 characters)
    - `first_name` (string, required)
    - `last_name` (string, required)
    - `phone` (string, optional)
    - `user_type` (string, required)
- Buyer fields:
    - No specific buyer fields besides the user fields.

**Example payload:**

```json
{
    "email": "buyer@example.com",
    "password": "securepassword",
    "first_name": "Alice",
    "last_name": "Johnson",
    "phone": "555-123-4567",
    "user_type": "buyer"
}
```

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
- `/api/agents` → `AgentController` (RESTful resource routes)
- `/api/buyers` → `BuyerController` (RESTful resource routes)
- `/api/owners` → `OwnerController` (RESTful resource routes)

### Controllers and Their Methods:

**a) UserController (app/Http/Controllers/Properties/UserController.php):**

- `index()`: Returns JSON list of all users.
- `show($id)`: Returns JSON of a single user by ID or 404 if not found.
- `store(Request)`: Creates a new user from request data, returns JSON of created user.
- `update(Request, $id)`: Validates and updates user by ID, returns updated user JSON or 404 if not found.
- `destroy($id)`: Deletes user by ID or returns 404 if not found.
  Manages users with full CRUD operations.

**b) PropertyController (app/Http/Controllers/Properties/PropertyController.php):**

- `index()`: Returns JSON list of all properties with related owner and address.
- `show($id)`: Returns JSON of a single property by ID or 404 if not found.
- `store(Request)`: Creates a new property from request data, returns JSON of created property.
- `update(Request, $id)`: Updates property by ID, returns updated property JSON or 404 if not found.
- `destroy($id)`: Deletes property by ID or returns 404 if not found.
  Manages properties with related owner and address data.

**c) DealController (app/Http/Controllers/Properties/DealController.php):**

- `index()`: Returns JSON list of all deals with related agent.user, buyer.user, and property.
- `show($id)`: Returns JSON of a single deal by ID or 404 if not found.
- `store(Request)`: Creates a new deal from request data, returns JSON of created deal.
- `update(Request, $id)`: Updates deal by ID, returns updated deal JSON or 404 if not found.
- `destroy($id)`: Deletes deal by ID or returns 404 if not found.
  Manages deals with related agent, buyer, and property data.

**d) AgentController (app/Http/Controllers/Properties/AgentController.php):**

- `index()`: Returns JSON list of all agents.
- `show($id)`: Returns JSON of a single agent by ID or 404 if not found.
- `store(Request)`: Creates a new agent from request data, returns JSON of created agent.
- `update(Request, $id)`: Updates agent by ID, returns updated agent JSON or 404 if not found.
- `destroy($id)`: Deletes agent by ID or returns 404 if not found.
  Manages agents with full CRUD operations.

**e) BuyerController (app/Http/Controllers/Properties/BuyerController.php):**

- `index()`: Returns JSON list of all buyers.
- `show($id)`: Returns JSON of a single buyer by ID or 404 if not found.
- `store(Request)`: Creates a new buyer from request data, returns JSON of created buyer.
- `update(Request, $id)`: Updates buyer by ID, returns updated buyer JSON or 404 if not found.
- `destroy($id)`: Deletes buyer by ID or returns 404 if not found.
  Manages buyers with full CRUD operations.

**f) OwnerController:**

- `index()`: Returns JSON list of all owners.
- `show($id)`: Returns JSON of a single owner by ID or 404 if not found.
- `store(Request)`: Creates a new owner from request data, returns JSON of created owner.
- `update(Request, $id)`: Updates owner by ID, returns updated owner JSON or 404 if not found.
- `destroy($id)`: Deletes owner by ID or returns 404 if not found.
  Manages owners with full CRUD operations.

### Flow Summary:

- Frontend routes serve Inertia.js pages for users, properties, transactions, and dashboard.
- API resource routes provide standard CRUD operations for users, properties, deals, agents, buyers, and owners.
- Controllers handle requests and return JSON responses, with eager loading of related models where applicable.
- MVC architecture with React.js frontend using Inertia.js.
- Frontend sends HTTP requests to backend API endpoints.
- Backend controllers handle requests, validate data, interact with database models, and return JSON responses.
- Eager loading of related models for performance optimization.
- Authentication and authorization mechanisms secure resource access.
- All main controllers (UserController, PropertyController, DealController, AgentController, BuyerController, OwnerController) implement full CRUD operations.

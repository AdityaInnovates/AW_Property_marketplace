# AM Properties Backend

## Overview

This is the backend for the AM Properties project. The backend is built using Laravel and is designed to manage properties and agents.

## Features

-   User Management
-   Agent Management

## Database Tables

### Users Table

The `users` table stores information about the users of the application. The following fields are included:

-   `id`: Unique identifier for each user.
-   `name`: The name of the user.
-   `email`: The email address of the user (unique).
-   `password`: The password for the user account.
-   `first_name`: The first name of the user.
-   `last_name`: The last name of the user.
-   `phone`: The phone number of the user.
-   `user_type`: The type of user (e.g., admin, regular user).
-   `preferred_contact`: The preferred method of contact for the user.
-   `profile_picture`: URL or path to the user's profile picture (nullable).
-   `address`: The address of the user (nullable).
-   `description`: A brief description about the user (nullable).
-   `social_provider`: The provider for social login (nullable).
-   `social_id`: The ID from the social provider (nullable).
-   `created_at`: Timestamp for when the user was created.
-   `updated_at`: Timestamp for when the user was last updated.

### Agents Table

The `agents` table stores information about the agents. The following fields are included:

-   `id`: Unique identifier for each agent.
-   `user_id`: Foreign key referencing the user associated with the agent.
-   `agent_type`: The type of agent (nullable).
-   `license_number`: Unique license number for the agent.
-   `license_expiry`: Expiry date of the agent's license (nullable).
-   `is_verified`: Boolean indicating if the agent is verified (default: false).
-   `verification_docs`: Documents for verification (nullable).
-   `created_at`: Timestamp for when the agent was created.
-   `updated_at`: Timestamp for when the agent was last updated.

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

Contributions are welcome! Please open an issue or submit a pull request for any improvements or features.

## License

This project is licensed under the MIT License.

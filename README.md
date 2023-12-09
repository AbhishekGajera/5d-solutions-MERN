
# MERN Stack Project

## Table of Contents

- [Introduction](#introduction)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
  - [Backend](#backend)
  - [Frontend](#frontend)
- [API Documentation](#api-documentation)
- [Environment Variables](#environment-variables)
- [Contributing](#contributing)
- [License](#license)

## Introduction

This MERN (MongoDB, Express.js, React, Node.js) stack project implements two main functionalities: User Registration and Moment Creation. Users can register, and upon successful registration, they can add moments with images, comments, and tags.

## Project Structure

The project is organized into two main folders:

- `backend`: Contains the Node.js server code using Express.js, handling authentication, user registration, and moment creation.
- `frontend`: Holds the React.js application for user interaction.

## Getting Started

### Backend

1. Navigate to the `backend` directory:

   ```bash
   cd backend
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Create a `.env` file based on `.env.example` and provide the necessary environment variable values.

4. Start the server:

   ```bash
   npm start
   ```

### Frontend

1. Navigate to the `frontend` directory:

   ```bash
   cd frontend
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Create a `.env` file based on `.env.example` and set the required environment variable values.

4. Start the React application:

   ```bash
   npm start
   ```

## API Documentation

APIs are documented using Postman collections. Import the provided Postman collection to test the following functionalities:

- **Auth**
  - Register: Create a new user account.
  - Login: Authenticate and obtain an access token.

- **Moments**
  - Create New Moment: Add a new moment with images, comments, and tags.

Refer to the Postman collection for detailed request examples.


# API Endpoints

## Auth

### 1. Registration

- **Method:** POST
- **URL:** `{{server}}/api/auth/register`

#### Request Body:

```json
{
    "first_name": "",
    "last_name": "",
    "email": "",
    "password": "",
    "city": "",
    "phone":
}
```

### 2. Login

- **Method:** POST
- **URL:** `{{server}}/api/auth/login`

#### Request Body:

```json
{
    "email": "",
    "password": ""
}
```

## Moments

### 3. Create New Moment

- **Method:** POST
- **URL:** `{{server}}/api/moments`

#### Request Headers:

- **Authorization:** `{{token}}`

#### Request Body:

```formdata
title: ""
tags: ""
tags: ""
images: 
images:
```

### Variables

- **server:** ``
- **token:** ``
```

## Environment Variables

Create a `.env` file in both the `backend` and `frontend` directories based on the provided `.env.example`. Set the required values for a smooth execution.

## Contributing

1. Fork the repository.
2. Create a new branch: `git checkout -b feature-name`.
3. Make your changes and commit them: `git commit -m 'Add some feature'`.
4. Push to the branch: `git push origin feature-name`.
5. Submit a pull request.

## License

This project is licensed under the [MIT License](LICENSE).
```
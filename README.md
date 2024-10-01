
# Penny Assessment

This is a full-stack web application developed as part of the technical assessment for Penny. The project is built with the **MEAN Stack** using **Nx** for a monorepo structure, **Angular** for the front-end UI, **NestJS** for the backend API, and **NGRX** for state management. The application supports user authentication with **JWT** and includes key features like **signup**, **login**, **logout**, **forgot password**, and a **user listing** page.

## Project Overview

This application provides a complete **authentication system** allowing users to:
- **Signup**: Create a new account.
- **Login**: Sign in using their credentials.
- **Forgot Password**: Reset their password if they forget it.
- **User Listing**: View a list of logged-in users (restricted to authenticated users).
- **Logout**: Sign out from their account.

The project follows a monorepo structure using **Nx**, making it easy to manage both the front-end and back-end codebases in a single repository.

## Features

- **Signup**: Register a new user with a username, email, and password.
- **Login**: Authenticate with email and password, receiving a **JWT** token for session management.
- **Forgot Password**: Reset password functionality to handle forgotten passwords.
- **User Listing**: Displays a list of registered users (available only for logged-in users).
- **Logout**: Log out from the application, which invalidates the current session.

## Tech Stack

- **Nx**: Monorepo for managing both client and server applications.
- **Angular**: Front-end framework for building the UI.
- **NestJS**: Back-end framework for building the API.
- **NGRX**: State management for Angular.
- **JWT (JSON Web Token)**: Used for secure user authentication and session management.
- **MongoDB Atlas**: Database for storing user information.

## Installation

To get started with the project, follow these steps:

### Prerequisites
- **Node.js** and **npm**: Ensure you have Node.js and npm installed. You can download it from [nodejs.org](https://nodejs.org/).
- **Nx CLI**: Install the Nx CLI globally using the following command:

  ```bash
  npm install -g nx
  ```

### Clone the Repository
To clone the repository to your local machine, run:

```bash
git clone https://github.com/nomankabeer/penny-assesment.git
```

### Navigate to the Project Directory
After cloning the repository, navigate to the project directory:

```bash
cd penny-assesment
```

### Install Dependencies
Install all the required dependencies for the project:

```bash
npm install --force
```
The `--force` flag is used to handle any dependency issues that may occur during installation.

## Running the Application

The application consists of two main parts: **server** (NestJS backend) and **client** (Angular front-end). You will need to run both to use the complete functionality of the application.

### 1. Start the Backend Server (NestJS)
To start the backend server, run the following command:

```bash
nx serve server
```

The server will start at `http://localhost:3333`.

### 2. Start the Front-End Client (Angular)
To start the front-end client, run the following command:

```bash
nx serve client
```

The client will be available at `http://localhost:4200`.

Make sure both the server and client are running concurrently for the full functionality of the application.

## Usage

### Signup
- Navigate to the **Signup page** to create a new account.
- Enter your **username**, **email**, and **password**.
- Click **Signup** to register.

### Login
- Navigate to the **Login page** to authenticate.
- Enter your **email** and **password**.
- Upon successful login, you will be redirected to the **User Dashboard**.
- A **JWT token** is generated and stored for session management, allowing you to remain logged in for **8 hours**.

### Forgot Password
- If you forget your password, click on **Forgot Password** on the login page.
- Enter your **email address**, and you will receive instructions to reset your password.

### User Listing
- After logging in, you can view a list of **registered users**.
- This page is restricted to **authenticated users** only.

### Logout
- To **logout**, click on the **Logout** button.
- This will clear your session, and you will need to log in again to access restricted pages.

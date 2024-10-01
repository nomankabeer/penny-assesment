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
- **Nx CLI**: Install the Nx CLI globally:
  ```bash
  npm install -g nx

# Clone the Repository
git clone https://github.com/nomankabeer/penny-assesment.git
cd penny-assesment
npm install --force
nx serve server
nx serve client

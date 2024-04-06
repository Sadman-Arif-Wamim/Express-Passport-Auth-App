<br/>
<p align="center">
  <h3 align="center">Express Bookstore Management System</h3>

  <p align="center">
    ExpressJS API integrated with passport for authentication using JWT and database as MongoDB
    <br/>
    <br/>
  </p>
</p>



## Table Of Contents

* [About the Project](#about-the-project)
* [Built With](#built-with)
* [Getting Started](#getting-started)
  * [Prerequisites](#prerequisites)
  * [Installation](#installation)
* [Usage](#usage)
* [Contributing](#contributing)
* [Authors](#authors)
* [Acknowledgements](#acknowledgements)

## About The Project

The Express Bookstore Management System is a modern back-end application designed to simplify and automate bookstore management tasks using the Express.js framework for Node.js. This project provides a robust platform for bookstore owners and managers to efficiently manage their inventory, handle sales transactions, and interact with customers.

## Key Features:

**Inventory Management**:

Easily add, update, and delete books from the inventory using RESTful API endpoints.
Store book details such as title, author, genre, quantity, and price in a MongoDB database.
Implement search and filtering functionalities to quickly find books based on various criteria.
Sales Management:

**Manage Transactions**:

Enable users to record sales transactions by creating a secure login and authentication system with JWT.
Generate JSON Web Tokens (JWT) for user authentication and authorization.
Utilize Express routes to handle POST requests for creating sales records.

**Customer Interaction**:

Develop RESTful API endpoints for managing customer data, including registration, login, and profile updates.
Allow customers to log in securely and view their purchase history, profile information, and preferences.
Implement role-based access control to ensure that only authorized users can access sensitive data.

**Admin Functionality**:

Provide administrators with exclusive privileges to manage user accounts, view sales reports, and perform administrative tasks.
Create secure endpoints for administrative actions such as adding new users, updating user roles, and deleting user accounts.

## Built With

**Backend**: Node.js, Express.js, MongoDB
**Authentication**: Passport, JSON Web Tokens (JWT), bcrypt for password hashing
**Database**: MongoDB

## Getting Started

Welcome to the Express Bookstore Management System! This guide will help you get up and running with the project quickly. Follow these steps to set up the project on your local machine and start managing your bookstore efficiently.

### Prerequisites

Before you begin, ensure that you have the following prerequisites installed on your system:

Node.js and npm: Make sure you have Node.js installed on your machine. You can download and install it from the official Node.js website: Node.js Download.

MongoDB: The project uses MongoDB as the database. You'll need to have MongoDB installed locally or have access to a MongoDB instance. Download and install MongoDB from the official website: MongoDB Download.

### Installation

Follow these steps to install and set up the Express Bookstore Management System:

1. **Clone the Repository**: Start by cloning the project repository to your local machine using Git. Open a terminal and run the following command: 
git clone https://github.com/Sadman-Arif-Wamim/Express-Rest-API.git

2. **Navigate to the Project Directory**: Change into the project directory by running: 
cd express-rest-api

3. **Install Dependencies**: Use npm to install the project dependencies. Run the following command: 
npm install

4. **Set Up Environment Variables**: Create a .env file in the project root directory and add the following environment variables:
PORT=3000
DATABASE_URL=mongodb://localhost:27017/[dbname]
JWT_SECRET=your_secret_key

5. **Access the Application**: Use 'npm start' and open your web browser and navigate to http://localhost:3000 to access the Express Bookstore Management System.

## Usage

The Express Bookstore Management System simplifies bookstore operations by offering a user-friendly interface and a comprehensive set of features. Users can easily manage their inventory by adding, updating, and removing books, while also tracking sales transactions and generating detailed reports. The system facilitates customer interaction by enabling registration, profile management, and personalized recommendations. Administrators have access to additional functionalities such as user management and sales analytics. With robust error handling and logging mechanisms, the system ensures smooth operation and easy troubleshooting. Highly customizable and extensible, the Express Bookstore Management System adapts to the unique requirements of any bookstore, empowering owners to streamline operations, improve productivity, and enhance customer satisfaction.

## Authors

* **Sadman Arif Wamim** - *Software Developer* - [Sadman Arif Wamim](https://github.com/Sadman-Arif-Wamim) - *Built the entire project*


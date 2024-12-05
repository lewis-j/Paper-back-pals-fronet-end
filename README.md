# Paperback Pals

**Connecting Friends Through Books**

## Overview

**Paperback Pals** is a unique platform that enables friends to share and borrow books from their personal libraries. By providing a structured and accountable process, it ensures a seamless borrowing experience while keeping track of book statuses and transactions.

## Features

- **Add Books**: Seamlessly add books to your library using the Google Books API with search and pagination.
- **Friend Management**: Search for and add friends to expand your borrowing network.
- **Notifications**: Stay updated on friend actions and book transaction statuses.
- **Book Status Tracker**: Monitor the status of each book, from requested to returned.
- **Messaging**: Communicate with friends directly within the app.
- **Library Browsing**: Explore books available in your friends' libraries.

## How It Works

The transaction process follows a clear and accountable workflow:

1. **Request**: A friend requests a book from your library.
2. **Acceptance**: You accept the request.
3. **Drop-Off Confirmation**: You confirm the book drop-off.
4. **Pick-Up Confirmation**: The borrower confirms the pick-up. The book is now "Checked Out" and assigned a due date.
5. **Return Initiation**: When the due date arises or the borrower is ready to return, the status changes to "Returning."
6. **Return Confirmation**: The borrower confirms the drop-off, and the owner confirms the pick-up. The book is now "Returned."

### Status Flow
- **CHECKED_IN**
- **ACCEPTED**
- **SENDING**
- **CHECKED_OUT**
- **IS_DUE**
- **RETURNING**
- **RETURNED**

## Tech Stack

**Client-Side:**
- React
- Redux Toolkit
- Axios
- Firebase
- Bootstrap
- Sass
- FontAwesome

**Backend:**
- NestJS
- Mongoose
- Passport (JWT Authentication)
- Firebase Admin SDK
- Socket.io
- Cloudinary (for media handling)

## Getting Started

### Prerequisites
- Node.js
- NPM/Yarn
- MongoDB

### Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/paperback-pals.git
   ```
2. Navigate to the project directory:
   ```bash
   cd paperback-pals
   ```
3. Install dependencies for both client and server:
   ```bash
   npm install
   ```
4. Set up environment variables:
   - Create a `.env` file with the necessary configurations for Firebase, MongoDB, and other services.

5. Start the application:
   ```bash
   npm start
   ```

## Contributing

Contributions are welcome! Please fork the repository, make your changes, and submit a pull request. Ensure your code adheres to the style guide and includes appropriate tests.

## License

This project is licensed under the MIT License. See the LICENSE file for details.


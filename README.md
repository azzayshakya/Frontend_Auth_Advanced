# Advanced Authentication System 

This project implements a robust user authentication system for a React application. The system includes a context-based authentication state, protected routes, and API utilities with token-based authentication. Below is an overview of the code and its functionalities.

---

## Table of Contents
1. [Overview](#overview)
2. [Features](#features)
3. [Technologies Used](#technologies-used)
4. [Folder Structure](#folder-structure)
5. [Setup and Installation](#setup-and-installation)
6. [Code Breakdown](#code-breakdown)
   - [Authentication Context](#authentication-context)
   - [Custom Hook](#custom-hook)
   - [Protected Routes](#protected-routes)
   - [API Service](#api-service)
7. [Usage](#usage)
8. [Future Enhancements](#future-enhancements)
9. [Contributing](#contributing)

---

## Overview
This project demonstrates how to build an authentication system using React's Context API and hooks. It provides seamless token-based authentication with secure API calls, ensuring user data is protected.

---

## Features
- Context API for global state management.
- Token-based authentication.
- Persistent user state using `localStorage`.
- Protected routes to restrict access.
- Auto-logout on session expiration.
- Toast notifications for user feedback.
- Axios interceptors for secure API requests.

---

## Technologies Used
- **React**: Frontend framework.
- **React Router DOM**: For route handling and navigation.
- **Axios**: For making HTTP requests.
- **React Hot Toast**: For notifications.
- **LocalStorage**: For persisting user data.

---

## Folder Structure
```
project-root/
├── src/
   ├── apis/
   │   └── apiService.js
   ├── components/
   │   └── [Your Components]
   ├── context/
   │   └── AuthContext.js
   ├── hooks/
   │   └── useAuth.js
   ├── routes/
   │   └── ProtectedRoute.js
   ├── App.js
   ├── index.js
   ├── styles/
       └── [Your CSS Files]
```

---

## Setup and Installation

1. Clone the repository:
   ```bash
   git clone (https://github.com/azzayshakya/Frontend_Auth_Advanced.git)
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Configure the API base URL in `src/apis/apiService.js`:
   ```javascript
   baseURL: "https://YourAPi/api",
   ```

4. Start the development server:
   ```bash
   npm start
   ```

5. Open your browser and navigate to:
   ```
   http://localhost:3000
   ```

---

## Code Breakdown

### Authentication Context
The `AuthContext` manages user state and provides login/logout functionality. It ensures persistent authentication by syncing with `localStorage`.

```javascript
const login = (userDetails, accessToken) => {
  setUser(userDetails);
  localStorage.setItem("data", JSON.stringify(userDetails));
  localStorage.setItem("token", accessToken);
};

const logout = () => {
  setUser(null);
  localStorage.removeItem("data");
  localStorage.removeItem("token");
};
```

### Custom Hook
The `useAuth` hook simplifies access to authentication state and actions within components.

```javascript
const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
```

### Protected Routes
The `ProtectedRoute` component restricts access to certain routes based on the user's authentication state.

```javascript
const ProtectedRoute = ({ children }) => {
  const { user } = useAuth();
  return user ? children : <Navigate to="/login" />;
};
```

### API Service
The `apiService.js` file sets up Axios with interceptors to include authentication tokens and handle session expiration.

```javascript
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers["Authorization"] = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      toast.error("Session expired. Please log in again.");
      localStorage.removeItem("token");
      setTimeout(() => {
        window.location.href = "/login";
      }, 3000);
    }
    return Promise.reject(error);
  }
);
```

---

## Usage
- **Login**: Call the `login` method with user details and access token.
- **Logout**: Call the `logout` method to clear the session.
- **Protected Routes**: Wrap components with `ProtectedRoute` or `ProtectedLoginRoute` to secure them.

---

## Future Enhancements
- Add role-based access control for user roles (admin, user, etc.).
- Implement refresh tokens for seamless session renewal.
- Improve UI/UX for login and logout flow.
- Integrate with a backend authentication system.

---

## Contributing
1. Fork the repository.
2. Create a new branch for your feature or bug fix.
3. Submit a pull request with a detailed description of changes.

---

**Happy Coding!**


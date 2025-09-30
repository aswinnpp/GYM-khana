import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import LoginPage from './pages/LoginPage.jsx'
import HomePage from './pages/HomePage.jsx'
import FoodLoggingPage from './pages/FoodLoggingPage.jsx'
import CompletionPage from './pages/CompletionPage.jsx'
import RegisterPage from './pages/RegisterPage.jsx'
import ProfileSetupPage from './pages/ProfileSetupPage.jsx'

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "login",
        element: <LoginPage />,
      },
      {
        path: "register",
        element: <RegisterPage />,
      },
      {
        path: "profile-setup/:userId",
        element: <ProfileSetupPage />,
      },
      {
        path: "/",
        element: <HomePage />,
      },
      {
        path: "food-log",
        element: <FoodLoggingPage />,
      },
      {
        path: "completed",
        element: <CompletionPage />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
);

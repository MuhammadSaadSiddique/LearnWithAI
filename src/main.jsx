import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import 'bootstrap/dist/css/bootstrap.min.css';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import GetStarted from './pages/GetStarted';
import Login from './pages/Login';
import UserInfo from './pages/UserInfo/UserInfo';
import QuizGeneration from './pages/QuizGeneration/QuizGeneration';

const router = createBrowserRouter([
  {
    path: '/*',
    element: <App />,
  },
  // {
  //   path: '/sign_up',
  //   element: <GetStarted />
  // },
  {
    path: '/login/*',
    element: <Login />
  },
  {
    path: '/userInfo',
    element: <UserInfo />
  },
  {
    path: '/generateQuiz',
    element: <QuizGeneration />
  }
])

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <RouterProvider router={router}>
      <App />
    </RouterProvider>
  </React.StrictMode>
);


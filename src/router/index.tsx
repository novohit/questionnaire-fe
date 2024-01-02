import React from 'react';
import { createBrowserRouter } from 'react-router-dom';

import Login from '../pages/Login';
import Register from '../pages/Register';
import MainLayout from '../layouts/MainLayout';
import Home from '../pages/Home';
import NotFound from '../pages/NotFound';
import ManageLayout from '../layouts/ManageLayout';
import List from '../pages/manage/List';
import Recycle from '../pages/manage/Recycle';
import Star from '../pages/manage/Star';
import Edit from '../pages/questionnaire/Edit';
import Stats from '../pages/questionnaire/Stats';
import QuestionLayout from '../layouts/QuestionLayout';

const router = createBrowserRouter([
  {
    /* 绝对路径 / 开头 相对路径不能用 / */
    path: '/',
    element: <MainLayout />,
    children: [
      { path: '/', element: <Home /> },
      { path: '/login', element: <Login /> },
      { path: '/register', element: <Register /> },
      {
        path: '/manage',
        element: <ManageLayout />,
        children: [
          { path: 'list', element: <List /> },
          { path: 'recycle', element: <Recycle /> },
          { path: 'star', element: <Star /> },
        ],
      },
      { path: '*', element: <NotFound /> },
    ],
  },
  {
    path: '/questionnaire',
    element: <QuestionLayout />,
    children: [
      { path: 'edit/:_id', element: <Edit /> },
      { path: 'stats/:_id', element: <Stats /> },
    ],
  },
]);

export default router;

export const HOME_PATH = '/';
export const LOGIN_PATH = '/login';
export const REGISTER_PATH = '/register';
export const MANAGE_INDEX_PATH = '/manage/list';

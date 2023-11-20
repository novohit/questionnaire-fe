import React from 'react';
// import logo from './logo.svg';
import './App.css';
// import List from './pages/manage/List';
import { RouterProvider } from 'react-router-dom';
import router from './router';

function App() {
  return (
    // <div className="App">
    //   <h1 style={{ background: 'green' }}>问卷</h1>
    //   <List />
    // </div>
    <RouterProvider router={router}></RouterProvider>
  );
}

export default App;

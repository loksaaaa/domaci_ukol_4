import React from 'react'
import ReactDOM from 'react-dom/client'
// import App from './App.jsx'
import './index.css'
// import RouterView from "./router/index.jsx";
import { RouterProvider ,createBrowserRouter } from 'react-router-dom'
import './App.css'

import ShoppingLists from "./views/ShoppingLists";
import ShoppingList from "./views/ShoppingList";
import CreateShoppingList from "./views/CreateShoppingList";


const routes = [
  {
    path: "/",
    element : ( <ShoppingLists />)
  },
  {
    path: "/list",
    element: ( <ShoppingList />)
  },
  {
    path: "/createList",
    element: ( <CreateShoppingList />)
  },
];

const router = createBrowserRouter(routes)



ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    {/* <App /> */}

    <RouterProvider router={ router } ></RouterProvider>
     
  </React.StrictMode>,
)

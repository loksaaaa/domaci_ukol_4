import './App.css'

// import ShoppingLists from "./views/ShoppingLists";

// import RouterView from "./router/index";
import {  BrowserRouter  ,Route  } from "react-router-dom";


import  ShoppingLists  from "./views/ShoppingLists";
import  ShoppingList from "./views/ShoppingList";
import  CreateShoppingList from "./views/CreateShoppingList";


function App() {

  return (

      <BrowserRouter>
        {/* <NavLink to='/' >sss</NavLink> */}

        {/* <RouterView></RouterView> */}

          <Route path='/' element={ <ShoppingLists /> } />
          <Route path="/list" element={ <ShoppingList /> } />
          <Route path="/createList" element={ <CreateShoppingList /> } />
          

      </BrowserRouter>

  )
}

export default App

import { createBrowserRouter } from "react-router-dom";

// import ShoppingLists from "./../views/ShoppingLists";
// import ShoppingList from "./../views/ShoppingList";

const routes = [
  {
    path: "/",
    element : ( <div>xxx</div>)
  },
  {
    path: "/list",
    element: ( <div>aaaa</div>)
  },
  {
    path: "/createList",
    element: ( <div>ccc</div>)
  },
];

export default function RouterView() {
  const elem = createBrowserRouter(routes);
  return elem;
}

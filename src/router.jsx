import { createBrowserRouter } from "react-router-dom";
import Home from "./pages/Home";
import RootLayout from "./pages/RootLayout";
import ListItems from "./pages/items/ListItems";
import UpdateItems from "./pages/items/UpdateTransaction";
import CreateItem from "./pages/items/CreateTransaction";
import ShowItems from "./pages/items/ShowItem";
import ItemsLayout from "./pages/items/ItemsLayout";

const router = createBrowserRouter([{
    path: "/",
    element: <RootLayout />,
    children: [
        { index: true, element: <Home /> },
        {
            path: "items",
            element: <ItemsLayout />,
            children: [
                { index: true, element: <ListItems /> },
                { path: "new", element: <CreateItem /> },
                { path: ":id", element: <ShowItems /> },
                { path: ":id/update", element: <UpdateItems /> }
            ]
        }
    ]
}])

export default router
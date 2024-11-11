import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Home from "./pages/Home";

const router = createBrowserRouter([
  {
    children: [
      {
        path: "/",
        element: <Home />,
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;

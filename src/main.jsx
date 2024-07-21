import React from "react";
import ReactDOM from "react-dom/client";
import App from "./routes/App";
import "bootstrap/dist/css/bootstrap.min.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import AudioDetails from "./routes/AudioDetails";
import AudioBooks from "./routes/AudioBooks";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { path: "/", element: <AudioBooks /> },
      { path: "/Detail/:id", element: <AudioDetails /> },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

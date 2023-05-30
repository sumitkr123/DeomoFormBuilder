import { RouterProvider } from "react-router-dom";

import "./assets/styles/common.css";
import { CookiesProvider } from "react-cookie";
import { routes } from "./routes/routing";

export default function App() {
  return (
    <CookiesProvider>
        <RouterProvider router={routes}></RouterProvider>
    </CookiesProvider>
  );
}

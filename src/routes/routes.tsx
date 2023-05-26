import { Navigate } from "react-router-dom";
import { CreateForm } from "../pages/core/add_transaction";
import { ErrorPage } from "../components/errorpage/errorPage";

export type TypeRoutes = {
  path: string;
  element?: JSX.Element;
  protected?: boolean;
  further?: Array<TypeRoutes>;
};

export const routeList: TypeRoutes = {
  path: "/",
  further: [
    {
      path: "",
      element: <Navigate to={"/form-builder"} />,
    },
    {
      path: "form-builder",
      further: [
        {
          path: "",
          element: <CreateForm />,
        },
      ],
    },
    { path: "/*", element: <ErrorPage /> },
  ],
};

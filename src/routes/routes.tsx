import { Navigate } from "react-router-dom";
import { ErrorPage } from "../components/errorpage/errorPage";
import React from "react";
import { CreateForm } from "../pages/core/create_form";
import { DashBoard } from "../pages/core/dashboard";

export type TypeRoutes = {
  path: string;
  element?: React.JSX.Element;
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
          element: <DashBoard />,
        },
        {
          path: "create",
          element: <CreateForm />,
        },
      ],
    },
    { path: "/*", element: <ErrorPage /> },
  ],
};

import React from "react";
import { useRoutes, Navigate } from "react-router";
import { ItemDetailContainer } from "../components/ItemDetailContainer/ItemDetailContainer";
import { ItemListContainer } from "../components/ItemListContainer/ItemListContainer";
import { Home } from "../components/Home/Home";
import { BuildSummary } from "../components/BuildSummary/BuildSummary";
import { Payment } from "../components/Payment/Payment";

export const AppRouter = () => {
  const routes = useRoutes([
    { path: "/", element: <Navigate to="/home" replace /> },
    { path: "/home", element: <Home /> },
    { path: "/productos", element: <ItemListContainer /> },
    { path: "/productos/:typeID", element: <ItemListContainer /> },
    { path: "/detail/:itemID", element: <ItemDetailContainer /> },
    { path: "/armado", element: <BuildSummary /> },
    { path: "/pago", element: <Payment /> },
    { path: "*", element: <Navigate to="/home" replace /> },
  ]);

  return routes;
};

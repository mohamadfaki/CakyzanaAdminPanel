import { lazy } from "react";
import { Navigate } from "react-router-dom";
import UtensilEdit from "../views/ui/UtensilEdit.jsx";

/****Layouts*****/
const FullLayout = lazy(() => import("../layouts/FullLayout.js"));

/***** Pages ****/

const Starter = lazy(() => import("../views/Starter.js"));
const About = lazy(() => import("../views/About.js"));
const Alerts = lazy(() => import("../views/ui/Alerts"));
const Badges = lazy(() => import("../views/ui/Badges"));
const Buttons = lazy(() => import("../views/ui/Buttons"));
const Cards = lazy(() => import("../views/ui/Cards"));
const Grid = lazy(() => import("../views/ui/Grid"));
const Tables = lazy(() => import("../views/ui/Tables"));
const Forms = lazy(() => import("../views/ui/Forms"));
const Breadcrumbs = lazy(() => import("../views/ui/Breadcrumbs"));

const Inventory = lazy(() => import("../views/ui/Inventory"));
const NewInvoice = lazy(() => import("../views/ui/NewInvoice"));
const NewItem = lazy(() => import("../views/ui/NewItem"));
const UserManagement = lazy(() => import("../views/ui/UserManagement"));
const StaffManagement = lazy(() => import("../views/ui/StaffManagement"));
const ClassesManagement = lazy(() => import("../views/ui/ClassesManagement"));
const EditClass = lazy(() => import("../views/ui/EditClass"));
const UtensilsManagement = lazy(() => import("../views/ui/UtensilsManagement"));
const OrdersManagement = lazy(() => import("../views/ui/OrdersManagement"));


/*****Routes******/

const ThemeRoutes = [
  {
    path: "/",
    element: <FullLayout />,
    children: [
      { path: "/", element: <Navigate to="/starter" /> },
      { path: "/starter", exact: true, element: <Starter /> },
      { path: "/about", exact: true, element: <About /> },
      { path: "/alerts", exact: true, element: <Alerts /> },
      { path: "/badges", exact: true, element: <Badges /> },
      { path: "/buttons", exact: true, element: <Buttons /> },
      { path: "/cards", exact: true, element: <Cards /> },
      { path: "/grid", exact: true, element: <Grid /> },
      { path: "/table", exact: true, element: <Tables /> },
      { path: "/forms", exact: true, element: <Forms /> },
      { path: "/breadcrumbs", exact: true, element: <Breadcrumbs /> },

      { path: "/inventory", exact: true, element: <Inventory /> },
      { path: "/newInvoice", exact: true, element: <NewInvoice /> },
      { path: "/newItem", exact: true, element: <NewItem /> },
      { path: "/userManagement", exact: true, element: <UserManagement /> },
      { path: "/staffManagement", exact: true, element: <StaffManagement /> },
      { path: "/classesManagement", exact: true, element: <ClassesManagement /> },
      { path: "/editClass", exact: true, element: <EditClass /> },
      { path: "/utensilsManagement", exact: true, element: <UtensilsManagement />},
      {path:"/ordersManagement", exact: true, element: <OrdersManagement />},
      {path:"/editUtensil", exact: true, element: <UtensilEdit />},
    ],
  },
];

export default ThemeRoutes;

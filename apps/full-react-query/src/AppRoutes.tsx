import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { AppLayout } from "./AppLayout";

const router = createBrowserRouter([
  {
    path: "/",
    element: <div>Home</div>,
  },
]);

export const AppRoutes = () => {
  return (
    <AppLayout>
      <RouterProvider router={router} />
    </AppLayout>
  );
};

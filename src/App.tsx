import React, { lazy, Suspense } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { PrivateRoute, PublicRoute } from "./RequireAuth";
import Layout from "./components/Layout";
import LoadingScreen from "./components/LoadingScreen";
const HomePage = lazy(() => import("./pages/Home"));
const NotFoundPage = lazy(() => import("./components/NotFound"));
const LoginPage = lazy(() => import("./pages/Login"));

// Define routes
const router = createBrowserRouter([
  {
    path: "/",
    element: <PrivateRoute element={<HomePage />} />,
  },
  {
    path: "/login", // Adding login page route here
    element: <PublicRoute element={<LoginPage />} />,
  },
  {
    path: "*",
    element: <NotFoundPage />,
  },
]);

// Main App component
const App: React.FC = () => (
  <Suspense fallback={<LoadingScreen />}>
    <Layout>
      <RouterProvider router={router} />
    </Layout>
  </Suspense>
);

export default App;

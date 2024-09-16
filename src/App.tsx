import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import RequireAuth from "./RequireAuth";
import Layout from "./components/Layout";
import HomePage from "./pages/Home";

// Define routes
const router = createBrowserRouter([
  {
    path: "/",
    element: <RequireAuth element={<HomePage />} />,
  },
]);

// Main App component
const App: React.FC = () => (
  <Layout>
    <RouterProvider router={router} />
  </Layout>
);

export default App;

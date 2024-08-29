import { Provider } from "react-redux";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import store from "./redux/store";
import { AuthLayout } from "./components";
import { Home, Login, NotFound, Register } from "./pages";
import { ThemeProvider } from "@/providers/theme-provider";
import ProtectedRoute from "./components/ProtectedRoute";
function App() {
  const routes = createBrowserRouter([
    {
      path: "/",
      element: <AuthLayout />,
      errorElement: <NotFound />,
      children: [
        { index: true, element: <Login /> },
        { path: "register", element: <Register /> },
        {
          path: "home",
          element: (
            <ProtectedRoute>
              {" "}
              <Home />
            </ProtectedRoute>
          ),
        },
      ],
    },
  ]);
  return (
    <>
      <ToastContainer theme="dark" autoClose={2000} />
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <Provider store={store}>
          <RouterProvider router={routes} />
        </Provider>
      </ThemeProvider>
    </>
  );
}

export default App;

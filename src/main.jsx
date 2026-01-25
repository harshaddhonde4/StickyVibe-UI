import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import {
  createBrowserRouter,
  RouterProvider,
  createRoutesFromElements,
  Route,
} from "react-router-dom";
import About from "./components/About.jsx";
import Contact, { contactAction } from "./components/Contact.jsx";
import Login, { loginAction } from "./components/Login.jsx";
import Register, { registerAction } from "./components/Register.jsx";
import Cart from "./components/Cart.jsx";
import Home, { productsLoader } from "./components/Home.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";
import ErrorPage from "./components/ErrorPage.jsx";
import ProductDetail from "./components/ProductDetail.jsx";
import CheckoutForm from "./components/CheckoutForm.jsx";
import Profile, {
  profileAction,
  profileLoader,
} from "./components/Profile.jsx";
import Orders from "./components/Orders.jsx";
import AdminOrders from "./components/admin/Orders.jsx";
import AdminMessages from "./components/admin/Messages.jsx";
import { CartProvider } from "./store/Cart-Context.jsx";
import { AuthProvider } from "./store/Auth-Context.jsx";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const routesDefinitions = createRoutesFromElements(
  <Route path="/" element={<App />} errorElement={<ErrorPage />}>
    <Route index element={<Home />} loader={productsLoader} />
    <Route path="/home" element={<Home />} loader={productsLoader} />
    <Route path="/about" element={<About />} />
    <Route path="/contact" element={<Contact />} action={contactAction} />
    <Route path="/login" element={<Login />} action={loginAction} />
    <Route path="/cart" element={<Cart />} />
    <Route path="/products/:productId" element={<ProductDetail />} />
    <Route path="/register" element={<Register />} action={registerAction} />
    <Route element={<ProtectedRoute />}>
      <Route path="/checkout" element={<CheckoutForm />} />
      <Route
        path="/profile"
        element={<Profile />}
        action={profileAction}
        loader={profileLoader}
        shouldRevalidate={({ actionResult }) => {
          return !actionResult?.success;
        }}
      />
      <Route path="/orders" element={<Orders />} />
      <Route path="/admin/orders" element={<AdminOrders />} />
      <Route path="/admin/messages" element={<AdminMessages />} />
    </Route>
  </Route>
);

const router = createBrowserRouter(routesDefinitions);
const root = createRoot(document.getElementById("root"));

root.render(
  <StrictMode>
    <AuthProvider>
      <CartProvider>
        <RouterProvider router={router} />
        <ToastContainer position="top-right" autoClose={3000} />
      </CartProvider>
    </AuthProvider>
  </StrictMode>
);

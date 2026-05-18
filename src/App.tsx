import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

import {
  useEffect,
} from "react";

import {
  useDispatch,
} from "react-redux";

import Login from "./pages/auth/Login";

import Dashboard from "./pages/dashboard/Dashboard";

import Register from "./pages/auth/Register";

import VerifyEmail from "./pages/auth/VerifyEmail";

import PrivateRoute from "./routes/PrivateRoute";

import api from "./services/api";
import PublicRoute from "./routes/PublicRoute";

import {
  setUser,
} from "./store/slices/authSlice";

function App() {

  const dispatch = useDispatch();

  useEffect(() => {

    const getProfile =
      async () => {

        try {

          const res =
            await api.get(
              "/auth/profile"
            );

          console.log(res.data);

          dispatch(
            setUser(
              res.data.data
            )
          );

        } catch {

          console.log(
            "Not authenticated"
          );

        }
      };

    const token =
  localStorage.getItem(
    "accessToken"
  );

if (token) {
  getProfile();
}

  }, [dispatch]);

  return (
    <BrowserRouter>
<Routes>

  <Route

    element={<PublicRoute />}

  >

    <Route

      path="/"

      element={<Login />}

    />

    <Route

      path="/login"

      element={<Login />}

    />

    <Route

      path="/register"

      element={<Register />}

    />

    <Route

      path="/verify-email"

      element={<VerifyEmail />}

    />

  </Route>

  <Route

    element={<PrivateRoute />}

  >

    <Route

      path="/dashboard"

      element={<Dashboard />}

    />

  </Route>

</Routes>
    </BrowserRouter>
  );
}

export default App;
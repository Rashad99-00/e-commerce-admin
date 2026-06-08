import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { ACCESS_TOKEN_KEY } from "../constants/api";
import api from "../services/api";
import { setUser } from "../store/slices/authSlice";

export function useLoadProfile() {
  const dispatch = useDispatch();

  useEffect(() => {
    if (!localStorage.getItem(ACCESS_TOKEN_KEY)) {
      return;
    }

    const loadProfile = async () => {
      try {
        const response = await api.get("/auth/profile");
        dispatch(setUser(response.data.data));
      } catch {
        console.info("User session could not be restored.");
      }
    };

    void loadProfile();
  }, [dispatch]);
}

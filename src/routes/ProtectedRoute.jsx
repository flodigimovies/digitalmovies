import { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import { supabase } from "../services/supabaseClient";

export const ProtectedRoute = ({ children }) => {
  // Fast initial check from sessionStorage to avoid flash
  const [isAuth, setIsAuth] = useState(!!sessionStorage.getItem("token"));
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // FIX: verify with Supabase directly — sessionStorage can be cleared on mobile
    supabase.auth.getSession().then(({ data: { session } }) => {
      setIsAuth(!!session);
      if (session) {
        sessionStorage.setItem("token", JSON.stringify(session.access_token));
        sessionStorage.setItem("cbid", JSON.stringify(session.user.id));
      } else {
        sessionStorage.removeItem("token");
        sessionStorage.removeItem("cbid");
      }
      setLoading(false);
    });
  }, []);

  // Don't flash the login page while checking
  if (loading) return null;

  return isAuth ? children : <Navigate to="/login" />;
};

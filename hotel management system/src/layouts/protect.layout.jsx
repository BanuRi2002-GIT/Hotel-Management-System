import { useAuth } from "@clerk/clerk-react";
import { Navigate, Outlet } from "react-router";

export default function ProtectLayout() {
  const { isSignedIn, isLoaded } = useAuth();

  if (!isLoaded) return null;

  if (!isSignedIn) {
    return <Navigate to="/sign-in" replace />;
  }

  return <Outlet />;
}
import { useUser } from "@clerk/clerk-react";
import { Navigate, Outlet } from "react-router";

export default function AdminProtectLayout() {
  const { user, isLoaded } = useUser();

  if (!isLoaded) return null;

  if (user?.publicMetadata?.role !== "admin") {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
}
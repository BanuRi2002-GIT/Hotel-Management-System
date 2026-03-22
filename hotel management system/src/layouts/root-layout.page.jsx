import Navigation from "../components/Navigation";
import Footer from "../components/footer";
import { Outlet } from "react-router";
import { Toaster } from "sonner";

export default function RootLayout() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      <div className="flex-1">
        <Outlet />
      </div>
      <Footer />
      <Toaster richColors position="top-right" />
    </div>
  );
}
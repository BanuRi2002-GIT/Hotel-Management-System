// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
// import './App.css'

// function App() {
//   const [count, setCount] = useState(0)

//   return (
//     <>
//       <div>
//         <a href="https://vite.dev" target="_blank">
//           <img src={viteLogo} className="logo" alt="Vite logo" />
//         </a>
//         <a href="https://react.dev" target="_blank">
//           <img src={reactLogo} className="logo react" alt="React logo" />
//         </a>
//       </div>
//       <h1>Vite + React</h1>
//       <div className="card">
//         <button onClick={() => setCount((count) => count + 1)}>
//           count is {count}
//         </button>
//         <p>
//           Edit <code>src/App.jsx</code> and save to test HMR
//         </p>
//       </div>
//       <p className="read-the-docs">
//         Click on the Vite and React logos to learn more
//       </p>
//     </>
//   )
// }

// export default App
// App.jsx
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ClerkProvider, SignedIn, SignedOut } from "@clerk/clerk-react";
import { Toaster } from "sonner";
import { Provider } from "react-redux";
import { store } from "./lib/store"; // You'll need to create this if not exists

// Layout Components
import Navigation from "./components/Navigation";
import Hero from "./components/Hero";
import HotelListings from "./components/HotelListing";
import HotelCreateForm from "./components/HotelCreateForm";
import HotelDetail from "./components/HotelDetail"; // You'll need to create this
import Footer from "./components/Footer"; // Optional - you can create this

// Pages
import SignIn from "./pages/SignIn"; // You'll need to create these
import SignUp from "./pages/SignUp";
import Account from "./pages/Account";

// Loading state component (optional)
import LoadingSpinner from "./components/LoadingSpinner";

// Your Clerk publishable key - replace with your actual key
const clerkPubKey = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

function App() {
  // If you don't have Clerk set up yet, you can temporarily use this wrapper
  if (!clerkPubKey) {
    return <AppWithoutAuth />;
  }

  return (
    <ClerkProvider publishableKey={clerkPubKey}>
      <Provider store={store}>
        <Router>
          <div className="min-h-screen bg-gray-50">
            <Navigation />
            <Routes>
              {/* Public Routes */}
              <Route path="/" element={<HomePage />} />
              <Route path="/sign-in" element={<SignIn />} />
              <Route path="/sign-up" element={<SignUp />} />
              
              {/* Protected Routes */}
              <Route
                path="/account"
                element={
                  <SignedIn>
                    <Account />
                  </SignedIn>
                }
              />
              <Route
                path="/hotels/create"
                element={
                  <SignedIn>
                    <HotelCreateForm />
                  </SignedIn>
                }
              />
              
              {/* Hotel Detail Route */}
              <Route path="/hotels/:id" element={<HotelDetail />} />
            </Routes>
            <Footer />
            <Toaster richColors position="top-right" />
          </div>
        </Router>
      </Provider>
    </ClerkProvider>
  );
}

// Home page component combining Hero and HotelListings
function HomePage() {
  return (
    <main>
      <Hero />
      <HotelListings />
    </main>
  );
}

// Fallback app without authentication (for development)
function AppWithoutAuth() {
  return (
    <Provider store={store}>
      <Router>
        <div className="min-h-screen bg-gray-50">
          <Navigation />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/hotels/create" element={<HotelCreateForm />} />
            <Route path="/hotels/:id" element={<HotelDetail />} />
            <Route path="/account" element={<Account />} />
          </Routes>
          <Footer />
          <Toaster richColors position="top-right" />
        </div>
      </Router>
    </Provider>
  );
}

export default App;
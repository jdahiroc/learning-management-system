import { Routes, Route } from "react-router-dom";
import { AuthContextProvider } from "./context/AuthContext";

// Components
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import Homepage from "./pages/Homepage";
import ProtectedRoute from "../src/ProtectedRoutes/ProtectedRoute";

// Admin components
// TODO add components for admin pages

function App() {
  return (
    <>
      <div>
        <AuthContextProvider>
          <Routes>
            <Route path="/" index element={<SignIn />} />
            <Route path="/signup" element={<SignUp />} />
            
            {/* User Routes */}
            {/* Normal User Homepage */}
            <Route
              path="/homepage"
              element={
                <ProtectedRoute>
                  <Homepage />
                </ProtectedRoute>
              }
            />

            {/* Admin Routes */}
          </Routes>
        </AuthContextProvider>
      </div>
    </>
  );
}

export default App;

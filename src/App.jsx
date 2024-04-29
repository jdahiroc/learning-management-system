import { Routes, Route } from "react-router-dom";
import { AuthContextProvider } from "./context/AuthContext";

// Components
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import Homepage from "./pages/Homepage";
import ProtectedRoute from "../src/ProtectedRoutes/ProtectedRoute";

// Admin components
import CourseSection from "../src/pages/CourseSection";
import AdminHomepage from "./pages/AdminHome";

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
              path="/home"
              element={
                <ProtectedRoute>
                  <Homepage />
                </ProtectedRoute>
              }
            />

            {/* Admin Routes */}
            {/* Course Section */}
            <Route
              path="/admin/course"
              element={
                <ProtectedRoute>
                  <CourseSection />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/home"
              element={
                <ProtectedRoute>
                  <AdminHomepage />
                </ProtectedRoute>
              }
            />
          </Routes>
        </AuthContextProvider>
      </div>
    </>
  );
}

export default App;

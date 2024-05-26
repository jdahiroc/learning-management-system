import { Routes, Route } from "react-router-dom";
import { AuthContextProvider } from "./context/AuthContext";

// Components
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import Homepage from "./pages/Homepage";
import ProtectedRoute from "../src/ProtectedRoutes/ProtectedRoute";

// Admin components
import CourseSection from "../src/pages/CourseSection";
import LessonMaterialsPage from "../src/pages/LessonMaterialsPage";
import AssessmentPage from "../src/pages/AssessmentPage";
import AdminHomepage from "./pages/AdminHome";
import AddCourse from "./pages/AddCourse";
import AdminCoursePage from "./pages/AdminCoursePage";
import Contactus from "./pages/ContactUs";

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
              userType="Student"
            />
              <Route
              path="/contactus"
              element={
                <ProtectedRoute>
                  <Contactus />
                </ProtectedRoute>
              }
              userType="Student"
            />

            {/* Admin Routes */}
            {/* Course Section */}
            <Route
              path="/admin/home"
              element={
                <ProtectedRoute>
                  <AdminHomepage />
                </ProtectedRoute>
              }
              userType="Teacher"
            />
            <Route
              path="/admin/course/:courseId"
              element={
                <ProtectedRoute>
                  <CourseSection />
                </ProtectedRoute>
              }
              userType="Teacher"
            />
            <Route
              path="/admin/course/:courseId/lessonMaterials/:lessonId"
              element={
                <ProtectedRoute>
                  <LessonMaterialsPage />
                </ProtectedRoute>
              }
              userType="Teacher"
            />

            <Route
              path="/admin/course/:courseId/Assessments/:assessmentId"
              element={
                <ProtectedRoute>
                  <AssessmentPage />
                </ProtectedRoute>
              }
              userType="Teacher"
            />
            <Route
              path="/admin/page/course"
              element={
                <ProtectedRoute>
                  <AdminCoursePage />
                </ProtectedRoute>
              }
              userType="Teacher"
            />
            <Route
              path="/admin/add/course"
              element={
                <ProtectedRoute>
                  <AddCourse />
                </ProtectedRoute>
              }
              userType="Teacher"
            />
          </Routes>
        </AuthContextProvider>
      </div>
    </>
  );
}

export default App;

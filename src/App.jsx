import { Routes, Route } from "react-router-dom";
import { AuthContextProvider } from "./context/AuthContext";

// components
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import Homepage from "./pages/Homepage";




function App() {
  return (
    <>
      <div>
        <AuthContextProvider>
          <Routes>
            <Route path="/" index element={<SignIn />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/homepage" element={<Homepage />} />
          </Routes>
        </AuthContextProvider>
      </div>
    </>
  );
}

export default App;

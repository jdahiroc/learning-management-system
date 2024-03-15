import { BrowserRouter, Routes, Route } from "react-router-dom";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";

// CSS 
import "./App.css"



function App() {
  return (
    <>
      <div>
        <BrowserRouter>
          <Routes>
            <Route index element={<SignIn />} />
            <Route path="/signUp" element={<SignUp />} />
          </Routes>
        </BrowserRouter>
      </div>
    </>
  );
}

export default App;

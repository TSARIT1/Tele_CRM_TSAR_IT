// import "./App.css";
// import { Routes, Route } from "react-router-dom";
// import AdminPage from "./pages/AdminPage";
// import Employer from "./employers/pages/Employer";
// import AdminRegister from "./pages/AdminRegister";
// import AdminLogin from "./pages/AdminLogin";
// import UserRegister from "./auth/UserRegister";
// import UserLogin from "./auth/UserLogin";
// import UserForgotPassword from "./auth/UserForgotPassword";
// import HomePage from "./pages/HomePage";

// const App = () => {
//   return (
//     <>
//       <Routes>
//         <Route path="/" element={<HomePage />} />
//          <Route path="/about" element={<About />} />
//         <Route path="/contact" element={<Contact />} />
//         <Route path="/careers" element={<Careers />} />
//         <Route path="/admin/home" element={<AdminPage />} />
//         <Route path="/user/home" element={ <Employer /> } />
        
//         <Route path="/admin/login" element={ <AdminLogin /> } />
//         <Route path="/admin/register" element={ <AdminRegister /> } />

//         <Route path="/user/register" element={ <UserRegister /> } />
//         <Route path="/user/login" element={ <UserLogin /> } />
//         <Route path="/user/forgot-password" element={ <UserForgotPassword /> } />
       

//       </Routes>
//     </>
//   );
// };

// export default App;




import "./App.css";
import { Routes, Route } from "react-router-dom";

import AdminPage from "./pages/AdminPage";
import Employer from "./employers/pages/Employer";
import AdminRegister from "./pages/AdminRegister";
import AdminLogin from "./pages/AdminLogin";
import UserRegister from "./auth/UserRegister";
import UserLogin from "./auth/UserLogin";
import UserForgotPassword from "./auth/UserForgotPassword";
import HomePage from "./pages/HomePage";

// 👉 Import these pages
import About from "./pages/About";
import Contact from "./pages/Contact";
import Careers from "./pages/Careers";

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />

        {/* Public Pages */}
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/careers" element={<Careers />} />

        {/* Admin */}
        <Route path="/admin/home" element={<AdminPage />} />
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin/register" element={<AdminRegister />} />

        {/* User */}
        <Route path="/user/home" element={<Employer />} />
        <Route path="/user/register" element={<UserRegister />} />
        <Route path="/user/login" element={<UserLogin />} />
        <Route path="/user/forgot-password" element={<UserForgotPassword />} />
      </Routes>
    </>
  );
};

export default App;
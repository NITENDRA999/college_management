import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Events from "./pages/Events";
import UpdateEvent from "./pages/UpdateEvent";
import Users from "./pages/Users";
import CreateUser from "./pages/CreateUser";
import UpdateUser from "./pages/UpdateUser";
import Dashboard from "./pages/Dashboard";
import Footer from "./components/Footer";


export default function App() {
  return (
    <BrowserRouter>
      <Navbar /> {/* Always visible */}
      <Routes>
        {/* Home page → Events list */}
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/users" element={<Users />} />
        <Route path="/create-user" element={<CreateUser />} />
        <Route path="/update-user/:id" element={<UpdateUser />} />
        <Route path="/" element={<Events />} />
        <Route path="/update-event/:id" element={<UpdateEvent />} />
        <Footer />
      </Routes>
    </BrowserRouter>
  );
}

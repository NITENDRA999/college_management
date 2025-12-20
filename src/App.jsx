import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Events from "./pages/Events";
import UpdateEvent from "./pages/UpdateEvent";
import Users from "./pages/Users";
import CreateUser from "./pages/CreateUser";
import UpdateUser from "./pages/UpdateUser";
import Dashboard from "./pages/Dashboard";
import CreateEvent from "./pages/CreateEvent";
import EventDetails from "./pages/EventDetails";
import MyEvents from "./pages/MyEvents";
import Footer from "./components/Footer";
import Welcome from "./pages/Welcome";


export default function App() {
  return (
    <BrowserRouter>
    
      <Navbar></Navbar>

      <Routes>
        <Route path="/" element={<Welcome />} />
        <Route path="/events" element={<Events />} />
        
        { <><><><><><><><Route path="/dashboard" element={<Dashboard />} />
          <Route path="/users" element={<Users />} /></>
          <Route path="/create-user" element={<CreateUser />} />
        </><Route path="/update-user/:id" element={<UpdateUser />} />
        </><Route path="/create-event" element={<CreateEvent />} />
        </><Route path="/update-event/:id" element={<UpdateEvent />} />
        </><Route path="/event/:id" element={<EventDetails />} /></><Route path="/my-events" element={<MyEvents />} /></> }
      </Routes>

      {/* {location.pathname !== "/" && <Footer />} */}
    </BrowserRouter>
  );
}

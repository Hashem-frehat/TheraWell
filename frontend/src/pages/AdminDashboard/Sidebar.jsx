import React, { useState } from "react";
import { Home, Users, Calendar, Mail, LogOut, Hospital, Menu } from "lucide-react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

const Layout = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />
      <main className={`flex-1 overflow-x-hidden overflow-y-auto bg-gray-100 transition-all duration-300 ease-in-out ${isSidebarOpen ? 'lg:ml-64' : 'ml-0'}`}>
        <div className="container mx-auto px-6 py-8">
          {children}
        </div>
      </main>
    </div>
  );
};

const Sidebar = ({ isOpen, setIsOpen }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    navigate("/login");
  };

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <button
        onClick={toggleSidebar}
        className="fixed top-4 left-4 z-20 p-2 bg-indigo-700 text-white rounded-full lg:hidden"
      >
        <Menu />
      </button>
      <AnimatePresence>
        {(isOpen || window.innerWidth >= 1024) && (
          <motion.aside
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className={`fixed top-0 left-0 z-10 bg-indigo-700 text-white w-64 h-full p-4 overflow-y-auto transition-all duration-300 ease-in-out ${isOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0`}
          >
            <div className="mb-8 flex items-center space-x-3">
            <img
            src="https://www.zilliondesigns.com/images/portfolio/healthcare-hospital/iStock-471629610-Converted.png"
            alt="ProHealth Logo"
            className="h-10 mr-1" // Adjusted the height of the logo to be smaller
          />              <h2 className="text-3xl font-bold text-white">TheraWell</h2>
            </div>

            <nav>
              <ul>
                <SidebarItem icon={Home} text="Overview" to="/admin" currentPath={location.pathname} />
                <SidebarItem icon={Users} text="Patient Records" to="/admin/patient-records" currentPath={location.pathname} />
                <SidebarItem icon={Users} text="Doctors" to="/admin/doctors" currentPath={location.pathname} />
                <SidebarItem icon={Calendar} text="Appointments" to="/admin/appointments" currentPath={location.pathname} />
                <SidebarItem icon={Mail} text="Messages" to="/admin/messages" currentPath={location.pathname} />
              </ul>
            </nav>

            <div className="mt-auto pt-4">
              <button
                onClick={handleLogout}
                className="flex items-center w-full p-2 hover:bg-indigo-600 rounded text-white transition-colors duration-200"
              >
                <LogOut className="mr-3" />
                <span>Logout</span>
              </button>
            </div>
          </motion.aside>
        )}
      </AnimatePresence>
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-0 lg:hidden"
          onClick={toggleSidebar}
        ></div>
      )}
    </>
  );
};

const SidebarItem = ({ icon: Icon, text, to, currentPath }) => (
  <li className="mb-4">
    <Link
      to={to}
      className={`flex items-center p-2 rounded transition-colors duration-200 ${
        currentPath === to ? "bg-indigo-600" : "hover:bg-indigo-600"
      }`}
    >
      <Icon className="mr-3" />
      <span>{text}</span>
    </Link>
  </li>
);

export default Layout;
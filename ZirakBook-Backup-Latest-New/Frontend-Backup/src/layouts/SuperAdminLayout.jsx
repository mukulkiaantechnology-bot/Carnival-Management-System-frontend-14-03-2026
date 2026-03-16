import React, { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { Outlet, useLocation } from 'react-router-dom';
import Sidebar from '../components/Sidebar/Sidebar';
import Navbar from '../components/Navbar/Navbar';
import './SuperAdminLayout.css';

const SuperAdminLayout = () => {
    // Initialize sidebar state based on screen width
    const [isSidebarOpen, setIsSidebarOpen] = useState(window.innerWidth > 991);
    const { currentUser } = useContext(AuthContext);
    const location = useLocation();

    // Close sidebar on route change for mobile
    React.useEffect(() => {
        if (window.innerWidth <= 991) {
            setIsSidebarOpen(false);
        }
    }, [location]);

    // Handle screen resize
    React.useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth > 991) {
                setIsSidebarOpen(true);
            } else {
                setIsSidebarOpen(false);
            }
        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    // Mapping backend roles to Sidebar keys
    // Backend: SUPERADMIN -> 'superadmin' menu
    // All others (ADMIN, COMPANY, Custom) -> 'company' menu
    let userRole = 'company'; // Default

    if (currentUser?.role === 'SUPERADMIN') {
        userRole = 'superadmin';
    } else {
        // All other roles (ADMIN, COMPANY, USER, Custom Roles) use the Company Menu structure
        // The Sidebar component will filter specific items based on 'permissions'
        userRole = 'company';
    }

    return (
        <div className="layout-container">
            {/* Mobile Overlay Backdrop */}
            {isSidebarOpen && (
                <div
                    className="sidebar-overlay d-lg-none"
                    onClick={() => setIsSidebarOpen(false)}
                />
            )}

            <Sidebar
                isOpen={isSidebarOpen}
                role={userRole}
                permissions={currentUser?.permissions || []}
                planModules={currentUser?.planModules || []}
                isAdmin={currentUser?.role === 'COMPANY' || currentUser?.role === 'ADMIN'}
                onClose={() => setIsSidebarOpen(false)}
            />
            <div className={`main-content ${isSidebarOpen ? 'sidebar-open' : 'sidebar-closed'}`}>
                <Navbar toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} />
                <main className="page-content">
                    <Outlet />
                </main>
            </div>
        </div>
    );
};

export default SuperAdminLayout;

import React, { useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import {
    Home, Building2, Ticket, CreditCard, Key,
    Users, ShoppingCart, Truck, FileText, ClipboardList,
    BarChart3, Settings, ChevronDown, ChevronRight, Box,
    Calculator, Receipt, UserCog, X
} from 'lucide-react';
import './Sidebar.css';
import logo from '../../assets/zirak-logo.png';

const Sidebar = ({ isOpen, role = 'superadmin', permissions = [], planModules = [], isAdmin = false, onClose }) => {
    const location = useLocation();
    const [expandedGroups, setExpandedGroups] = useState({});

    const toggleGroup = (groupName) => {
        setExpandedGroups(prev => ({
            ...prev,
            [groupName]: !prev[groupName]
        }));
    };

    const menuItems = {
        superadmin: [
            { path: '/superadmin/dashboard', label: 'Dashboard', icon: Home },
            { path: '/superadmin/company', label: 'Company', icon: Building2 },
            { path: '/superadmin/plan', label: 'Plans & Pricing', icon: Ticket },
            { path: '/superadmin/plan-requests', label: 'Request Plan', icon: ClipboardList },
            { path: '/superadmin/payments', label: 'Payments', icon: CreditCard },
            { path: '/superadmin/passwords', label: 'Manage Passwords', icon: Key },
        ],
        company: [
            { path: '/company/dashboard', label: 'Dashboard', icon: Home, perm: 'show dashboard' },
            {
                label: 'Accounts',
                icon: Calculator,
                moduleName: 'Account',
                perm: 'manage accounts',
                subItems: [
                    { path: '/company/accounts/charts', label: 'Charts of Accounts', perm: 'manage accounts' },
                    { path: '/company/accounts/customers', label: 'Customers/Debtors', perm: 'manage accounts' },
                    { path: '/company/accounts/vendors', label: 'Vendors/Creditors', perm: 'manage accounts' },
                    { path: '/company/bank-transfer', label: 'Bank Transfer', perm: 'manage accounts' },
                ]
            },
            {
                label: 'Inventory',
                icon: Box,
                moduleName: 'Inventory',
                perm: 'manage inventory',
                subItems: [
                    { path: '/company/inventory/warehouse', label: 'Warehouse', perm: 'manage inventory' },
                    { path: '/company/inventory/uom', label: 'Unit of measure', perm: 'manage inventory' },
                    { path: '/company/inventory/products', label: 'Product & Inventory', perm: 'manage inventory' },
                    { path: '/company/inventory/services', label: 'Service', perm: 'manage inventory' },
                    { path: '/company/inventory/transfer', label: 'StockTransfer', perm: 'manage inventory' },
                    { path: '/company/inventory/adjustment', label: 'Inventory Adjustment', perm: 'manage inventory' },
                ]
            },
            {
                label: 'Sales',
                icon: ShoppingCart,
                moduleName: 'Sales',
                perm: 'show sales',
                subItems: [
                    { path: '/company/sales/quotation', label: 'Quotation', perm: 'show sales' },
                    { path: '/company/sales/order', label: 'Sales Order', perm: 'show sales' },
                    { path: '/company/sales/challan', label: 'Delivery Challan', perm: 'show sales' },
                    { path: '/company/sales/invoice', label: 'Invoice', perm: 'show sales' },
                    { path: '/company/sales/payment', label: 'Payment', perm: 'show sales' },
                    { path: '/company/sales/return', label: 'Sales Return', perm: 'show sales' },
                ]
            },
            {
                label: 'Purchases',
                icon: Truck,
                moduleName: 'Purchase',
                perm: 'manage purchases',
                subItems: [
                    { path: '/company/purchases/quotation', label: 'Purchase Quotation', perm: 'manage purchases' },
                    { path: '/company/purchases/order', label: 'Purchase Order', perm: 'manage purchases' },
                    { path: '/company/purchases/receipt', label: 'Goods Receipt', perm: 'manage purchases' },
                    { path: '/company/purchases/bill', label: 'Bill', perm: 'manage purchases' },
                    { path: '/company/purchases/payment', label: 'Payment', perm: 'manage purchases' },
                    { path: '/company/purchases/return', label: 'Purchase Return', perm: 'manage purchases' },
                ]
            },
            {
                path: '/company/pos',
                label: 'POS Screen',
                icon: ShoppingCart,
                moduleName: 'POS',
                perm: 'manage pos'
            },
            {
                label: 'Voucher',
                icon: Receipt,
                perm: 'manage voucher',
                subItems: [
                    { path: '/company/voucher/create', label: 'Create Voucher', perm: 'manage voucher' },
                    { path: '/company/voucher/expenses', label: 'Expenses', perm: 'manage voucher' },
                    { path: '/company/voucher/income', label: 'Income', perm: 'manage voucher' },
                    { path: '/company/voucher/contra', label: 'Contra Voucher', perm: 'manage voucher' },
                ]
            },
            {
                label: 'Reports',
                icon: BarChart3,
                perm: 'manage reports',
                subItems: [
                    { path: '/company/reports/sales', label: 'Sales Report', perm: 'manage reports', moduleName: 'Sales' },
                    { path: '/company/reports/purchase', label: 'Purchase Report', perm: 'manage reports', moduleName: 'Purchase' },
                    { path: '/company/reports/pos', label: 'POS Report', perm: 'manage reports', moduleName: 'POS' },
                    { path: '/company/reports/tax', label: 'Tax Report', perm: 'manage reports', moduleName: 'GST Report' },
                    { path: '/company/reports/inventory-summary', label: 'Inventory Summary', perm: 'manage reports', moduleName: 'Inventory' },
                    { path: '/company/reports/balance-sheet', label: 'Balance Sheet', perm: 'manage reports', moduleName: 'Account' },
                    { path: '/company/reports/cash-flow', label: 'Cash Flow', perm: 'manage reports', moduleName: 'Account' },
                    { path: '/company/reports/profit-loss', label: 'Profit & Loss', perm: 'manage reports', moduleName: 'Account' },
                    { path: '/company/reports/vat', label: 'Vat Report', perm: 'manage reports', moduleName: 'GST Report' },
                    { path: '/company/reports/daybook', label: 'DayBook', perm: 'manage reports', moduleName: 'Account' },
                    { path: '/company/reports/journal', label: 'Journal Entries', perm: 'manage reports', moduleName: 'Account' },
                    { path: '/company/reports/ledger', label: 'Ledger', perm: 'manage reports', moduleName: 'Account' },
                    { path: '/company/reports/trial-balance', label: 'Trial Balance', perm: 'manage reports', moduleName: 'Account' },
                    { path: '/company/accounts/transactions', label: 'All Transaction', perm: 'manage reports', moduleName: 'Account' },
                ]
            },
            {
                label: 'User Management',
                icon: Users,
                moduleName: 'User Management',
                perm: 'manage user',
                subItems: [
                    { path: '/company/users/roles', label: 'Roles & Permissions', perm: 'manage role' },
                    { path: '/company/users/list', label: 'Users', perm: 'manage user' },
                ]
            },
            {
                label: 'Settings',
                icon: Settings,
                perm: 'manage settings',
                subItems: [
                    { path: '/company/settings/info', label: 'Company Info', perm: 'manage settings' },
                    { path: '/company/settings/password-requests', label: 'Password Requests', perm: 'manage settings' },
                ]
            }
        ]
    };

    const hasPermission = (item) => {
        if (role === 'superadmin') return true;

        if (item.moduleName) {
            const module = planModules.find(m =>
                (m.name || m.module_name || "").toLowerCase() === item.moduleName.toLowerCase()
            );
            if (module && !module.enabled) return false;
        }

        if (isAdmin) return true;

        if (!item.perm && !item.subItems) return true;

        if (item.subItems) {
            if (item.perm && !permissions.includes(item.perm)) return false;

            const visibleChildren = item.subItems.filter(sub => {
                if (sub.moduleName) {
                    const module = planModules.find(m =>
                        (m.name || m.module_name || "").toLowerCase() === sub.moduleName.toLowerCase()
                    );
                    if (module && !module.enabled) return false;
                }
                return !sub.perm || permissions.includes(sub.perm);
            });
            return visibleChildren.length > 0;
        }

        return permissions.includes(item.perm);
    };

    const handleItemClick = () => {
        if (window.innerWidth <= 991 && onClose) {
            onClose();
        }
    };

    const renderMenu = (items) => {
        return items.map((item, index) => {
            if (!hasPermission(item)) return null;

            if (item.subItems) {
                // Filter subItems again for rendering
                const visibleSubItems = item.subItems.filter(sub => {
                    // Check module gating for sub-item
                    if (sub.moduleName) {
                        const module = planModules.find(m =>
                            (m.name || m.module_name || "").toLowerCase() === sub.moduleName.toLowerCase()
                        );
                        if (module && !module.enabled) return false;
                    }
                    return isAdmin || !sub.perm || permissions.includes(sub.perm);
                });

                if (visibleSubItems.length === 0) return null;

                const isExpanded = expandedGroups[item.label];
                const isActive = visibleSubItems.some(sub => location.pathname.startsWith(sub.path));

                return (
                    <div key={index} className="menu-group">
                        <div
                            className={`menu-item has-submenu ${isActive ? 'active-parent' : ''}`}
                            onClick={() => toggleGroup(item.label)}
                        >
                            <div className="icon-label">
                                <div className="menu-icon-wrapper">
                                    {item.icon && <item.icon size={18} />}
                                </div>
                                <span className="menu-text">{item.label}</span>
                            </div>
                            <div className="chevron-wrapper">
                                {isExpanded ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
                            </div>
                        </div>

                        <div className={`submenu ${isExpanded ? 'expanded' : ''}`}>
                            {visibleSubItems.map((sub, subIndex) => (
                                <NavLink
                                    key={subIndex}
                                    to={sub.path}
                                    className={({ isActive }) => `submenu-item ${isActive ? 'active' : ''}`}
                                    onClick={handleItemClick}
                                >
                                    {sub.label}
                                </NavLink>
                            ))}
                        </div>
                    </div>
                );
            }

            return (
                <NavLink
                    key={index}
                    to={item.path}
                    className={({ isActive }) => `menu-item ${isActive ? 'active' : ''}`}
                    onClick={handleItemClick}
                >
                    <div className="menu-icon-wrapper">
                        {item.icon && <item.icon size={18} />}
                    </div>
                    <span className="menu-text">{item.label}</span>
                </NavLink>
            );
        });
    };

    return (
        <div className={`sidebar ${isOpen ? 'open' : 'collapsed'}`}>
            <div className="sidebar-header d-flex justify-content-between align-items-center" style={{ height: 'auto', minHeight: '60px', overflow: 'visible' }}>
                <div className="logo mb-0 pb-0">
                    <span className="logo-short">Z<span className="logo-accent">B</span></span>

                    <span className="logo-full">
                        <img src={logo} alt="Logo" style={{ height: '35px', objectFit: 'contain' }} />
                    </span>
                </div>
                {/* Close Button for Mobile */}
                <button
                    className="btn btn-link text-dark d-lg-none p-0"
                    onClick={onClose}
                    style={{ fontSize: '1.5rem', lineHeight: 1 }}
                >
                    <X size={24} />
                </button>
            </div>

            <div className="sidebar-menu">
                {renderMenu(menuItems[role] || [])}
            </div>
        </div>
    );
};

export default Sidebar;

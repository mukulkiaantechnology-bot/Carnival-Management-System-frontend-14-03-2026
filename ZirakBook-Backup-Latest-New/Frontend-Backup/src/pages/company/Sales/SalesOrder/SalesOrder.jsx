import React, { useState, useRef } from 'react';
import {
    Search, Plus, Pencil, Trash2, X, ChevronDown,
    FileText, ShoppingCart, Truck, Receipt, CreditCard,
    CheckCircle2, Clock, ArrowRight, Download, Send, Printer,
    FileSearch, Eye
} from 'lucide-react';
import './SalesOrder.css';
import salesOrderService from '../../../../api/salesOrderService';
import salesQuotationService from '../../../../api/salesQuotationService';
import customerService from '../../../../api/customerService';
import productService from '../../../../api/productService';
import warehouseService from '../../../../api/warehouseService';
import servicesService from '../../../../api/servicesService';
import companyService from '../../../../api/companyService';
import GetCompanyId from '../../../../api/GetCompanyId';
import { CompanyContext } from '../../../../context/CompanyContext';

const SalesOrder = () => {
    // --- State Management ---
    const { formatCurrency } = React.useContext(CompanyContext);
    const [salesOrders, setSalesOrders] = useState([]);
    const [activeQuotations, setActiveQuotations] = useState([]);
    const [customers, setCustomers] = useState([]);
    const [allProducts, setAllProducts] = useState([]);
    const [allWarehouses, setAllWarehouses] = useState([]);
    const [allServices, setAllServices] = useState([]);
    const [loading, setLoading] = useState(true);

    const [showAddModal, setShowAddModal] = useState(false);
    const [editingId, setEditingId] = useState(null);
    const [isViewMode, setIsViewMode] = useState(false);
    const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
    const [deleteId, setDeleteId] = useState(null);

    const [creationMode, setCreationMode] = useState('direct'); // 'direct' or 'linked'
    const [showQuotationSelect, setShowQuotationSelect] = useState(false);
    const [selectedQuotation, setSelectedQuotation] = useState(null);

    // Form State
    const [companyDetails, setCompanyDetails] = useState({
        name: 'Zirak Books', address: '123 Business Avenue, Suite 404', email: 'info@zirakbooks.com', phone: '123-456-7890', notes: '', terms: ''
    });
    const [orderMeta, setOrderMeta] = useState({
        manualNo: '', date: new Date().toISOString().split('T')[0], deliveryDate: ''
    });
    const [customerId, setCustomerId] = useState('');
    const [customerDetails, setCustomerDetails] = useState({ address: '', email: '', phone: '' });
    const [items, setItems] = useState([
        { id: Date.now(), productId: '', serviceId: '', warehouseId: '', qty: 1, rate: 0, tax: 0, discount: 0, total: 0, description: '' }
    ]);
    const [notes, setNotes] = useState('');
    const [terms, setTerms] = useState('');

    // Fetch Initial Data
    React.useEffect(() => {
        fetchData();
        fetchDropdowns();
        fetchCompanyDetails();
    }, []);

    const fetchCompanyDetails = async () => {
        try {
            const companyId = GetCompanyId();
            if (companyId) {
                const res = await companyService.getById(companyId);
                const data = res.data;
                setCompanyDetails({
                    name: data.name || 'Zirak Books',
                    address: data.address || '123 Business Avenue, Suite 404',
                    email: data.email || 'info@zirakbooks.com',
                    phone: data.phone || '123-456-7890',
                    logo: data.logo || null,
                    notes: data.notes || '',
                    terms: data.terms || ''
                });
                setNotes(data.notes || '');
                setTerms(data.terms || '');
            }
        } catch (error) {
            console.error('Error fetching company details:', error);
        }
    };

    const fetchData = async () => {
        try {
            setLoading(true);
            const companyId = GetCompanyId();
            const response = await salesOrderService.getAll(companyId);
            if (response.data.success) {
                setSalesOrders(response.data.data);
            }
        } catch (error) {
            console.error('Error fetching sales orders:', error);
        } finally {
            setLoading(false);
        }
    };

    const fetchDropdowns = async () => {
        try {
            const companyId = GetCompanyId();
            const [custRes, prodRes, whRes, servRes, quoRes] = await Promise.all([
                customerService.getAll(companyId),
                productService.getAll(companyId),
                warehouseService.getAll(companyId),
                servicesService.getAll(companyId),
                salesQuotationService.getAll(companyId)
            ]);
            if (custRes.data.success) setCustomers(custRes.data.data);
            if (prodRes.data.success) setAllProducts(prodRes.data.data);
            if (whRes.data.success) setAllWarehouses(whRes.data.data);
            if (servRes.data.success) setAllServices(servRes.data.data);
            if (quoRes.data.success) {
                // Only show quotations that are ACTIVE or SENT (not yet Order/Invoice)
                setActiveQuotations(quoRes.data.data.filter(q => q.status !== 'ACCEPTED'));
            }
        } catch (error) {
            console.error('Error fetching dropdowns:', error);
        }
    };

    const salesProcess = [
        { id: 'quotation', label: 'Quotation', icon: FileText, status: 'completed' },
        { id: 'sales-order', label: 'Sales Order', icon: ShoppingCart, status: 'active' },
        { id: 'delivery', label: 'Delivery', icon: Truck, status: 'pending' },
        { id: 'invoice', label: 'Invoice', icon: Receipt, status: 'pending' },
        { id: 'payment', label: 'Payment', icon: CreditCard, status: 'pending' },
    ];

    const sampleQuotations = [
        {
            id: 'QUO-2024-001', customer: 'Acme Corp', date: '2024-01-10', items: [
                { id: 101, name: 'Web Dev Package', warehouse: 'Main', qty: 1, rate: 3000, tax: 18, discount: 0, total: 3540 },
                { id: 102, name: 'SEO Setup', warehouse: 'Service', qty: 1, rate: 1000, tax: 18, discount: 0, total: 1180 }
            ]
        }
    ];

    // --- Actions ---
    const resetForm = () => {
        setEditingId(null);
        setIsViewMode(false);
        setSelectedQuotation(null);
        setCustomerId('');
        setCustomerDetails({ address: '', email: '', phone: '' });
        setItems([{ id: Date.now(), productId: '', serviceId: '', warehouseId: '', qty: 1, rate: 0, tax: 0, discount: 0, total: 0, description: '' }]);
        setOrderMeta({ manualNo: '', date: new Date().toISOString().split('T')[0], deliveryDate: '' });
        setNotes(companyDetails.notes || '');
        setTerms(companyDetails.terms || '');
        setCreationMode('direct');
        setShowAddModal(false);
    };

    const handleAddNew = () => {
        resetForm();
        setIsViewMode(false);
        setShowAddModal(true);
    };

    const handleEdit = async (id) => {
        await populateOrder(id, false);
    };

    const handleView = async (id) => {
        await populateOrder(id, true);
    };

    const populateOrder = async (id, viewOnly) => {
        try {
            const companyId = GetCompanyId();
            const response = await salesOrderService.getById(id, companyId);
            if (response.data.success) {
                const orderToEdit = response.data.data;
                resetForm();
                setEditingId(id);
                setIsViewMode(viewOnly);
                setCustomerId(orderToEdit.customerId);
                setCustomerDetails({
                    address: orderToEdit.customer?.billingAddress || '',
                    email: orderToEdit.customer?.email || '',
                    phone: orderToEdit.customer?.phone || ''
                });
                setOrderMeta({
                    manualNo: orderToEdit.manualNo || '',
                    date: orderToEdit.date.split('T')[0],
                    deliveryDate: orderToEdit.expectedDate ? orderToEdit.expectedDate.split('T')[0] : ''
                });
                setItems((orderToEdit.salesorderitem || orderToEdit.items || []).map(item => ({
                    id: item.id,
                    productId: item.productId || '',
                    serviceId: item.serviceId || '',
                    warehouseId: item.warehouseId || '',
                    description: item.description,
                    qty: item.quantity,
                    rate: item.rate,
                    tax: item.taxRate,
                    discount: item.discount || 0,
                    total: item.amount
                })));
                setCreationMode(orderToEdit.quotationId ? 'linked' : 'direct');
                setNotes(orderToEdit.notes || '');
                setTerms(orderToEdit.terms || '');
                setShowAddModal(true);
            }
        } catch (error) {
            console.error('Error loading order:', error);
        }
    };

    const handleDelete = (id) => {
        setDeleteId(id);
        setShowDeleteConfirm(true);
    };

    const confirmDelete = async () => {
        try {
            const companyId = GetCompanyId();
            const response = await salesOrderService.delete(deleteId, companyId);
            if (response.data.success) {
                fetchData();
                setShowDeleteConfirm(false);
                setDeleteId(null);
            }
        } catch (error) {
            console.error('Error deleting order:', error);
        }
    };

    const handleSave = async () => {
        try {
            const companyId = GetCompanyId();
            const data = {
                orderNumber: editingId ? salesOrders.find(o => o.id === editingId)?.orderNumber : `SO-${Date.now()}`,
                manualNo: orderMeta.manualNo,
                date: orderMeta.date,
                expectedDate: orderMeta.deliveryDate,
                customerId: parseInt(customerId),
                companyId: companyId,
                quotationId: selectedQuotation ? parseInt(selectedQuotation.id) : null,
                notes: notes,
                terms: terms,
                items: items.map(item => ({
                    productId: item.productId ? parseInt(item.productId) : null,
                    serviceId: item.serviceId ? parseInt(item.serviceId) : null,
                    warehouseId: item.warehouseId ? parseInt(item.warehouseId) : null,
                    description: item.description || (item.productId ? allProducts.find(p => p.id === parseInt(item.productId))?.name : ''),
                    quantity: parseFloat(item.qty),
                    rate: parseFloat(item.rate),
                    discount: parseFloat(item.discount) || 0,
                    taxRate: parseFloat(item.tax)
                }))
            };

            let response;
            if (editingId) {
                response = await salesOrderService.update(editingId, data, companyId);
            } else {
                response = await salesOrderService.create(data);
            }

            if (response.data.success) {
                fetchData();
                setShowAddModal(false);
            }
        } catch (error) {
            console.error('Error saving sales order:', error);
        }
    };


    const handleCreationModeToggle = (mode) => {
        setCreationMode(mode);
        if (mode === 'linked') {
            setShowQuotationSelect(true);
        } else {
            // Reset items but keep customer info if already filled manually? 
            // Ideally reset to clean slate for direct
            if (!editingId) resetForm();
            setCreationMode('direct');
        }
    };

    const handleSelectQuotation = (quo) => {
        setSelectedQuotation(quo);
        setCustomerId(quo.customerId);
        setCustomerDetails({
            address: quo.customer?.billingAddress || '',
            email: quo.customer?.email || '',
            phone: quo.customer?.phone || ''
        });
        const sourceItems = quo.salesquotationitem || quo.items || [];
        setItems(sourceItems.map(item => ({
            id: Date.now() + Math.random(),
            productId: item.productId || '',
            serviceId: item.serviceId || '',
            warehouseId: item.warehouseId || '',
            description: item.description,
            qty: item.quantity,
            rate: item.rate,
            tax: item.taxRate,
            total: item.amount
        })));
        setShowQuotationSelect(false);
    };

    const addItem = () => {
        setItems([...items, { id: Date.now(), productId: '', serviceId: '', description: '', warehouseId: '', qty: 1, rate: 0, tax: 0, discount: 0, total: 0 }]);
    };

    const removeItem = (id) => {
        if (items.length > 1) {
            setItems(items.filter(item => item.id !== id));
        }
    };

    const updateItem = (id, field, value) => {
        setItems(prevItems => prevItems.map(item => {
            if (item.id === id) {
                const updatedItem = { ...item, [field]: value };
                if (['qty', 'rate', 'tax', 'discount'].includes(field)) {
                    const qty = parseFloat(updatedItem.qty) || 0;
                    const rate = parseFloat(updatedItem.rate) || 0;
                    const tax = parseFloat(updatedItem.tax) || 0;
                    const discount = parseFloat(updatedItem.discount) || 0;

                    const subtotal = qty * rate;
                    const discountAmount = discount;
                    const taxable = subtotal - discountAmount;
                    const taxAmount = (taxable * tax) / 100;

                    updatedItem.total = taxable + taxAmount;
                }
                return updatedItem;
            }
            return item;
        }));
    };

    const calculateTotals = () => {
        return items.reduce((acc, item) => {
            const qty = parseFloat(item.qty) || 0;
            const rate = parseFloat(item.rate) || 0;
            const discount = parseFloat(item.discount) || 0;
            const subtotal = qty * rate;

            acc.subTotal += subtotal;
            acc.discount += discount;
            acc.total += item.total;
            acc.tax += (item.total - (subtotal - discount));
            return acc;
        }, { subTotal: 0, tax: 0, discount: 0, total: 0 });
    };

    const totals = calculateTotals();

    return (
        <div className="SalesOrder-wrapper SalesOrder-quotation-page">
            <div className="SalesOrder-page-header">
                <div>
                    <h1 className="SalesOrder-page-title">Sales Order</h1>
                    <p className="SalesOrder-page-subtitle">Track and confirm customer orders</p>
                </div>
                <button className="SalesOrder-btn-add" onClick={handleAddNew}>
                    <Plus size={18} className="SalesOrder-mr-2" /> New Sales Order
                </button>
            </div>

            <div className="SalesOrder-process-tracker-card">
                <div className="SalesOrder-tracker-wrapper">
                    {salesProcess.map((step, index) => (
                        <React.Fragment key={step.id}>
                            <div className={`SalesOrder-tracker-step SalesOrder-${step.status}`}>
                                <div className="SalesOrder-step-icon-wrapper">
                                    <step.icon size={20} />
                                    {step.status === 'completed' && <CheckCircle2 className="SalesOrder-status-badge" size={14} />}
                                    {step.status === 'active' && <Clock className="SalesOrder-status-badge" size={14} />}
                                </div>
                                <span className="SalesOrder-step-label">{step.label}</span>
                            </div>
                            {index < salesProcess.length - 1 && (
                                <div className={`SalesOrder-tracker-divider ${salesProcess[index + 1].status !== 'pending' ? 'SalesOrder-active' : ''}`}>
                                    <ArrowRight size={16} />
                                </div>
                            )}
                        </React.Fragment>
                    ))}
                </div>
            </div >

            <div className="SalesOrder-table-card SalesOrder-mt-6">
                <div className="SalesOrder-table-container">
                    <table className="SalesOrder-quotation-table">
                        <thead>
                            <tr>
                                <th>ORDER ID</th>
                                <th>CUSTOMER</th>
                                <th>SOURCE</th>
                                <th>DATE</th>
                                <th>AMOUNT</th>
                                <th>STATUS</th>
                                <th className="SalesOrder-text-right">ACTION</th>
                            </tr>
                        </thead>
                        <tbody>
                            {salesOrders.map(order => (
                                <tr key={order.id}>
                                    <td className="SalesOrder-font-bold SalesOrder-text-blue-600">{order.orderNumber}</td>
                                    <td>{order.customer?.name}</td>
                                    <td><span className="SalesOrder-source-badge">{order.quotationId ? 'Quotation' : 'Direct'}</span></td>
                                    <td>{new Date(order.date).toLocaleDateString()}</td>
                                    <td className="SalesOrder-font-bold">{formatCurrency(order.totalAmount)}</td>
                                    <td><span className={`SalesOrder-sales-order-status-pill SalesOrder-${(order.status || 'Pending').toLowerCase().replace(/\s+/g, '-')}`}>{order.status || 'Pending'}</span></td>
                                    <td>
                                        <div className="SalesOrder-sales-action-buttons">
                                            <button className="SalesOrder-sales-order-action-btn SalesOrder-view" onClick={() => handleView(order.id)} title="View"><Eye size={16} /></button>
                                            <button className="SalesOrder-sales-order-action-btn SalesOrder-edit" onClick={() => handleEdit(order.id)} title="Edit"><Pencil size={16} /></button>
                                            <button className="SalesOrder-sales-order-action-btn SalesOrder-delete" onClick={() => handleDelete(order.id)} title="Delete"><Trash2 size={16} /></button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div >

            {/* Premium Create/Edit Modal */}
            {
                showAddModal && (
                    <div className="SalesOrder-modal-overlay">
                        <div className="SalesOrder-modal-content SalesOrder-quotation-form-modal">
                            <div className="SalesOrder-modal-header-simple">
                                <h2 className="SalesOrder-text-xl SalesOrder-font-bold SalesOrder-text-gray-800">
                                    {isViewMode ? 'View Sales Order' : editingId ? 'Edit Sales Order' : 'New Sales Order'}
                                </h2>
                                <button className="SalesOrder-close-btn-simple" onClick={() => setShowAddModal(false)}>
                                    <X size={24} />
                                </button>
                            </div>

                            <div className="SalesOrder-modal-body-scrollable">
                                {/* Mode Selection */}
                                <div className="SalesOrder-creation-type-selector SalesOrder-mb-6">
                                    <button
                                        className={`SalesOrder-mode-btn ${creationMode === 'direct' ? 'SalesOrder-active' : ''}`}
                                        onClick={() => handleCreationModeToggle('direct')}
                                    >
                                        Direct Order
                                    </button>
                                    <button
                                        className={`SalesOrder-mode-btn ${creationMode === 'linked' ? 'SalesOrder-active' : ''}`}
                                        onClick={() => handleCreationModeToggle('linked')}
                                    >
                                        From Quotation
                                    </button>
                                </div>

                                {/* Quotation Selection List (Conditional) */}
                                {creationMode === 'linked' && showQuotationSelect && !selectedQuotation && (
                                    <div className="SalesOrder-quotation-link-container">
                                        <h3 className="SalesOrder-text-sm SalesOrder-font-bold SalesOrder-mb-3 SalesOrder-text-gray-700">Select Quotation</h3>
                                        <div className="SalesOrder-quote-grid">
                                            {activeQuotations.map(quo => (
                                                <div key={quo.id} className="SalesOrder-quote-link-card" onClick={() => handleSelectQuotation(quo)}>
                                                    <div className="SalesOrder-q-card-header">
                                                        <span className="SalesOrder-q-id SalesOrder-text-blue-600 SalesOrder-font-bold">{quo.quotationNumber}</span>
                                                        <span className="SalesOrder-q-date SalesOrder-text-gray-400 SalesOrder-text-xs">{new Date(quo.date).toLocaleDateString()}</span>
                                                    </div>
                                                    <div className="SalesOrder-q-card-body SalesOrder-mt-2">
                                                        <span className="SalesOrder-q-customer SalesOrder-font-semibold">{quo.customer?.name}</span>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                {/* Top Section: Company & Document Meta */}
                                <div className="SalesOrder-form-section-grid">
                                    <div className="SalesOrder-company-section">
                                        <div className="SalesOrder-logo-upload-box">
                                            {companyDetails.logo ? (
                                                <img src={companyDetails.logo} alt="Company Logo" style={{ maxWidth: '100%', maxHeight: '50px', objectFit: 'contain' }} />
                                            ) : (
                                                <h1 className="SalesOrder-company-logo-text">BOOK</h1>
                                            )}
                                        </div>
                                        <div className="SalesOrder-company-inputs">
                                            <input type="text" className="SalesOrder-full-width-input SalesOrder-user-editable"
                                                value={companyDetails.name} onChange={(e) => setCompanyDetails({ ...companyDetails, name: e.target.value })} />
                                            <input type="text" className="SalesOrder-full-width-input SalesOrder-user-editable"
                                                value={companyDetails.address} onChange={(e) => setCompanyDetails({ ...companyDetails, address: e.target.value })} />
                                            <input type="text" className="SalesOrder-full-width-input SalesOrder-user-editable"
                                                value={companyDetails.email} onChange={(e) => setCompanyDetails({ ...companyDetails, email: e.target.value })} />
                                        </div>
                                    </div>
                                    <div className="SalesOrder-meta-section">
                                        <div className="SalesOrder-meta-row">
                                            <label>Order No.</label>
                                            <input type="text" value={editingId ? salesOrders.find(o => o.id === editingId).orderNumber : "SO-2024-NEW"} disabled className="SalesOrder-meta-input SalesOrder-disabled" />
                                        </div>
                                        <div className="SalesOrder-meta-row">
                                            <label>Manual Ref</label>
                                            <input type="text" placeholder="e.g. PO-REF-001"
                                                value={orderMeta.manualNo} onChange={(e) => setOrderMeta({ ...orderMeta, manualNo: e.target.value })}
                                                className="SalesOrder-meta-input" />
                                        </div>
                                        <div className="SalesOrder-meta-row">
                                            <label>Order Date</label>
                                            <input type="date"
                                                value={orderMeta.date} onChange={(e) => setOrderMeta({ ...orderMeta, date: e.target.value })}
                                                className="SalesOrder-meta-input" />
                                        </div>
                                        <div className="SalesOrder-meta-row">
                                            <label>Delivery Due</label>
                                            <input type="date"
                                                value={orderMeta.deliveryDate} onChange={(e) => setOrderMeta({ ...orderMeta, deliveryDate: e.target.value })}
                                                className="SalesOrder-meta-input" />
                                        </div>
                                        <div className="SalesOrder-status-indicator" style={{ color: '#3b82f6', borderColor: '#3b82f6' }}>
                                            SALES ORDER
                                        </div>
                                    </div>
                                </div>

                                <hr className="SalesOrder-divider" />

                                {/* Customer Section */}
                                <div className="SalesOrder-customer-section">
                                    <div className="SalesOrder-form-group mb-2">
                                        <label className="SalesOrder-form-label-sm">Bill To</label>
                                        <select
                                            className="SalesOrder-form-select-large"
                                            value={customerId}
                                            onChange={(e) => {
                                                const id = e.target.value;
                                                setCustomerId(id);
                                                const c = customers.find(cust => cust.id === parseInt(id));
                                                if (c) {
                                                    setCustomerDetails({
                                                        address: c.billingAddress || '',
                                                        email: c.email || '',
                                                        phone: c.phone || ''
                                                    });
                                                }
                                            }}
                                            disabled={creationMode === 'linked'}
                                        >
                                            <option value="">Select Customer...</option>
                                            {customers.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                                        </select>
                                    </div>
                                    <div className="SalesOrder-customer-details-grid">
                                        <input type="text" placeholder="Billing Address" className="SalesOrder-detail-input"
                                            disabled={isViewMode}
                                            value={customerDetails.address} onChange={(e) => setCustomerDetails({ ...customerDetails, address: e.target.value })} />
                                        <input type="email" placeholder="Email Address" className="SalesOrder-detail-input"
                                            disabled={isViewMode}
                                            value={customerDetails.email} onChange={(e) => setCustomerDetails({ ...customerDetails, email: e.target.value })} />
                                        <input type="tel" placeholder="Phone Number" className="SalesOrder-detail-input"
                                            disabled={isViewMode}
                                            value={customerDetails.phone} onChange={(e) => setCustomerDetails({ ...customerDetails, phone: e.target.value })} />
                                    </div>
                                </div>

                                {creationMode === 'linked' && selectedQuotation && (
                                    <div className="SalesOrder-linked-indicator mb-6">
                                        <FileSearch size={14} /> Linked to Quotation: <strong>{selectedQuotation.quotationNumber || selectedQuotation.id}</strong>
                                        <button className="SalesOrder-change-link-btn" onClick={() => setShowQuotationSelect(true)}>Change</button>
                                    </div>
                                )}

                                {/* Items Table */}
                                <div className="SalesOrder-items-section-new">
                                    {creationMode === 'direct' && (
                                        <button className="SalesOrder-btn-add-row" onClick={addItem}>
                                            <Plus size={14} /> Add Line Item
                                        </button>
                                    )}
                                    <div className="SalesOrder-table-responsive">
                                        <table className="SalesOrder-new-items-table">
                                            <thead>
                                                <tr>
                                                    <th style={{ width: '25%' }}>ITEM NAME</th>
                                                    <th style={{ width: '15%' }}>WAREHOUSE</th>
                                                    <th style={{ width: '10%' }}>QTY</th>
                                                    <th style={{ width: '12%' }}>RATE</th>
                                                    <th style={{ width: '10%' }}>TAX %</th>
                                                    <th style={{ width: '10%' }}>DISC.</th>
                                                    <th style={{ width: '12%' }}>AMOUNT</th>
                                                    <th style={{ width: '6%' }}></th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {items.map(item => (
                                                    <tr key={item.id}>
                                                        <td>
                                                            <select className="SalesOrder-full-width-input"
                                                                value={item.productId ? `p-${item.productId}` : item.serviceId ? `s-${item.serviceId}` : ''}
                                                                disabled={isViewMode || creationMode === 'linked'}
                                                                onChange={(e) => {
                                                                    const val = e.target.value;
                                                                    if (val.startsWith('p-')) {
                                                                        const pId = val.split('-')[1];
                                                                        const p = allProducts.find(x => x.id === parseInt(pId));
                                                                        if (p) {
                                                                            updateItem(item.id, 'productId', pId);
                                                                            updateItem(item.id, 'serviceId', '');
                                                                            updateItem(item.id, 'rate', p.sellPrice || 0);
                                                                            updateItem(item.id, 'tax', p.taxRate || 0);
                                                                            if (!item.description) updateItem(item.id, 'description', p.name);
                                                                        }
                                                                    } else if (val.startsWith('s-')) {
                                                                        const sId = val.split('-')[1];
                                                                        const s = allServices.find(x => x.id === parseInt(sId));
                                                                        if (s) {
                                                                            updateItem(item.id, 'serviceId', sId);
                                                                            updateItem(item.id, 'productId', '');
                                                                            updateItem(item.id, 'rate', s.price || 0);
                                                                            if (!item.description) updateItem(item.id, 'description', s.name);
                                                                        }
                                                                    }
                                                                }}>
                                                                <option value="">Select Product/Service...</option>
                                                                <optgroup label="Products">
                                                                    {allProducts.map(p => <option key={`p-${p.id}`} value={`p-${p.id}`}>{p.name}</option>)}
                                                                </optgroup>
                                                                <optgroup label="Services">
                                                                    {allServices.map(s => <option key={`s-${s.id}`} value={`s-${s.id}`}>{s.name}</option>)}
                                                                </optgroup>
                                                            </select>
                                                        </td>
                                                        <td>
                                                            <select className="SalesOrder-full-width-input" value={item.warehouseId} onChange={(e) => updateItem(item.id, 'warehouseId', e.target.value)}>
                                                                <option value="">Select Warehouse...</option>
                                                                {allWarehouses.map(w => <option key={w.id} value={w.id}>{w.name}</option>)}
                                                            </select>
                                                        </td>
                                                        <td>
                                                            <input type="number" value={item.qty} disabled={creationMode === 'linked'}
                                                                onChange={(e) => updateItem(item.id, 'qty', e.target.value)}
                                                                className="SalesOrder-qty-input" />
                                                        </td>
                                                        <td>
                                                            <input type="number" value={item.rate} disabled={creationMode === 'linked'}
                                                                onChange={(e) => updateItem(item.id, 'rate', e.target.value)}
                                                                className="SalesOrder-rate-input" />
                                                        </td>
                                                        <td>
                                                            <input type="number" value={item.tax} disabled={creationMode === 'linked'}
                                                                onChange={(e) => updateItem(item.id, 'tax', e.target.value)}
                                                                className="SalesOrder-tax-input" />
                                                        </td>
                                                        <td>
                                                            <input type="number" value={item.discount} disabled={creationMode === 'linked'}
                                                                onChange={(e) => updateItem(item.id, 'discount', e.target.value)}
                                                                className="SalesOrder-discount-input" />
                                                        </td>
                                                        <td>
                                                            <input type="text" value={formatCurrency(item.total || 0)} disabled className="SalesOrder-amount-input SalesOrder-disabled" />
                                                        </td>
                                                        <td className="SalesOrder-text-center">
                                                            {creationMode === 'direct' && !isViewMode && (
                                                                <button className="SalesOrder-btn-delete-row" onClick={() => removeItem(item.id)}>
                                                                    <Trash2 size={16} />
                                                                </button>
                                                            )}
                                                        </td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>

                                {/* Totals Section */}
                                <div className="SalesOrder-totals-layout">
                                    <div className="SalesOrder-totals-spacer"></div>
                                    <div className="SalesOrder-totals-box">
                                        <div className="SalesOrder-t-row">
                                            <span>Sub Total:</span>
                                            <span>{formatCurrency(totals.subTotal)}</span>
                                        </div>
                                        <div className="SalesOrder-t-row">
                                            <span>Discount:</span>
                                            <span className="SalesOrder-text-red-500">-{formatCurrency(totals.discount)}</span>
                                        </div>
                                        <div className="SalesOrder-t-row">
                                            <span>Tax Total:</span>
                                            <span>{formatCurrency(totals.tax)}</span>
                                        </div>
                                        <div className="SalesOrder-t-row SalesOrder-total">
                                            <span>Grand Total:</span>
                                            <span>{formatCurrency(totals.total)}</span>
                                        </div>
                                    </div>
                                </div>

                                {/* Footer Grid */}
                                <div className="SalesOrder-form-footer-grid">
                                    <div className="SalesOrder-notes-col">
                                        <label className="SalesOrder-section-label">Notes</label>
                                        <textarea className="SalesOrder-notes-area SalesOrder-h-32"
                                            disabled={isViewMode}
                                            value={notes} onChange={(e) => setNotes(e.target.value)}></textarea>
                                    </div>
                                    <div className="SalesOrder-terms-col">
                                        <label className="SalesOrder-section-label">Terms & Conditions</label>
                                        <textarea className="SalesOrder-terms-area SalesOrder-h-32"
                                            disabled={isViewMode}
                                            value={terms} onChange={(e) => setTerms(e.target.value)}></textarea>
                                    </div>
                                </div>

                            </div>
                            <div className="SalesOrder-modal-footer-simple">
                                <button className="SalesOrder-btn-plain" onClick={() => setShowAddModal(false)}>Close</button>
                                {!isViewMode && (
                                    <button className="SalesOrder-btn-primary-green" onClick={handleSave}>
                                        {editingId ? 'Update Order' : 'Confirm Order'}
                                    </button>
                                )}
                            </div>
                        </div >
                    </div >
                )
            }

            {/* Delete Confirmation Modal - User Design Match */}
            {
                showDeleteConfirm && (
                    <div className="SalesOrder-modal-overlay">
                        <div className="SalesOrder-delete-confirmation-box">
                            <div className="SalesOrder-delete-modal-header">
                                <h3 className="SalesOrder-delete-modal-title">Delete Order?</h3>
                                <button className="SalesOrder-delete-close-btn" onClick={() => setShowDeleteConfirm(false)}>
                                    <X size={20} />
                                </button>
                            </div>
                            <div className="SalesOrder-delete-modal-body">
                                <p>Are you sure you want to delete this sales order? This action cannot be undone.</p>
                            </div>
                            <div className="SalesOrder-delete-modal-footer">
                                <button className="SalesOrder-btn-cancel" onClick={() => setShowDeleteConfirm(false)}>Cancel</button>
                                <button className="SalesOrder-btn-delete-confirm" onClick={confirmDelete}>Delete</button>
                            </div>
                        </div>
                    </div>
                )
            }
        </div >
    );
};

export default SalesOrder;

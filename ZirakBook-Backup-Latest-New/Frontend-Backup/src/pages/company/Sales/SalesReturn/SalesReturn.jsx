import React, { useState } from 'react';
import {
    Search, Plus, Filter, Download,
    Eye, Pencil, Trash2, X, AlertCircle,
    FileText, CheckCircle2, Clock, Receipt,
    AlertTriangle, Calendar, User, MapPin, Printer
} from 'lucide-react';
import './SalesReturn.css';
import salesReturnService from '../../../../api/salesReturnService';
import salesInvoiceService from '../../../../api/salesInvoiceService';
import customerService from '../../../../api/customerService';
import productService from '../../../../api/productService';
import warehouseService from '../../../../api/warehouseService';
import companyService from '../../../../api/companyService';
import GetCompanyId from '../../../../api/GetCompanyId';
import { CompanyContext } from '../../../../context/CompanyContext';

const SalesReturn = () => {
    // --- State Management ---
    const { formatCurrency } = React.useContext(CompanyContext);
    const [returns, setReturns] = useState([]);
    const [invoices, setInvoices] = useState([]);
    const [filteredInvoices, setFilteredInvoices] = useState([]);
    const [selectedInvoiceDetails, setSelectedInvoiceDetails] = useState(null);
    const [invoiceProducts, setInvoiceProducts] = useState([]); // Products from selected invoice
    const [customers, setCustomers] = useState([]);
    const [allProducts, setAllProducts] = useState([]);
    const [allWarehouses, setAllWarehouses] = useState([]);
    const [loading, setLoading] = useState(true);

    const totalReturns = returns.length;
    const totalAmount = returns.reduce((sum, r) => sum + (r.totalAmount || 0), 0);
    const pendingReturns = returns.filter(r => r.status === 'Pending').length;

    const summaryCards = [
        { id: 1, label: 'Total Returns', value: totalReturns, icon: FileText, color: 'blue' },
        { id: 2, label: 'Total Amount', value: formatCurrency(totalAmount), icon: Receipt, color: 'green' },
        { id: 3, label: 'Pending Approval', value: pendingReturns, icon: Clock, color: 'orange' },
        { id: 4, label: 'Rejected', value: returns.filter(r => r.status === 'Rejected').length, icon: X, color: 'red' },
    ];

    const [showAddModal, setShowAddModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [showViewModal, setShowViewModal] = useState(false);
    const [selectedReturn, setSelectedReturn] = useState(null);

    // Initial Fetch
    React.useEffect(() => {
        fetchData();
        fetchDropdowns();
        fetchCompanyDetails();
    }, []);

    const [companyDetails, setCompanyDetails] = useState({
        name: 'Zirak Books', address: '123 Business Avenue, Suite 404', email: 'info@zirakbooks.com', phone: '123-456-7890'
    });

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
                    logo: data.logo || null
                });
            }
        } catch (error) {
            console.error('Error fetching company details:', error);
        }
    };

    const fetchData = async () => {
        try {
            setLoading(true);
            const companyId = GetCompanyId();
            const response = await salesReturnService.getAll(companyId);
            if (response.data.success) {
                setReturns(response.data.data);
            }
        } catch (error) {
            console.error('Error fetching returns:', error);
        } finally {
            setLoading(false);
        }
    };

    const fetchDropdowns = async () => {
        try {
            const companyId = GetCompanyId();

            const [custRes, prodRes, whRes, invRes] = await Promise.all([
                customerService.getAll(companyId),
                productService.getAll(companyId),
                warehouseService.getAll(companyId),
                salesInvoiceService.getAll(companyId)
            ]);
            if (custRes.data.success) setCustomers(custRes.data.data);
            if (prodRes.data.success) setAllProducts(prodRes.data.data);
            if (whRes.data.success) setAllWarehouses(whRes.data.data);
            if (invRes.data.success) setInvoices(invRes.data.data);
        } catch (error) {
            console.error('Error fetching dropdowns:', error);
        }
    };

    // Form State
    const [formData, setFormData] = useState({
        manualVoucherNo: '',
        customerId: '',
        returnNo: '',
        invoiceId: '',
        date: new Date().toISOString().split('T')[0],
        returnType: 'Sales Return',
        warehouseId: '',
        reason: '',
        narration: '',
        items: []
    });

    const resetForm = () => {
        setFormData({
            manualVoucherNo: '',
            customerId: '',
            returnNo: '',
            invoiceId: '',
            date: new Date().toISOString().split('T')[0],
            returnType: 'Sales Return',
            warehouseId: '',
            reason: '',
            narration: '',
            items: []
        });
        setSelectedInvoiceDetails(null);
        setInvoiceProducts([]);
        setFilteredInvoices([]);
    }

    // Filter invoices when customer is selected
    React.useEffect(() => {
        if (formData.customerId) {
            const customerInvoices = invoices.filter(inv => inv.customerId === parseInt(formData.customerId));
            setFilteredInvoices(customerInvoices);
            // Reset invoice selection when customer changes
            if (formData.invoiceId) {
                const currentInvoice = customerInvoices.find(inv => inv.id === parseInt(formData.invoiceId));
                if (!currentInvoice) {
                    setFormData(prev => ({ ...prev, invoiceId: '', items: [] }));
                    setSelectedInvoiceDetails(null);
                    setInvoiceProducts([]);
                }
            }
        } else {
            setFilteredInvoices([]);
            setFormData(prev => ({ ...prev, invoiceId: '', items: [] }));
            setSelectedInvoiceDetails(null);
            setInvoiceProducts([]);
        }
    }, [formData.customerId, invoices]);

    // Handle invoice selection - load invoice details and items
    const handleInvoiceSelect = async (invoiceId, isEditMode = false) => {
        if (!invoiceId) {
            setSelectedInvoiceDetails(null);
            setInvoiceProducts([]);
            if (!isEditMode) setFormData(prev => ({ ...prev, items: [] }));
            return;
        }

        try {
            const companyId = GetCompanyId();
            // Fetch invoice with items
            const response = await salesInvoiceService.getById(invoiceId, companyId);
            if (response.data.success) {
                const invoice = response.data.data;
                // Normalize items from backend relation (invoiceitem) to items
                invoice.items = invoice.invoiceitem || invoice.items || [];
                setSelectedInvoiceDetails(invoice);

                // Extract products from invoice items
                if (invoice.items && invoice.items.length > 0) {
                    const productsFromInvoice = invoice.items
                        .map(invItem => {
                            // First try to use the product/service relation if available
                            if (invItem.product) {
                                return invItem.product;
                            }
                            if (invItem.service) {
                                // Services might not be in allProducts, so create a mock product object
                                return {
                                    id: invItem.service.id,
                                    name: invItem.service.name,
                                    sellPrice: invItem.rate || 0,
                                    taxRate: invItem.taxRate || 0
                                };
                            }
                            // Fallback: find in allProducts by ID
                            const prodId = invItem.productId || invItem.serviceId;
                            if (prodId) {
                                return allProducts.find(p => p.id === parseInt(prodId));
                            }
                            return null;
                        })
                        .filter(p => p !== null && p !== undefined);

                    // Remove duplicates
                    const uniqueProducts = productsFromInvoice.filter((product, index, self) =>
                        index === self.findIndex(p => p.id === product.id)
                    );
                    setInvoiceProducts(uniqueProducts);
                } else {
                    setInvoiceProducts([]);
                }

                // Auto-populate return items from invoice items
                if (!isEditMode && invoice.items && invoice.items.length > 0) {
                    const returnItems = invoice.items.map((item, idx) => {
                        // Calculate amount: (qty * rate - discount) * (1 + taxRate/100)
                        const qty = parseFloat(item.quantity || 0);
                        const rate = parseFloat(item.rate || 0);
                        const discount = parseFloat(item.discount || 0);
                        const taxRate = parseFloat(item.taxRate || 0);
                        const taxableAmount = (qty * rate) - discount;
                        const taxAmount = taxableAmount * (taxRate / 100);
                        const itemAmount = taxableAmount + taxAmount;

                        // Get productId - try multiple sources and ensure it's a string
                        let finalProductId = '';
                        if (item.productId) {
                            finalProductId = String(item.productId);
                        } else if (item.product?.id) {
                            finalProductId = String(item.product.id);
                        } else if (item.serviceId) {
                            finalProductId = String(item.serviceId);
                        } else if (item.service?.id) {
                            finalProductId = String(item.service.id);
                        }

                        // Verify product exists in allProducts
                        if (finalProductId) {
                            const productExists = allProducts.some(p => String(p.id) === finalProductId);
                            if (!productExists) {
                                console.warn(`Product with ID ${finalProductId} not found in allProducts`);
                                // Try to find by matching name if ID doesn't match
                                const productName = item.product?.name || item.service?.name || item.description;
                                if (productName) {
                                    const matchedProduct = allProducts.find(p =>
                                        p.name?.toLowerCase() === productName.toLowerCase()
                                    );
                                    if (matchedProduct) {
                                        finalProductId = String(matchedProduct.id);
                                    }
                                }
                            }
                        }

                        return {
                            id: Date.now() + idx,
                            productId: finalProductId,
                            warehouseId: item.warehouseId
                                ? String(item.warehouseId)
                                : (item.warehouse?.id ? String(item.warehouse.id) : (formData.warehouseId ? String(formData.warehouseId) : '')),
                            qty: qty,
                            rate: rate,
                            tax: taxRate,
                            discount: discount,
                            amount: itemAmount,
                            description: item.description || item.product?.name || item.service?.name || ''
                        };
                    });

                    // Set warehouse from first item if not already set
                    const warehouseId = invoice.items[0]?.warehouseId || invoice.items[0]?.warehouse?.id || formData.warehouseId;

                    setFormData(prev => ({
                        ...prev,
                        invoiceId: invoiceId,
                        items: returnItems,
                        warehouseId: warehouseId || prev.warehouseId
                    }));
                } else if (!isEditMode) {
                    setFormData(prev => ({ ...prev, invoiceId: invoiceId, items: [] }));
                }
            }
        } catch (error) {
            console.error('Error fetching invoice details:', error);
            setSelectedInvoiceDetails(null);
            setInvoiceProducts([]);
        }
    }

    const addItem = () => {
        setFormData({
            ...formData,
            items: [...formData.items, { id: Date.now(), name: '', qty: 1, amount: 0 }]
        });
    };

    const removeItem = (id) => {
        setFormData({
            ...formData,
            items: formData.items.filter(item => item.id !== id)
        });
    };

    // Helper for status styles
    const getStatusClass = (status) => {
        switch (status) {
            case 'Processed': return 'SalesReturn-status-success';
            case 'Pending': return 'SalesReturn-status-warning';
            case 'Rejected': return 'SalesReturn-status-danger';
            case 'Draft': return 'SalesReturn-status-draft';
            default: return 'SalesReturn-status-warning'; // Default to Pending style
        }
    };

    // --- Actions Handlers ---
    const handleAdd = () => {
        resetForm();
        setShowAddModal(true);
    };

    const handleEdit = async (ret) => {
        try {
            const companyId = GetCompanyId();
            // Fetch full details by ID
            const response = await salesReturnService.getById(ret.id, companyId);
            if (response.data.success) {
                const returnData = response.data.data;
                setSelectedReturn(returnData);

                // Populate form data
                setFormData({
                    manualVoucherNo: returnData.manualVoucherNo || '',
                    customerId: String(returnData.customerId || ''),
                    returnNo: returnData.returnNumber || '',
                    invoiceId: returnData.invoiceId ? String(returnData.invoiceId) : '',
                    date: returnData.date ? returnData.date.split('T')[0] : new Date().toISOString().split('T')[0],
                    returnType: 'Sales Return',
                    warehouseId: (returnData.salesreturnitem || returnData.items || []).length > 0
                        ? String((returnData.salesreturnitem || returnData.items || [])[0].warehouseId || '')
                        : '',
                    reason: returnData.reason || '',
                    narration: returnData.reason || '',
                    items: (returnData.salesreturnitem || returnData.items || []).map(item => ({
                        id: item.id || Date.now() + Math.random(),
                        productId: String(item.productId || ''),
                        warehouseId: String(item.warehouseId || ''),
                        qty: item.quantity || 0,
                        rate: item.rate || 0,
                        tax: 0, // taxRate might not be in schema
                        discount: 0,
                        amount: item.amount || 0
                    }))
                });

                // If invoice is linked, load invoice details
                if (returnData.invoiceId) {
                    await handleInvoiceSelect(returnData.invoiceId, true);
                }

                // Filter invoices for the customer
                if (returnData.customerId) {
                    const customerInvoices = invoices.filter(inv => inv.customerId === parseInt(returnData.customerId));
                    setFilteredInvoices(customerInvoices);
                }

                setShowEditModal(true);
            } else {
                alert('Error fetching sales return details');
            }
        } catch (error) {
            console.error('Error fetching sales return:', error);
            alert('Error loading sales return for editing');
        }
    };

    const handleView = (ret) => {
        setSelectedReturn(ret);
        setShowViewModal(true);
    };

    const handleDelete = (ret) => {
        setSelectedReturn(ret);
        setShowDeleteModal(true);
    };

    const confirmDelete = async () => {
        if (selectedReturn) {
            try {
                const companyId = GetCompanyId();
                await salesReturnService.delete(selectedReturn.id, companyId);
                fetchData();
                setShowDeleteModal(false);
                setSelectedReturn(null);
            } catch (error) {
                console.error('Error deleting sales return:', error);
            }
        }
    };

    const handleUpdate = async () => {
        if (!selectedReturn) return;

        try {
            const companyId = GetCompanyId();
            // Calculate totals
            let totalAmount = 0;
            const returnItems = formData.items.map(item => {
                const qty = parseFloat(item.qty || 0);
                const rate = parseFloat(item.rate || 0);
                const discount = parseFloat(item.discount || 0);
                const taxRate = parseFloat(item.tax || 0);
                const taxableAmount = (qty * rate) - discount;
                const taxAmount = taxableAmount * (taxRate / 100);
                const itemAmount = taxableAmount + taxAmount;

                totalAmount += itemAmount;

                return {
                    productId: parseInt(item.productId),
                    warehouseId: parseInt(item.warehouseId || formData.warehouseId),
                    quantity: qty,
                    rate: rate,
                    amount: itemAmount
                };
            });

            const data = {
                returnNumber: formData.returnNo || selectedReturn.returnNumber,
                date: formData.date,
                customerId: parseInt(formData.customerId),
                invoiceId: formData.invoiceId ? parseInt(formData.invoiceId) : null,
                reason: formData.reason || formData.narration || 'Sales Return',
                manualVoucherNo: formData.manualVoucherNo || null,
                items: returnItems,
                totalAmount: totalAmount
            };

            const response = await salesReturnService.update(selectedReturn.id, data, companyId);
            if (response.data.success) {
                fetchData();
                setShowEditModal(false);
                resetForm();
                setSelectedReturn(null);
                alert('Sales return updated successfully!');
            }
        } catch (error) {
            console.error('Error updating return:', error);
            alert('Error updating sales return: ' + (error.response?.data?.message || error.message));
        }
    };

    const handleSave = async () => {
        try {
            // Validate required fields
            if (!formData.customerId) {
                alert('Please select a customer');
                return;
            }
            if (!formData.invoiceId) {
                alert('Please select an invoice');
                return;
            }
            if (!formData.returnNo) {
                alert('Please enter a return number');
                return;
            }
            if (formData.items.length === 0) {
                alert('Please add at least one item to return');
                return;
            }

            // Calculate total amount
            let totalAmount = 0;
            const returnItems = formData.items.map(item => {
                const qty = parseFloat(item.qty || 0);
                const rate = parseFloat(item.rate || 0);
                const taxRate = parseFloat(item.tax || 0);
                const discount = parseFloat(item.discount || 0);

                // Calculate: (qty * rate - discount) * (1 + taxRate/100)
                const taxableAmount = (qty * rate) - discount;
                const taxAmount = taxableAmount * (taxRate / 100);
                const itemAmount = taxableAmount + taxAmount;

                totalAmount += itemAmount;

                return {
                    productId: parseInt(item.productId),
                    warehouseId: parseInt(item.warehouseId || formData.warehouseId),
                    quantity: qty,
                    rate: rate,
                    amount: itemAmount
                };
            });

            const data = {
                returnNumber: formData.returnNo || `RET-${Date.now()}`,
                date: formData.date,
                customerId: parseInt(formData.customerId),
                invoiceId: parseInt(formData.invoiceId),
                reason: formData.reason || formData.narration || 'Sales Return',
                manualVoucherNo: formData.manualVoucherNo || null,
                items: returnItems,
                totalAmount: totalAmount
            };

            const response = await salesReturnService.create(data);
            if (response.data.success) {
                fetchData();
                setShowAddModal(false);
                resetForm();
                alert('Sales return created successfully!');
            }
        } catch (error) {
            console.error('Error saving return:', error);
            alert('Error creating sales return: ' + (error.response?.data?.message || error.message));
        }
    };

    return (
        <div className="SalesReturn-sales-return-page">
            {/* Page Header */}
            <div className="SalesReturn-page-header">
                <div>
                    <h1 className="SalesReturn-page-title">Sales Return</h1>
                    <p className="SalesReturn-page-subtitle">Manage customer returns and credits</p>
                </div>
                <div className="SalesReturn-header-actions">
                    <button className="SalesReturn-btn-add" onClick={handleAdd}>
                        <Plus size={18} className="mr-2" /> CREATE RETURN
                    </button>
                </div>
            </div>

            {/* Summary Cards */}
            <div className="SalesReturn-summary-grid">
                {summaryCards.map((card) => (
                    <div key={card.id} className={`summary-card card-${card.color}`}>
                        <div className="SalesReturn-card-content">
                            <span className="SalesReturn-card-label">{card.label}</span>
                            <h3 className="SalesReturn-card-value">{card.value}</h3>
                        </div>
                        <div className={`card-icon icon-${card.color}`}>
                            <card.icon size={24} />
                        </div>
                    </div>
                ))}
            </div>

            {/* Table Section */}
            <div className="SalesReturn-table-card">
                {/* Table Controls (Search/Filter) */}
                <div className="SalesReturn-table-controls">
                    <div className="SalesReturn-search-wrapper">
                        <Search size={18} className="SalesReturn-search-icon" />
                        <input type="text" placeholder="Search returns..." className="SalesReturn-search-input" />
                    </div>
                    <div className="SalesReturn-controls-right">
                        <button className="SalesReturn-btn-outline"><Filter size={16} /> Filter</button>
                        <button className="SalesReturn-btn-outline"><Download size={16} /> Export</button>
                    </div>
                </div>

                {/* Data Table */}
                <div className="SalesReturn-table-container">
                    <table className="SalesReturn-sales-return-table">
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Return No</th>
                                {/* <th>Manual Voucher No</th> */}
                                <th>Auto Voucher No</th>
                                <th>Invoice No / Status</th>
                                <th>Customer</th>
                                <th>Warehouse</th>
                                <th>Date</th>
                                <th>Items</th>
                                <th>Amount (₹)</th>
                                <th>Return Type</th>
                                <th>Reason</th>
                                <th className="SalesReturn-text-right">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {returns.map((row, index) => {
                                // Get warehouse name from first item
                                const returnItems = row.salesreturnitem || row.items || [];
                                const warehouseName = (returnItems.length > 0)
                                    ? (returnItems[0]?.warehouse?.name || '-')
                                    : '-';

                                // Get invoice number - format as #INV000001
                                const invoiceNumber = row.invoice?.invoiceNumber
                                    ? (row.invoice.invoiceNumber.startsWith('#') ? row.invoice.invoiceNumber : `#${row.invoice.invoiceNumber}`)
                                    : (row.invoiceId ? `#INV${String(row.invoiceId).padStart(6, '0')}` : null);
                                const displayStatus = row.status || 'Pending';

                                return (
                                    <tr key={row.id}>
                                        <td>{index + 1}</td>
                                        <td><span className="SalesReturn-fw-600 SalesReturn-text-primary">{row.returnNumber}</span></td>
                                        {/* <td>{row.manualVoucherNo || '-'}</td> */}
                                        {/* <td>{row.manualVoucherNo || '-'}</td> */}
                                        <td>{row.autoVoucherNo || row.returnNumber || '-'}</td>
                                        <td>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
                                                {invoiceNumber && (
                                                    <span className="SalesReturn-invoice-number-badge">
                                                        #{invoiceNumber}
                                                    </span>
                                                )}
                                                <span className={`SalesReturn-sales-return-status-badge ${getStatusClass(displayStatus)}`}>
                                                    {displayStatus}
                                                </span>
                                            </div>
                                        </td>
                                        <td className="SalesReturn-fw-600">{row.customer?.name || '-'}</td>
                                        <td>{warehouseName}</td>
                                        <td>{new Date(row.date).toLocaleDateString()}</td>
                                        <td className="SalesReturn-text-center">{(row.salesreturnitem || row.items || []).length}</td>
                                        <td className="SalesReturn-fw-700">{formatCurrency(row.totalAmount || 0)}</td>
                                        <td>Sales Return</td>
                                        <td><span className="SalesReturn-reason-text">{row.reason || '-'}</span></td>
                                        <td className="SalesReturn-text-right">
                                            <div className="SalesReturn-action-buttons">
                                                <button className="SalesReturn-sales-return-action-btn SalesReturn-view" title="View" onClick={() => handleView(row)}><Eye size={16} /></button>
                                                <button className="SalesReturn-sales-return-action-btn SalesReturn-edit" title="Edit" onClick={() => handleEdit(row)}><Pencil size={16} /></button>
                                                <button className="SalesReturn-sales-return-action-btn SalesReturn-delete" title="Delete" onClick={() => handleDelete(row)}><Trash2 size={16} /></button>
                                            </div>
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* CREATE RETURN MODAL */}
            {showAddModal && (
                <div className="SalesReturn-modal-overlay">
                    <div className="SalesReturn-modal-content SalesReturn-return-modal">
                        <div className="SalesReturn-modal-header">
                            <h2>Add New Sales Return</h2>
                            <button className="SalesReturn-close-btn" onClick={() => setShowAddModal(false)}>
                                <X size={24} />
                            </button>
                        </div>

                        <div className="SalesReturn-modal-body">
                            {/* Ref ID & Manual Voucher */}
                            <div className="SalesReturn-form-group SalesReturn-mb-4">
                                <label>Reference ID (Auto)</label>
                                <input type="text" disabled placeholder="Assigned after save" className="SalesReturn-form-input SalesReturn-disabled-input" />
                            </div>

                            <div className="SalesReturn-form-group SalesReturn-mb-4">
                                <label>Manual Voucher No</label>
                                <input type="text" placeholder="Optional"
                                    value={formData.manualVoucherNo}
                                    onChange={(e) => setFormData({ ...formData, manualVoucherNo: e.target.value })}
                                    className="SalesReturn-form-input"
                                />
                            </div>

                            {/* Row 1: Customer, Return No, Invoice No */}
                            <div className="SalesReturn-form-row SalesReturn-three-col SalesReturn-mb-4">
                                <div className="SalesReturn-form-group">
                                    <label>Customer <span className="SalesReturn-text-red">*</span></label>
                                    <select className="SalesReturn-form-select"
                                        value={formData.customerId}
                                        onChange={(e) => {
                                            const customerId = e.target.value;
                                            setFormData({
                                                ...formData,
                                                customerId: customerId,
                                                invoiceId: '', // Reset invoice when customer changes
                                                items: [] // Reset items when customer changes
                                            });
                                            setSelectedInvoiceDetails(null);
                                        }}>
                                        <option value="">Select Customer...</option>
                                        {customers.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                                    </select>
                                </div>
                                <div className="SalesReturn-form-group">
                                    <label>Return No <span className="SalesReturn-text-red">*</span></label>
                                    <input type="text"
                                        value={formData.returnNo}
                                        onChange={(e) => setFormData({ ...formData, returnNo: e.target.value })}
                                        className="SalesReturn-form-input" />
                                </div>
                                <div className="SalesReturn-form-group">
                                    <label>Invoice No <span className="SalesReturn-text-red">*</span></label>
                                    <select
                                        className="SalesReturn-form-select"
                                        value={formData.invoiceId}
                                        onChange={(e) => handleInvoiceSelect(e.target.value)}
                                        disabled={!formData.customerId}>
                                        <option value="">
                                            {formData.customerId ? 'Select Invoice...' : 'Select Customer First'}
                                        </option>
                                        {filteredInvoices.map(inv => (
                                            <option key={inv.id} value={inv.id}>
                                                {inv.invoiceNumber} {inv.date ? `(${new Date(inv.date).toLocaleDateString()})` : ''}
                                                {inv.totalAmount ? ` - ${formatCurrency(inv.totalAmount)}` : ''}
                                            </option>
                                        ))}
                                    </select>
                                    {formData.customerId && filteredInvoices.length === 0 && (
                                        <p className="SalesReturn-text-xs SalesReturn-text-gray-500 SalesReturn-mt-1">No invoices found for this customer</p>
                                    )}
                                    {selectedInvoiceDetails && (
                                        <div className="SalesReturn-invoice-linked-indicator SalesReturn-mt-2">
                                            <span className="SalesReturn-text-xs text-blue-600 SalesReturn-font-semibold">
                                                ✓ Invoice {selectedInvoiceDetails.invoiceNumber} loaded - {selectedInvoiceDetails.items?.length || 0} items
                                            </span>
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* Row 2: Date, Return Type, Warehouse */}
                            <div className="SalesReturn-form-row SalesReturn-three-col SalesReturn-mb-6">
                                <div className="SalesReturn-form-group">
                                    <label>Date <span className="SalesReturn-text-red">*</span></label>
                                    <input type="date" value={formData.date} onChange={(e) => setFormData({ ...formData, date: e.target.value })} className="SalesReturn-form-input" />
                                </div>
                                <div className="SalesReturn-form-group">
                                    <label>Return Type</label>
                                    <select className="SalesReturn-form-select" value={formData.returnType} onChange={(e) => setFormData({ ...formData, returnType: e.target.value })}>
                                        <option>Sales Return</option>
                                        <option>Damaged Goods</option>
                                    </select>
                                </div>
                                <div className="SalesReturn-form-group">
                                    <label>Warehouse <span className="SalesReturn-text-red">*</span></label>
                                    <select className="SalesReturn-form-select"
                                        value={formData.warehouseId}
                                        onChange={(e) => setFormData({ ...formData, warehouseId: e.target.value })}>
                                        <option value="">Select Warehouse...</option>
                                        {allWarehouses.map(w => <option key={w.id} value={w.id}>{w.name}</option>)}
                                    </select>
                                </div>
                            </div>

                            {/* Returned Items Section */}
                            <div className="SalesReturn-items-section SalesReturn-mb-6">
                                <div className="SalesReturn-flex SalesReturn-items-center SalesReturn-justify-between SalesReturn-mb-3">
                                    <h4 className="SalesReturn-section-title">Returned Items</h4>
                                    {selectedInvoiceDetails && (
                                        <span className="SalesReturn-text-sm text-blue-600">
                                            Invoice: {selectedInvoiceDetails.invoiceNumber} |
                                            Items: {selectedInvoiceDetails.items?.length || 0}
                                        </span>
                                    )}
                                </div>
                                <button className="SalesReturn-btn-add-item-blue" onClick={addItem}>
                                    + Add Item
                                </button>

                                {formData.items.length > 0 && (
                                    <div className="SalesReturn-items-list SalesReturn-mt-3">
                                        <div className="SalesReturn-items-table-header">
                                            <div className="SalesReturn-item-col-name">Product</div>
                                            <div className="SalesReturn-item-col-wh">Warehouse</div>
                                            <div className="SalesReturn-item-col-qty">Qty</div>
                                            <div className="SalesReturn-item-col-rate">Rate</div>
                                            <div className="SalesReturn-item-col-tax">Tax %</div>
                                            <div className="SalesReturn-item-col-amount">Amount</div>
                                            <div className="SalesReturn-item-col-action">Action</div>
                                        </div>
                                        {formData.items.map((item, idx) => {
                                            const productIdNum = item.productId ? parseInt(item.productId) : null;
                                            const product = productIdNum ? allProducts.find(p => p.id === productIdNum) : null;
                                            const warehouse = allWarehouses.find(w => w.id === parseInt(item.warehouseId));
                                            const calculatedAmount = (parseFloat(item.qty || 0) * parseFloat(item.rate || 0)) * (1 + parseFloat(item.tax || 0) / 100) - parseFloat(item.discount || 0);

                                            // Use invoice products if invoice is selected, otherwise all products
                                            const availableProducts = invoiceProducts.length > 0 ? invoiceProducts : allProducts;

                                            return (
                                                <div key={item.id} className="SalesReturn-item-row">
                                                    <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                                                        <select
                                                            className="SalesReturn-form-input SalesReturn-item-name"
                                                            value={String(item.productId) || ''}
                                                            onChange={(e) => {
                                                                const pId = e.target.value;
                                                                const p = allProducts.find(x => x.id === parseInt(pId));
                                                                const newItems = [...formData.items];
                                                                newItems[idx] = {
                                                                    ...newItems[idx],
                                                                    productId: pId,
                                                                    rate: p?.sellPrice || item.rate || 0,
                                                                    tax: p?.taxRate || item.tax || 0
                                                                };
                                                                setFormData({ ...formData, items: newItems });
                                                            }}>
                                                            <option value="">Select Product...</option>
                                                            {availableProducts.map(p => (
                                                                <option key={p.id} value={String(p.id)}>
                                                                    {p.name} {p.sellPrice ? `(${formatCurrency(p.sellPrice)})` : ''}
                                                                </option>
                                                            ))}
                                                        </select>
                                                        {product && (
                                                            <div className="SalesReturn-product-info-display" style={{ fontSize: '11px', color: '#64748b', marginTop: '2px', lineHeight: '1.3' }}>
                                                                <span style={{ fontWeight: '600', color: '#3b82f6' }}>ID: {product.id}</span>
                                                                <span style={{ marginLeft: '6px', color: '#1e293b' }}>• {product.name}</span>
                                                            </div>
                                                        )}
                                                    </div>
                                                    <select
                                                        className="SalesReturn-form-input SalesReturn-item-wh"
                                                        value={String(item.warehouseId || '')}
                                                        onChange={(e) => {
                                                            const newItems = [...formData.items];
                                                            newItems[idx] = { ...newItems[idx], warehouseId: e.target.value };
                                                            setFormData({ ...formData, items: newItems });
                                                        }}>
                                                        <option value="">Select WH...</option>
                                                        {allWarehouses.map(w => (
                                                            <option key={w.id} value={String(w.id)}>{w.name}</option>
                                                        ))}
                                                    </select>
                                                    <input
                                                        type="number"
                                                        placeholder="Qty"
                                                        value={item.qty}
                                                        className="SalesReturn-form-input SalesReturn-item-qty"
                                                        min="0"
                                                        step="0.01"
                                                        onChange={(e) => {
                                                            const newItems = [...formData.items];
                                                            const qty = parseFloat(e.target.value) || 0;
                                                            newItems[idx] = { ...newItems[idx], qty: qty };
                                                            setFormData({ ...formData, items: newItems });
                                                        }}
                                                    />
                                                    <input
                                                        type="number"
                                                        placeholder="Rate"
                                                        value={item.rate}
                                                        className="SalesReturn-form-input SalesReturn-item-rate"
                                                        min="0"
                                                        step="0.01"
                                                        onChange={(e) => {
                                                            const newItems = [...formData.items];
                                                            const rate = parseFloat(e.target.value) || 0;
                                                            newItems[idx] = { ...newItems[idx], rate: rate };
                                                            setFormData({ ...formData, items: newItems });
                                                        }}
                                                    />
                                                    <input
                                                        type="number"
                                                        placeholder="Tax %"
                                                        value={item.tax}
                                                        className="SalesReturn-form-input SalesReturn-item-tax"
                                                        min="0"
                                                        step="0.01"
                                                        onChange={(e) => {
                                                            const newItems = [...formData.items];
                                                            const tax = parseFloat(e.target.value) || 0;
                                                            newItems[idx] = { ...newItems[idx], tax: tax };
                                                            setFormData({ ...formData, items: newItems });
                                                        }}
                                                    />
                                                    <div className="SalesReturn-item-amount">
                                                        {formatCurrency(calculatedAmount)}
                                                    </div>
                                                    <button className="SalesReturn-btn-remove-item" onClick={() => removeItem(item.id)}>
                                                        <Trash2 size={16} />
                                                    </button>
                                                </div>
                                            );
                                        })}
                                    </div>
                                )}
                                {formData.items.length === 0 && selectedInvoiceDetails && (
                                    <p className="SalesReturn-text-sm SalesReturn-text-gray-500 SalesReturn-mt-2">No items found in selected invoice</p>
                                )}
                            </div>

                            {/* Reason & Narration */}
                            <div className="SalesReturn-form-group SalesReturn-mb-4">
                                <label>Reason for Return</label>
                                <input type="text" value={formData.reason} onChange={(e) => setFormData({ ...formData, reason: e.target.value })} className="SalesReturn-form-input" />
                            </div>

                            <div className="SalesReturn-form-group SalesReturn-mb-4">
                                <label>Narration</label>
                                <textarea className="SalesReturn-form-textarea" rows="3" value={formData.narration} onChange={(e) => setFormData({ ...formData, narration: e.target.value })}></textarea>
                            </div>

                        </div>

                        <div className="SalesReturn-modal-footer">
                            <button className="SalesReturn-btn-cancel" onClick={() => setShowAddModal(false)}>Cancel</button>
                            <button className="SalesReturn-btn-submit-green" onClick={handleSave}>Add Return</button>
                        </div>
                    </div>
                </div>
            )}

            {/* EDIT RETURN MODAL */}
            {showEditModal && selectedReturn && (
                <div className="SalesReturn-modal-overlay">
                    <div className="SalesReturn-modal-content SalesReturn-return-modal">
                        <div className="SalesReturn-modal-header">
                            <h2>Edit Sales Return</h2>
                            <button className="SalesReturn-close-btn" onClick={() => {
                                setShowEditModal(false);
                                resetForm();
                                setSelectedReturn(null);
                            }}>
                                <X size={24} />
                            </button>
                        </div>

                        <div className="SalesReturn-modal-body">
                            {/* Ref ID & Manual Voucher */}
                            <div className="SalesReturn-form-group SalesReturn-mb-4">
                                <label>Reference ID (Auto)</label>
                                <input type="text" disabled value={selectedReturn.returnNumber || ''} className="SalesReturn-form-input SalesReturn-disabled-input" />
                            </div>

                            <div className="SalesReturn-form-group SalesReturn-mb-4">
                                <label>Manual Voucher No</label>
                                <input type="text" placeholder="Optional"
                                    value={formData.manualVoucherNo}
                                    onChange={(e) => setFormData({ ...formData, manualVoucherNo: e.target.value })}
                                    className="SalesReturn-form-input"
                                />
                            </div>

                            {/* Row 1: Customer, Return No, Invoice No */}
                            <div className="SalesReturn-form-row SalesReturn-three-col SalesReturn-mb-4">
                                <div className="SalesReturn-form-group">
                                    <label>Customer <span className="SalesReturn-text-red">*</span></label>
                                    <select className="SalesReturn-form-select"
                                        value={formData.customerId}
                                        onChange={(e) => {
                                            const customerId = e.target.value;
                                            setFormData({
                                                ...formData,
                                                customerId: customerId,
                                                invoiceId: '', // Reset invoice when customer changes
                                                items: [] // Reset items when customer changes
                                            });
                                            setSelectedInvoiceDetails(null);
                                        }}>
                                        <option value="">Select Customer...</option>
                                        {customers.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                                    </select>
                                </div>
                                <div className="SalesReturn-form-group">
                                    <label>Return No <span className="SalesReturn-text-red">*</span></label>
                                    <input type="text"
                                        value={formData.returnNo}
                                        onChange={(e) => setFormData({ ...formData, returnNo: e.target.value })}
                                        className="SalesReturn-form-input" />
                                </div>
                                <div className="SalesReturn-form-group">
                                    <label>Invoice No <span className="SalesReturn-text-red">*</span></label>
                                    <select
                                        className="SalesReturn-form-select"
                                        value={formData.invoiceId}
                                        onChange={(e) => handleInvoiceSelect(e.target.value)}
                                        disabled={!formData.customerId}>
                                        <option value="">
                                            {formData.customerId ? 'Select Invoice...' : 'Select Customer First'}
                                        </option>
                                        {filteredInvoices.map(inv => (
                                            <option key={inv.id} value={inv.id}>
                                                {inv.invoiceNumber} {inv.date ? `(${new Date(inv.date).toLocaleDateString()})` : ''}
                                                {inv.totalAmount ? ` - ${formatCurrency(inv.totalAmount)}` : ''}
                                            </option>
                                        ))}
                                    </select>
                                    {formData.customerId && filteredInvoices.length === 0 && (
                                        <p className="SalesReturn-text-xs SalesReturn-text-gray-500 SalesReturn-mt-1">No invoices found for this customer</p>
                                    )}
                                    {selectedInvoiceDetails && (
                                        <div className="SalesReturn-invoice-linked-indicator SalesReturn-mt-2">
                                            <span className="SalesReturn-text-xs text-blue-600 SalesReturn-font-semibold">
                                                ✓ Invoice {selectedInvoiceDetails.invoiceNumber} loaded - {selectedInvoiceDetails.items?.length || 0} items
                                            </span>
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* Row 2: Date, Return Type, Warehouse */}
                            <div className="SalesReturn-form-row SalesReturn-three-col SalesReturn-mb-6">
                                <div className="SalesReturn-form-group">
                                    <label>Date <span className="SalesReturn-text-red">*</span></label>
                                    <input type="date" value={formData.date} onChange={(e) => setFormData({ ...formData, date: e.target.value })} className="SalesReturn-form-input" />
                                </div>
                                <div className="SalesReturn-form-group">
                                    <label>Return Type</label>
                                    <select className="SalesReturn-form-select" value={formData.returnType} onChange={(e) => setFormData({ ...formData, returnType: e.target.value })}>
                                        <option>Sales Return</option>
                                        <option>Damaged Goods</option>
                                    </select>
                                </div>
                                <div className="SalesReturn-form-group">
                                    <label>Warehouse <span className="SalesReturn-text-red">*</span></label>
                                    <select className="SalesReturn-form-select"
                                        value={formData.warehouseId}
                                        onChange={(e) => setFormData({ ...formData, warehouseId: e.target.value })}>
                                        <option value="">Select Warehouse...</option>
                                        {allWarehouses.map(w => <option key={w.id} value={w.id}>{w.name}</option>)}
                                    </select>
                                </div>
                            </div>

                            {/* Returned Items Section - Same as Add Modal */}
                            <div className="SalesReturn-items-section SalesReturn-mb-6">
                                <div className="SalesReturn-flex SalesReturn-items-center SalesReturn-justify-between SalesReturn-mb-3">
                                    <h4 className="SalesReturn-section-title">Returned Items</h4>
                                    {selectedInvoiceDetails && (
                                        <span className="SalesReturn-text-sm text-blue-600">
                                            Invoice: {selectedInvoiceDetails.invoiceNumber} |
                                            Items: {selectedInvoiceDetails.items?.length || 0}
                                        </span>
                                    )}
                                </div>
                                <button className="SalesReturn-btn-add-item-blue" onClick={addItem}>
                                    + Add Item
                                </button>

                                {formData.items.length > 0 && (
                                    <div className="SalesReturn-items-list SalesReturn-mt-3">
                                        <div className="SalesReturn-items-table-header">
                                            <div className="SalesReturn-item-col-name">Product</div>
                                            <div className="SalesReturn-item-col-wh">Warehouse</div>
                                            <div className="SalesReturn-item-col-qty">Qty</div>
                                            <div className="SalesReturn-item-col-rate">Rate</div>
                                            <div className="SalesReturn-item-col-tax">Tax %</div>
                                            <div className="SalesReturn-item-col-amount">Amount</div>
                                            <div className="SalesReturn-item-col-action">Action</div>
                                        </div>
                                        {formData.items.map((item, idx) => {
                                            const productIdNum = item.productId ? parseInt(item.productId) : null;
                                            const product = productIdNum ? allProducts.find(p => p.id === productIdNum) : null;
                                            const warehouse = allWarehouses.find(w => w.id === parseInt(item.warehouseId));
                                            const calculatedAmount = (parseFloat(item.qty || 0) * parseFloat(item.rate || 0)) * (1 + parseFloat(item.tax || 0) / 100) - parseFloat(item.discount || 0);

                                            // Use invoice products if invoice is selected, otherwise all products
                                            const availableProducts = invoiceProducts.length > 0 ? invoiceProducts : allProducts;

                                            return (
                                                <div key={item.id} className="SalesReturn-item-row">
                                                    <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                                                        <select
                                                            className="SalesReturn-form-input SalesReturn-item-name"
                                                            value={String(item.productId) || ''}
                                                            onChange={(e) => {
                                                                const pId = e.target.value;
                                                                const p = allProducts.find(x => x.id === parseInt(pId));
                                                                const newItems = [...formData.items];
                                                                newItems[idx] = {
                                                                    ...newItems[idx],
                                                                    productId: pId,
                                                                    rate: p?.sellPrice || item.rate || 0,
                                                                    tax: p?.taxRate || item.tax || 0
                                                                };
                                                                setFormData({ ...formData, items: newItems });
                                                            }}>
                                                            <option value="">Select Product...</option>
                                                            {availableProducts.map(p => (
                                                                <option key={p.id} value={String(p.id)}>
                                                                    {p.name} {p.sellPrice ? `(${formatCurrency(p.sellPrice)})` : ''}
                                                                </option>
                                                            ))}
                                                        </select>
                                                        {product && (
                                                            <div className="SalesReturn-product-info-display" style={{ fontSize: '11px', color: '#64748b', marginTop: '2px', lineHeight: '1.3' }}>
                                                                <span style={{ fontWeight: '600', color: '#3b82f6' }}>ID: {product.id}</span>
                                                                <span style={{ marginLeft: '6px', color: '#1e293b' }}>• {product.name}</span>
                                                            </div>
                                                        )}
                                                    </div>
                                                    <select
                                                        className="SalesReturn-form-input item -wh"
                                                        value={String(item.warehouseId || '')}
                                                        onChange={(e) => {
                                                            const newItems = [...formData.items];
                                                            newItems[idx] = { ...newItems[idx], warehouseId: e.target.value };
                                                            setFormData({ ...formData, items: newItems });
                                                        }}>
                                                        <option value="">Select WH...</option>
                                                        {allWarehouses.map(w => (
                                                            <option key={w.id} value={String(w.id)}>{w.name}</option>
                                                        ))}
                                                    </select>
                                                    <input
                                                        type="number"
                                                        placeholder="Qty"
                                                        value={item.qty}
                                                        className="SalesReturn-form-input item -qty"
                                                        min="0"
                                                        step="0.01"
                                                        onChange={(e) => {
                                                            const newItems = [...formData.items];
                                                            const qty = parseFloat(e.target.value) || 0;
                                                            newItems[idx] = { ...newItems[idx], qty: qty };
                                                            setFormData({ ...formData, items: newItems });
                                                        }}
                                                    />
                                                    <input
                                                        type="number"
                                                        placeholder="Rate"
                                                        value={item.rate}
                                                        className="SalesReturn-form-input item -rate"
                                                        min="0"
                                                        step="0.01"
                                                        onChange={(e) => {
                                                            const newItems = [...formData.items];
                                                            const rate = parseFloat(e.target.value) || 0;
                                                            newItems[idx] = { ...newItems[idx], rate: rate };
                                                            setFormData({ ...formData, items: newItems });
                                                        }}
                                                    />
                                                    <input
                                                        type="number"
                                                        placeholder="Tax %"
                                                        value={item.tax}
                                                        className="SalesReturn-form-input item -tax"
                                                        min="0"
                                                        step="0.01"
                                                        onChange={(e) => {
                                                            const newItems = [...formData.items];
                                                            const tax = parseFloat(e.target.value) || 0;
                                                            newItems[idx] = { ...newItems[idx], tax: tax };
                                                            setFormData({ ...formData, items: newItems });
                                                        }}
                                                    />
                                                    <div className="item -amount">
                                                        {formatCurrency(calculatedAmount)}
                                                    </div>
                                                    <button className="SalesReturn-btn-remove-item" onClick={() => removeItem(item.id)}>
                                                        <Trash2 size={16} />
                                                    </button>
                                                </div>
                                            );
                                        })}
                                    </div>
                                )}
                                {formData.items.length === 0 && selectedInvoiceDetails && (
                                    <p className="SalesReturn-text-sm SalesReturn-text-gray-500 SalesReturn-mt-2">No items found in selected invoice</p>
                                )}
                            </div>

                            {/* Reason & Narration */}
                            <div className="SalesReturn-form-group SalesReturn-mb-4">
                                <label>Reason for Return</label>
                                <input type="text" value={formData.reason} onChange={(e) => setFormData({ ...formData, reason: e.target.value })} className="SalesReturn-form-input" />
                            </div>

                            <div className="SalesReturn-form-group SalesReturn-mb-4">
                                <label>Narration</label>
                                <textarea className="SalesReturn-form-textarea" rows="3" value={formData.narration} onChange={(e) => setFormData({ ...formData, narration: e.target.value })}></textarea>
                            </div>

                        </div>

                        <div className="SalesReturn-modal-footer">
                            <button className="SalesReturn-btn-cancel" onClick={() => {
                                setShowEditModal(false);
                                resetForm();
                                setSelectedReturn(null);
                            }}>Cancel</button>
                            <button className="SalesReturn-btn-submit-green" onClick={handleUpdate}>Update Return</button>
                        </div>
                    </div>
                </div>
            )}

            {/* DELETE CONFIRMATION MODAL */}
            {showDeleteModal && (
                <div className="SalesReturn-modal-overlay">
                    <div className="SalesReturn-confirmation-modal">
                        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '1rem', color: '#ef4444' }}>
                            <AlertTriangle size={48} />
                        </div>
                        <h3>Delete Return?</h3>
                        <p>Are you sure you want to delete this return? This action cannot be undone.</p>
                        <div className="SalesReturn-confirmation-actions">
                            <button className="SalesReturn-btn-cancel" onClick={() => setShowDeleteModal(false)}>Cancel</button>
                            <button className="SalesReturn-btn-delete-confirm" onClick={confirmDelete}>Delete</button>
                        </div>
                    </div>
                </div>
            )}

            {/* VIEW MODAL - Using a read-only card style */}
            {showViewModal && selectedReturn && (
                <div className="SalesReturn-modal-overlay">
                    <div className="SalesReturn-modal-content SalesReturn-return-modal" style={{ maxWidth: '700px' }}>
                        <div className="SalesReturn-modal-header">
                            <h2>Return Details <span className="SalesReturn-text-gray-500 SalesReturn-text-sm">#{selectedReturn.returnNumber}</span></h2>
                            <button className="SalesReturn-close-btn" onClick={() => setShowViewModal(false)}>
                                <X size={24} />
                            </button>
                        </div>
                        <div className="SalesReturn-modal-body">
                            <div className="SalesReturn-view-grid">
                                <div className="SalesReturn-view-group">
                                    <label className="SalesReturn-view-label">Customer</label>
                                    <div className="SalesReturn-view-value SalesReturn-flex SalesReturn-items-center SalesReturn-gap-2">
                                        <User size={16} className="SalesReturn-text-blue-500" /> {selectedReturn.customer?.name}
                                    </div>
                                </div>
                                <div className="SalesReturn-view-group">
                                    <label className="SalesReturn-view-label">Warehouse</label>
                                    <div className="SalesReturn-view-value SalesReturn-flex SalesReturn-items-center SalesReturn-gap-2">
                                        <MapPin size={16} className="SalesReturn-text-orange-500" /> {selectedReturn.salesreturnitem?.[0]?.warehouse?.name}
                                    </div>
                                </div>
                                <div className="SalesReturn-view-group">
                                    <label className="SalesReturn-view-label">Date</label>
                                    <div className="SalesReturn-view-value SalesReturn-flex SalesReturn-items-center SalesReturn-gap-2">
                                        <Calendar size={16} className="SalesReturn-text-gray-500" /> {new Date(selectedReturn.date).toLocaleDateString()}
                                    </div>
                                </div>
                                <div className="SalesReturn-view-group">
                                    <label className="SalesReturn-view-label">Return Type</label>
                                    <div className="SalesReturn-view-value SalesReturn-badge-style">Sales Return</div>
                                </div>
                                <div className="SalesReturn-view-group">
                                    <label className="SalesReturn-view-label">Invoice Reference</label>
                                    <div className="SalesReturn-view-value SalesReturn-font-mono">{selectedReturn.invoice?.invoiceNumber}</div>
                                </div>
                                <div className="SalesReturn-view-group">
                                    <label className="SalesReturn-view-label">Manual Voucher</label>
                                    <div className="SalesReturn-view-value">{selectedReturn.manualVoucherNo || '-'}</div>
                                </div>
                            </div>

                            <div className="mt-6">
                                <h4 className="SalesReturn-section-title">Items Returned</h4>
                                <div className="SalesReturn-view-items-table-wrapper">
                                    <table className="SalesReturn-view-items-table">
                                        <thead>
                                            <tr>
                                                <th>Item Name</th>
                                                <th>Qty</th>
                                                <th>Amount</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {(selectedReturn.salesreturnitem || []).map((item, i) => (
                                                <tr key={i}>
                                                    <td>{item.product?.name}</td>
                                                    <td>{item.quantity}</td>
                                                    <td>{formatCurrency(item.amount)}</td>
                                                </tr>
                                            ))}
                                            <tr className="SalesReturn-fw-700 SalesReturn-bg-gray-50">
                                                <td>Total</td>
                                                <td></td>
                                                <td>{formatCurrency(selectedReturn.totalAmount)}</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>

                            <div className="mt-4 p-4 SalesReturn-bg-gray-50 SalesReturn-rounded-lg">
                                <label className="SalesReturn-view-label">Reason</label>
                                <p className="SalesReturn-text-sm SalesReturn-text-gray-700 SalesReturn-mt-1">{selectedReturn.reason}</p>
                            </div>
                        </div>
                        <div className="SalesReturn-modal-footer">
                            <button className="SalesReturn-btn-cancel" onClick={() => setShowViewModal(false)}>Close</button>
                            <button className="SalesReturn-btn-outline SalesReturn-flex SalesReturn-items-center SalesReturn-gap-2"><Printer size={16} /> Print Return</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default SalesReturn;
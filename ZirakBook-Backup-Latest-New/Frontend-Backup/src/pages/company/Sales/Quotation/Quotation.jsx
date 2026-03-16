import React, { useState, useRef } from 'react';
import {
    Search, Plus, Pencil, Trash2, X, ChevronDown,
    FileText, ShoppingCart, Truck, Receipt, CreditCard,
    CheckCircle2, Clock, ArrowRight, Download, Send, Printer, Eye
} from 'lucide-react';
import './Quotation.css';
import salesQuotationService from '../../../../api/salesQuotationService';
import customerService from '../../../../api/customerService';
import productService from '../../../../api/productService';
import warehouseService from '../../../../api/warehouseService';
import servicesService from '../../../../api/servicesService';
import companyService from '../../../../api/companyService';
import GetCompanyId from '../../../../api/GetCompanyId';
import { CompanyContext } from '../../../../context/CompanyContext';

const Quotation = () => {
    // --- State Management ---
    const { formatCurrency } = React.useContext(CompanyContext);
    const [quotations, setQuotations] = useState([]);
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

    // Form State
    const [companyDetails, setCompanyDetails] = useState({
        name: 'Zirak Books', address: '123 Business Avenue, Suite 404', email: 'info@zirakbooks.com', phone: '123-456-7890', notes: '', terms: ''
    });
    const [quotationMeta, setQuotationMeta] = useState({
        manualNo: '', date: new Date().toISOString().split('T')[0], validTill: ''
    });
    const [customerId, setCustomerId] = useState('');
    const [customerDetails, setCustomerDetails] = useState({ address: '', email: '', phone: '' });
    const [items, setItems] = useState([
        { id: Date.now(), productId: '', serviceId: '', warehouseId: '', qty: 1, rate: 0, tax: 0, discount: 0, total: 0, description: '' }
    ]);
    const [bankDetails, setBankDetails] = useState({
        bankName: 'HDFC Bank', accNo: '50200012345678', holderName: 'ABC Accounting Solutions Pvt. Ltd.', ifsc: 'HDFC0000456'
    });
    const [notes, setNotes] = useState('Thank you for your business!');
    const [terms, setTerms] = useState('"Payment is due within 15 days.",\n"Goods once sold will not be taken back."');
    const [attachments, setAttachments] = useState([]);
    const fileInputRef = useRef(null);

    // Initial Fetch
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
                setBankDetails({
                    bankName: data.bankName || 'HDFC Bank',
                    accNo: data.accountNumber || '50200012345678',
                    holderName: data.accountHolder || 'ABC Accounting Solutions Pvt. Ltd.',
                    ifsc: data.ifsc || 'HDFC0000456'
                });
                setNotes(data.notes || 'Thank you for your business!');
                setTerms(data.terms || '"Payment is due within 15 days.",\n"Goods once sold will not be taken back."');
            }
        } catch (error) {
            console.error('Error fetching company details:', error);
        }
    };

    const fetchData = async () => {
        try {
            setLoading(true);
            const companyId = GetCompanyId();
            const response = await salesQuotationService.getAll(companyId);
            if (response.data.success) {
                setQuotations(response.data.data);
            }
        } catch (error) {
            console.error('Error fetching quotations:', error);
        } finally {
            setLoading(false);
        }
    };

    const fetchDropdowns = async () => {
        try {
            const companyId = GetCompanyId();
            const [custRes, prodRes, whRes, servRes] = await Promise.all([
                customerService.getAll(companyId),
                productService.getAll(companyId),
                warehouseService.getAll(companyId),
                servicesService.getAll(companyId)
            ]);
            if (custRes.data.success) setCustomers(custRes.data.data);
            if (prodRes.data.success) setAllProducts(prodRes.data.data);
            if (whRes.data.success) setAllWarehouses(whRes.data.data);
            if (servRes.data.success) setAllServices(servRes.data.data);
        } catch (error) {
            console.error('Error fetching dropdowns:', error);
        }
    };

    // --- Actions ---
    const resetForm = () => {
        setEditingId(null);
        setCustomerId('');
        setCustomerDetails({ address: '', email: '', phone: '' });
        setQuotationMeta({ manualNo: '', date: new Date().toISOString().split('T')[0], validTill: '' });
        setItems([{ id: Date.now(), productId: '', serviceId: '', warehouseId: '', qty: 1, rate: 0, tax: 0, discount: 0, total: 0, description: '' }]);
        setNotes(companyDetails.notes || 'Thank you for your business!');
        setTerms(companyDetails.terms || '"Payment is due within 15 days.",\n"Goods once sold will not be taken back."');
        setAttachments([]);
        setShowAddModal(false);
    };

    const handleAddNew = () => {
        resetForm();
        setEditingId(null);
        setIsViewMode(false);
        setShowAddModal(true);
    };

    const handleEdit = async (id) => {
        await populateQuotation(id, false);
    };

    const handleView = async (id) => {
        await populateQuotation(id, true);
    };

    const populateQuotation = async (id, viewOnly) => {
        try {
            const companyId = GetCompanyId();
            const response = await salesQuotationService.getById(id, companyId);
            if (response.data.success) {
                const quoteToEdit = response.data.data;
                resetForm();
                setEditingId(id);
                setIsViewMode(viewOnly);
                setCustomerId(quoteToEdit.customerId);
                setCustomerDetails({
                    address: quoteToEdit.customer?.billingAddress || '',
                    email: quoteToEdit.customer?.email || '',
                    phone: quoteToEdit.customer?.phone || ''
                });
                setQuotationMeta({
                    manualNo: quoteToEdit.quotationNumber,
                    date: quoteToEdit.date.split('T')[0],
                    validTill: quoteToEdit.expiryDate ? quoteToEdit.expiryDate.split('T')[0] : ''
                });
                setItems((quoteToEdit.salesquotationitem || quoteToEdit.items || []).map(item => ({
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
                setNotes(quoteToEdit.notes || '');
                setTerms(quoteToEdit.terms || '');
                setShowAddModal(true);
            }
        } catch (error) {
            console.error('Error loading quotation:', error);
        }
    };

    const handleDelete = (id) => {
        setDeleteId(id);
        setShowDeleteConfirm(true);
    };

    const confirmDelete = async () => {
        try {
            const companyId = GetCompanyId();
            const response = await salesQuotationService.delete(deleteId, companyId);
            if (response.data.success) {
                fetchData();
                setShowDeleteConfirm(false);
                setDeleteId(null);
            }
        } catch (error) {
            console.error('Error deleting quotation:', error);
        }
    };

    const handleSave = async () => {
        try {
            const companyId = GetCompanyId();
            const data = {
                quotationNumber: editingId ? quotations.find(q => q.id === editingId)?.quotationNumber : `QUO-${Date.now()}`,
                date: quotationMeta.date,
                expiryDate: quotationMeta.validTill,
                customerId: parseInt(customerId),
                companyId: companyId,
                notes: notes,
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
                response = await salesQuotationService.update(editingId, data, companyId);
            } else {
                response = await salesQuotationService.create(data);
            }

            if (response.data.success) {
                fetchData();
                setShowAddModal(false);
            }
        } catch (error) {
            console.error('Error saving quotation:', error);
        }
    };

    // --- Calculation Helpers ---
    const addItem = () => {
        setItems([...items, { id: Date.now(), productId: '', serviceId: '', warehouseId: '', qty: 1, rate: 0, tax: 0, discount: 0, total: 0, description: '' }]);
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

    // --- Attachment Helpers ---
    const handleFileChange = (e) => {
        if (e.target.files && e.target.files.length > 0) {
            const newFiles = Array.from(e.target.files);
            setAttachments([...attachments, ...newFiles]);
        }
    };

    const triggerFileInput = () => {
        if (fileInputRef.current) {
            fileInputRef.current.click();
        }
    };

    const removeAttachment = (indexToRemove) => {
        setAttachments(attachments.filter((_, index) => index !== indexToRemove));
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

    const salesProcess = [
        { id: 'quotation', label: 'Quotation', icon: FileText, status: 'active' },
        { id: 'sales-order', label: 'Sales Order', icon: ShoppingCart, status: 'pending' },
        { id: 'delivery', label: 'Delivery', icon: Truck, status: 'pending' },
        { id: 'invoice', label: 'Invoice', icon: Receipt, status: 'pending' },
        { id: 'payment', label: 'Payment', icon: CreditCard, status: 'pending' },
    ];

    return (
        <div className="Quotation-quotation-page">
            <div className="Quotation-page-header">
                <div>
                    <h1 className="Quotation-page-title">Quotation</h1>
                    <p className="Quotation-page-subtitle">Create and manage customer quotations</p>
                </div>
                <button className="Quotation-btn-add" onClick={handleAddNew}>
                    <Plus size={18} className="mr-2" /> Create Quotation
                </button>
            </div>

            <div className="Quotation-process-tracker-card">
                <div className="Quotation-tracker-wrapper">
                    {salesProcess.map((step, index) => (
                        <React.Fragment key={step.id}>
                            <div className={`Quotation-tracker-step ${step.status}`}>
                                <div className="Quotation-step-icon-wrapper">
                                    <step.icon size={20} />
                                    {step.status === 'completed' && <CheckCircle2 className="Quotation-status-badge" size={14} />}
                                    {step.status === 'active' && <Clock className="Quotation-status-badge" size={14} />}
                                </div>
                                <span className="Quotation-step-label">{step.label}</span>
                            </div>
                            {index < salesProcess.length - 1 && (
                                <div className={`Quotation-tracker-divider ${salesProcess[index + 1].status !== 'pending' ? 'Quotation-active' : ''}`}>
                                    <ArrowRight size={16} />
                                </div>
                            )}
                        </React.Fragment>
                    ))}
                </div>
            </div>

            <div className="Quotation-table-card mt-6">
                <div className="Quotation-table-container">
                    <table className="Quotation-quotation-table">
                        <thead>
                            <tr>
                                <th>QUOTATION ID</th>
                                <th>CUSTOMER</th>
                                <th>DATE</th>
                                <th>VALID TILL</th>
                                <th>AMOUNT</th>
                                <th>STATUS</th>
                                <th className="text-right">ACTION</th>
                            </tr>
                        </thead>
                        <tbody>
                            {quotations.map(q => (
                                <tr key={q.id}>
                                    <td className="font-bold text-blue-600">{q.quotationNumber}</td>
                                    <td>{q.customer?.name}</td>
                                    <td>{new Date(q.date).toLocaleDateString()}</td>
                                    <td>{q.expiryDate ? new Date(q.expiryDate).toLocaleDateString() : 'N/A'}</td>
                                    <td>{formatCurrency(q.totalAmount)}</td>
                                    <td><span className={`Quotation-quotation-status-pill ${'' + ((q.status || 'Pending').toLowerCase().replace(/\s+/g, '-'))}`}>{q.status || 'Pending'}</span></td>
                                    <td>
                                        <div className="Quotation-quotation-action-buttons">
                                            <button className="Quotation-quotation-action-btn Quotation-view" onClick={() => handleView(q.id)} title="View"><Eye size={16} /></button>
                                            <button className="Quotation-quotation-action-btn Quotation-edit" onClick={() => handleEdit(q.id)} title="Edit"><Pencil size={16} /></button>
                                            <button className="Quotation-quotation-action-btn Quotation-delete" onClick={() => handleDelete(q.id)} title="Delete"><Trash2 size={16} /></button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Premium Create/Edit Modal */}
            {showAddModal && (
                <div className="Quotation-modal-overlay">
                    <div className="Quotation-modal-content Quotation-quotation-form-modal">
                        <div className="Quotation-modal-header-simple">
                            <h2 className="text-xl font-bold text-gray-800">
                                {isViewMode ? 'View Quotation' : editingId ? 'Edit Quotation' : 'New Quotation'}
                            </h2>
                            <button className="Quotation-close-btn-simple" onClick={() => setShowAddModal(false)}>
                                <X size={24} />
                            </button>
                        </div>

                        <div className="Quotation-modal-body-scrollable">
                            <div className="Quotation-form-section-grid">
                                <div className="Quotation-company-section">
                                    <div className="Quotation-logo-upload-box">
                                        {companyDetails.logo ? (
                                            <img src={companyDetails.logo} alt="Company Logo" style={{ maxWidth: '100%', maxHeight: '50px', objectFit: 'contain' }} />
                                        ) : (
                                            <h1 className="Quotation-company-logo-text">BOOK</h1>
                                        )}
                                    </div>
                                    <div className="Quotation-company-inputs">
                                        <input type="text" className="Quotation-full-width-input Quotation-user-editable"
                                            value={companyDetails.name} onChange={(e) => setCompanyDetails({ ...companyDetails, name: e.target.value })} />
                                        <input type="text" className="Quotation-full-width-input Quotation-user-editable"
                                            value={companyDetails.address} onChange={(e) => setCompanyDetails({ ...companyDetails, address: e.target.value })} />
                                        <input type="text" className="Quotation-full-width-input Quotation-user-editable"
                                            value={companyDetails.email} onChange={(e) => setCompanyDetails({ ...companyDetails, email: e.target.value })} />
                                    </div>
                                </div>
                                <div className="Quotation-meta-section">
                                    <div className="Quotation-meta-row">
                                        <label>Quotation No.</label>
                                        <input type="text" value={editingId ? quotations.find(q => q.id === editingId)?.quotationNumber : "QUO-2024-NEW"} disabled className="Quotation-meta-input Quotation-disabled" />
                                    </div>
                                    <div className="Quotation-meta-row">
                                        <label>Manual Ref</label>
                                        <input type="text" placeholder="e.g. REF-001"
                                            disabled={isViewMode}
                                            value={quotationMeta.manualNo} onChange={(e) => setQuotationMeta({ ...quotationMeta, manualNo: e.target.value })}
                                            className="Quotation-meta-input" />
                                    </div>
                                    <div className="Quotation-meta-row">
                                        <label>Date</label>
                                        <input type="date"
                                            disabled={isViewMode}
                                            value={quotationMeta.date} onChange={(e) => setQuotationMeta({ ...quotationMeta, date: e.target.value })}
                                            className="Quotation-meta-input" />
                                    </div>
                                    <div className="Quotation-meta-row">
                                        <label>Valid Till</label>
                                        <input type="date"
                                            disabled={isViewMode}
                                            value={quotationMeta.validTill} onChange={(e) => setQuotationMeta({ ...quotationMeta, validTill: e.target.value })}
                                            className="Quotation-meta-input" />
                                    </div>
                                    <div className="Quotation-status-indicator">
                                        QUOTATION
                                    </div>
                                </div>
                            </div>

                            <hr className="Quotation-divider" />

                            <div className="Quotation-customer-section">
                                <div className="Quotation-form-group mb-2">
                                    <label className="Quotation-form-label-sm">Quotation To</label>
                                    <select className="Quotation-form-select-large"
                                        disabled={isViewMode}
                                        value={customerId} onChange={(e) => {
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
                                        }}>
                                        <option value="">Select Customer...</option>
                                        {customers.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                                    </select>
                                </div>
                                <div className="Quotation-customer-details-grid">
                                    <input type="text" placeholder="Billing Address" className="Quotation-detail-input"
                                        disabled={isViewMode}
                                        value={customerDetails.address} onChange={(e) => setCustomerDetails({ ...customerDetails, address: e.target.value })} />
                                    <input type="email" placeholder="Email Address" className="Quotation-detail-input"
                                        disabled={isViewMode}
                                        value={customerDetails.email} onChange={(e) => setCustomerDetails({ ...customerDetails, email: e.target.value })} />
                                    <input type="tel" placeholder="Phone Number" className="Quotation-detail-input"
                                        disabled={isViewMode}
                                        value={customerDetails.phone} onChange={(e) => setCustomerDetails({ ...customerDetails, phone: e.target.value })} />
                                </div>
                            </div>

                            <div className="Quotation-items-section-new">
                                {!isViewMode && (
                                    <button className="Quotation-btn-add-row" onClick={addItem}>
                                        <Plus size={14} /> Add Line Item
                                    </button>
                                )}
                                <div className="Quotation-table-responsive">
                                    <table className="Quotation-new-items-table">
                                        <thead>
                                            <tr>
                                                <th style={{ width: '25%' }}>ITEM DETAIL</th>
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
                                                        <select className="Quotation-full-width-input"
                                                            disabled={isViewMode}
                                                            value={item.productId ? `p-${item.productId}` : item.serviceId ? `s-${item.serviceId}` : ''}
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
                                                        <select className="Quotation-full-width-input"
                                                            disabled={isViewMode}
                                                            value={item.warehouseId} onChange={(e) => updateItem(item.id, 'warehouseId', e.target.value)}>
                                                            <option value="">Select Warehouse...</option>
                                                            {allWarehouses.map(w => <option key={w.id} value={w.id}>{w.name}</option>)}
                                                        </select>
                                                    </td>
                                                    <td>
                                                        <input type="number" className="Quotation-qty-input" value={item.qty}
                                                            disabled={isViewMode}
                                                            onChange={(e) => updateItem(item.id, 'qty', e.target.value)} />
                                                    </td>
                                                    <td>
                                                        <input type="number" className="Quotation-rate-input" value={item.rate}
                                                            disabled={isViewMode}
                                                            onChange={(e) => updateItem(item.id, 'rate', e.target.value)} />
                                                    </td>
                                                    <td>
                                                        <input type="number" className="Quotation-tax-input" value={item.tax}
                                                            disabled={isViewMode}
                                                            onChange={(e) => updateItem(item.id, 'tax', e.target.value)} />
                                                    </td>
                                                    <td>
                                                        <input type="number" className="Quotation-discount-input" value={item.discount}
                                                            disabled={isViewMode}
                                                            onChange={(e) => updateItem(item.id, 'discount', e.target.value)} />
                                                    </td>
                                                    <td>
                                                        <input type="text" className="Quotation-amount-input Quotation-disabled" value={formatCurrency(item.total || 0)} disabled />
                                                    </td>
                                                    <td className="text-center">
                                                        <button className="Quotation-btn-delete-row" onClick={() => removeItem(item.id)}>
                                                            <Trash2 size={16} />
                                                        </button>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>

                            <div className="Quotation-totals-layout">
                                <div className="Quotation-totals-spacer"></div>
                                <div className="Quotation-totals-box">
                                    <div className="Quotation-t-row">
                                        <span>Sub Total:</span>
                                        <span>{formatCurrency(totals.subTotal)}</span>
                                    </div>
                                    <div className="Quotation-t-row">
                                        <span>Discount:</span>
                                        <span className="text-red-500">-{formatCurrency(totals.discount)}</span>
                                    </div>
                                    <div className="Quotation-t-row">
                                        <span>Tax Total:</span>
                                        <span>{formatCurrency(totals.tax)}</span>
                                    </div>
                                    <div className="Quotation-t-row Quotation-total">
                                        <span>Grand Total:</span>
                                        <span>{formatCurrency(totals.total)}</span>
                                    </div>
                                </div>
                            </div>

                            <div className="Quotation-form-footer-grid">
                                <div className="Quotation-bank-terms-col">
                                    <label className="Quotation-section-label">Bank Details</label>
                                    <div className="Quotation-bank-details-box">
                                        <input type="text" className="Quotation-bank-input" placeholder="Bank Name" value={bankDetails.bankName} onChange={(e) => setBankDetails({ ...bankDetails, bankName: e.target.value })} />
                                        <input type="text" className="Quotation-bank-input" placeholder="Account No" value={bankDetails.accNo} onChange={(e) => setBankDetails({ ...bankDetails, accNo: e.target.value })} />
                                        <input type="text" className="Quotation-bank-input" placeholder="Account Holder" value={bankDetails.holderName} onChange={(e) => setBankDetails({ ...bankDetails, holderName: e.target.value })} />
                                        <input type="text" className="Quotation-bank-input" placeholder="IFSC / Swift" value={bankDetails.ifsc} onChange={(e) => setBankDetails({ ...bankDetails, ifsc: e.target.value })} />
                                    </div>
                                    <div className="Quotation-terms-section my-4">
                                        <label className="Quotation-section-label">Attachments</label>
                                        <div className="Quotation-attachments-row">
                                            <input
                                                type="file"
                                                multiple
                                                ref={fileInputRef}
                                                style={{ display: 'none' }}
                                                onChange={handleFileChange}
                                            />
                                            {/* We can re-use the same button for generic file upload or separate if needed. 
                                                For now, mapping both buttons to the same input or just making one generic. */}
                                            <button className="Quotation-btn-upload-small" onClick={triggerFileInput}>
                                                <span className="Quotation-icon">📎</span> Attach Files
                                            </button>
                                        </div>
                                        {/* Attachment Preview List */}
                                        {attachments.length > 0 && (
                                            <div className="Quotation-attachment-list">
                                                {attachments.map((file, index) => (
                                                    <div key={index} className="Quotation-attachment-item">
                                                        <span className="Quotation-attachment-name">{file.name}</span>
                                                        <button onClick={() => removeAttachment(index)} className="Quotation-btn-remove-file">
                                                            <X size={14} />
                                                        </button>
                                                    </div>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                </div>
                                <div className="Quotation-notes-col">
                                    <label className="Quotation-section-label">Notes</label>
                                    <textarea className="Quotation-notes-area"
                                        disabled={isViewMode}
                                        value={notes} onChange={(e) => setNotes(e.target.value)}></textarea>
                                </div>
                            </div>

                            <div className="Quotation-terms-section my-4">
                                <label className="Quotation-section-label">Terms & Conditions</label>
                                <textarea className="Quotation-terms-area"
                                    Quotation-disabled={isViewMode}
                                    value={terms} onChange={(e) => setTerms(e.target.value)} />
                            </div>

                            <div className="Quotation-thank-you-note">
                                <p>Thank you for your business!</p>
                            </div>

                        </div>

                        <div className="Quotation-modal-footer-simple">
                            <button className="Quotation-btn-plain" onClick={() => setShowAddModal(false)}>Close</button>
                            {!isViewMode && (
                                <button className="Quotation-btn-primary-green" onClick={handleSave}>
                                    {editingId ? 'Update Quotation' : 'Save Quotation'}
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            )}

            {/* Delete Confirmation Modal - User Design Match */}
            {showDeleteConfirm && (
                <div className="Quotation-modal-overlay">
                    <div className="Quotation-delete-confirmation-box">
                        <div className="Quotation-delete-modal-header">
                            <h3 className="Quotation-delete-modal-title">Delete Quotation?</h3>
                            <button className="Quotation-delete-close-btn" onClick={() => setShowDeleteConfirm(false)}>
                                <X size={20} />
                            </button>
                        </div>
                        <div className="Quotation-delete-modal-body">
                            <p>Are you sure you want to delete this quotation? This action cannot be undone.</p>
                        </div>
                        <div className="Quotation-delete-modal-footer">
                            <button className="Quotation-btn-cancel" onClick={() => setShowDeleteConfirm(false)}>Cancel</button>
                            <button className="Quotation-btn-delete-confirm" onClick={confirmDelete}>Delete</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Quotation;

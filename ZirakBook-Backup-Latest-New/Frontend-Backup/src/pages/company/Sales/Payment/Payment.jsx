import React, { useState } from 'react';
import {
    Search, Plus, Eye, Pencil, Trash2, X, ChevronDown,
    FileText, ShoppingCart, Truck, Receipt, CreditCard,
    CheckCircle2, Clock, ArrowRight, Download, Send, Printer,
    Wallet
} from 'lucide-react';
import './Payment.css';
import salesReceiptService from '../../../../api/salesReceiptService';
import salesInvoiceService from '../../../../api/salesInvoiceService';
import customerService from '../../../../api/customerService';
import ledgerService from '../../../../api/ledgerService';
import companyService from '../../../../api/companyService';
import GetCompanyId from '../../../../api/GetCompanyId';
import { CompanyContext } from '../../../../context/CompanyContext';

const Payment = () => {
    // --- State Management ---
    const { formatCurrency } = React.useContext(CompanyContext);
    const [receipts, setReceipts] = useState([]);
    const [invoices, setInvoices] = useState([]);
    const [allLedgers, setAllLedgers] = useState([]); // Store all fetched ledgers
    const [ledgers, setLedgers] = useState([]); // Filtered ledgers for dropdown

    const [loading, setLoading] = useState(true);

    const [showAddModal, setShowAddModal] = useState(false);
    const [showInvoiceSelect, setShowInvoiceSelect] = useState(false);
    const [selectedInvoice, setSelectedInvoice] = useState(null);

    // Edit & Delete State
    const [isEditMode, setIsEditMode] = useState(false);
    const [isViewMode, setIsViewMode] = useState(false);
    const [editId, setEditId] = useState(null);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [deleteId, setDeleteId] = useState(null);

    // Form State
    const [customerId, setCustomerId] = useState('');
    const [customerLedgerId, setCustomerLedgerId] = useState(null);
    const [customerName, setCustomerName] = useState('');
    const [paymentDate, setPaymentDate] = useState(new Date().toISOString().split('T')[0]);
    const [paymentMode, setPaymentMode] = useState('BANK');
    const [amountReceived, setAmountReceived] = useState(0);
    const [reference, setReference] = useState('');
    const [bankLedgerId, setBankLedgerId] = useState('');
    const [notes, setNotes] = useState('');

    // Initial Fetch
    React.useEffect(() => {
        fetchData();
        fetchDropdowns();
        fetchCompanyDetails();
    }, []);

    const [companyDetails, setCompanyDetails] = useState({
        name: 'Zirak Books', address: '', email: '', phone: '', logo: null, notes: '', showQr: true
    });

    const fetchCompanyDetails = async () => {
        try {
            const companyId = GetCompanyId();
            if (companyId) {
                const res = await companyService.getById(companyId);
                const data = res.data;
                setCompanyDetails({
                    name: data.name || 'Zirak Books',
                    address: data.address || '',
                    email: data.email || '',
                    phone: data.phone || '',
                    logo: data.logo || null,
                    notes: data.notes || '',
                    showQr: data.showQrCode !== undefined ? data.showQrCode : true
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
            const response = await salesReceiptService.getAll(companyId);
            if (response.data.success) {
                setReceipts(response.data.data);
            }
        } catch (error) {
            console.error('Error fetching receipts:', error);
        } finally {
            setLoading(false);
        }
    };

    const fetchDropdowns = async () => {
        try {
            const companyId = GetCompanyId();
            const [invRes, ledgerRes] = await Promise.all([
                salesInvoiceService.getAll(companyId),
                ledgerService.getAll(companyId)
            ]);
            if (invRes.data.success) {
                setInvoices(invRes.data.data.filter(inv => inv.balanceAmount > 0));
            }
            if (ledgerRes.data.success) {
                setAllLedgers(ledgerRes.data.data);
            }
        } catch (error) {
            console.error('Error fetching dropdowns:', error);
        }
    };

    // Filter ledgers when customerId or allLedgers change
    React.useEffect(() => {
        if (allLedgers.length > 0) {
            let filtered;
            if (customerLedgerId) {
                // User Request: Only show the account of the customer whose payment is being created
                filtered = allLedgers.filter(l => l.id === parseInt(customerLedgerId));
            } else {
                // Default: Show Bank/Cash if no customer selected
                filtered = allLedgers.filter(l =>
                    l.group?.name === 'Bank Accounts' ||
                    l.group?.name === 'Cash-in-hand' ||
                    l.subGroup?.name === 'Bank' ||
                    l.subGroup?.name === 'Cash'
                );
            }
            setLedgers(filtered);

            // Auto-select if only one option is available (e.g. Customer Ledger)
            if (filtered.length === 1) {
                setBankLedgerId(filtered[0].id);
            }
        }
    }, [customerLedgerId, allLedgers]);

    const salesProcess = [
        { id: 'quotation', label: 'Quotation', icon: FileText, status: 'completed' },
        { id: 'sales-order', label: 'Sales Order', icon: ShoppingCart, status: 'completed' },
        { id: 'delivery', label: 'Delivery', icon: Truck, status: 'completed' },
        { id: 'invoice', label: 'Invoice', icon: Receipt, status: 'completed' },
        { id: 'payment', label: 'Payment', icon: CreditCard, status: 'active' },
    ];

    const handleSelectInvoice = (inv) => {
        setSelectedInvoice(inv);
        setCustomerId(inv.customerId);
        setCustomerLedgerId(inv.customer?.ledgerId);
        setCustomerName(inv.customer?.name || '');
        setAmountReceived(inv.balanceAmount);
        setShowInvoiceSelect(false);
    };

    const resetForm = () => {
        setIsEditMode(false);
        setIsViewMode(false);
        setEditId(null);
        setSelectedInvoice(null);
        setCustomerId('');
        setCustomerLedgerId(null);
        setCustomerName('');
        setAmountReceived(0);
        setPaymentDate(new Date().toISOString().split('T')[0]);
        setPaymentMode('BANK');
        setReference('');
        setBankLedgerId('');
        setNotes(companyDetails.notes || '');
        setShowInvoiceSelect(false);
        // We do NOT reset allLedgers here, it persists
    };

    const handleSave = async () => {
        try {
            const companyId = GetCompanyId();
            const data = {
                receiptNumber: `REC-${Date.now()}`,
                date: paymentDate,
                customerId: parseInt(customerId),
                invoiceId: parseInt(selectedInvoice.id),
                cashBankAccountId: parseInt(bankLedgerId),
                amount: parseFloat(amountReceived),
                paymentMode: paymentMode,
                referenceNumber: reference,
                notes: notes,
                companyId: parseInt(companyId)
            };

            const response = await salesReceiptService.create(data);
            if (response.data.success) {
                fetchData();
                setShowAddModal(false);
            }
        } catch (error) {
            console.error('Error saving receipt:', error);
        }
    };

    const handleOpenModal = () => {
        resetForm();
        setIsViewMode(false);
        setShowInvoiceSelect(true); // Default to showing invoice select for new payment
        setShowAddModal(true);
    };

    const handleEdit = async (paymentId) => {
        await populatePayment(paymentId, false);
    };

    const handleView = async (paymentId) => {
        await populatePayment(paymentId, true);
    };

    const populatePayment = async (paymentId, viewOnly) => {
        try {
            const companyId = GetCompanyId();
            const response = await salesReceiptService.getById(paymentId, companyId);
            if (response.data.success) {
                const rec = response.data.data;
                resetForm();
                setIsEditMode(!viewOnly);
                setIsViewMode(viewOnly);
                setEditId(paymentId);

                // Fetch invoice with items if invoice exists
                let invoiceWithItems = rec.invoice;
                if (rec.invoice?.id) {
                    try {
                        const invoiceResponse = await salesInvoiceService.getById(rec.invoice.id, companyId);
                        if (invoiceResponse.data.success) {
                            invoiceWithItems = invoiceResponse.data.data;
                        }
                    } catch (err) {
                        console.error('Error fetching invoice details:', err);
                    }
                }

                setSelectedInvoice(invoiceWithItems);
                setCustomerId(rec.customerId);
                setCustomerLedgerId(rec.customer?.ledgerId);
                setCustomerName(rec.customer?.name || '');
                setAmountReceived(rec.amount);
                setPaymentDate(rec.date.split('T')[0]);
                setPaymentMode(rec.paymentMode || 'Bank');
                setReference(rec.referenceNumber || '');
                setBankLedgerId(rec.cashBankAccountId || ''); // Ensure backend returns this or we need to check receipt schema
                setNotes(rec.notes || '');
                setShowInvoiceSelect(false);
                setShowAddModal(true);
            }
        } catch (error) {
            console.error('Error fetching payment details:', error);
        }
    };

    const handleDeleteClick = (id) => {
        setDeleteId(id);
        setShowDeleteModal(true);
    };

    const confirmDelete = async () => {
        try {
            const companyId = GetCompanyId();
            await salesReceiptService.delete(deleteId, companyId);
            fetchData();
            setShowDeleteModal(false);
            setDeleteId(null);
        } catch (error) {
            console.error('Error deleting receipt:', error);
        }
    };

    const handlePrint = () => {
        // Add print class to body to trigger print styles
        document.body.classList.add('printing');

        // Trigger print dialog
        window.print();

        // Remove print class after printing
        setTimeout(() => {
            document.body.classList.remove('printing');
        }, 1000);
    };

    return (
        <div className="SalesPayment-payment-page">
            <div className="SalesPayment-page-header">
                <div className="SalesPayment-header-left">
                    <h1 className="SalesPayment-page-title">Received Payments</h1>
                    <p className="SalesPayment-page-subtitle">Record and track customer payments</p>
                </div>
                <div className="SalesPayment-header-actions">
                    <button className="SalesPayment-btn-add" onClick={handleOpenModal}>
                        <Plus size={18} className="mr-2" /> Record Payment
                    </button>
                </div>
            </div>

            {/* Sales Process Tracker */}
            <div className="SalesPayment-process-tracker-card">
                <div className="SalesPayment-tracker-wrapper">
                    {salesProcess.map((step, index) => (
                        <React.Fragment key={step.id}>
                            <div className={`SalesPayment-tracker-step ${step.status}`}>
                                <div className="SalesPayment-step-icon-wrapper">
                                    <step.icon size={20} />
                                    {step.status === 'completed' && <CheckCircle2 className="SalesPayment-status-badge" size={14} />}
                                    {step.status === 'active' && <Clock className="SalesPayment-status-badge" size={14} />}
                                </div>
                                <span className="SalesPayment-step-label">{step.label}</span>
                            </div>
                            {index < salesProcess.length - 1 && (
                                <div className={`SalesPayment-tracker-divider ${salesProcess[index + 1].status !== 'pending' ? 'SalesPayment-active' : ''}`}>
                                    <ArrowRight size={16} />
                                </div>
                            )}
                        </React.Fragment>
                    ))}
                </div>
            </div>

            <div className="SalesPayment-table-card mt-6">
                <div className="SalesPayment-table-controls">
                    <div className="SalesPayment-search-control">
                        <Search size={18} className="SalesPayment-search-icon" />
                        <input type="text" placeholder="Search payments..." className="SalesPayment-search-input" />
                    </div>
                </div>

                <div className="SalesPayment-table-container">
                    <table className="SalesPayment-payment-table">
                        <thead>
                            <tr>
                                <th>PAYMENT ID</th>
                                <th>INVOICE</th>
                                <th>CUSTOMER</th>
                                <th>DATE</th>
                                <th>MODE</th>
                                <th>AMOUNT</th>
                                <th className="text-right">ACTION</th>
                            </tr>
                        </thead>
                        <tbody>
                            {receipts.map(rec => (
                                <tr key={rec.id}>
                                    <td className="font-bold text-blue-600">{rec.receiptNumber}</td>
                                    <td><span className="SalesPayment-source-link">{rec.invoice?.invoiceNumber}</span></td>
                                    <td>{rec.customer?.name}</td>
                                    <td>{new Date(rec.date).toLocaleDateString()}</td>
                                    <td>{rec.paymentMode}</td>
                                    <td className="font-bold SalesPayment-text-green-600">{formatCurrency(rec.amount)}</td>
                                    <td className="text-right">
                                        <div className="SalesPayment-payment-action-buttons">
                                            <button className="SalesPayment-payment-action-btn SalesPayment-view" onClick={() => handleView(rec.id)} title="View"><Eye size={16} /></button>
                                            <button className="SalesPayment-payment-action-btn SalesPayment-delete" onClick={() => handleDeleteClick(rec.id)} title="Delete"><Trash2 size={16} /></button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Record Payment Modal */}
            {showAddModal && (
                <div className={`SalesPayment-modal-overlay ${isViewMode ? 'SalesPayment-view-mode-overlay' : ''}`}>
                    <div className={`SalesPayment-modal-content SalesPayment-payment-modal ${isViewMode ? 'SalesPayment-view-mode-modal' : ''}`}>
                        {!isViewMode && (
                            <div className="SalesPayment-modal-header">
                                <div>
                                    <h2 className="SalesPayment-modal-title">{isEditMode ? 'Edit Payment' : 'Record Payment'}</h2>
                                    <p className="SalesPayment-modal-subtitle">{isEditMode ? 'Update payment details' : 'Log payment against an invoice'}</p>
                                </div>
                                <button className="SalesPayment-close-btn" onClick={() => setShowAddModal(false)}>
                                    <X size={20} />
                                </button>
                            </div>
                        )}

                        {isViewMode && (
                            <div className="SalesPayment-view-mode-header SalesPayment-no-print">
                                <div>
                                    <h2 className="SalesPayment-modal-title">View Payment</h2>
                                    <p className="SalesPayment-modal-subtitle">Payment receipt and invoice details</p>
                                </div>
                                <div className="SalesPayment-view-mode-actions">
                                    <button className="SalesPayment-btn-secondary" onClick={handlePrint}>
                                        <Printer size={16} /> Print Receipt
                                    </button>
                                    <button className="SalesPayment-close-btn" onClick={() => setShowAddModal(false)}>
                                        <X size={20} />
                                    </button>
                                </div>
                            </div>
                        )}

                        <div className={`SalesPayment-modal-body ${isViewMode ? 'SalesPayment-view-mode-body' : ''}`}>
                            {isViewMode ? (
                                // --- VIEW MODE: INVOICE TEMPLATE ---
                                <div className="SalesPayment-invoice-view-template" id="invoice-print-content">
                                    {/* Header */}
                                    <div className="SalesPayment-invoice-header-section">
                                        <div className="SalesPayment-invoice-company-info">
                                            {companyDetails.logo ? (
                                                <img src={companyDetails.logo} alt="Company Logo" className="SalesPayment-invoice-logo" />
                                            ) : (
                                                <div className="SalesPayment-invoice-logo-placeholder">ZB</div>
                                            )}
                                            <h2 className="SalesPayment-invoice-company-name">{companyDetails.name}</h2>
                                            <div className="SalesPayment-invoice-company-details">
                                                <p>{companyDetails.email}</p>
                                                <p>{companyDetails.phone}</p>
                                                <p>{companyDetails.address}</p>
                                            </div>
                                        </div>
                                        <div className="SalesPayment-invoice-meta-section">
                                            <h1 className="SalesPayment-invoice-title">PAYMENT</h1>
                                            <div className="SalesPayment-invoice-meta-details">
                                                <p><span className="SalesPayment-invoice-meta-label">Number:</span> #{selectedInvoice?.invoiceNumber || 'N/A'}</p>
                                                <p><span className="SalesPayment-invoice-meta-label">Issue:</span> {selectedInvoice?.date ? new Date(selectedInvoice.date).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' }) : 'N/A'}</p>
                                                <p><span className="SalesPayment-invoice-meta-label">Due Date:</span> {selectedInvoice?.dueDate ? new Date(selectedInvoice.dueDate).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' }) : 'N/A'}</p>
                                            </div>
                                            {companyDetails.showQr && (
                                                <div className="SalesPayment-invoice-qr-code">
                                                    <img src={`https://api.qrserver.com/v1/create-qr-code/?size=100x100&data=${selectedInvoice?.invoiceNumber || 'Invoice'}`} alt="QR Code" />
                                                </div>
                                            )}
                                        </div>
                                    </div>

                                    {/* Bill To & Ship To */}
                                    <div className="SalesPayment-invoice-addresses-section">
                                        <div className="SalesPayment-invoice-bill-to-section">
                                            <h3 className="SalesPayment-invoice-section-title">Bill To:</h3>
                                            <p className="SalesPayment-invoice-customer-name">{selectedInvoice?.customer?.billingName || selectedInvoice?.customer?.name || customerName || '<Customer Name>'}</p>
                                            <p className="SalesPayment-invoice-customer-address">{selectedInvoice?.customer?.billingAddress || '<Address>'}</p>
                                            <p className="SalesPayment-invoice-customer-city">
                                                {(() => {
                                                    const city = selectedInvoice?.customer?.billingCity || '';
                                                    const state = selectedInvoice?.customer?.billingState || '';
                                                    const zip = selectedInvoice?.customer?.billingZipCode || '';
                                                    if (city || state || zip) {
                                                        const parts = [city, state, zip].filter(Boolean);
                                                        return parts.length > 0 ? parts.join(', ') : '<City>, <State> <Zip>';
                                                    }
                                                    return '<City>, <State> <Zip>';
                                                })()}
                                            </p>
                                        </div>
                                        <div className="SalesPayment-invoice-ship-to-section">
                                            <h3 className="SalesPayment-invoice-section-title">Ship To:</h3>
                                            <p className="SalesPayment-invoice-customer-name">{selectedInvoice?.customer?.shippingName || selectedInvoice?.customer?.billingName || selectedInvoice?.customer?.name || customerName || '<Customer Name>'}</p>
                                            <p className="SalesPayment-invoice-customer-address">{selectedInvoice?.customer?.shippingAddress || selectedInvoice?.customer?.billingAddress || '<Address>'}</p>
                                            <p className="SalesPayment-invoice-customer-city">
                                                {(() => {
                                                    // Try shipping address first
                                                    let city = selectedInvoice?.customer?.shippingCity || '';
                                                    let state = selectedInvoice?.customer?.shippingState || '';
                                                    let zip = selectedInvoice?.customer?.shippingZipCode || '';

                                                    // Fallback to billing if shipping not available
                                                    if (!city && !state && !zip) {
                                                        city = selectedInvoice?.customer?.billingCity || '';
                                                        state = selectedInvoice?.customer?.billingState || '';
                                                        zip = selectedInvoice?.customer?.billingZipCode || '';
                                                    }

                                                    if (city || state || zip) {
                                                        const parts = [city, state, zip].filter(Boolean);
                                                        return parts.length > 0 ? parts.join(', ') : '<City>, <State> <Zip>';
                                                    }
                                                    return '<City>, <State> <Zip>';
                                                })()}
                                            </p>
                                        </div>
                                    </div>

                                    {/* Items Table */}
                                    {(selectedInvoice?.invoiceitem || selectedInvoice?.items)?.length > 0 && (
                                        <div className="SalesPayment-invoice-items-section">
                                            <table className="SalesPayment-invoice-items-table">
                                                <thead>
                                                    <tr>
                                                        <th>Item</th>
                                                        <th>Warehouse</th>
                                                        <th>Quantity</th>
                                                        <th>Rate</th>
                                                        <th>Discount</th>
                                                        <th>Tax (%)</th>
                                                        <th>Price</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {((selectedInvoice?.invoiceitem || selectedInvoice?.items) || []).map((item, idx) => (
                                                        <tr key={idx}>
                                                            <td>
                                                                <div className="font-bold">{item.product?.name || item.service?.name || 'Item'}</div>
                                                                <div className="SalesPayment-text-xs SalesPayment-text-slate-500">{item.description}</div>
                                                            </td>
                                                            <td>{item.warehouse?.name || 'N/A'}</td>
                                                            <td>{item.quantity || 0}</td>
                                                            <td>{formatCurrency(item.rate || 0)}</td>
                                                            <td>{formatCurrency(item.discount || 0)}</td>
                                                            <td>Tax {(item.taxRate || 0)}%</td>
                                                            <td>{formatCurrency(item.amount || 0)}</td>
                                                        </tr>
                                                    ))}
                                                </tbody>
                                            </table>
                                        </div>
                                    )}

                                    {/* Totals */}
                                    <div className="SalesPayment-invoice-totals-section">
                                        <div className="SalesPayment-invoice-total-row">
                                            <span className="SalesPayment-invoice-total-label">Sub Total</span>
                                            <span className="SalesPayment-invoice-total-value">{formatCurrency(Object.values(selectedInvoice?.invoiceitem || selectedInvoice?.items || []).reduce((acc, item) => acc + (item.quantity * item.rate), 0))}</span>
                                        </div>
                                        <div className="SalesPayment-invoice-total-row">
                                            <span className="SalesPayment-invoice-total-label">Tax</span>
                                            <span className="SalesPayment-invoice-total-value">{formatCurrency(selectedInvoice?.taxAmount || 0)}</span>
                                        </div>
                                        <div className="SalesPayment-invoice-total-row SalesPayment-invoice-total-final">
                                            <span className="SalesPayment-invoice-total-label">Total</span>
                                            <span className="SalesPayment-invoice-total-value">{formatCurrency(selectedInvoice?.totalAmount || 0)}</span>
                                        </div>
                                        <div className="SalesPayment-invoice-total-row">
                                            <span className="SalesPayment-invoice-total-label">Paid Amount</span>
                                            <span className="SalesPayment-invoice-total-value" style={{ color: '#10b981' }}>{formatCurrency(selectedInvoice?.paidAmount || 0)}</span>
                                        </div>
                                        <div className="SalesPayment-invoice-total-row" style={{ borderTop: '1px dashed #e2e8f0', marginTop: '0.5rem', paddingTop: '0.5rem' }}>
                                            <span className="SalesPayment-invoice-total-label">Balance Due</span>
                                            <span className="SalesPayment-invoice-total-value" style={{ color: '#ef4444', fontWeight: '700' }}>{formatCurrency(selectedInvoice?.balanceAmount || 0)}</span>
                                        </div>
                                    </div>

                                    {/* Payment Information */}
                                    <div className="SalesPayment-invoice-payment-info-section">
                                        <h3 className="SalesPayment-invoice-section-title">Payment Information</h3>
                                        <div className="SalesPayment-invoice-payment-details">
                                            <div className="SalesPayment-payment-detail-row">
                                                <span className="SalesPayment-payment-detail-label">Payment Method:</span>
                                                <span className="SalesPayment-payment-detail-value">{paymentMode || 'N/A'}</span>
                                            </div>
                                            <div className="SalesPayment-payment-detail-row">
                                                <span className="SalesPayment-payment-detail-label">Payment Date:</span>
                                                <span className="SalesPayment-payment-detail-value">{new Date(paymentDate).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}</span>
                                            </div>
                                            {reference && (
                                                <div className="SalesPayment-payment-detail-row">
                                                    <span className="SalesPayment-payment-detail-label">Reference Number:</span>
                                                    <span className="SalesPayment-payment-detail-value">{reference}</span>
                                                </div>
                                            )}
                                            <div className="SalesPayment-payment-detail-row">
                                                <span className="SalesPayment-payment-detail-label">Amount Received:</span>
                                                <span className="SalesPayment-payment-detail-value" style={{ color: '#10b981', fontWeight: '700' }}>{formatCurrency(amountReceived || 0)}</span>
                                            </div>
                                            <div className="SalesPayment-payment-detail-row">
                                                <span className="SalesPayment-payment-detail-label">Invoice Status:</span>
                                                <span className={`SalesPayment-payment-status-badge ${selectedInvoice?.status ? selectedInvoice.status.toLowerCase() : 'unpaid'}`}>
                                                    {selectedInvoice?.status || 'UNPAID'}
                                                </span>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Notes Section */}
                                    {companyDetails.notes && (
                                        <div className="SalesPayment-invoice-notes-section">
                                            <h3 className="SalesPayment-invoice-section-title">Notes</h3>
                                            <p className="SalesPayment-invoice-notes-text">{companyDetails.notes}</p>
                                        </div>
                                    )}
                                </div>
                            ) : (
                                // --- EDIT / CREATE MODE ---
                                <>
                                    {/* Invoice Selection List */}
                                    {showInvoiceSelect && !selectedInvoice && (
                                        <div className="SalesPayment-invoice-link-container">
                                            <h3 className="SalesPayment-text-sm font-bold SalesPayment-mb-3 SalesPayment-text-gray-700">Select Unpaid Invoice</h3>
                                            <div className="SalesPayment-invoice-grid">
                                                {invoices.map(inv => (
                                                    <div key={inv.id} className="SalesPayment-invoice-link-card" onClick={() => handleSelectInvoice(inv)}>
                                                        <div className="SalesPayment-i-card-header">
                                                            <span className="SalesPayment-i-id">{inv.invoiceNumber}</span>
                                                            <span className="SalesPayment-i-date">{new Date(inv.date).toLocaleDateString()}</span>
                                                        </div>
                                                        <div className="SalesPayment-i-card-body">
                                                            <span className="SalesPayment-i-customer">{inv.customer?.name}</span>
                                                            <div className="SalesPayment-i-amount">
                                                                <span>Due: </span>
                                                                <span className="font-bold text-red-500">{formatCurrency(inv.balanceAmount)}</span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    )}

                                    <div className="SalesPayment-form-container">
                                        {/* Company Info - Read Only (Dynamic) */}
                                        <div className="SalesPayment-company-info-readonly">
                                            {companyDetails.logo ? (
                                                <img src={companyDetails.logo} alt="Logo" className="SalesPayment-company-logo-fixed" />
                                            ) : (
                                                <div className="SalesPayment-logo-placeholder-fixed">ZB</div>
                                            )}
                                            <div className="SalesPayment-brand-details">
                                                <h4 className="SalesPayment-company-name">{companyDetails.name}</h4>
                                                <p className="SalesPayment-company-address">{companyDetails.address}</p>
                                                <div className="SalesPayment-company-contact">
                                                    <span>{companyDetails.email}</span>
                                                    <span className="SalesPayment-contact-separator">•</span>
                                                    <span>{companyDetails.phone}</span>
                                                </div>
                                            </div>
                                        </div>

                                        {selectedInvoice && (
                                            <div className="SalesPayment-linked-indicator SalesPayment-mb-6">
                                                <Wallet size={16} /> Receiving Payment for <strong>{selectedInvoice.invoiceNumber}</strong>
                                                {!isViewMode && <button className="SalesPayment-change-link-btn" onClick={() => setShowInvoiceSelect(true)}>Change Invoice</button>}
                                            </div>
                                        )}

                                        <div className="SalesPayment-form-grid-2">
                                            <div className="SalesPayment-form-group">
                                                <label className="SalesPayment-form-label">Customer Name</label>
                                                <input
                                                    type="text"
                                                    className="SalesPayment-form-input SalesPayment-bg-gray-50"
                                                    value={customerName}
                                                    disabled
                                                />
                                            </div>

                                            <div className="SalesPayment-form-group">
                                                <label className="SalesPayment-form-label">Payment Date</label>
                                                <input
                                                    type="date"
                                                    className="SalesPayment-form-input"
                                                    disabled={isViewMode}
                                                    value={paymentDate}
                                                    onChange={(e) => setPaymentDate(e.target.value)}
                                                />
                                            </div>

                                            <div className="SalesPayment-form-group">
                                                <label className="SalesPayment-form-label">Payment Mode</label>
                                                <select
                                                    className="SalesPayment-form-input"
                                                    disabled={isViewMode}
                                                    value={paymentMode}
                                                    onChange={(e) => setPaymentMode(e.target.value)}
                                                >
                                                    <option value="CASH">Cash</option>
                                                    <option value="UPI">UPI</option>
                                                    <option value="CARD">Card</option>
                                                    <option value="CHEQUE">Cheque</option>
                                                    <option value="BANK">Bank Transfer</option>
                                                </select>
                                            </div>

                                            <div className="SalesPayment-form-group">
                                                <label className="SalesPayment-form-label">Deposit To (Account)</label>
                                                <select
                                                    className="SalesPayment-form-input"
                                                    disabled={isViewMode}
                                                    value={bankLedgerId}
                                                    onChange={(e) => setBankLedgerId(e.target.value)}
                                                >
                                                    <option value="">Select Account...</option>
                                                    {ledgers.map(l => <option key={l.id} value={l.id}>{l.name}</option>)}
                                                </select>
                                            </div>

                                            <div className="SalesPayment-form-group">
                                                <label className="SalesPayment-form-label">Reference ID / Check No.</label>
                                                <input
                                                    type="text"
                                                    className="SalesPayment-form-input"
                                                    disabled={isViewMode}
                                                    placeholder="e.g. TRN-12345678"
                                                    value={reference}
                                                    onChange={(e) => setReference(e.target.value)}
                                                />
                                            </div>

                                            <div className="amount -section SalesPayment-form-group SalesPayment-bg-green-50 SalesPayment-rounded-lg SalesPayment-border SalesPayment-border-green-100">
                                                <div className="SalesPayment-form-group SalesPayment-mb-0">
                                                    <label className="SalesPayment-form-label SalesPayment-text-green-800 font-bold">Amount Received</label>
                                                    <div className="SalesPayment-input-with-symbol SalesPayment-text-lg">
                                                        <input
                                                            type="number"
                                                            className="SalesPayment-form-input SalesPayment-text-2xl font-bold SalesPayment-text-green-700 SalesPayment-h-12"
                                                            disabled={isViewMode}
                                                            value={amountReceived}
                                                            onChange={(e) => setAmountReceived(e.target.value)}
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="SalesPayment-form-group">
                                            <label className="SalesPayment-form-label">Notes</label>
                                            <textarea className="SalesPayment-form-textarea SalesPayment-h-20"
                                                disabled={isViewMode}
                                                placeholder="Internal notes..." value={notes} onChange={(e) => setNotes(e.target.value)}></textarea>
                                        </div>

                                    </div>
                                </>
                            )}
                        </div>

                        {!isViewMode && (
                            <div className="SalesPayment-modal-footer">
                                <div className="SalesPayment-footer-left">
                                    <button className="SalesPayment-btn-secondary">
                                        <Printer size={16} /> Print Receipt
                                    </button>
                                </div>
                                <div className="SalesPayment-footer-right">
                                    <button className="SalesPayment-btn-cancel" onClick={() => setShowAddModal(false)}>Cancel</button>
                                    <button className="SalesPayment-btn-submit" style={{ backgroundColor: '#8ce043' }} disabled={!selectedInvoice} onClick={handleSave}>
                                        {isEditMode ? 'Update Payment' : 'Save Payment'}
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            )}

            {/* Delete Confirmation Modal */}
            {showDeleteModal && (
                <div className="SalesPayment-modal-overlay">
                    <div className="SalesPayment-delete-modal-content">
                        <div className="SalesPayment-delete-modal-header">
                            <h2 className="SalesPayment-text-lg font-bold SalesPayment-text-red-600">Delete Payment?</h2>
                            <button className="SalesPayment-close-btn-simple" onClick={() => setShowDeleteModal(false)}>
                                <X size={24} />
                            </button>
                        </div>
                        <div className="SalesPayment-delete-modal-body">
                            <p className="SalesPayment-text-gray-600">
                                Are you sure you want to delete this Payment Record? This will revert the Invoice balance.
                            </p>
                        </div>
                        <div className="SalesPayment-delete-modal-footer">
                            <button className="SalesPayment-btn-plain" onClick={() => setShowDeleteModal(false)}>Cancel</button>
                            <button className="SalesPayment-btn-delete-confirm" onClick={confirmDelete}>Delete</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Payment;

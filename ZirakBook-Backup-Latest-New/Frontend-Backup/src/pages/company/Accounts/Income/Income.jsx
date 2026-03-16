import React, { useState, useEffect } from 'react';
import {
    Plus, Search, RotateCcw, Edit, Trash2, ChevronRight, X, Calendar, Save, Trash, Eye
} from 'lucide-react';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';
import chartOfAccountsService from '../../../../services/chartOfAccountsService';
import GetCompanyId from '../../../../api/GetCompanyId';
import { CompanyContext } from '../../../../context/CompanyContext';
import './Income.css';

const Income = () => {
    const { formatCurrency } = React.useContext(CompanyContext);
    const [incomes, setIncomes] = useState([]);
    const [accounts, setAccounts] = useState([]);
    const [loading, setLoading] = useState(true);

    const [isCreateOpen, setIsCreateOpen] = useState(false);
    const [isDeleteOpen, setIsDeleteOpen] = useState(false);
    const [isViewOpen, setIsViewOpen] = useState(false);
    const [selectedIncome, setSelectedIncome] = useState(null);

    // Form State
    const [formData, setFormData] = useState({
        date: new Date().toISOString().split('T')[0],
        manualReceiptNo: '',
        receivedInAccountId: '',
        items: [
            { accountId: '', amount: '', narration: '' }
        ],
        mainNarration: ''
    });

    // Fetch Data
    const fetchData = async () => {
        setLoading(true);
        const companyId = GetCompanyId();

        // Fetch COA for dropdowns (Critical)
        try {
            const coaRes = await chartOfAccountsService.getChartOfAccounts(companyId);
            if (coaRes.success) {
                // Flatten COA
                let flatAccounts = [];
                const traverse = (groups, parentType = null) => {
                    groups.forEach(group => {
                        const currentType = group.type || parentType;
                        if (group.ledger) {
                            group.ledger.forEach(l => flatAccounts.push({ ...l, groupName: group.name, type: currentType }));
                        }
                        if (group.accountsubgroup) {
                            traverse(group.accountsubgroup, currentType);
                        }
                    });
                };
                traverse(coaRes.data);
                setAccounts(flatAccounts);
            }
        } catch (error) {
            console.error('Error fetching COA:', error);
            toast.error('Failed to load accounts');
        }

        // Fetch Incomes
        try {
            const incomesRes = await chartOfAccountsService.getIncome(companyId);
            if (incomesRes.success) {
                setIncomes(incomesRes.data);
            }
        } catch (error) {
            console.error('Error fetching income:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const resetForm = () => {
        setFormData({
            date: new Date().toISOString().split('T')[0],
            manualReceiptNo: '',
            receivedInAccountId: '',
            items: [{ accountId: '', amount: '', narration: '' }],
            mainNarration: ''
        });
    };

    const handleAddItem = () => {
        setFormData(prev => ({
            ...prev,
            items: [...prev.items, { accountId: '', amount: '', narration: '' }]
        }));
    };

    const handleRemoveItem = (index) => {
        if (formData.items.length === 1) return;
        setFormData(prev => ({
            ...prev,
            items: prev.items.filter((_, i) => i !== index)
        }));
    };

    const handleItemChange = (index, field, value) => {
        const newItems = [...formData.items];
        newItems[index][field] = value;
        setFormData(prev => ({ ...prev, items: newItems }));
    };

    const calculateTotal = () => {
        return formData.items.reduce((sum, item) => sum + (parseFloat(item.amount) || 0), 0);
    };

    const handleSave = async () => {
        try {
            if (!formData.receivedInAccountId || !formData.date) {
                toast.error("Please fill required fields (Date, Received In)");
                return;
            }
            if (formData.items.some(item => !item.accountId || !item.amount)) {
                toast.error("Please fill all item rows (Account and Amount)");
                return;
            }

            const companyId = GetCompanyId();
            const payload = {
                ...formData,
                companyId,
                items: formData.items.map(item => ({
                    ...item,
                    amount: parseFloat(item.amount)
                }))
            };

            if (selectedIncome) {
                await chartOfAccountsService.updateIncome(selectedIncome.voucherNumber, payload, companyId);
                toast.success('Income updated successfully');
            } else {
                await chartOfAccountsService.createIncome(payload, companyId);
                toast.success('Income voucher created successfully');
            }

            setIsCreateOpen(false);
            fetchData();
            setSelectedIncome(null); // Reset selection
        } catch (error) {
            console.error(error);
            toast.error(error.response?.data?.message || 'Failed to save income');
        }
    };

    const handleEdit = (row) => {
        setSelectedIncome(row);
        setFormData({
            date: new Date(row.date).toISOString().split('T')[0],
            manualReceiptNo: row.manualReceiptNo || '',
            receivedInAccountId: row.receivedInAccountId,
            items: row.items.map(i => ({
                accountId: i.accountId,
                amount: i.amount,
                narration: i.narration
            })),
            mainNarration: row.mainNarration || ''
        });
        setIsCreateOpen(true);
    };

    const handleView = (row) => {
        setSelectedIncome(row);
        setIsViewOpen(true);
    };

    const openDelete = (income) => {
        setSelectedIncome(income);
        setIsDeleteOpen(true);
    };

    const handleDelete = async () => {
        try {
            await chartOfAccountsService.deleteIncome(selectedIncome.voucherNumber);
            toast.success('Income deleted successfully');
            setIsDeleteOpen(false);
            fetchData();
        } catch (error) {
            console.error(error);
            toast.error(error.response?.data?.message || 'Failed to delete income');
        }
    };



    return (
        <div className="Income-expenses-page">
            <div className="Income-page-header">
                <div>
                    <h1 className="Income-page-title">Income</h1>
                </div>
                <button className="Income-expenses-btn-success" onClick={() => { resetForm(); setSelectedIncome(null); setIsCreateOpen(true); }}>
                    <Plus size={18} /> Create Voucher
                </button>
            </div>

            <div className="Income-table-card">
                <div className="Income-table-controls">
                    <div className="entries-control">
                        <select defaultValue="10">
                            <option value="10">10</option>
                            <option value="25">25</option>
                            <option value="50">50</option>
                        </select>
                        <span>entries per page</span>
                    </div>
                    <div className="search-control">
                        <input type="text" placeholder="Search..." />
                    </div>
                </div>

                <div className="table-responsive">
                    <table className="Income-data-table">
                        <thead>
                            <tr>
                                <th>DATE</th>
                                <th>AUTO RECEIPT NO</th>
                                <th>MANUAL RECEIPT NO</th>
                                <th>RECEIVED IN</th>
                                <th>ACCOUNTS</th>
                                <th>TOTAL AMOUNT</th>
                                <th>NARRATION</th>
                                <th className="text-right">ACTION</th>
                            </tr>
                        </thead>
                        <tbody>
                            {loading ? (
                                <tr><td colSpan="8" className="text-center p-4">Loading...</td></tr>
                            ) : incomes.length > 0 ? (
                                incomes.map((row) => (
                                    <tr key={row.id}>
                                        <td>{new Date(row.date).toLocaleDateString()}</td>
                                        <td>{row.voucherNumber}</td>
                                        <td>{row.manualReceiptNo || '-'}</td>
                                        <td>{row.receivedIn?.name || '-'}</td>
                                        <td>{row.accounts}</td>
                                        <td>{formatCurrency(row.totalAmount)}</td>
                                        <td>{row.mainNarration || '-'}</td>
                                        <td className="text-left">
                                            <div className="Income-action-buttons1">
                                                <button className="Income-expenses-btn-icon Income-view" onClick={() => handleView(row)} title="View">
                                                    <Eye size={16} />
                                                </button>
                                                <button className="Income-expenses-btn-icon Income-edit" onClick={() => handleEdit(row)} title="Edit">
                                                    <Edit size={16} />
                                                </button>
                                                <button className="Income-expenses-btn-icon Income-delete" onClick={() => openDelete(row)} title="Delete">
                                                    <Trash2 size={16} />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr><td colSpan="8" className="text-center p-4">No data available</td></tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* View Modal */}
            {isViewOpen && selectedIncome && (
                <div className="Income-modal-overlay">
                    <div className="Income-modal-content Income-large-modal">
                        <div className="Income-modal-header">
                            <h2>View Voucher Details</h2>
                            <button className="Income-close-btn" onClick={() => setIsViewOpen(false)}>
                                <X size={20} />
                            </button>
                        </div>
                        <div className="Income-modal-body">
                            <div className="Income-form-row">
                                <div className="Income-form-group Income-half">
                                    <label>Voucher No</label>
                                    <input type="text" value={selectedIncome.voucherNumber} disabled className="bg-gray-100" />
                                </div>
                                <div className="Income-form-group Income-half">
                                    <label>Date</label>
                                    <input type="text" value={new Date(selectedIncome.date).toLocaleDateString()} disabled className="bg-gray-100" />
                                </div>
                            </div>
                            <div className="Income-form-row">
                                <div className="Income-form-group Income-half">
                                    <label>Manual Ref</label>
                                    <input type="text" value={selectedIncome.manualReceiptNo || '-'} disabled className="bg-gray-100" />
                                </div>
                                <div className="Income-form-group Income-half">
                                    <label>Received In</label>
                                    <input type="text" value={selectedIncome.receivedIn?.name || '-'} disabled className="bg-gray-100" />
                                </div>
                            </div>

                            <div className="Income-items-table-wrapper mt-4">
                                <table className="Income-items-table view-table">
                                    <thead>
                                        <tr>
                                            <th>Account</th>
                                            <th>Narration</th>
                                            <th>Amount</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {selectedIncome.items.map((item, index) => (
                                            <tr key={index}>
                                                <td>{accounts.find(a => a.id === item.accountId)?.name || item.accountId}</td>
                                                <td>{item.narration || '-'}</td>
                                                <td>{formatCurrency(item.amount)}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                    <tfoot>
                                        <tr>
                                            <td colSpan="2" className="text-right font-bold">Total:</td>
                                            <td className="text-right font-bold">{formatCurrency(selectedIncome.totalAmount)}</td>
                                        </tr>
                                    </tfoot>
                                </table>
                            </div>

                            <div className="Income-form-group mt-4">
                                <label>Main Narration</label>
                                <textarea rows="2" value={selectedIncome.mainNarration || '-'} disabled className="bg-gray-100"></textarea>
                            </div>
                        </div>
                        <div className="Income-modal-footer">
                            <button className="Income-btn-cancel" onClick={() => setIsViewOpen(false)}>Close</button>
                            <button className="Income-btn-save" onClick={() => { setIsViewOpen(false); handleEdit(selectedIncome); }}>Edit</button>
                        </div>
                    </div>
                </div>
            )}

            {/* Create Modal */}
            {isCreateOpen && (
                <div className="Income-modal-overlay">
                    <div className="Income-modal-content Income-large-modal">
                        <div className="Income-modal-header">
                            <h2>{selectedIncome ? 'Edit Voucher' : 'Create Voucher'}</h2>
                            <button className="Income-close-btn" onClick={() => setIsCreateOpen(false)}>
                                <X size={20} />
                            </button>
                        </div>
                        <div className="Income-modal-body">
                            <div className="Income-form-row">
                                <div className="Income-form-group Income-half">
                                    <label>Auto Receipt No</label>
                                    <input type="text" value={selectedIncome ? selectedIncome.voucherNumber : "AUTO-GENERATED"} disabled className="bg-gray-100" />
                                </div>
                                <div className="Income-form-group Income-half">
                                    <label>Manual Receipt No</label>
                                    <input
                                        type="text"
                                        placeholder="Enter manual number"
                                        value={formData.manualReceiptNo}
                                        onChange={(e) => setFormData({ ...formData, manualReceiptNo: e.target.value })}
                                    />
                                </div>
                            </div>
                            <div className="Income-form-row">
                                <div className="Income-form-group Income-half">
                                    <label>Voucher Date<span className="Income-required">*</span></label>
                                    <input
                                        type="date"
                                        value={formData.date}
                                        onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                                    />
                                </div>
                                <div className="Income-form-group Income-half">
                                    <label>Received In<span className="Income-required">*</span></label>
                                    <select
                                        value={formData.receivedInAccountId}
                                        onChange={(e) => setFormData({ ...formData, receivedInAccountId: e.target.value })}
                                    >
                                        <option value="">Select Account</option>
                                        {accounts.filter(a => ['ASSETS', 'LIABILITIES', 'EQUITY'].includes(a.type)).map(acc => (
                                            <option key={acc.id} value={acc.id}>{acc.name}</option>
                                        ))}
                                    </select>
                                </div>
                            </div>

                            {/* Items Table */}
                            <div className="Income-items-table-wrapper">
                                <table className="Income-items-table">
                                    <thead>
                                        <tr>
                                            <th style={{ width: '40%' }}>ACCOUNT</th>
                                            <th style={{ width: '20%' }}>AMOUNT</th>
                                            <th style={{ width: '30%' }}>NARRATION</th>
                                            <th style={{ width: '10%' }}>ACTION</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {formData.items.map((item, index) => (
                                            <tr key={index}>
                                                <td>
                                                    <select
                                                        value={item.accountId}
                                                        onChange={(e) => handleItemChange(index, 'accountId', e.target.value)}
                                                    >
                                                        <option value="">Search account...</option>
                                                        {accounts.filter(a => ['INCOME'].includes(a.type)).map(acc => (
                                                            <option key={acc.id} value={acc.id}>{acc.name}</option>
                                                        ))}
                                                    </select>
                                                </td>
                                                <td>
                                                    <input
                                                        type="number"
                                                        value={item.amount}
                                                        onChange={(e) => handleItemChange(index, 'amount', e.target.value)}
                                                        placeholder="0.00"
                                                    />
                                                </td>
                                                <td>
                                                    <input
                                                        type="text"
                                                        value={item.narration}
                                                        onChange={(e) => handleItemChange(index, 'narration', e.target.value)}
                                                        placeholder="Narration for this item"
                                                    />
                                                </td>
                                                <td className="text-center">
                                                    <button className="Income-expenses-btn-icon-red" onClick={() => handleRemoveItem(index)}>
                                                        <Trash size={14} />
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                    <tfoot>
                                        <tr>
                                            <td className="text-right font-bold">Total:</td>
                                            <td className="font-bold pl-2">{formatCurrency(calculateTotal())}</td>
                                            <td></td>
                                            <td></td>
                                        </tr>
                                    </tfoot>
                                </table>
                                <button className="Income-btn-add-row" onClick={handleAddItem}>
                                    + Add Row
                                </button>
                            </div>

                            <div className="Income-form-group mt-4">
                                <label>Voucher Narration</label>
                                <textarea
                                    rows="3"
                                    placeholder="Enter narration for this voucher..."
                                    value={formData.mainNarration}
                                    onChange={(e) => setFormData({ ...formData, mainNarration: e.target.value })}
                                ></textarea>
                            </div>
                        </div>
                        <div className="Income-modal-footer">
                            <button className="Income-btn-cancel" onClick={() => setIsCreateOpen(false)}>Cancel</button>
                            <button className="Income-btn-save" onClick={handleSave}>{selectedIncome ? 'Update' : 'Save'}</button>
                        </div>
                    </div>
                </div>
            )}

            {/* Delete Modal */}
            {isDeleteOpen && (
                <div className="Income-modal-overlay">
                    <div className="Income-modal-content Income-small-modal">
                        <div className="Income-modal-header">
                            <h2>Delete Income</h2>
                            <button className="Income-close-btn" onClick={() => setIsDeleteOpen(false)}>
                                <X size={20} />
                            </button>
                        </div>
                        <div className="Income-modal-body">
                            <p>Are you sure you want to delete voucher <b>{selectedIncome?.voucherNumber}</b>?</p>
                        </div>
                        <div className="Income-modal-footer">
                            <button className="Income-btn-cancel" onClick={() => setIsDeleteOpen(false)}>Cancel</button>
                            <button className="Income-btn-delete-confirm" onClick={handleDelete}>Delete</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Income;

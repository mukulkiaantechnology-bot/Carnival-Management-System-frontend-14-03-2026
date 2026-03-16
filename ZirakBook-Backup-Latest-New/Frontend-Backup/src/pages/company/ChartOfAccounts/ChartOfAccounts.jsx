import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, RotateCcw, Activity, Edit2, Trash2, Plus, FileText } from 'lucide-react';
import toast from 'react-hot-toast';
import './ChartOfAccounts.css';
import chartOfAccountsService from '../../../services/chartOfAccountsService';
import GetCompanyId from '../../../api/GetCompanyId';

import { CompanyContext } from '../../../context/CompanyContext'; // Import Context

const ChartOfAccounts = () => {
    const navigate = useNavigate();
    const { formatCurrency } = React.useContext(CompanyContext); // Consume Context
    const [chartData, setChartData] = useState([]);
    const [accountTypes, setAccountTypes] = useState([]); // Dynamic Types
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Modal States
    const [showAddModal, setShowAddModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);

    // Form States
    const [currentAccount, setCurrentAccount] = useState(null);
    const [formData, setFormData] = useState({
        name: '',
        code: '',
        accountType: '',
        isSubAccount: false,
        parentAccount: '',
        isEnabled: true,
        description: ''
    });

    const fetchChartOfAccounts = async () => {
        try {
            setLoading(true);
            const companyId = GetCompanyId();
            const [chartResponse, typesResponse] = await Promise.all([
                chartOfAccountsService.getChartOfAccounts(companyId),
                chartOfAccountsService.getAccountTypes()
            ]);

            if (chartResponse.success) {
                setChartData(chartResponse.data);
            }
            if (typesResponse.success) {
                setAccountTypes(typesResponse.data);
            }
        } catch (err) {
            setError(err.message || 'Failed to fetch Chart of Accounts');
            toast.error(err.message || 'Failed to fetch accounts');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchChartOfAccounts();
    }, []);

    // --- Data processing ---

    // Flatten logic: Extract all ledgers based on group type
    const getAccountsByType = (groupType) => {
        if (!chartData) return [];
        const group = chartData.find(g => g.type === groupType);
        if (!group) return [];

        let accounts = [];

        // Direct Ledgers
        if (group.ledger) {
            accounts = [...accounts, ...group.ledger.map(l => ({ ...l, groupName: group.name, typeName: group.name }))];
        }

        // SubGroup Ledgers
        if (group.accountsubgroup) {
            group.accountsubgroup.forEach(sub => {
                if (sub.ledger) {
                    accounts = [...accounts, ...sub.ledger.map(l => ({ ...l, groupName: group.name, typeName: sub.name }))];
                }
            });
        }
        return accounts;
    };

    const assetAccounts = getAccountsByType('ASSETS');
    const liabilityAccounts = getAccountsByType('LIABILITIES');
    const equityAccounts = getAccountsByType('EQUITY');
    const incomeAccounts = getAccountsByType('INCOME');
    const expenseAccounts = getAccountsByType('EXPENSES');

    const allAccounts = [
        ...assetAccounts,
        ...liabilityAccounts,
        ...equityAccounts,
        ...incomeAccounts,
        ...expenseAccounts
    ];

    // --- Form Handlers ---

    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const resetForm = () => {
        setFormData({
            name: '',
            code: '',
            accountType: '',
            isSubAccount: false,
            parentAccount: '',
            isEnabled: true,
            description: ''
        });
        setCurrentAccount(null);
    };

    const handleCreateAccount = async () => {
        if (!formData.name || !formData.accountType) {
            toast.error('Please fill in required fields');
            return;
        }

        const groupId = parseInt(formData.accountType);
        const subGroupId = null;

        const payload = {
            name: formData.name,
            groupId: groupId,
            subGroupId: subGroupId,
            openingBalance: 0,
            isControlAccount: false,
            isEnabled: formData.isEnabled,
            description: formData.description,
            parentLedgerId: formData.isSubAccount && formData.parentAccount ? parseInt(formData.parentAccount) : null
        };

        try {
            await chartOfAccountsService.createLedger(payload);
            toast.success('Account created successfully');
            setShowAddModal(false);
            resetForm();
            fetchChartOfAccounts();
        } catch (error) {
            console.error('Error creating account', error);
            toast.error(error.message || 'Failed to create account');
        }
    };

    const openEditModal = (account) => {
        setCurrentAccount(account);
        // Reverse map group to valid option if possible options are limited, or just leave blank if complex
        // For now, simpler to just set name/desc/enabled
        setFormData({
            name: account.name,
            code: account.id.toString(),
            accountType: '', // Hard to reverse map without storing specific type key
            isSubAccount: !!account.parentLedgerId,
            parentAccount: account.parentLedgerId || '',
            isEnabled: account.isEnabled,
            description: account.description || ''
        });
        setShowEditModal(true);
    };

    const handleUpdateAccount = async () => {
        if (!currentAccount) return;

        // Only sending fields that are editable easily. 
        // Changing 'Group' (Account Type) requires groupId updates which is tricky if we don't force re-selection.
        // Assuming for now User edits Name, Description, Enabled status.

        const payload = {
            name: formData.name,
            description: formData.description,
            isEnabled: formData.isEnabled,
            // Keep existing group if not changed
            groupId: currentAccount.groupId,
            parentLedgerId: formData.isSubAccount && formData.parentAccount ? parseInt(formData.parentAccount) : null
        };

        try {
            await chartOfAccountsService.updateLedger(currentAccount.id, payload);
            toast.success('Account updated successfully');
            setShowEditModal(false);
            resetForm();
            fetchChartOfAccounts();
        } catch (error) {
            console.error(error);
            toast.error(error.message || 'Failed to update account');
        }
    };

    const handleDeleteAccount = async () => {
        if (!currentAccount) return;
        try {
            await chartOfAccountsService.deleteLedger(currentAccount.id);
            toast.success('Account deleted successfully');
            setShowDeleteModal(false);
            setCurrentAccount(null);
            fetchChartOfAccounts();
        } catch (error) {
            console.error(error);
            toast.error(error.message || 'Failed to delete account');
        }
    };

    const getParentAccountOptions = () => {
        // Filter potential parents based on selected type if creating, 
        // or based on current account's group if editing.
        let targetGroupId = null;

        if (formData.accountType) {
            targetGroupId = parseInt(formData.accountType);
        } else if (currentAccount) {
            targetGroupId = currentAccount.groupId;
        }

        if (!targetGroupId) return [];

        // Find all accounts in this group to be parents
        // Avoid self-reference if editing
        return allAccounts.filter(acc => acc.groupId === targetGroupId && acc.id !== currentAccount?.id);
    };

    const AccountTable = ({ title, data }) => (
        <div className="Charts-of-Account-account-section-card">
            <div className="Charts-of-Account-section-header">
                <h3 className="Charts-of-Account-section-title">{title}</h3>
            </div>
            <div className="Charts-of-Account-table-responsive">
                <table className="Charts-of-Account-accounts-table">
                    <thead>
                        <tr>
                            {/* <th>CODE</th> */}
                            <th>NAME</th>
                            <th>TYPE</th>
                            <th>PARENT ACCOUNT NAME</th>
                            <th>BALANCE</th>
                            <th>STATUS</th>
                            <th>ACTION</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.length > 0 ? (
                            data.map((account, index) => (
                                <tr key={index}>
                                    {/* <td>{account.id}</td> */}
                                    <td className="Charts-of-Account-text-green">{account.name}</td>
                                    <td>{account.typeName || account.groupName}</td>
                                    <td>{account.parentLedger?.name || '-'}</td>
                                    <td>{formatCurrency(account.currentBalance)}</td>
                                    <td>
                                        <span className={`Charts-of-Account-status-badge ${account.isEnabled ? 'Charts-of-Account-status-enabled' : 'Charts-of-Account-status-disabled'}`}>
                                            {account.isEnabled ? 'Enabled' : 'Disabled'}
                                        </span>
                                    </td>
                                    <td>
                                        <div className="Charts-of-Account-actions-cell">
                                            <button
                                                className="Charts-of-Account-action-btn-small Charts-of-Account-btn-warning"
                                                data-tooltip="View Ledger"
                                                onClick={() => navigate('/company/reports/ledger', { state: { accountId: account.id } })}
                                            >
                                                <FileText size={16} />
                                            </button>
                                            <button className="Charts-of-Account-action-btn-small Charts-of-Account-btn-info" data-tooltip="Edit" onClick={() => openEditModal(account)}>
                                                <Edit2 size={16} />
                                            </button>
                                            <button className="Charts-of-Account-action-btn-small Charts-of-Account-btn-danger" data-tooltip="Delete" onClick={() => { setCurrentAccount(account); setShowDeleteModal(true); }}>
                                                <Trash2 size={16} />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="6" className="text-center p-4">No accounts found</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );

    if (loading) return <div className="p-8">Loading Chart of Accounts...</div>

    return (
        <div className="Charts-of-Account-chart-of-accounts-page">
            {/* Page Header */}
            <div className="Charts-of-Account-page-header">
                <h1 className="Charts-of-Account-page-title">Charts of Account</h1>
                <button className="Charts-of-Account-btn-add" onClick={() => { resetForm(); setShowAddModal(true); }}>
                    <Plus size={18} />
                    Add new account
                </button>
            </div>

            {/* Filter Section (Visual Only for now) */}
            <div className="Charts-of-Account-filter-card">
                <div className="Charts-of-Account-filter-group">
                    <label className="Charts-of-Account-filter-label">Start Date</label>
                    <input type="date" className="Charts-of-Account-filter-input" placeholder="mm/dd/yyyy" />
                </div>
                <div className="Charts-of-Account-filter-group">
                    <label className="Charts-of-Account-filter-label">End Date</label>
                    <input type="date" className="Charts-of-Account-filter-input" placeholder="mm/dd/yyyy" />
                </div>
                <div className="d-flex gap-2 w-100-mobile">
                    <button className="Charts-of-Account-filter-btn Charts-of-Account-btn-search" data-tooltip="Search">
                        <Search size={20} />
                    </button>
                    <button className="Charts-of-Account-filter-btn Charts-of-Account-btn-reset" style={{ backgroundColor: '#ff5252' }} data-tooltip="Reset">
                        <RotateCcw size={20} />
                    </button>
                </div>
            </div>

            {/* Tables */}
            <AccountTable title="Assets" data={assetAccounts} />
            <AccountTable title="Liabilities" data={liabilityAccounts} />
            <AccountTable title="Equity" data={equityAccounts} />
            <AccountTable title="Income" data={incomeAccounts} />
            <AccountTable title="Expenses" data={expenseAccounts} />

            {/* Create Account Modal */}
            {showAddModal && (
                <div className="Charts-of-Account-modal-overlay">
                    <div className="Charts-of-Account-modal-content">
                        <div className="Charts-of-Account-modal-header">
                            <h2 className="Charts-of-Account-modal-title">Create New Account</h2>
                            <button className="Charts-of-Account-close-btn" onClick={() => setShowAddModal(false)}>×</button>
                        </div>
                        <div className="Charts-of-Account-modal-body">
                            <div className="Charts-of-Account-form-group">
                                <label className="Charts-of-Account-form-label">Name<span className="Charts-of-Account-text-red">*</span></label>
                                <input
                                    type="text"
                                    className="Charts-of-Account-form-input"
                                    placeholder="Enter Name"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleInputChange}
                                />
                            </div>

                            <div className="Charts-of-Account-form-row">
                                <div className="Charts-of-Account-form-group Charts-of-Account-half-width">
                                    <label className="Charts-of-Account-form-label">Account Type<span className="Charts-of-Account-text-red">*</span></label>
                                    <select
                                        className="Charts-of-Account-form-select"
                                        name="accountType"
                                        value={formData.accountType}
                                        onChange={handleInputChange}
                                    >
                                        <option value="">Select</option>
                                        {accountTypes.map((group, index) => (
                                            <option key={index} value={group.groupId}>{group.groupName}</option>
                                        ))}
                                    </select>
                                </div>
                            </div>

                            <div className="Charts-of-Account-form-row" style={{ alignItems: 'center', marginBottom: '1.25rem' }}>
                                <div className="Charts-of-Account-form-group Charts-of-Account-half-width" style={{ marginBottom: 0 }}>
                                    <label className="Charts-of-Account-checkbox-container">
                                        <input
                                            type="checkbox"
                                            name="isSubAccount"
                                            checked={formData.isSubAccount}
                                            onChange={handleInputChange}
                                        />
                                        <span className="Charts-of-Account-checkmark"></span>
                                        Make this a sub-account
                                    </label>
                                </div>
                                {formData.isSubAccount && (
                                    <div className="Charts-of-Account-form-group Charts-of-Account-half-width" style={{ marginBottom: 0 }}>
                                        <label className="Charts-of-Account-form-label">Parent Account</label>
                                        <select
                                            className="Charts-of-Account-form-select"
                                            name="parentAccount"
                                            value={formData.parentAccount}
                                            onChange={handleInputChange}
                                        >
                                            <option value="">Select Parent Account</option>
                                            {getParentAccountOptions().map((acc, i) => (
                                                <option key={i} value={acc.id}>{acc.name}</option>
                                            ))}
                                        </select>
                                    </div>
                                )}
                            </div>

                            <div className="Charts-of-Account-form-group">
                                <label className="Charts-of-Account-form-label">Is Enabled</label>
                                <label className="Charts-of-Account-switch">
                                    <input
                                        type="checkbox"
                                        name="isEnabled"
                                        checked={formData.isEnabled}
                                        onChange={handleInputChange}
                                    />
                                    <span className="Charts-of-Account-slider Charts-of-Account-round"></span>
                                </label>
                            </div>

                            <div className="Charts-of-Account-form-group">
                                <label className="Charts-of-Account-form-label">Description</label>
                                <textarea
                                    className="Charts-of-Account-form-textarea"
                                    placeholder="Enter Description"
                                    rows="3"
                                    name="description"
                                    value={formData.description}
                                    onChange={handleInputChange}
                                ></textarea>
                            </div>
                        </div>
                        <div className="Charts-of-Account-modal-footer">
                            <button className="Charts-of-Account-btn-cancel" onClick={() => setShowAddModal(false)}>Cancel</button>
                            <button className="Charts-of-Account-btn-save" onClick={handleCreateAccount}>Create</button>
                        </div>
                    </div>
                </div>
            )}

            {/* Edit Account Modal */}
            {showEditModal && (
                <div className="Charts-of-Account-modal-overlay">
                    <div className="Charts-of-Account-modal-content">
                        <div className="Charts-of-Account-modal-header">
                            <h2 className="Charts-of-Account-modal-title">Edit Account</h2>
                            <button className="Charts-of-Account-close-btn" onClick={() => setShowEditModal(false)}>×</button>
                        </div>
                        <div className="Charts-of-Account-modal-body">
                            <div className="Charts-of-Account-form-row">
                                <div className="Charts-of-Account-form-group Charts-of-Account-half-width">
                                    <label className="Charts-of-Account-form-label">Name<span className="Charts-of-Account-text-red">*</span></label>
                                    <input
                                        type="text"
                                        className="Charts-of-Account-form-input"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleInputChange}
                                    />
                                </div>
                                <div className="Charts-of-Account-form-group Charts-of-Account-half-width">
                                    {/* <label className="Charts-of-Account-form-label">Code<span className="Charts-of-Account-text-red">*</span></label>
                                    <input 
                                        type="text" 
                                        className="Charts-of-Account-form-input" 
                                        value={formData.code}
                                        readOnly 
                                        disabled
                                    /> */}
                                </div>
                            </div>

                            {/* Parent Selection for Edit if SubAccount */}
                            <div className="Charts-of-Account-form-row" style={{ alignItems: 'center', marginBottom: '1.25rem' }}>
                                <div className="Charts-of-Account-form-group Charts-of-Account-half-width" style={{ marginBottom: 0 }}>
                                    <label className="Charts-of-Account-checkbox-container">
                                        <input
                                            type="checkbox"
                                            name="isSubAccount"
                                            checked={formData.isSubAccount}
                                            onChange={handleInputChange}
                                        />
                                        <span className="Charts-of-Account-checkmark"></span>
                                        Make this a sub-account
                                    </label>
                                </div>
                                {formData.isSubAccount && (
                                    <div className="Charts-of-Account-form-group Charts-of-Account-half-width" style={{ marginBottom: 0 }}>
                                        <label className="Charts-of-Account-form-label">Parent Account</label>
                                        <select
                                            className="Charts-of-Account-form-select"
                                            name="parentAccount"
                                            value={formData.parentAccount}
                                            onChange={handleInputChange}
                                        >
                                            <option value="">Select Parent Account</option>
                                            {getParentAccountOptions().map((acc, i) => (
                                                <option key={i} value={acc.id}>{acc.name}</option>
                                            ))}
                                        </select>
                                    </div>
                                )}
                            </div>

                            <div className="Charts-of-Account-form-group">
                                <label className="Charts-of-Account-form-label">Is Enabled</label>
                                <label className="Charts-of-Account-switch">
                                    <input
                                        type="checkbox"
                                        name="isEnabled"
                                        checked={formData.isEnabled}
                                        onChange={handleInputChange}
                                    />
                                    <span className="Charts-of-Account-slider Charts-of-Account-round"></span>
                                </label>
                            </div>

                            <div className="Charts-of-Account-form-group">
                                <label className="Charts-of-Account-form-label">Description</label>
                                <textarea
                                    className="Charts-of-Account-form-textarea"
                                    rows="3"
                                    name="description"
                                    value={formData.description}
                                    onChange={handleInputChange}
                                ></textarea>
                            </div>
                        </div>
                        <div className="Charts-of-Account-modal-footer">
                            <button className="Charts-of-Account-btn-cancel" style={{ backgroundColor: '#6c757d', color: 'white' }} onClick={() => setShowEditModal(false)}>Cancel</button>
                            <button className="Charts-of-Account-btn-save" onClick={handleUpdateAccount}>Update</button>
                        </div>
                    </div>
                </div>
            )}

            {/* Delete Confirmation Modal */}
            {showDeleteModal && (
                <div className="Charts-of-Account-modal-overlay">
                    <div className="Charts-of-Account-modal-content" style={{ maxWidth: '400px' }}>
                        <div className="Charts-of-Account-modal-header">
                            <h2 className="Charts-of-Account-modal-title">Delete Account</h2>
                            <button className="Charts-of-Account-close-btn" onClick={() => setShowDeleteModal(false)}>×</button>
                        </div>
                        <div className="Charts-of-Account-modal-body">
                            <p>Are you sure you want to delete this account?</p>
                            {currentAccount && <p className="font-bold">{currentAccount.name}</p>}
                        </div>
                        <div className="Charts-of-Account-modal-footer">
                            <button className="Charts-of-Account-btn-cancel" onClick={() => setShowDeleteModal(false)}>Cancel</button>
                            <button className="Charts-of-Account-btn-save" style={{ backgroundColor: '#ff5252' }} onClick={handleDeleteAccount}>Delete</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ChartOfAccounts;
import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Search, RotateCcw, Download } from 'lucide-react';
import toast from 'react-hot-toast';
import chartOfAccountsService from '../../../../services/chartOfAccountsService';
import GetCompanyId from '../../../../api/GetCompanyId';
import { CompanyContext } from '../../../../context/CompanyContext';
import { useContext } from 'react';
import './LedgerReport.css';

const LedgerReport = () => {
    const { formatCurrency, fetchCompanySettings } = useContext(CompanyContext);
    const location = useLocation();
    const navigate = useNavigate();

    // State
    const [ledgers, setLedgers] = useState([]);
    const [transactions, setTransactions] = useState([]);
    const [loading, setLoading] = useState(false);

    // Filters
    const [selectedAccount, setSelectedAccount] = useState('');
    const [dateRange, setDateRange] = useState({
        startDate: '',
        endDate: ''
    });



    // Helper to flatten COA for dropdown
    const flattenLedgers = (coaData) => {
        let flattened = [];
        const traverse = (groups) => {
            groups.forEach(group => {
                if (group.ledger) {
                    group.ledger.forEach(ledger => flattened.push({ ...ledger, groupName: group.name }));
                }
                if (group.accountsubgroup) {
                    traverse(group.accountsubgroup);
                }
            });
        };
        traverse(coaData);
        // Also try chartOfAccountsService.getAllLedgers if that returns a flat list directly,
        // but traversing the tree is safer if we want grouped structure or specific fields.
        return flattened;
    };

    // Fetch initial data (Ledger List)
    useEffect(() => {
        fetchCompanySettings();
        const fetchLedgers = async () => {
            try {
                // We use getChartOfAccounts to build the dropdown options
                const response = await chartOfAccountsService.getChartOfAccounts();
                if (response.success) {
                    const allLedgers = flattenLedgers(response.data);
                    setLedgers(allLedgers);

                    // Pre-select account if passed via navigation state
                    if (location.state?.accountId) {
                        setSelectedAccount(location.state.accountId);
                    } else if (allLedgers.length > 0) {
                        // Default to first account 
                        setSelectedAccount(allLedgers[0].id);
                    }
                }
            } catch (error) {
                console.error('Error fetching ledgers:', error);
                toast.error('Failed to load chart of accounts');
            }
        };

        const initDates = () => {
            const today = new Date();
            const firstDay = new Date(today.getFullYear(), today.getMonth(), 1);
            const lastDay = new Date(today.getFullYear(), today.getMonth() + 1, 0);

            setDateRange({
                startDate: firstDay.toISOString().split('T')[0],
                endDate: lastDay.toISOString().split('T')[0]
            });
        };

        fetchLedgers();
        initDates();
    }, [location.state]);

    // Fetch Transactions when Selected Account Changes or Search is clicked
    const fetchTransactions = async () => {
        if (!selectedAccount) return;

        setLoading(true);
        try {
            const companyId = GetCompanyId();
            // NOTE: The service method might need to support date filtering params.
            // Currently assuming getLedgerTransactions fetches all or we filter client side.
            // If backend supports optional query params, we should pass them.
            // For now, fetching all and filtering client side if needed, or assumig backend gives recent.
            const response = await chartOfAccountsService.getLedgerTransactions(selectedAccount, companyId);
            if (response.success) {
                setTransactions(response.data);
            } else {
                setTransactions([]); // Clear or empty
                if (response.message) toast.error(response.message);
            }
        } catch (error) {
            console.error('Error fetching transactions:', error);
            // toast.error('Failed to fetch transactions'); // Optional, to avoid spam
            setTransactions([]);
        } finally {
            setLoading(false);
        }
    };

    // Auto-fetch when selectedAccount changes (optional, or wait for search button)
    useEffect(() => {
        if (selectedAccount) {
            fetchTransactions();
        }
    }, [selectedAccount]);

    const handleSearch = () => {
        fetchTransactions();
    };

    const handleReset = () => {
        const today = new Date();
        setDateRange({
            startDate: new Date(today.getFullYear(), today.getMonth(), 1).toISOString().split('T')[0],
            endDate: new Date(today.getFullYear(), today.getMonth() + 1, 0).toISOString().split('T')[0]
        });
        // Optionally reset account or keep it
        fetchTransactions();
    };

    // Process transactions to add running balance
    // Backend might return them sorted, but we ensure sorting by Date
    const processedTransactions = React.useMemo(() => {
        if (!transactions || !selectedAccount) return [];

        // 1. Sort all transactions by date
        const sorted = [...transactions].sort((a, b) => new Date(a.date) - new Date(b.date));

        // 2. Calculate Running Balance on entire history
        let runningBalance = 0;

        const withBalance = sorted.map(txn => {
            const isDebit = txn.debitLedgerId === parseInt(selectedAccount);
            const isCredit = txn.creditLedgerId === parseInt(selectedAccount);

            // Amount logic
            const debit = isDebit ? txn.amount : 0;
            const credit = isCredit ? txn.amount : 0;

            // Running Balance: Assumes standard asset/expense nature (Dr + / Cr -).
            // If the account is Liability/Income, it should ideally be (Cr + / Dr -).
            // However, typical ledger view shows Dr/Cr balance. 
            // Let's implement generic: Balance = Balance + Debit - Credit.
            // If final balance is negative, it's a Credit Balance.
            runningBalance = runningBalance + debit - credit;

            // Party Name Resolution
            let partyName = '-';
            if (txn.invoice?.customer) partyName = txn.invoice.customer.name;
            else if (txn.purchaseBill?.vendor) partyName = txn.purchaseBill.vendor.name;
            else if (txn.receipt?.customer) partyName = txn.receipt.customer.name;
            else if (txn.payment?.vendor) partyName = txn.payment.vendor.name;
            else {
                // Determine the "Other" ledger name
                if (isDebit) partyName = txn.creditLedger?.name || 'Unknown';
                if (isCredit) partyName = txn.debitLedger?.name || 'Unknown';
            }

            // Transaction Type & Ref
            let typeLabel = txn.voucherType;
            let refNo = txn.voucherNumber;

            if (txn.invoice) { typeLabel = 'Invoice'; refNo = txn.invoice.invoiceNumber; }
            else if (txn.purchaseBill) { typeLabel = 'Bill'; refNo = txn.purchaseBill.billNumber; }
            else if (txn.receipt) { typeLabel = 'Receipt'; refNo = txn.receipt.receiptNumber; }
            else if (txn.payment) { typeLabel = 'Payment'; refNo = txn.payment.paymentNumber; }

            return {
                ...txn,
                debit,
                credit,
                balance: runningBalance,
                partyName,
                typeLabel,
                refNo
            };
        });

        // 3. Filter by Date Range for Display
        return withBalance.filter(txn => {
            const txnDate = new Date(txn.date);
            const start = dateRange.startDate ? new Date(dateRange.startDate) : null;
            const end = dateRange.endDate ? new Date(dateRange.endDate) : null;

            if (start && txnDate < start) return false;
            // Set end date to end of day to include transactions on that day
            if (end) {
                end.setHours(23, 59, 59, 999);
                if (txnDate > end) return false;
            }
            return true;
        });
    }, [transactions, selectedAccount, dateRange]);

    const currentLedgerName = ledgers.find(l => l.id == selectedAccount)?.name || '';

    return (
        <div className="Ledger-report-page">
            <div className="Ledger-page-header">
                <div>
                    <h1 className="Ledger-page-title">Ledger Summary</h1>
                    {/* <div className="Ledger-breadcrumb">
                        <span className="Ledger-breadcrumb-active">Dashboard</span>
                        <span className="Ledger-breadcrumb-sep">{'>'}</span>
                        <span className="Ledger-breadcrumb-current">Ledger Summary</span>
                    </div> */}
                </div>
                <button className="Ledger-btn-download">
                    <Download size={18} />
                </button>
            </div>

            {/* Filter Card */}
            <div className="Ledger-filter-card">
                <div className="Ledger-filter-group">
                    <label>Start Date</label>
                    <input
                        type="date"
                        className="Ledger-form-input"
                        value={dateRange.startDate}
                        onChange={(e) => setDateRange(prev => ({ ...prev, startDate: e.target.value }))}
                    />
                </div>
                <div className="Ledger-filter-group">
                    <label>End Date</label>
                    <input
                        type="date"
                        className="Ledger-form-input"
                        value={dateRange.endDate}
                        onChange={(e) => setDateRange(prev => ({ ...prev, endDate: e.target.value }))}
                    />
                </div>
                <div className="Ledger-filter-group" style={{ flexGrow: 1 }}>
                    <label>Account</label>
                    <div className="Ledger-select-wrapper">
                        <select
                            className="Ledger-form-select"
                            value={selectedAccount}
                            onChange={(e) => setSelectedAccount(e.target.value)}
                        >
                            <option value="">Select Account</option>
                            {ledgers.map(ledger => (
                                <option key={ledger.id} value={ledger.id}>{ledger.name} - {ledger.groupName}</option>
                            ))}
                        </select>
                    </div>
                </div>
                <div className="Ledger-filter-actions">
                    <button className="Ledger-btn-search" onClick={handleSearch} title="Search">
                        <Search size={20} />
                    </button>
                    <button className="Ledger-btn-reset" onClick={handleReset} title="Reset">
                        <RotateCcw size={20} />
                    </button>
                </div>
            </div>

            {/* Transactions Table */}
            <div className="Ledger-table-card">
                <table className="Ledger-table">
                    <thead>
                        <tr>
                            <th>ACCOUNT NAME</th>
                            <th>CUSTOME/VENDOR NAME</th>
                            <th>TRANSACTION TYPE</th>
                            <th>TRANSACTION DATE</th>
                            <th>DEBIT</th>
                            <th>CREDIT</th>
                            <th>BALANCE</th>
                        </tr>
                    </thead>
                    <tbody>
                        {loading ? (
                            <tr><td colSpan="7" className="text-center p-4">Loading transactions...</td></tr>
                        ) : processedTransactions.length > 0 ? (
                            processedTransactions.map((txn, index) => (
                                <tr key={index}>
                                    <td className="font-medium">{currentLedgerName}</td>
                                    <td>{txn.partyName}</td>
                                    <td>
                                        <div style={{ display: 'flex', flexDirection: 'column' }}>
                                            <span style={{ fontWeight: 500 }}>{txn.typeLabel}</span>
                                            <span style={{ fontSize: '0.75rem', color: '#64748b' }}>#{txn.refNo || txn.voucherNumber || '-'}</span>
                                        </div>
                                    </td>
                                    <td>{new Date(txn.date).toLocaleDateString()}</td>
                                    <td className="text-right">{txn.debit > 0 ? formatCurrency(txn.debit) : '-'}</td>
                                    <td className="text-right">{txn.credit > 0 ? formatCurrency(txn.credit) : '-'}</td>
                                    <td className="text-right font-medium">
                                        {formatCurrency(Math.abs(txn.balance))} {txn.balance >= 0 ? 'Dr' : 'Cr'}
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr><td colSpan="7" className="text-center p-4">No transactions found</td></tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default LedgerReport;

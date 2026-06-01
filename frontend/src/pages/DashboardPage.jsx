import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../components/Button";
import StatCard from "../components/StatCard";
import ActionPanel from "../components/ActionPanel";
import CustomerCard from "../components/CustomerCard";
import TransactionList from "../components/TransactionList";
import AccountLookup from "../components/AccountLookup";
import NewAccountForm from "../components/NewAccountForm";
import {
  createAccount,
  depositToAccount,
  getAccountByNumber,
  getAllAccounts,
  withdrawFromAccount,
} from "../Server";

const createPreviewAccountNumber = () =>
  `TWB${Math.floor(10000000 + Math.random() * 90000000)}`;

const emptyCustomer = {
  fullName: "No account selected",
  accountNumber: "-",
  accountType: "-",
  branch: "-",
  phone: "-",
  email: "-",
  status: "Pending",
  balance: 0,
  transactions: [],
};

function DashboardPage() {
  const navigate = useNavigate();
  const [activeCustomer, setActiveCustomer] = useState(emptyCustomer);
  const [lookupValue, setLookupValue] = useState("");
  const [lookupMessage, setLookupMessage] = useState(
    "Create a new account or search by account number to open a customer profile.",
  );
  const [depositAmount, setDepositAmount] = useState("");
  const [withdrawAmount, setWithdrawAmount] = useState("");
  const [isNewAccountFormOpen, setIsNewAccountFormOpen] = useState(false);
  const [newAccountNumber, setNewAccountNumber] = useState(createPreviewAccountNumber);
  const [newAccountForm, setNewAccountForm] = useState({
    fullName: "",
    phone: "",
    email: "",
    accountType: "",
    branch: "",
    openingBalance: "",
  });
  const [isLoading, setIsLoading] = useState(true);

  const transactions = activeCustomer.transactions || [];
  const balance = activeCustomer.balance || 0;

  const totalDeposits = transactions
    .filter((transaction) => transaction.type === "deposit")
    .reduce((sum, transaction) => sum + transaction.amount, 0);

  const totalWithdrawals = transactions
    .filter((transaction) => transaction.type === "withdraw")
    .reduce((sum, transaction) => sum + transaction.amount, 0);

  useEffect(() => {
    const loadInitialAccount = async () => {
      try {
        const accounts = await getAllAccounts();

        if (accounts.length === 0) {
          setLookupMessage(
            "No account is stored in MongoDB yet. Create a new customer account to begin.",
          );
          return;
        }

        const firstAccount = await getAccountByNumber(accounts[0].accountNumber);
        setActiveCustomer(firstAccount);
        setLookupValue(firstAccount.accountNumber);
        setLookupMessage(
          `${firstAccount.fullName}'s account is currently open from the database.`,
        );
      } catch (error) {
        setLookupMessage(
          error.response?.data?.message ||
            "Unable to load account data from the server. Check backend and MongoDB.",
        );
      } finally {
        setIsLoading(false);
      }
    };

    loadInitialAccount();
  }, []);

  const handleDeposit = async (event) => {
    event.preventDefault();
    const amount = Number(depositAmount);

    if (!activeCustomer.accountNumber || activeCustomer.accountNumber === "-") {
      setLookupMessage("Open a customer account before processing a deposit.");
      return;
    }

    if (!amount || amount <= 0) {
      return;
    }

    try {
      const updatedAccount = await depositToAccount(activeCustomer.accountNumber, amount);
      setActiveCustomer(updatedAccount);
      setLookupMessage(
        `Rs. ${amount.toLocaleString("en-IN")} deposited into ${updatedAccount.fullName}'s account.`,
      );
      setDepositAmount("");
    } catch (error) {
      setLookupMessage(
        error.response?.data?.message || "Deposit failed. Please try again.",
      );
    }
  };

  const handleWithdraw = async (event) => {
    event.preventDefault();
    const amount = Number(withdrawAmount);

    if (!activeCustomer.accountNumber || activeCustomer.accountNumber === "-") {
      setLookupMessage("Open a customer account before processing a withdrawal.");
      return;
    }

    if (!amount || amount <= 0) {
      return;
    }

    try {
      const updatedAccount = await withdrawFromAccount(activeCustomer.accountNumber, amount);
      setActiveCustomer(updatedAccount);
      setLookupMessage(
        `Rs. ${amount.toLocaleString("en-IN")} withdrawn from ${updatedAccount.fullName}'s account.`,
      );
      setWithdrawAmount("");
    } catch (error) {
      setLookupMessage(
        error.response?.data?.message || "Withdrawal failed. Please try again.",
      );
    }
  };

  const handleAccountLookup = async (event) => {
    event.preventDefault();
    const normalizedAccountNumber = lookupValue.trim().toUpperCase();

    if (!normalizedAccountNumber) {
      return;
    }

    try {
      const account = await getAccountByNumber(normalizedAccountNumber);
      setActiveCustomer(account);
      setLookupValue(account.accountNumber);
      setDepositAmount("");
      setWithdrawAmount("");
      setLookupMessage(
        `${account.fullName}'s account is now open. You can review details and process transactions below.`,
      );
    } catch (error) {
      setLookupMessage(
        error.response?.data?.message ||
          `No customer was found for account number ${normalizedAccountNumber}.`,
      );
    }
  };

  const handleNewAccountChange = (event) => {
    const { name, value } = event.target;
    setNewAccountForm((currentForm) => ({
      ...currentForm,
      [name]: value,
    }));
  };

  const handleGenerateAccountNumber = () => {
    const generatedNumber = createPreviewAccountNumber();
    setNewAccountNumber(generatedNumber);
    setLookupMessage(
      `A fresh preview account number ${generatedNumber} is ready for the new customer profile.`,
    );
  };

  const handleCreateAccount = async (event) => {
    event.preventDefault();

    try {
      const createdAccount = await createAccount({
        ...newAccountForm,
        accountNumber: newAccountNumber,
        openingBalance: Number(newAccountForm.openingBalance),
      });

      setActiveCustomer(createdAccount);
      setLookupValue(createdAccount.accountNumber);
      setDepositAmount("");
      setWithdrawAmount("");
      setLookupMessage(
        `${createdAccount.fullName}'s new account has been created and saved in MongoDB.`,
      );
      setIsNewAccountFormOpen(false);
      setNewAccountForm({
        fullName: "",
        phone: "",
        email: "",
        accountType: "",
        branch: "",
        openingBalance: "",
      });
      setNewAccountNumber(createPreviewAccountNumber());
    } catch (error) {
      setLookupMessage(
        error.response?.data?.message || "Account creation failed. Please try again.",
      );
    }
  };

  const handleLogout = () => {
    navigate("/login");
  };

  return (
    <main className="dashboard-shell">
      <section className="dashboard-layout">
        <header className="dashboard-hero">
          <div>
            <p className="form-kicker">TrustWave Bank Employee Console</p>
            <h1>Cash Management Dashboard</h1>
            <p>
              Use this workspace to manage customer balances, approve counter
              deposits, and process withdrawals safely from one screen.
            </p>
          </div>

          <Button
            type="button"
            name="Logout"
            className="secondary-button"
            onClick={handleLogout}
          />
        </header>

        <NewAccountForm
          isOpen={isNewAccountFormOpen}
          onToggle={() => setIsNewAccountFormOpen((currentState) => !currentState)}
          formData={newAccountForm}
          generatedAccountNumber={newAccountNumber}
          onChange={handleNewAccountChange}
          onGenerateAccountNumber={handleGenerateAccountNumber}
          onSubmit={handleCreateAccount}
        />

        <AccountLookup
          accountNumber={lookupValue}
          onAccountNumberChange={(event) => setLookupValue(event.target.value)}
          onSubmit={handleAccountLookup}
          activeAccountNumber={activeCustomer.accountNumber}
          helperText={lookupMessage}
        />

        <CustomerCard customer={activeCustomer} />

        <section className="stats-grid">
          <StatCard
            label="Available Balance"
            value={`Rs. ${balance.toLocaleString("en-IN")}`}
            detail="Current available amount in the active customer account."
            tone="primary"
          />
          <StatCard
            label="Total Deposits"
            value={`Rs. ${totalDeposits.toLocaleString("en-IN")}`}
            detail="Combined deposit activity from the visible transaction log."
            tone="success"
          />
          <StatCard
            label="Total Withdrawals"
            value={`Rs. ${totalWithdrawals.toLocaleString("en-IN")}`}
            detail="Combined withdrawal activity processed by staff."
            tone="warning"
          />
        </section>

        <section className="actions-grid">
          <ActionPanel
            title="Deposit Money"
            description={`Add funds to ${activeCustomer.fullName}'s account after verifying cash or cheque.`}
            amount={depositAmount}
            amountLabel="Deposit amount"
            amountId="depositAmount"
            onAmountChange={(event) => setDepositAmount(event.target.value)}
            buttonLabel="Process Deposit"
            onSubmit={handleDeposit}
            buttonClassName="deposit-button"
          />

          <ActionPanel
            title="Withdraw Money"
            description={`Deduct funds from ${activeCustomer.fullName}'s account only after identity and balance checks.`}
            amount={withdrawAmount}
            amountLabel="Withdrawal amount"
            amountId="withdrawAmount"
            onAmountChange={(event) => setWithdrawAmount(event.target.value)}
            buttonLabel="Process Withdrawal"
            onSubmit={handleWithdraw}
            buttonClassName="withdraw-button"
          />
        </section>

        <TransactionList transactions={transactions} />

        {isLoading ? (
          <p className="dashboard-note">Loading account data from MongoDB...</p>
        ) : null}
      </section>
    </main>
  );
}

export default DashboardPage;

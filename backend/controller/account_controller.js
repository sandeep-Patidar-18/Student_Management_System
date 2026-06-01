import Account from "../models/accounts.js";

const buildAccountNumber = () =>
  `TWB${Math.floor(10000000 + Math.random() * 90000000)}`;

const generateUniqueAccountNumber = async () => {
  let accountNumber = buildAccountNumber();

  while (await Account.exists({ accountNumber })) {
    accountNumber = buildAccountNumber();
  }

  return accountNumber;
};

const formatAccountResponse = (account) => ({
  id: account._id,
  fullName: account.fullName,
  phone: account.phone,
  email: account.email,
  accountType: account.accountType,
  branch: account.branch,
  accountNumber: account.accountNumber,
  status: account.status,
  balance: account.balance,
  transactions: account.transactions.map((transaction) => ({
    id: transaction._id,
    type: transaction.type,
    title: transaction.title,
    amount: transaction.amount,
    balanceAfter: transaction.balanceAfter,
    employee: transaction.employee,
    createdAt: transaction.createdAt,
  })),
  createdAt: account.createdAt,
  updatedAt: account.updatedAt,
});

export const createAccount = async (req, res) => {
  try {
    const {
      fullName,
      phone,
      email,
      accountType,
      branch,
      accountNumber: requestedAccountNumber,
      openingBalance = 0,
      employee = "Handled by Current Employee",
    } = req.body;

    const normalizedOpeningBalance = Number(openingBalance);

    if (Number.isNaN(normalizedOpeningBalance) || normalizedOpeningBalance < 0) {
      return res.status(400).json({
        message: "Opening balance must be a valid positive amount or zero",
      });
    }

    let accountNumber = requestedAccountNumber?.trim().toUpperCase();

    if (!accountNumber || (await Account.exists({ accountNumber }))) {
      accountNumber = await generateUniqueAccountNumber();
    }
    const transactions =
      normalizedOpeningBalance > 0
        ? [
            {
              type: "deposit",
              title: "Opening balance created",
              amount: normalizedOpeningBalance,
              balanceAfter: normalizedOpeningBalance,
              employee,
            },
          ]
        : [];

    const account = await Account.create({
      fullName,
      phone,
      email,
      accountType,
      branch,
      accountNumber,
      balance: normalizedOpeningBalance,
      transactions,
    });

    return res.status(201).json({
      message: "Account created successfully",
      account: formatAccountResponse(account),
    });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(409).json({
        message: "An account with this email already exists",
      });
    }

    return res.status(500).json({
      message: error.message,
    });
  }
};

export const getAccounts = async (_req, res) => {
  try {
    const accounts = await Account.find()
      .sort({ createdAt: -1 })
      .select("fullName accountNumber accountType branch phone email status balance createdAt updatedAt");

    return res.json({
      accounts,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

export const getAccountByNumber = async (req, res) => {
  try {
    const account = await Account.findOne({
      accountNumber: req.params.accountNumber.toUpperCase(),
    });

    if (!account) {
      return res.status(404).json({
        message: "Account not found",
      });
    }

    return res.json({
      account: formatAccountResponse(account),
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

export const depositToAccount = async (req, res) => {
  try {
    const amount = Number(req.body.amount);
    const employee = req.body.employee || "Handled by Current Employee";

    if (Number.isNaN(amount) || amount <= 0) {
      return res.status(400).json({
        message: "Deposit amount must be greater than zero",
      });
    }

    const account = await Account.findOne({
      accountNumber: req.params.accountNumber.toUpperCase(),
    });

    if (!account) {
      return res.status(404).json({
        message: "Account not found",
      });
    }

    account.balance += amount;
    account.transactions.unshift({
      type: "deposit",
      title: "Employee deposit completed",
      amount,
      balanceAfter: account.balance,
      employee,
    });
    await account.save();

    return res.json({
      message: "Deposit completed successfully",
      account: formatAccountResponse(account),
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

export const withdrawFromAccount = async (req, res) => {
  try {
    const amount = Number(req.body.amount);
    const employee = req.body.employee || "Handled by Current Employee";

    if (Number.isNaN(amount) || amount <= 0) {
      return res.status(400).json({
        message: "Withdrawal amount must be greater than zero",
      });
    }

    const account = await Account.findOne({
      accountNumber: req.params.accountNumber.toUpperCase(),
    });

    if (!account) {
      return res.status(404).json({
        message: "Account not found",
      });
    }

    if (amount > account.balance) {
      return res.status(400).json({
        message: "Insufficient balance for this withdrawal",
      });
    }

    account.balance -= amount;
    account.transactions.unshift({
      type: "withdraw",
      title: "Employee withdrawal completed",
      amount,
      balanceAfter: account.balance,
      employee,
    });
    await account.save();

    return res.json({
      message: "Withdrawal completed successfully",
      account: formatAccountResponse(account),
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

export const getAccountTransactions = async (req, res) => {
  try {
    const account = await Account.findOne({
      accountNumber: req.params.accountNumber.toUpperCase(),
    }).select("accountNumber fullName transactions");

    if (!account) {
      return res.status(404).json({
        message: "Account not found",
      });
    }

    return res.json({
      accountNumber: account.accountNumber,
      fullName: account.fullName,
      transactions: account.transactions,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

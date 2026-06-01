import mongoose from "mongoose";

const transactionSchema = new mongoose.Schema(
  {
    type: {
      type: String,
      enum: ["deposit", "withdraw"],
      required: true,
    },
    title: {
      type: String,
      required: true,
      trim: true,
    },
    amount: {
      type: Number,
      required: true,
      min: 0,
    },
    balanceAfter: {
      type: Number,
      required: true,
      min: 0,
    },
    employee: {
      type: String,
      required: true,
      trim: true,
      default: "Handled by Current Employee",
    },
  },
  {
    timestamps: true,
  },
);

const accountSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: true,
      trim: true,
    },
    phone: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },
    accountType: {
      type: String,
      required: true,
      trim: true,
    },
    branch: {
      type: String,
      required: true,
      trim: true,
    },
    accountNumber: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      uppercase: true,
    },
    status: {
      type: String,
      required: true,
      trim: true,
      default: "Active",
    },
    balance: {
      type: Number,
      required: true,
      min: 0,
      default: 0,
    },
    transactions: {
      type: [transactionSchema],
      default: [],
    },
  },
  {
    timestamps: true,
  },
);

const Account = mongoose.model("Account", accountSchema);

export default Account;

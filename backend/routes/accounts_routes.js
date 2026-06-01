import express from "express";
import {
  createAccount,
  depositToAccount,
  getAccountByNumber,
  getAccounts,
  getAccountTransactions,
  withdrawFromAccount,
} from "../controller/account_controller.js";

const router = express.Router();

router.get("/", getAccounts);
router.post("/", createAccount);
router.get("/:accountNumber", getAccountByNumber);
router.get("/:accountNumber/transactions", getAccountTransactions);
router.post("/:accountNumber/deposit", depositToAccount);
router.post("/:accountNumber/withdraw", withdrawFromAccount);

export default router;

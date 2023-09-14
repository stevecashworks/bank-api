import express from "express";
import { get_all_transactions,clearTransactions,transfer,confirmSend, changePin, new_Transaction,confirm_transaction } from "./transaction_controller.js";
import { verify_Token } from "../user/verifyToken.js";
const transactionRoute= express.Router()
transactionRoute.post('/',get_all_transactions)
transactionRoute.post('/new',new_Transaction)
transactionRoute.post('/clearall',clearTransactions)
transactionRoute.post('/confirm',confirm_transaction)
transactionRoute.post('/send',verify_Token,confirmSend)
transactionRoute.put('/changepin',verify_Token,changePin)
transactionRoute.post("/transfer",transfer)

export default transactionRoute
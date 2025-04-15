import express from 'express';
import {
  getTransactions,
  addTransaction,
  deleteTransaction,
  getTransactionStats
} from '../controllers/transactionController.js';

const router = express.Router();

router.get('/', getTransactions);
router.post('/', addTransaction);
router.delete('/:id', deleteTransaction);
router.get('/stats', getTransactionStats);

export default router; 
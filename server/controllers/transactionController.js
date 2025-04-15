import Transaction from '../models/Transaction.js';

// Get all transactions
export const getTransactions = async (req, res) => {
  try {
    const transactions = await Transaction.find().sort({ date: -1 });
    res.json(transactions);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Add new transaction
export const addTransaction = async (req, res) => {
  try {
    const transaction = new Transaction(req.body);
    const savedTransaction = await transaction.save();
    res.status(201).json(savedTransaction);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete transaction
export const deleteTransaction = async (req, res) => {
  try {
    const transaction = await Transaction.findByIdAndDelete(req.params.id);
    if (!transaction) {
      return res.status(404).json({ message: 'Transaction not found' });
    }
    res.json({ message: 'Transaction deleted', transaction });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get transaction statistics
export const getTransactionStats = async (req, res) => {
  try {
    const stats = await Transaction.aggregate([
      {
        $group: {
          _id: null,
          totalIncome: {
            $sum: {
              $cond: [{ $eq: ['$type', 'income'] }, '$amount', 0]
            }
          },
          totalExpenses: {
            $sum: {
              $cond: [{ $eq: ['$type', 'expense'] }, { $abs: '$amount' }, 0]
            }
          }
        }
      }
    ]);

    const categoryStats = await Transaction.aggregate([
      {
        $match: { type: 'expense' }
      },
      {
        $group: {
          _id: '$category',
          total: { $sum: { $abs: '$amount' } }
        }
      },
      {
        $sort: { total: -1 }
      }
    ]);

    const result = stats[0] || { totalIncome: 0, totalExpenses: 0 };

    res.json({
      overall: {
        totalIncome: result.totalIncome || 0,
        totalExpenses: result.totalExpenses || 0
      },
      byCategory: categoryStats
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}; 
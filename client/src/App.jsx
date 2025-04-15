import { useState, useEffect } from 'react';
import axios from 'axios';
import Header from './components/Header';
import Balance from './components/Balance';
import TransactionList from './components/TransactionList';
import AddTransaction from './components/AddTransaction';
import ExpenseChart from './components/ExpenseChart';
import './App.css';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5001/api';

const App = () => {
  const [transactions, setTransactions] = useState([]);
  const [stats, setStats] = useState({
    overall: { totalIncome: 0, totalExpenses: 0 },
    byCategory: []
  });

  useEffect(() => {
    fetchTransactions();
    fetchStats();
  }, []);

  const fetchTransactions = async () => {
    try {
      const response = await axios.get(`${API_URL}/transactions`);
      setTransactions(response.data);
    } catch (error) {
      console.error('Error fetching transactions:', error);
    }
  };

  const fetchStats = async () => {
    try {
      const response = await axios.get(`${API_URL}/transactions/stats`);
      setStats(response.data);
    } catch (error) {
      console.error('Error fetching stats:', error);
    }
  };

  const addTransaction = async (transaction) => {
    try {
      const response = await axios.post(`${API_URL}/transactions`, transaction);
      setTransactions([response.data, ...transactions]);
      fetchStats();
    } catch (error) {
      console.error('Error adding transaction:', error);
    }
  };

  const deleteTransaction = async (id) => {
    try {
      await axios.delete(`${API_URL}/transactions/${id}`);
      setTransactions(transactions.filter(transaction => transaction._id !== id));
      fetchStats();
    } catch (error) {
      console.error('Error deleting transaction:', error);
    }
  };

  return (
    <div className="container">
      <Header />
      <div className="main-content">
        <div className="left-panel">
          <Balance stats={stats.overall} />
          <AddTransaction onAdd={addTransaction} />
          <TransactionList 
            transactions={transactions}
            onDelete={deleteTransaction}
          />
        </div>
        <div className="right-panel">
          <ExpenseChart categoryData={stats.byCategory} />
        </div>
      </div>
    </div>
  );
};

export default App;

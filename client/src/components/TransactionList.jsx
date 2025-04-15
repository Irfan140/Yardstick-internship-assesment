import { format } from 'date-fns';
import { FaTrash } from 'react-icons/fa';

const formatAmount = (amount) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD'
  }).format(amount);
};

const TransactionList = ({ transactions, onDelete }) => {
  return (
    <div className="transaction-list">
      <h3>Transaction History</h3>
      <ul className="list">
        {transactions.map(transaction => (
          <li
            key={transaction._id}
            className={`transaction ${transaction.type}`}
          >
            <div className="transaction-info">
              <div className="transaction-header">
                <span className="description">{transaction.description}</span>
                <span className={`amount ${transaction.type}`}>
                  {formatAmount(transaction.amount)}
                </span>
              </div>
              <div className="transaction-details">
                <span className="category">{transaction.category}</span>
                <span className="date">
                  {format(new Date(transaction.date), 'MMM d, yyyy')}
                </span>
              </div>
            </div>
            <button
              onClick={() => onDelete(transaction._id)}
              className="delete-btn"
            >
              <FaTrash />
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TransactionList; 
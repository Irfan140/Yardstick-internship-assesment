const formatAmount = (amount = 0) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    signDisplay: 'auto'
  }).format(amount);
};

const Balance = ({ stats }) => {
  const totalIncome = stats?.totalIncome || 0;
  const totalExpenses = Math.abs(stats?.totalExpenses || 0); // Make expenses positive for display
  const balance = totalIncome - totalExpenses; // Subtract expenses from income

  return (
    <div className="balance-container">
      <div className="balance-item">
        <h4>Income</h4>
        <p className="money income">{formatAmount(totalIncome)}</p>
      </div>
      <div className="balance-item">
        <h4>Expenses</h4>
        <p className="money expense">{formatAmount(-totalExpenses)}</p>
      </div>
      <div className="balance-item">
        <h4>Balance</h4>
        <p className={`money ${balance >= 0 ? 'income' : 'expense'}`}>
          {formatAmount(balance)}
        </p>
      </div>
    </div>
  );
};

export default Balance; 
import { useState } from 'react';

const categories = [
  'Food',
  'Transportation',
  'Housing',
  'Utilities',
  'Entertainment',
  'Shopping',
  'Healthcare',
  'Other'
];

const AddTransaction = ({ onAdd }) => {
  const [formData, setFormData] = useState({
    amount: '',
    description: '',
    category: 'Food',
    type: 'expense',
    date: new Date().toISOString().split('T')[0]
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!formData.amount || !formData.description) {
      alert('Please fill in all fields');
      return;
    }

    const amount = Number(formData.amount);
    onAdd({
      ...formData,
      amount: formData.type === 'expense' ? -Math.abs(amount) : Math.abs(amount)
    });

    setFormData({
      amount: '',
      description: '',
      category: 'Food',
      type: 'expense',
      date: new Date().toISOString().split('T')[0]
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'amount') {
      // Remove any non-numeric characters except decimal point
      const sanitizedValue = value.replace(/[^\d.]/g, '');
      setFormData(prev => ({
        ...prev,
        [name]: sanitizedValue
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  return (
    <div className="add-transaction">
      <h3>Add New Transaction</h3>
      <form onSubmit={handleSubmit}>
        <div className="form-control">
          <label htmlFor="amount">Amount</label>
          <input
            type="number"
            step="0.01"
            min="0"
            name="amount"
            value={formData.amount}
            onChange={handleChange}
            placeholder="Enter amount..."
            required
          />
        </div>

        <div className="form-control">
          <label htmlFor="type">Type</label>
          <select name="type" value={formData.type} onChange={handleChange}>
            <option value="expense">Expense</option>
            <option value="income">Income</option>
          </select>
        </div>

        <div className="form-control">
          <label htmlFor="category">Category</label>
          <select name="category" value={formData.category} onChange={handleChange}>
            {categories.map(category => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>

        <div className="form-control">
          <label htmlFor="description">Description</label>
          <input
            type="text"
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Enter description..."
            required
          />
        </div>

        <div className="form-control">
          <label htmlFor="date">Date</label>
          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            required
          />
        </div>

        <button className="btn">Add Transaction</button>
      </form>
    </div>
  );
};

export default AddTransaction; 
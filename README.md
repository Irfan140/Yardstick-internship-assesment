# Personal Finance Tracker

A full-stack web application for tracking personal income and expenses, built with the MERN stack (MongoDB, Express.js, React, Node.js).

![Personal Finance Tracker Screenshot](./screenshots/app-screenshot.png)

## Features

- Add and delete income/expense transactions
- Categorize transactions by type (income/expense) and category
- Real-time balance calculation and updates
- Visual representation of expenses by category using Chart.js
- Responsive design for all devices
- Form validation and error handling
- Date-based transaction organization
- Interactive transaction history with delete functionality

## Tech Stack

### Backend
- Node.js & Express.js
- MongoDB & Mongoose
- RESTful API architecture
- Environment variables configuration
- CORS enabled
- Morgan for logging

### Frontend
- React (Create React App)
- Chart.js for data visualization
- Date-fns for date formatting
- Axios for API requests
- Modern ES6+ JavaScript
- CSS3 with Flexbox/Grid
- Responsive design

## Prerequisites

- Node.js 
- MongoDB (local installation or MongoDB Atlas account)

## Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd expense-tracker
```

2. Install server dependencies:
```bash
cd server
npm install
```

3. Install client dependencies:
```bash
cd ../client
npm install
```

4. Configure environment variables:

Create a `.env` file in the server directory:
```env
PORT=5001
MONGO_URI=mongodb://localhost:27017/expense-tracker
```

Create a `.env` file in the client directory:
```env
REACT_APP_API_URL=http://localhost:5001/api
```

## Running the Application

1. Start MongoDB service (if using local MongoDB)

2. Start the server:
```bash
cd server
npm run dev
```

3. Start the client (in a new terminal):
```bash
cd client
npm start
```

The application will be available at `http://localhost:3000`

## API Endpoints

### Transactions
- `GET /api/transactions` - Get all transactions
- `POST /api/transactions` - Add a new transaction
- `DELETE /api/transactions/:id` - Delete a transaction
- `GET /api/transactions/stats` - Get transaction statistics

## Data Models

### Transaction
```javascript
{
  amount: Number,
  description: String,
  category: String (enum),
  type: String (enum: ['expense', 'income']),
  date: Date,
  timestamps: true
}
```

### Categories
- Food
- Transportation
- Housing
- Utilities
- Entertainment
- Shopping
- Healthcare
- Other

## Features in Detail

### Balance Calculation
- Real-time calculation of total income
- Real-time calculation of total expenses
- Automatic balance updates
- Color-coded positive/negative balances

### Transaction Management
- Add new transactions with amount, type, category, and date
- Delete existing transactions
- View transaction history
- Sort transactions by date

### Data Visualization
- Bar chart showing expenses by category
- Color-coded transaction types
- Responsive chart sizing
- Currency formatting

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## Future Enhancements

- User authentication and authorization
- Multiple currency support
- Data export/import functionality
- Budget setting and tracking
- Recurring transactions
- Transaction search and filtering
- Category management
- Monthly/yearly reports
- Mobile app version

## License

This project is licensed under the MIT License.

## Screenshots

### Main Dashboard
![Dashboard](./screenshots/dashboard.png)

### Add Transaction
![Add Transaction](./screenshots/add-transaction.png)

### Transaction History
![Transaction History](./screenshots/transaction-history.png)

### Expense Chart
![Expense Chart](./screenshots/expense-chart.png) 
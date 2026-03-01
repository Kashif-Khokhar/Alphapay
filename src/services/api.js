// Simulated local storage key for transactions
const STORAGE_KEY = 'uniPay_transactions';

// Helper: get transactions from storage
export const getTransactions = () => {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
};

// Helper: save a transaction to storage
const saveTransaction = (transaction) => {
  const existing = getTransactions();
  const updated = [transaction, ...existing];
  localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
};

// Simulate a payment API call
export const makePayment = async (paymentData) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      // 70% chance of success, 30% failure
      const isSuccess = Math.random() > 0.3;
      const status = isSuccess ? 'SUCCESS' : 'FAILED';

      const transaction = {
        transactionId: `TXN-${Date.now()}`,
        name: paymentData.name,
        cardNumber: `**** **** **** ${paymentData.cardNumber.slice(-4)}`,
        amount: parseFloat(paymentData.amount).toFixed(2),
        description: paymentData.description || 'University Fee Payment',
        status,
        date: new Date().toLocaleString('en-US', {
          year: 'numeric',
          month: 'short',
          day: 'numeric',
          hour: '2-digit',
          minute: '2-digit',
        }),
      };

      saveTransaction(transaction);
      resolve(transaction);
    }, 2000); // Simulate 2 second network delay
  });
};

// Simulate a Bank Transfer API call
export const makeTransfer = async (transferData) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const isSuccess = Math.random() > 0.1; // 90% success for transfers
      const status = isSuccess ? 'SUCCESS' : 'FAILED';

      const transaction = {
        transactionId: `TRF-${Date.now()}`,
        name: `${transferData.bank.name} Transfer`,
        accountNumber: `**** ${transferData.accountNumber.slice(-4)}`,
        amount: parseFloat(transferData.amount).toFixed(2),
        description: transferData.purpose || 'Money Transfer',
        status,
        date: new Date().toLocaleString('en-US', {
          year: 'numeric',
          month: 'short',
          day: 'numeric',
          hour: '2-digit',
          minute: '2-digit',
        }),
      };

      saveTransaction(transaction);
      resolve(transaction);
    }, 2000);
  });
};

// Simulated login
export const loginUser = async (username, password) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      // Accept any non-empty credentials for demo
      if (username && password) {
        const user = {
          name: username === 'admin' ? 'Admin User' : username,
          email: `${username}@university.edu`,
          studentId: 'STU-' + Math.floor(10000 + Math.random() * 90000),
          balance: (Math.random() * 5000 + 500).toFixed(2),
        };
        localStorage.setItem('uniPay_user', JSON.stringify(user));
        resolve(user);
      } else {
        reject(new Error('Invalid credentials'));
      }
    }, 1200);
  });
};

export const getCurrentUser = () => {
  try {
    const data = localStorage.getItem('uniPay_user');
    if (data) return JSON.parse(data);
  } catch {
    // ignore
  }
  // Default fallback user when login is bypassed
  const defaultUser = {
    name: 'rohaan12@gmail.com',
    email: 'rohaan12@gmail.com',
    studentId: 'STU-6838',
    balance: 1679.07,
  };
  localStorage.setItem('uniPay_user', JSON.stringify(defaultUser));
  return defaultUser;
};

// Logout
export const logoutUser = () => {
  localStorage.removeItem('uniPay_user');
};

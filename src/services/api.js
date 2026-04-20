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
        description: paymentData.description || 'Account Payment',
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

// Helper to generate unique card details
const generateCardDetails = () => {
  const cardNumber = "4782" + Math.floor(Math.random() * 1000000000000).toString().padStart(12, '0');
  const month = Math.floor(Math.random() * 12 + 1).toString().padStart(2, '0');
  const year = (new Date().getFullYear() + Math.floor(Math.random() * 5 + 1)).toString().slice(-2);
  const cvv = Math.floor(Math.random() * 900 + 100).toString();
  return { cardNumber, expiry: `${month}/${year}`, cvv };
};

// Simulated login
export const loginUser = async (username, password) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      // Accept any non-empty credentials for demo
      if (username && password) {
        const cardDetails = generateCardDetails();
        const user = {
          name: username === 'admin' ? 'Admin User' : username,
          email: `${username}@alphapay.pk`,
          studentId: 'ACC-' + Math.floor(10000 + Math.random() * 90000),
          balance: (Math.random() * 5000 + 500).toFixed(2),
          ...cardDetails
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
    if (data) {
      const user = JSON.parse(data);

      // FORCE RESET if it's the old default accounts
      if (user.name === 'rohaan12@gmail.com' || user.name.toLowerCase().includes('kashif')) {
        localStorage.removeItem('uniPay_user');
        return getCurrentUser(); // Re-run to get the new default
      }

      // Ensure existing users get card details if they don't have them
      if (!user.cardNumber) {
        const cardDetails = generateCardDetails();
        const updatedUser = { ...user, ...cardDetails };
        localStorage.setItem('uniPay_user', JSON.stringify(updatedUser));
        return updatedUser;
      }
      return user;
    }
  } catch {
    // ignore
  }
  // Default fallback user when login is bypassed
  const cardDetails = generateCardDetails();
  const defaultUser = {
    name: 'Admin',
    email: 'admin@alphapay.pk',
    studentId: 'ACC-1204',
    balance: 14500.00,
    ...cardDetails
  };
  localStorage.setItem('uniPay_user', JSON.stringify(defaultUser));
  return defaultUser;
};

// Logout
export const logoutUser = () => {
  localStorage.removeItem('uniPay_user');
};

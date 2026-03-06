<div align="center">

<img src="https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react&logoColor=white" />
<img src="https://img.shields.io/badge/Vite-7-646CFF?style=for-the-badge&logo=vite&logoColor=white" />
<img src="https://img.shields.io/badge/TailwindCSS-4-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white" />
<img src="https://img.shields.io/badge/License-MIT-green?style=for-the-badge" />

# ⚡ AlphaPay — University Payment Portal

**A premium, fully-simulated university fee payment portal built with React + Vite.**  
Beautiful light-theme UI with glassmorphism, animated 3D payment card, real-time analytics, and cinematic micro-interactions.

</div>

---

## ✨ Features

  - 🔐 **Simulated Login** — Demo mode, any credentials work
  - 💳 **Virtual Cards Management** — View, freeze, and interact with multiple dynamic 3D cards
  - 💸 **Send/Receive Money** — Polished peer-to-peer transfer flow and request money functionality
  - ⚡ **Bill Payments** — Categorized bill payment simulation (Electricity, Mobile, Gas, etc.)
  - 💰 **Add Funds** — Simulated top-up flow for the AlphaPay wallet
  - 💳 **3D Interactive Credit Card** — Flip animation, EMV chip, real-time preview
  - 📊 **Payment Analytics** — Success rate, total spent, animated progress bars
  - 📋 **Transaction History** — Live search, filter by status, paginated table
  - 🆘 **Help & Support** — Accordion FAQ, contact cards, contact form
  - 🎨 **Premium Light UI** — White glassmorphism cards, emerald/amber accents, micro-animations
  - 📱 **Responsive** — Works on desktop, tablet, and mobile

---

## 🛠️ Tech Stack

| Technology | Purpose |
|---|---|
| React 19 | UI Framework |
| Vite 7 | Build Tool / Dev Server |
| Tailwind CSS 4 | Utility Styling |
| React Router DOM 7 | Client-side Routing |
| Lucide React | Icon Library |

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- npm / yarn / pnpm

### Installation

```bash
# 1. Clone the repo
git clone https://github.com/Kashif-Khokhar/Alphapay.git
cd Alphapay

# 2. Install dependencies
npm install

# 3. Start the dev server
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

---

## 📂 Project Structure

  ```
  src/
  ├── components/
  │   ├── Navbar.jsx          # Fixed top navigation bar
  │   ├── PaymentForm.jsx     # 3D card + payment form
  │   ├── SendMoneyFlow.jsx   # Quick transfer component
  │   ├── StatusMessage.jsx   # Payment success/fail screen
  │   ├── TransactionTable.jsx # Transaction list table
  │   └── VirtualCard.jsx     # Animated interactive virtual card
  ├── pages/
  │   ├── Login.jsx           # Split-panel login page
  │   ├── Dashboard.jsx       # Stats, quick actions, recent txns
  │   ├── Checkout.jsx        # Secure payment page
  │   ├── Cards.jsx           # Virtual cards management page
  │   ├── History.jsx         # Filtered transaction history
  │   ├── Reports.jsx         # Payment analytics
  │   ├── RequestMoney.jsx    # Money request interface
  │   ├── PayBills.jsx        # Bill payment portal
  │   ├── AddMoney.jsx        # Wallet top-up flow
  │   └── Support.jsx         # FAQ + contact form
  ├── services/
  │   └── api.js              # Simulated API (no real backend)
  ├── App.jsx                 # Routes
  └── index.css               # Global styles & animations
  ```

---

## 📸 Screenshots

> All transactions are **100% simulated** — no real card data is used or stored.

| Login | Dashboard |
|---|---|
| Split-panel login with particle rain | Stats, quick actions, recent history |

| Checkout | Reports |
|---|---|
| 3D flip card with EMV chip | Animated progress bars + analytics |

| My Cards | Send Money |
|---|---|
| Manage virtual cards with freeze/unfreeze actions | Peer-to-peer quick transfers with animations |

---

## 📜 Available Scripts

```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run preview  # Preview production build
npm run lint     # Run ESLint
```

---

## ⚠️ Disclaimer

This is a **demonstration project** for a university payment portal. All payment functionality is fully simulated. No real financial transactions take place, and no sensitive card data is stored or transmitted.

---

## 👤 Author

**Kashif Khokhar**  
[GitHub](https://github.com/Kashif-Khokhar)

---

<div align="center">
  Made with ❤️ using React + Vite · © 2025
</div>

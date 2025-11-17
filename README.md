# StockFlow Frontend

<div align="center">

![StockFlow Logo](./public/logo192.png)

**A Modern Stock Trading & Portfolio Management Platform**

[![React](https://img.shields.io/badge/React-19.1.0-blue.svg)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.7.2-blue.svg)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-4.1.9-38B2AC.svg)](https://tailwindcss.com/)
[![Vite](https://img.shields.io/badge/Vite-6.1.0-646CFF.svg)](https://vitejs.dev/)

[Features](#-features) • [Tech Stack](#-technology-stack) • [Getting Started](#-getting-started) • [Documentation](#-documentation)

</div>

---

## 📖 About

StockFlow is a comprehensive web application for stock trading, portfolio management, and market analysis. Built with modern web technologies, it provides real-time market data, advanced analytics, and an intuitive interface for both novice and experienced traders.

## ✨ Features

### 🎯 Core Features
- **Real-Time Trading Dashboard** - Live stock prices with interactive TradingView charts
- **Portfolio Management** - Track holdings, performance, and transactions
- **Advanced Analytics** - Performance metrics, risk analysis, and sector allocation
- **Market Intelligence** - Comprehensive market overview and stock screening
- **Watchlist** - Monitor your favorite stocks with custom alerts
- **News Feed** - Stay updated with market news and economic calendar

### 🎨 User Experience
- Dark mode optimized interface
- Responsive design for all devices
- Fast loading with Vite
- Type-safe with TypeScript
- Accessible with Radix UI components

## 🛠️ Technology Stack

### Frontend
- **React 19** - UI library with latest features
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first styling
- **Vite** - Next-generation build tool

### UI Components
- **Radix UI** - Accessible primitives
- **Shadcn/ui** - Beautiful components
- **Lucide React** - Icon system
- **Recharts** - Data visualization

### Data Management
- **TanStack Query** - Server state management
- **React Router** - Client-side routing
- **Axios** - HTTP client

## 🚀 Getting Started

### Prerequisites
- Node.js 18 or higher
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/0xF3546/stockflow_frontend.git

# Navigate to project directory
cd stockflow_frontend

# Install dependencies
npm install
```

### Development

```bash
# Start development server
npm run dev

# Open browser to http://localhost:5173
```

### Build

```bash
# Build for production
npm run build

# Preview production build
npm run preview
```

### Linting

```bash
# Run ESLint
npm run lint
```

## 📂 Project Structure

```
stockflow_frontend/
├── public/              # Static assets
├── src/
│   ├── components/      # React components
│   │   ├── ui/         # Base UI components
│   │   └── ...         # Feature components
│   ├── pages/          # Route pages
│   ├── contexts/       # React Context providers
│   ├── layouts/        # Layout components
│   ├── hooks/          # Custom hooks
│   ├── utils/          # Utility functions
│   ├── types/          # TypeScript types
│   └── generated/      # Auto-generated API client
├── package.json
└── vite.config.ts
```

## 🎯 Available Scripts

| Script | Description |
|--------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run preview` | Preview production build |
| `npm run lint` | Run ESLint |
| `npm run codegen` | Generate API client from OpenAPI spec |

## 🔐 Environment Variables

Create a `.env` file in the root directory:

```env
VITE_API_BASE_URL=your_api_endpoint
VITE_API_KEY=your_api_key
```

## 📱 Pages

| Page | Route | Description |
|------|-------|-------------|
| Dashboard | `/` | Main trading dashboard |
| Portfolio | `/portfolio` | Portfolio overview and holdings |
| Analytics | `/analytics` | Performance metrics and insights |
| Markets | `/markets` | Market overview and stock screening |
| Stock Detail | `/stock/:symbol` | Individual stock information |
| Watchlist | `/watchlist` | Custom watchlist management |
| News | `/news` | Market news and updates |
| Login | `/login` | User authentication |
| Register | `/register` | New user registration |

## 🎨 Design System

The application uses a consistent design system with:
- **Colors**: Dark theme with financial green/red indicators
- **Typography**: Geist font family
- **Spacing**: Tailwind's spacing scale
- **Components**: Radix UI primitives with custom styling
- **Icons**: Lucide React icon library

## 🔄 State Management

- **React Context** - Global state (auth, portfolio, stocks)
- **TanStack Query** - Server state and caching
- **React Hook Form** - Form state management

## 🧪 Testing

```bash
# Run tests (when available)
npm test
```

## 📊 Performance

- **Code Splitting** - Automatic route-based splitting
- **React Compiler** - Automatic optimization
- **Lazy Loading** - Components and routes
- **Optimized Bundle** - Tree shaking and minification

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 Code Style

- Follow the ESLint configuration
- Use TypeScript for all new code
- Follow the existing component structure
- Write meaningful commit messages

## 🐛 Known Issues

- TradingView chart integration requires configuration
- Real-time WebSocket support pending
- Some analytics features show placeholder data

## 🗺️ Roadmap

- [ ] Real-time WebSocket integration
- [ ] Advanced charting indicators
- [ ] Paper trading mode
- [ ] Mobile app (React Native)
- [ ] AI-powered recommendations
- [ ] Options trading support
- [ ] Cryptocurrency integration
- [ ] Multi-portfolio support

## 📄 License

This project is private and proprietary.

## 🙏 Acknowledgments

- [React](https://reactjs.org/)
- [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Radix UI](https://www.radix-ui.com/)
- [Shadcn/ui](https://ui.shadcn.com/)
- [TanStack Query](https://tanstack.com/query)
- All other open-source libraries used

## 📞 Support

For support and questions:
- Create an [issue](https://github.com/0xF3546/stockflow_frontend/issues)
- Contact: 0xF3546

## 📚 Documentation

For detailed documentation, see [PROJECT_PRESENTATION.md](./PROJECT_PRESENTATION.md)

---

<div align="center">

**Built with ❤️ by the StockFlow Team**

</div>

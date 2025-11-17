# StockFlow - Quick Reference Guide

## 🚀 Quick Start

### Installation
```bash
npm install
```

### Development
```bash
npm run dev          # Start dev server on http://localhost:5173
```

### Build
```bash
npm run build        # Production build
npm run preview      # Preview production build
```

### Linting
```bash
npm run lint         # Run ESLint
```

---

## 📁 Project Structure

```
src/
├── components/           # Reusable components
│   ├── ui/              # Base UI components
│   ├── trading-dashboard.tsx
│   ├── portfolio.tsx
│   ├── watchlist.tsx
│   ├── markets-page.tsx
│   └── ...
├── pages/               # Route pages
│   ├── Dashboard.tsx    # Main dashboard
│   ├── Portfolio.tsx    # Portfolio page
│   ├── Analytics.tsx    # Analytics page
│   ├── Markets.tsx      # Markets page
│   ├── Stock.tsx        # Stock detail page
│   ├── Watchlist.tsx    # Watchlist page
│   ├── News.tsx         # News page
│   ├── Login.tsx        # Login page
│   └── Register.tsx     # Register page
├── contexts/            # React Context providers
│   ├── authContext.tsx
│   ├── portfolioContext.tsx
│   └── stockContext.tsx
├── layouts/             # Layout components
│   ├── BaseLayout.tsx
│   └── DashboardLayout.tsx
├── hooks/               # Custom React hooks
├── utils/               # Utility functions
├── types/               # TypeScript type definitions
└── generated/           # Auto-generated API client
```

---

## 🗺️ Routes

| Route | Page | Auth Required |
|-------|------|---------------|
| `/` | Dashboard | Yes |
| `/portfolio` | Portfolio | Yes |
| `/analytics` | Analytics | Yes |
| `/markets` | Markets | Yes |
| `/stock/:symbol` | Stock Detail | Yes |
| `/watchlist` | Watchlist | Yes |
| `/news` | News | Yes |
| `/login` | Login | No |
| `/register` | Register | No |

---

## 🎨 Key Components

### UI Components (`src/components/ui/`)
- `button.tsx` - Button component
- `card.tsx` - Card container
- `input.tsx` - Form input
- `badge.tsx` - Status badge
- `dialog.tsx` - Modal dialog
- `dropdown-menu.tsx` - Dropdown menu
- `select.tsx` - Select dropdown
- `table.tsx` - Data table
- `tabs.tsx` - Tab navigation
- `toast.tsx` - Toast notifications

### Feature Components (`src/components/`)
- `trading-dashboard.tsx` - Main dashboard
- `portfolio.tsx` - Portfolio summary
- `watchlist.tsx` - Watchlist component
- `markets-page.tsx` - Markets overview
- `stock-detail-page.tsx` - Stock details
- `trading-view-chart.tsx` - TradingView chart
- `market-overview.tsx` - Market indices
- `order-book.tsx` - Order book display
- `trading-panel.tsx` - Buy/sell panel

---

## 🔐 Context Providers

### AuthContext
```typescript
const { currentUser } = useContext(authContext)
```
Provides:
- `currentUser` - Current user object or null

### PortfolioContext
```typescript
const portfolio = usePortfolio()
```
Methods:
- `getPortfolioTotal()` - Total portfolio value
- `getAvailableCash()` - Available cash
- `getTotalGainLoss()` - Total gain/loss
- `getTotalGainLossPercent()` - Gain/loss percentage
- `getTotalChangeToday()` - Today's change
- `getStocks(symbol)` - Get stocks by symbol

### StockContext
```typescript
const stocks = useStocks()
```
Methods:
- `getStock(symbol)` - Get stock by symbol
- Stock data includes: name, price, change, volume, etc.

---

## 🎯 Common Patterns

### Protected Route
```typescript
// Already configured in AppRouter.tsx
// All authenticated routes are automatically protected
```

### Data Fetching with React Query
```typescript
const { data, isLoading, error } = useQuery({
  queryKey: ['key'],
  queryFn: fetchFunction
})
```

### Form Handling
```typescript
import { useForm } from 'react-hook-form'

const { register, handleSubmit } = useForm()
```

### Toast Notifications
```typescript
import { toast } from 'sonner'

toast.success('Success message')
toast.error('Error message')
```

---

## 🛠️ Technology Versions

| Technology | Version |
|------------|---------|
| React | 19.1.0 |
| TypeScript | 5.7.2 |
| Vite | 6.1.0 |
| Tailwind CSS | 4.1.9 |
| React Router | 6.20.0 |
| TanStack Query | 5.80.7 |
| Radix UI | Various |
| Lucide React | 0.539.0 |

---

## 🎨 Styling Guide

### Tailwind Classes
```typescript
// Common patterns
className="p-6 space-y-6"           // Padding and spacing
className="rounded-xl"               // Rounded corners
className="bg-muted/30"              // Semi-transparent background
className="text-primary"             // Primary color
className="text-destructive"         // Destructive/error color
className="font-mono"                // Monospace font
className="text-3xl font-bold"       // Large bold text
```

### Color Classes
- `text-primary` - Green (gains)
- `text-destructive` - Red (losses)
- `text-muted-foreground` - Gray text
- `bg-muted` - Muted background
- `bg-card` - Card background

---

## 📊 Data Flow

### User Action → State Update
1. User clicks button/submits form
2. Component calls API via Axios
3. React Query manages the request
4. Context updates global state
5. Components re-render with new data

### Real-time Updates
1. TanStack Query polls API
2. Auto-refetch on window focus
3. Background updates
4. Optimistic updates for better UX

---

## 🐛 Debugging Tips

### Check React Query DevTools
```typescript
// Already configured in queryClient.ts
// Look for failed queries in browser console
```

### TypeScript Errors
```bash
# Check for type errors
npx tsc --noEmit
```

### Build Errors
```bash
# Clear cache and rebuild
rm -rf node_modules dist
npm install
npm run build
```

### API Issues
- Check network tab in browser DevTools
- Verify API endpoint configuration
- Check authentication status
- Look for CORS errors

---

## 📝 Code Style

### Naming Conventions
- Components: PascalCase (`Dashboard.tsx`)
- Files: kebab-case (`trading-panel.tsx`) or PascalCase
- Variables: camelCase (`totalValue`)
- Types: PascalCase (`Stock`, `Portfolio`)
- Constants: UPPER_SNAKE_CASE (`API_BASE_URL`)

### Component Structure
```typescript
// 1. Imports
import { useState } from 'react'
import { Component } from './components'

// 2. Types/Interfaces
interface Props {
  value: string
}

// 3. Component
export function MyComponent({ value }: Props) {
  // 4. Hooks
  const [state, setState] = useState()
  
  // 5. Event handlers
  const handleClick = () => {}
  
  // 6. Return JSX
  return <div>...</div>
}
```

---

## 🔧 Configuration Files

### `vite.config.ts`
- Vite build configuration
- React plugin setup
- Build options

### `tailwind.config.js`
- Tailwind CSS configuration
- Theme customization
- Plugin configuration

### `tsconfig.json`
- TypeScript configuration
- Compiler options
- Path aliases

### `eslint.config.js`
- ESLint rules
- Code style enforcement

---

## 📦 Key Dependencies

### UI & Styling
- `tailwindcss` - Utility-first CSS
- `@radix-ui/react-*` - Accessible components
- `lucide-react` - Icons
- `class-variance-authority` - Component variants
- `tailwind-merge` - Merge Tailwind classes

### Data & State
- `@tanstack/react-query` - Server state
- `react-router-dom` - Routing
- `axios` - HTTP client

### Forms & Validation
- `react-hook-form` - Form management
- `@hookform/resolvers` - Validation

### Charts & Visualization
- `recharts` - Charts
- TradingView integration

---

## 🚨 Common Issues

### Issue: Module not found
```bash
# Solution: Install dependencies
npm install
```

### Issue: Port already in use
```bash
# Solution: Kill process or use different port
lsof -ti:5173 | xargs kill -9
# Or specify different port
npm run dev -- --port 3000
```

### Issue: Type errors in generated code
```bash
# Solution: Regenerate API client
npm run codegen
```

### Issue: Styles not applying
```bash
# Solution: Rebuild Tailwind
rm -rf .vite dist
npm run dev
```

---

## 📚 Additional Resources

### Documentation
- [React Docs](https://react.dev/)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [Radix UI](https://www.radix-ui.com/docs)
- [TanStack Query](https://tanstack.com/query/latest/docs)

### Project Files
- `README.md` - Getting started guide
- `PROJECT_PRESENTATION.md` - Detailed documentation
- `PRESENTATION_SLIDES.md` - Presentation format

---

## 🎯 Performance Tips

1. **Lazy Load Routes** - Use React.lazy() for code splitting
2. **Memoize Expensive Calculations** - Use useMemo()
3. **Debounce Search Inputs** - Reduce API calls
4. **Virtual Scrolling** - For long lists
5. **Image Optimization** - Lazy load images
6. **Bundle Analysis** - Check bundle size regularly

---

## ✅ Checklist for New Features

- [ ] Create component in appropriate directory
- [ ] Add TypeScript types
- [ ] Use existing UI components
- [ ] Follow naming conventions
- [ ] Add to routing if needed
- [ ] Update context if needed
- [ ] Test in browser
- [ ] Check mobile responsiveness
- [ ] Verify TypeScript compilation
- [ ] Run linter

---

*Last Updated: November 2025*

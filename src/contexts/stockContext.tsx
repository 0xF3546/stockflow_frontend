import { createContext, useContext, useState } from "react";
import { Stock } from "../types/Stock";

type StockContextType = {
  stocks: Stock[];
  addToStocks: (stock: Stock) => void;
  removeFromStocks: (stock: Stock) => void;
}

const StockContext = createContext<StockContextType | undefined>(undefined);

export const useStocks = () => useContext(StockContext);

export const StockProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [stocks, setStocks] = useState<Stock[]>([
    { symbol: "AAPL", name: "Apple Inc.", price: 175.43, change: 1.2 },
    { symbol: "MSFT", name: "Microsoft Corp.", price: 378.85, change: 0.8 },
    { symbol: "GOOGL", name: "Alphabet Inc.", price: 138.21, change: -0.3 },
    { symbol: "TSLA", name: "Tesla Inc.", price: 248.50, change: 2.1 },
    { symbol: "AMZN", name: "Amazon.com Inc.", price: 151.94, change: 0.5 },
    { symbol: "NVDA", name: "NVIDIA Corp.", price: 875.28, change: 3.2 },
    { symbol: "META", name: "Meta Platforms", price: 484.20, change: 1.8 },
    { symbol: "NFLX", name: "Netflix Inc.", price: 487.55, change: -0.7 },
  ]);

  const addToStocks = (stock: Stock) => {
    setStocks((prev) => [...prev, stock]);
  };

  const removeFromStocks = (stock: Stock) => {
    setStocks((prev) => prev.filter((s) => s.symbol !== stock.symbol));
  };

  const values = {
    stocks,
    addToStocks,
    removeFromStocks
  }

  return (
    <StockContext.Provider value={values}>
      {children}
    </StockContext.Provider>
  );
};

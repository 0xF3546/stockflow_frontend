import { createContext, useContext, useState } from "react";
import { Stock } from "../types/Stock";

type PortfolioContextType = {
  portfolio: Stock[];
  addToPortfolio: (stock: Stock) => void;
  removeFromPortfolio: (stock: Stock) => void;
}

const PortfolioContext = createContext<PortfolioContextType | undefined>(undefined);

export const usePortfolio = () => useContext(PortfolioContext);

export const PortfolioProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [portfolio, setPortfolio] = useState<Stock[]>([]);

  const addToPortfolio = (stock: Stock) => {
    setPortfolio((prev) => [...prev, stock]);
  };

  const removeFromPortfolio = (stock: Stock) => {
    setPortfolio((prev) => prev.filter((s) => s.symbol !== stock.symbol));
  };

  const values = {
    portfolio,
    addToPortfolio,
    removeFromPortfolio
  }

  return (
    <PortfolioContext.Provider value={values}>
      {children}
    </PortfolioContext.Provider>
  );
};

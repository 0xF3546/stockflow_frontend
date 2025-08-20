import { createContext, useContext, useEffect, useState } from "react";
import { Stock } from "../types/Stock";
import { useGetApiPortfolio, usePostApiBuy, usePostApiSell } from "../generated/api/queries";
import { useAuthProvider } from "../hooks/useAuthProvider";
import { useStocks } from "./stockContext";

type PortfolioContextType = {
  portfolio: Stock[];
  addToPortfolio: (ticker: string, quantity: number) => void;
  removeFromPortfolio: (ticker: string, quantity: number) => void;
  getStocks: (ticker: string) => Stock[] | undefined;
  getStockAmount: (ticker: string) => number | undefined;
  proceedBuyOrder: (order: { symbol: string; quantity: number; price: number; orderType: string }) => void;
  proceedSellOrder: (order: { symbol: string; quantity: number; price: number; orderType: string }) => void;
}

const PortfolioContext = createContext<PortfolioContextType | undefined>(undefined);

export const usePortfolio = () => useContext(PortfolioContext);

export const PortfolioProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [portfolio, setPortfolio] = useState<Stock[]>([]);
  const { data } = useGetApiPortfolio();
  const { mutate: buyStock } = usePostApiBuy();
  const { mutate: sellStock } = usePostApiSell();
  const stocks = useStocks();


  useEffect(() => {
    console.log("Fetching portfolio data...");
    if (data) {
      setPortfolio((_) => {
        return (data.portfolio ?? []).map((item: any) => ({
          symbol: item.symbol,
          name: item.name,
          price: item.price,
          change: item.change
        }));
      });
      console.log("Portfolio updated:", data.portfolio);
    }
  }, [data]);

  const addToPortfolio = (ticker: string, quantity: number) => {
    const stock = stocks?.getStock(ticker);
    if (!stock) {
      console.error("Stock not found:", ticker);
      return;
    }
    setPortfolio((prev) => [...prev, { ...stock, quantity }]);
    buyStock({
      body: {
        quantity,
        stock_symbol: ticker
      }
    });
  };

  const removeFromPortfolio = (ticker: string, quantity: number) => {
    const stock = stocks?.getStock(ticker);
    if (!stock) {
      console.error("Stock not found:", ticker);
      return;
    }
    setPortfolio((prev) => prev.filter((s) => s.symbol !== stock.symbol));
    sellStock({
      body: {
        quantity,
        stock_symbol: ticker
      }
    });
  };

  const getStocks = (ticker: string) => {
    return portfolio.filter((stock) => stock.symbol === ticker);
  };

  const getStockAmount = (ticker: string) => {
    return getStocks(ticker).length;
  };

  const proceedBuyOrder = (order: { symbol: string; quantity: number; price: number; orderType: string }) => {
    // TODO
    addToPortfolio(order.symbol, order.quantity);
  };

  const proceedSellOrder = (order: { symbol: string; quantity: number; price: number; orderType: string }) => {
    // TODO
    removeFromPortfolio(order.symbol, order.quantity);
  };

  const values = {
    portfolio,
    addToPortfolio,
    removeFromPortfolio,
    getStocks,
    getStockAmount,
    proceedBuyOrder,
    proceedSellOrder
  }

  return (
    <PortfolioContext.Provider value={values}>
      {children}
    </PortfolioContext.Provider>
  );
};

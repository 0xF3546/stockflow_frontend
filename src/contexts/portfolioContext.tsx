import { createContext, useContext, useEffect, useState } from "react";
import { Stock } from "../types/Stock";
import { useGetApiPortfolio, usePostApiBuy, usePostApiSell } from "../generated/api/queries";
import { useStocks } from "./stockContext";
import { models_OrderType, types_PortfolioItem } from "../generated/api/requests";

type StockWithQuantity = Stock & { quantity: number };

type PortfolioContextType = {
  portfolio: types_PortfolioItem[];
  getAvailableCash: () => number;
  getPortfolioTotal: () => number;
  addToPortfolio: (ticker: string, quantity: number) => void;
  removeFromPortfolio: (ticker: string, quantity: number) => void;
  getStocks: (ticker: string) => StockWithQuantity[];
  getStockAmount: (ticker: string) => number;
  proceedBuyOrder: (order: { symbol: string; quantity: number; price: number; orderType: models_OrderType }) => void;
  proceedSellOrder: (order: { symbol: string; quantity: number; price: number; orderType: models_OrderType }) => void;
  getTotalChangeToday: () => number;
  getTotalChangeTodayPercent: () => number;
  getTotalGainLoss: () => number;
  getTotalGainLossPercent: () => number;
}

const PortfolioContext = createContext<PortfolioContextType | undefined>(undefined);

export const usePortfolio = () => useContext(PortfolioContext);

export const PortfolioProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [portfolio, setPortfolio] = useState<types_PortfolioItem[]>([]);
  const { data, refetch } = useGetApiPortfolio();
  const { mutateAsync: buyStock } = usePostApiBuy();
  const { mutateAsync: sellStock } = usePostApiSell();
  const stocks = useStocks();

  const getAvailableCash = () => {
    return data?.cash_balance ?? 0;
  };

  const getPortfolioTotal = () => {
    return data?.total_value ?? 0;
  };

  useEffect(() => {
    console.log("Fetching portfolio data...");
    if (data) {
      setPortfolio((_) => {
        return ((data.portfolio ?? []) as types_PortfolioItem[]).map((item) => ({
          quantity: item.quantity,
          stockSymbol: item.stockSymbol
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
  };

  const removeFromPortfolio = (ticker: string, quantity: number) => {
    const stock = stocks?.getStock(ticker);
    if (!stock) {
      console.error("Stock not found:", ticker);
      return;
    }
    setPortfolio((prev) => {
      return prev.map((s) => {
        if (s.stockSymbol === stock.symbol) {
          const currentQuantity = typeof s.quantity === 'number' ? s.quantity : 0;
          const newQuantity = currentQuantity - quantity;
          if (newQuantity > 0) {
            return { ...s, quantity: newQuantity };
          } else {
            return null;
          }
        }
        return s;
      }).filter((s) => s !== null) as types_PortfolioItem[];
    });
  };

  const getStocks = (ticker: string): StockWithQuantity[] => {
    return portfolio
      .filter((item) => item.stockSymbol === ticker && typeof item.stockSymbol === 'string')
      .map((item) => {
        const stockData = stocks?.getStock(item.stockSymbol as string);
        if (!stockData) return undefined;
        return {
          ...stockData,
          quantity: item.quantity,
        };
      })
      .filter((stock): stock is StockWithQuantity => stock !== undefined);
  };

  const getStockAmount = (ticker: string) => {
    return getStocks(ticker).length;
  };

  const proceedBuyOrder = (order: { symbol: string; quantity: number; price: number; orderType: models_OrderType }) => {
    addToPortfolio(order.symbol, order.quantity);
    buyStock({
      body: {
        quantity: order.quantity,
        stockSymbol: order.symbol,
        orderType: order.orderType,
        limitPrice: order.price,
        stopPrice: order.price
      }
    }).then(() => {
      refetch();
    });
  };

  const proceedSellOrder = (order: { symbol: string; quantity: number; price: number; orderType: models_OrderType }) => {
    removeFromPortfolio(order.symbol, order.quantity);
    sellStock({
      body: {
        quantity: order.quantity,
        stockSymbol: order.symbol,
        orderType: order.orderType,
        limitPrice: order.price,
        stopPrice: order.price
      }
    }).then(() => {
      refetch();
    });
  };

  const getTotalChangeToday = () => {
    return data?.portfolio
      ?.map((item) => (item.quantity ?? 0) * (item.percentage_change ?? 0) * (stocks?.getStock(item.stockSymbol ?? '')?.price ?? 0) / 100)
      .reduce((acc: number, val) => acc + val, 0) ?? 0;
  }

  const getTotalChangeTodayPercent = () => {
    return data?.portfolio
      ?.map((item) => item.percentage_change)
      .reduce((acc: number, val) => acc + (val ?? 0), 0) ?? 0;
  }

  const getTotalGainLoss = () => {
    return data?.overall_gain_loss ?? 0;
  }

  const getTotalGainLossPercent = () => {
    return data?.overall_gain_loss_percentage ?? 0;
  }

  const values = {
    portfolio,
    addToPortfolio,
    removeFromPortfolio,
    getStocks,
    getStockAmount,
    proceedBuyOrder,
    proceedSellOrder,
    getAvailableCash,
    getPortfolioTotal,
    getTotalChangeToday,
    getTotalChangeTodayPercent,
    getTotalGainLoss,
    getTotalGainLossPercent
  }

  return (
    <PortfolioContext value={values}>
      {children}
    </PortfolioContext>
  );
};

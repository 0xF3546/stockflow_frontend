import { AuthProvider, authContext } from "./authContext";
import { PortfolioProvider } from "./portfolioContext";
import { StockProvider } from "./stockContext";
import { useContext } from "react";

export const ContextProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <AuthProvider>
      <AuthGate>{children}</AuthGate>
    </AuthProvider>
  );
};

function AuthGate({ children }: { children: React.ReactNode }) {
  const ctx = useContext(authContext);
  if (!ctx?.currentUser) return <>{children}</>;
  return (
    <StockProvider>
      <PortfolioProvider>
        {children}
      </PortfolioProvider>
    </StockProvider>
  );
}
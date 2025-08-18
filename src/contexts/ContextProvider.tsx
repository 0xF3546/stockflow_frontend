import { AuthProvider } from "./authContext";
import { PortfolioProvider } from "./portfolioContext";
import { StockProvider } from "./stockContext";

export const ContextProvider = ({ children }: { children: React.ReactNode }) => {
    return (
        <AuthProvider>
            <StockProvider>
                <PortfolioProvider>
                    {children}
                </PortfolioProvider>
            </StockProvider>
        </AuthProvider>
    );
}
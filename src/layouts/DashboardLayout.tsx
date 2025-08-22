import { Outlet, useNavigate } from "react-router";
import { Button } from "../components/ui/button";
import { useState, useEffect } from "react";
import { useStocks } from "../contexts/stockContext";
import { BarChart3, TrendingUp, Wallet, Bell, Search, Menu, Newspaper, PieChart, Activity } from "lucide-react"
import { Badge } from "../components/ui/badge";
import { AppRoutes } from "../AppRouter";
import { useAuthProvider } from "../hooks/useAuthProvider";
import { useGetApiStocksSearch } from "../generated/api/queries";
import { usePortfolio } from "../contexts/portfolioContext";

export default function DashboardLayout() {
    const [sidebarOpen, setSidebarOpen] = useState(true)
    const [searchQuery, setSearchQuery] = useState("")
    const [showSuggestions, setShowSuggestions] = useState(false)
    const navigate = useNavigate();
    const { currentUser } = useAuthProvider();
    const portfolio = usePortfolio();

    const { data: stocks, refetch, isFetching } = useGetApiStocksSearch({
        query: {
            q: searchQuery
        }
    });

    const [isMarketOpen, setIsMarketOpen] = useState(isMarketOpenNow);

    useEffect(() => {
        const interval = setInterval(() => setIsMarketOpen(isMarketOpenNow()), 60000);
        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        if (searchQuery) {
            refetch();
        }
    }, [searchQuery]);

    const filteredStocks = stocks ? stocks.filter(
        (stock) =>
            (stock.symbol && stock.symbol.toLowerCase().includes(searchQuery.toLowerCase())) ||
            (stock.companyName && stock.companyName.toLowerCase().includes(searchQuery.toLowerCase())),
    ) : []

    function isMarketOpenNow() {
        const now = new Date();
        const h = now.getHours();
        const m = now.getMinutes();
        return (h > 7 || (h === 7 && m >= 30)) && (h < 22 || (h === 22 && m <= 30));
    }


     const navigation = [
        { id: AppRoutes.HOME.path, label: "Dashboard", icon: BarChart3 },
        { id: AppRoutes.MARKETS.path, label: "Markets", icon: TrendingUp },
        { id: AppRoutes.PORTFOLIO.path, label: "Portfolio", icon: Wallet },
        { id: AppRoutes.ANALYTICS.path, label: "Analytics", icon: PieChart },
        { id: AppRoutes.NEWS.path, label: "News", icon: Newspaper },
        { id: AppRoutes.WATCHLIST.path, label: "Watchlist", icon: Activity },
    ]

    return (
        <>
            <div className="flex h-screen bg-background">
                <div
                    className={`${sidebarOpen ? "w-64" : "w-16"} bg-sidebar border-r border-sidebar-border transition-all duration-300 flex flex-col`}
                >
                    <div className="p-6">
                        <div className="flex items-center gap-3">
                            <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => setSidebarOpen(!sidebarOpen)}
                                className="text-sidebar-foreground hover:bg-sidebar-accent rounded-xl"
                            >
                                <Menu className="h-5 w-5" />
                            </Button>
                            {sidebarOpen && (
                                <div>
                                    <h1 className="text-xl font-bold text-sidebar-foreground">StockFlow</h1>
                                    <p className="text-xs text-muted-foreground">Professional Trading</p>
                                </div>
                            )}
                        </div>
                    </div>

                    <nav className="px-4 space-y-1 flex-1">
                        {navigation.map((item) => {
                            const Icon = item.icon
                            return (
                                <Button
                                    key={item.id}
                                    variant="ghost"
                                    onClick={() => navigate(item.id)}
                                    className="w-full justify-start rounded-xl transition-all text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
                                >
                                    <Icon className="h-5 w-5" />
                                    {sidebarOpen && <span className="ml-3">{item.label}</span>}
                                </Button>
                            )
                        })}
                    </nav>

                    {sidebarOpen && (
                        <div className="p-4 border-t border-sidebar-border">
                            <div className="bg-sidebar-accent rounded-xl p-3">
                                <p className="text-sm font-medium text-sidebar-accent-foreground">Account Balance</p>
                                <p className="text-lg font-mono font-bold text-primary">${portfolio?.getAvailableCash()}</p>
                                <p className="text-xs text-muted-foreground">+2.4% today</p>
                            </div>
                        </div>
                    )}
                </div>

                {/* Main Content */}
                <div className="flex-1 flex flex-col">
                    <header className="bg-card/50 backdrop-blur-sm border-b border-border p-4 sticky top-0 z-10">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-4">
                                <div className="relative">
                                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                                    <input
                                        type="text"
                                        placeholder="Search stocks (AAPL, MSFT, TSLA...)"
                                        value={searchQuery}
                                        onChange={(e) => {
                                            setSearchQuery(e.target.value)
                                            setShowSuggestions(e.target.value.length > 0)
                                        }}
                                        onFocus={() => setShowSuggestions(searchQuery.length > 0)}
                                        onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
                                        className="pl-10 pr-4 py-2.5 w-80 bg-input border border-border rounded-xl text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent transition-all"
                                    />

                                    {showSuggestions && (
                                        <div className="absolute top-full left-0 right-0 mt-1 bg-card border border-border rounded-xl shadow-lg z-50 max-h-80 overflow-y-auto">
                                            {filteredStocks.length > 0 ? (
                                                filteredStocks.map((stock) => (
                                                    <button
                                                        key={stock.symbol}
                                                        onClick={() => navigate(AppRoutes.STOCK.path.replace(":symbol", stock.symbol ?? ""))}
                                                        className="w-full px-4 py-3 text-left hover:bg-accent hover:text-accent-foreground transition-colors border-b border-border last:border-b-0 flex items-center justify-between"
                                                    >
                                                        <div>
                                                            <div className="font-mono font-semibold text-sm">{stock.symbol}</div>
                                                            <div className="text-xs text-muted-foreground">{stock.companyName}</div>
                                                        </div>
                                                        {/*<div className="text-right">
                                                            <div className="font-mono text-sm">{stock.price}</div>
                                                            <div
                                                                className={`text-xs ${stock.change >= 0 ? "text-green-500" : "text-red-500"}`}
                                                            >
                                                                {stock.change}
                                                            </div>
                                                        </div>*/}
                                                    </button>
                                                ))
                                            ) : (
                                                <div className="px-4 py-3 text-muted-foreground text-sm">No stocks found for "{searchQuery}"</div>
                                            )}
                                        </div>
                                    )}
                                </div>
                                {isMarketOpen && (
                                    <Badge variant="secondary" className="bg-primary/10 text-primary border-primary/20 rounded-full">
                                        Market Open
                                    </Badge>
                                )}
                            </div>
                            <div className="flex items-center gap-4">
                                <Button variant="ghost" size="sm" className="rounded-xl">
                                    <Bell className="h-5 w-5" />
                                </Button>
                                <div className="text-right">
                                    <p className="text-sm font-medium">{currentUser?.username}</p>
                                    <p className="text-xs text-muted-foreground">Premium Account</p>
                                </div>
                            </div>
                        </div>
                    </header>

                    {/* Page Content */}
                    <div className="flex-1 overflow-auto"><Outlet /></div>
                </div>
            </div>
        </>
    )
}
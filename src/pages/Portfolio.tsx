import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card"
import { Badge } from "../components/ui/badge"
import { Button } from "../components/ui/button"
import { TrendingUp, TrendingDown, DollarSign } from "lucide-react"
import { usePortfolio } from "../contexts/portfolioContext"
import { useStocks } from "../contexts/stockContext"

const transactions = [
  { type: "BUY", symbol: "AAPL", shares: 50, price: 172.3, date: "2024-01-15", total: 8615.0 },
  { type: "SELL", symbol: "TSLA", shares: 25, price: 265.4, date: "2024-01-14", total: 6635.0 },
  { type: "BUY", symbol: "MSFT", shares: 30, price: 375.2, date: "2024-01-12", total: 11256.0 },
]

const PortfolioPage = () => {
    const portfolio = usePortfolio();
  const stocks = useStocks();
  const totalValue = portfolio
    ? portfolio.getPortfolioTotal() + portfolio.getAvailableCash()
    : 0;
  const totalCost = portfolio?.portfolio.reduce((sum, holding) => sum + (holding.quantity ?? 0) * (holding.avg_price ?? 0), 0) ?? 0;
  const totalGainLoss = totalValue - totalCost;
  const totalGainLossPercent = (totalGainLoss / totalCost) * 100;

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Portfolio</h1>
          <p className="text-muted-foreground">Track your investments and performance</p>
        </div>
        <Button className="rounded-xl">
          <DollarSign className="h-4 w-4 mr-2" />
          Add Funds
        </Button>
      </div>

      {/* Portfolio Summary */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground"></CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-mono font-bold">${totalValue.toLocaleString()}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total Gain/Loss</CardTitle>
          </CardHeader>
          <CardContent>
            <p className={`text-3xl font-mono font-bold ${totalGainLoss >= 0 ? "text-primary" : "text-destructive"}`}>
              {totalGainLoss >= 0 ? "+" : ""}${totalGainLoss.toLocaleString()}
            </p>
            <p className={`text-sm ${totalGainLoss >= 0 ? "text-primary" : "text-destructive"}`}>
              {totalGainLossPercent >= 0 ? "+" : ""}
              {totalGainLossPercent.toFixed(2)}%
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">Day's Change</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-mono font-bold text-primary">+$1,247.32</p>
            <p className="text-sm text-primary">+0.89%</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">Cash Balance</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-mono font-bold">$15,430.50</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-12 gap-6">
        {/* Holdings */}
        <div className="col-span-12 lg:col-span-8">
          <Card>
            <CardHeader>
              <CardTitle>Holdings</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {portfolio?.portfolio.map((holding) => {
                  const stock = stocks?.getStock(holding.stockSymbol ?? "");
                  if (!stock) return null;
                  const gainLoss = stock.price * (holding.quantity ?? 0) - (holding.quantity ?? 0) * (holding.avg_price ?? 0);
                  const gainLossPercent = (gainLoss / ((holding.quantity ?? 0) * (holding.avg_price ?? 0))) * 100;

                  return (
                    <div key={holding.stockSymbol} className="flex items-center justify-between p-4 bg-muted/30 rounded-xl">
                      <div className="flex items-center gap-4">
                        <div>
                          <p className="font-semibold">{holding.stockSymbol}</p>
                          <p className="text-sm text-muted-foreground">{stocks?.getStock(holding.stockSymbol ?? "")?.name}</p>
                        </div>
                        <Badge variant="outline" className="rounded-full">
                          {holding.quantity} shares
                        </Badge>
                      </div>
                      <div className="text-right">
                        <p className="font-mono font-bold">${stock.price.toLocaleString()}</p>
                        <div className="flex items-center gap-2">
                          {gainLoss >= 0 ? (
                            <TrendingUp className="h-4 w-4 text-primary" />
                          ) : (
                            <TrendingDown className="h-4 w-4 text-destructive" />
                          )}
                          <span className={`text-sm font-mono ${gainLoss >= 0 ? "text-primary" : "text-destructive"}`}>
                            {gainLoss >= 0 ? "+" : ""}${gainLoss.toFixed(2)} ({gainLossPercent >= 0 ? "+" : ""}
                            {gainLossPercent.toFixed(2)}%)
                          </span>
                        </div>
                        <p className="text-xs text-muted-foreground">
                          Avg: ${(holding.avg_price ?? 0).toFixed(2)} | Current: ${stock.price.toFixed(2)}
                        </p>
                      </div>
                    </div>
                  )
                })}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Recent Transactions */}
        <div className="col-span-12 lg:col-span-4">
          <Card>
            <CardHeader>
              <CardTitle>Recent Transactions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {transactions.map((transaction, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-muted/30 rounded-xl">
                  <div>
                    <div className="flex items-center gap-2">
                      <Badge
                        variant={transaction.type === "BUY" ? "default" : "destructive"}
                        className="text-xs rounded-full"
                      >
                        {transaction.type}
                      </Badge>
                      <span className="font-medium">{transaction.symbol}</span>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {transaction.shares} shares @ ${transaction.price}
                    </p>
                    <p className="text-xs text-muted-foreground">{transaction.date}</p>
                  </div>
                  <p className="font-mono font-bold">${transaction.total.toLocaleString()}</p>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

export default PortfolioPage;
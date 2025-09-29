import { Card, CardContent, CardHeader, CardTitle } from "./ui/card"
import { Badge } from "./ui/badge"
import { Wallet, TrendingUp, TrendingDown } from "lucide-react"
import { usePortfolio } from "../contexts/portfolioContext"
import { useStocks } from "../contexts/stockContext"
import { types_PortfolioItem } from "../generated/api/requests"

const portfolioData = {
  totalValue: "$127,543.89",
  dayChange: "+$2,345.67",
  dayChangePercent: "+1.87%",
  totalGainLoss: "+$12,543.89",
  totalGainLossPercent: "+10.89%",
  positions: [
    { symbol: "AAPL", shares: 50, value: "$8,771.50", gainLoss: "+$234.50", positive: true },
    { symbol: "GOOGL", shares: 10, value: "$28,345.60", gainLoss: "-$124.40", positive: false },
    { symbol: "MSFT", shares: 75, value: "$28,419.00", gainLoss: "+$567.25", positive: true },
  ],
}

export function Portfolio() {
  const portfolio = usePortfolio();
  const stocks = useStocks();
  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Wallet className="h-5 w-5 text-primary" />
          Portfolio
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="p-4 bg-muted rounded-lg">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-muted-foreground">Total Value</span>
            <Badge variant="secondary" className="bg-primary text-primary-foreground">
              {portfolioData.dayChange} ({portfolioData.dayChangePercent})
            </Badge>
          </div>
          <p className="text-2xl font-bold">{portfolio?.getPortfolioTotal().toFixed(2)}</p>
          <div className="flex items-center gap-2 mt-2">
            <TrendingUp className="h-4 w-4 text-primary" />
            <span className="text-sm text-primary font-semibold">
              {portfolioData.totalGainLoss} ({portfolioData.totalGainLossPercent})
            </span>
          </div>
        </div>

        <div className="space-y-3">
          <h4 className="font-semibold text-sm">Top Positions</h4>
          {portfolio?.portfolio.map((position: types_PortfolioItem) => (
            <div key={position.stockSymbol} className="flex items-center justify-between p-3 bg-muted rounded-lg">
              <div>
                <p className="font-semibold text-sm">{position.stockSymbol}</p>
                <p className="text-xs text-muted-foreground">{position.quantity} shares</p>
              </div>
              <div className="text-right">
                <p className="font-semibold text-sm">{stocks?.getStock(position.stockSymbol ?? '')?.price}</p>
                <div className="flex items-center gap-1">
                  {position.percentage_change ?? 0 >= 0 ? (
                    <TrendingUp className="h-3 w-3 text-primary" />
                  ) : (
                    <TrendingDown className="h-3 w-3 text-destructive" />
                  )}
                  <span className={`text-xs font-medium ${position.percentage_change ?? 0 >= 0 ? "text-primary" : "text-destructive"}`}>
                    {position.percentage_change?.toFixed(2)}%
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

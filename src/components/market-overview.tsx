import { Card, CardContent, CardHeader, CardTitle } from "./ui/card"
import { Badge } from "./ui/badge"
import { TrendingUp, TrendingDown } from "lucide-react"

const marketData = [
  { symbol: "S&P 500", value: "4,567.89", change: "+23.45", changePercent: "+0.52%", positive: true },
  { symbol: "NASDAQ", value: "14,234.56", change: "+89.12", changePercent: "+0.63%", positive: true },
  { symbol: "DOW JONES", value: "34,567.89", change: "-45.67", changePercent: "-0.13%", positive: false },
  { symbol: "RUSSELL 2000", value: "2,123.45", change: "+12.34", changePercent: "+0.58%", positive: true },
]

export function MarketOverview() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <TrendingUp className="h-5 w-5 text-primary" />
          Market Overview
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {marketData.map((market) => (
            <div key={market.symbol} className="p-4 bg-muted rounded-lg">
              <p className="text-sm text-muted-foreground mb-1">{market.symbol}</p>
              <p className="text-xl font-bold mb-2">{market.value}</p>
              <div className="flex items-center gap-2">
                {market.positive ? (
                  <TrendingUp className="h-4 w-4 text-primary" />
                ) : (
                  <TrendingDown className="h-4 w-4 text-destructive" />
                )}
                <Badge
                  variant={market.positive ? "secondary" : "destructive"}
                  className={market.positive ? "bg-primary text-primary-foreground" : ""}
                >
                  {market.change} ({market.changePercent})
                </Badge>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

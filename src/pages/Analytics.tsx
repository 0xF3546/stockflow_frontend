import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card"
import { Badge } from "../components/ui/badge"
import { Button } from "../components/ui/button"
import { TrendingUp, TrendingDown, Target, Award } from "lucide-react"

const AnalyticsPage = () => {
  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Analytics</h1>
          <p className="text-muted-foreground">Performance insights and trading analytics</p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" className="rounded-xl bg-transparent">
            1M
          </Button>
          <Button variant="outline" className="rounded-xl bg-transparent">
            3M
          </Button>
          <Button className="rounded-xl">1Y</Button>
        </div>
      </div>

      {/* Performance Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
              <TrendingUp className="h-4 w-4" />
              Total Return
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-mono font-bold text-primary">+24.7%</p>
            <p className="text-sm text-muted-foreground">vs S&P 500: +18.2%</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
              <Target className="h-4 w-4" />
              Win Rate
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-mono font-bold">68.4%</p>
            <p className="text-sm text-primary">+2.1% vs last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
              <Award className="h-4 w-4" />
              Sharpe Ratio
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-mono font-bold">1.84</p>
            <p className="text-sm text-muted-foreground">Risk-adjusted return</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">Max Drawdown</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-mono font-bold text-destructive">-8.2%</p>
            <p className="text-sm text-muted-foreground">Peak to trough</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-12 gap-6">
        {/* Performance Chart Placeholder */}
        <div className="col-span-12 lg:col-span-8">
          <Card className="h-[400px]">
            <CardHeader>
              <CardTitle>Portfolio Performance</CardTitle>
            </CardHeader>
            <CardContent className="flex items-center justify-center h-[320px] text-muted-foreground">
              <div className="text-center">
                <TrendingUp className="h-16 w-16 mx-auto mb-4 opacity-50" />
                <p>Performance chart would be displayed here</p>
                <p className="text-sm">Integration with charting library needed</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Top Performers */}
        <div className="col-span-12 lg:col-span-4">
          <Card>
            <CardHeader>
              <CardTitle>Top Performers</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {[
                { symbol: "NVDA", gain: 45.2, period: "3M" },
                { symbol: "AAPL", gain: 12.8, period: "1M" },
                { symbol: "MSFT", gain: 8.4, period: "1M" },
                { symbol: "GOOGL", gain: -2.1, period: "1M" },
              ].map((stock) => (
                <div key={stock.symbol} className="flex items-center justify-between p-3 bg-muted/30 rounded-xl">
                  <div>
                    <p className="font-medium">{stock.symbol}</p>
                    <p className="text-sm text-muted-foreground">{stock.period}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    {stock.gain >= 0 ? (
                      <TrendingUp className="h-4 w-4 text-primary" />
                    ) : (
                      <TrendingDown className="h-4 w-4 text-destructive" />
                    )}
                    <span className={`font-mono ${stock.gain >= 0 ? "text-primary" : "text-destructive"}`}>
                      {stock.gain >= 0 ? "+" : ""}
                      {stock.gain}%
                    </span>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Risk Analysis */}
        <div className="col-span-12 lg:col-span-6">
          <Card>
            <CardHeader>
              <CardTitle>Risk Analysis</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between p-3 bg-muted/30 rounded-xl">
                <span>Portfolio Beta</span>
                <Badge variant="outline" className="rounded-full">
                  1.12
                </Badge>
              </div>
              <div className="flex items-center justify-between p-3 bg-muted/30 rounded-xl">
                <span>Volatility (30d)</span>
                <Badge variant="outline" className="rounded-full">
                  18.4%
                </Badge>
              </div>
              <div className="flex items-center justify-between p-3 bg-muted/30 rounded-xl">
                <span>Value at Risk (95%)</span>
                <Badge variant="destructive" className="rounded-full">
                  -$2,847
                </Badge>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sector Allocation */}
        <div className="col-span-12 lg:col-span-6">
          <Card>
            <CardHeader>
              <CardTitle>Sector Allocation</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {[
                { sector: "Technology", percentage: 45.2, color: "bg-primary" },
                { sector: "Healthcare", percentage: 18.7, color: "bg-accent" },
                { sector: "Financial", percentage: 15.3, color: "bg-chart-3" },
                { sector: "Consumer", percentage: 12.4, color: "bg-chart-4" },
                { sector: "Energy", percentage: 8.4, color: "bg-chart-5" },
              ].map((sector) => (
                <div key={sector.sector} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">{sector.sector}</span>
                    <span className="text-sm font-mono">{sector.percentage}%</span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2">
                    <div className={`h-2 rounded-full ${sector.color}`} style={{ width: `${sector.percentage}%` }} />
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

export default AnalyticsPage;
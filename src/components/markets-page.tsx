import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card"
import { Button } from "./ui/button"
import { Input } from "./ui/input"
import { TradingViewChart } from "./trading-view-chart"
import { Search, Filter, TrendingUp, TrendingDown } from "lucide-react"

const marketData = [
  { symbol: "AAPL", name: "Apple Inc.", price: 175.43, change: 2.34, changePercent: 1.35, volume: "52.3M" },
  { symbol: "GOOGL", name: "Alphabet Inc.", price: 2847.52, change: -15.23, changePercent: -0.53, volume: "28.1M" },
  { symbol: "MSFT", name: "Microsoft Corp.", price: 378.91, change: 4.67, changePercent: 1.25, volume: "31.7M" },
  { symbol: "TSLA", name: "Tesla Inc.", price: 248.73, change: -8.45, changePercent: -3.28, volume: "89.2M" },
  { symbol: "AMZN", name: "Amazon.com Inc.", price: 3342.88, change: 12.45, changePercent: 0.37, volume: "45.6M" },
  { symbol: "NVDA", name: "NVIDIA Corp.", price: 875.28, change: 23.67, changePercent: 2.78, volume: "67.4M" },
]

const sectors = [
  { name: "Technology", change: 1.24, stocks: 156 },
  { name: "Healthcare", change: -0.45, stocks: 89 },
  { name: "Financial", change: 0.78, stocks: 134 },
  { name: "Energy", change: 2.34, stocks: 67 },
  { name: "Consumer", change: -0.12, stocks: 98 },
]

export function MarketsPage() {
  const [selectedSymbol, setSelectedSymbol] = useState("AAPL")
  const [searchTerm, setSearchTerm] = useState("")

  const filteredStocks = marketData.filter(
    (stock) =>
      stock.symbol.toLowerCase().includes(searchTerm.toLowerCase()) ||
      stock.name.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Markets</h1>
          <p className="text-muted-foreground">Real-time market data and analysis</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              placeholder="Search stocks..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 w-64 rounded-xl"
            />
          </div>
          <Button variant="outline" className="rounded-xl bg-transparent">
            <Filter className="h-4 w-4 mr-2" />
            Filter
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-12 gap-6">
        {/* Market Overview */}
        <div className="col-span-12 lg:col-span-8">
          <Card>
            <CardHeader>
              <CardTitle>Market Overview</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="text-center p-4 bg-muted/50 rounded-xl">
                  <p className="text-sm text-muted-foreground">S&P 500</p>
                  <p className="text-2xl font-mono font-bold">4,567.89</p>
                  <p className="text-sm text-primary">+0.85%</p>
                </div>
                <div className="text-center p-4 bg-muted/50 rounded-xl">
                  <p className="text-sm text-muted-foreground">NASDAQ</p>
                  <p className="text-2xl font-mono font-bold">14,234.56</p>
                  <p className="text-sm text-primary">+1.23%</p>
                </div>
                <div className="text-center p-4 bg-muted/50 rounded-xl">
                  <p className="text-sm text-muted-foreground">DOW JONES</p>
                  <p className="text-2xl font-mono font-bold">34,567.12</p>
                  <p className="text-sm text-destructive">-0.34%</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sector Performance */}
        <div className="col-span-12 lg:col-span-4">
          <Card>
            <CardHeader>
              <CardTitle>Sector Performance</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {sectors.map((sector) => (
                <div key={sector.name} className="flex items-center justify-between p-3 bg-muted/30 rounded-xl">
                  <div>
                    <p className="font-medium">{sector.name}</p>
                    <p className="text-sm text-muted-foreground">{sector.stocks} stocks</p>
                  </div>
                  <div className="flex items-center gap-2">
                    {sector.change > 0 ? (
                      <TrendingUp className="h-4 w-4 text-primary" />
                    ) : (
                      <TrendingDown className="h-4 w-4 text-destructive" />
                    )}
                    <span className={`font-mono ${sector.change > 0 ? "text-primary" : "text-destructive"}`}>
                      {sector.change > 0 ? "+" : ""}
                      {sector.change}%
                    </span>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Stock List */}
        <div className="col-span-12 lg:col-span-8">
          <Card>
            <CardHeader>
              <CardTitle>Top Stocks</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {filteredStocks.map((stock) => (
                  <div
                    key={stock.symbol}
                    onClick={() => setSelectedSymbol(stock.symbol)}
                    className={`flex items-center justify-between p-4 rounded-xl cursor-pointer transition-all hover:bg-muted/50 ${
                      selectedSymbol === stock.symbol ? "bg-primary/10 border border-primary/20" : ""
                    }`}
                  >
                    <div className="flex items-center gap-4">
                      <div>
                        <p className="font-semibold">{stock.symbol}</p>
                        <p className="text-sm text-muted-foreground">{stock.name}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-mono font-bold">${stock.price.toFixed(2)}</p>
                      <div className="flex items-center gap-2">
                        <span className={`text-sm font-mono ${stock.change > 0 ? "text-primary" : "text-destructive"}`}>
                          {stock.change > 0 ? "+" : ""}
                          {stock.change} ({stock.changePercent > 0 ? "+" : ""}
                          {stock.changePercent}%)
                        </span>
                        <span className="text-xs text-muted-foreground">{stock.volume}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Selected Stock Chart */}
        <div className="col-span-12 lg:col-span-4">
          <Card className="h-[400px]">
            <CardHeader>
              <CardTitle>{selectedSymbol} Chart</CardTitle>
            </CardHeader>
            <CardContent className="p-0 h-[320px]">
              <TradingViewChart symbol={selectedSymbol} />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

import { useState, useEffect } from "react"
import { Button } from "./ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card"
import { Badge } from "./ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs"
import { Input } from "./ui/input"
import { Label } from "./ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select"
import { DollarSign, BarChart3, Clock, Star, StarOff, ArrowUpRight, ArrowDownRight } from "lucide-react"

interface StockDetailPageProps {
  symbol: string
}

export function StockDetailPage({ symbol }: StockDetailPageProps) {
  const [isWatchlisted, setIsWatchlisted] = useState(false)
  const [orderType, setOrderType] = useState("market")
  const [quantity, setQuantity] = useState("")
  const [price, setPrice] = useState("")

  // Mock stock data - in real app this would come from API
  const stockData = {
    AAPL: {
      name: "Apple Inc.",
      price: 175.43,
      change: 2.15,
      changePercent: 1.24,
      volume: "52.3M",
      marketCap: "2.75T",
      pe: 28.5,
      high52w: 199.62,
      low52w: 124.17,
      dividend: 0.96,
      beta: 1.29,
    },
    MSFT: {
      name: "Microsoft Corporation",
      price: 378.85,
      change: 3.12,
      changePercent: 0.83,
      volume: "28.7M",
      marketCap: "2.81T",
      pe: 32.1,
      high52w: 384.3,
      low52w: 213.43,
      dividend: 3.0,
      beta: 0.89,
    },
    GOOGL: {
      name: "Alphabet Inc.",
      price: 138.21,
      change: -0.45,
      changePercent: -0.32,
      volume: "31.2M",
      marketCap: "1.75T",
      pe: 25.8,
      high52w: 153.78,
      low52w: 83.34,
      dividend: 0.0,
      beta: 1.05,
    },
    TSLA: {
      name: "Tesla, Inc.",
      price: 248.5,
      change: 5.12,
      changePercent: 2.1,
      volume: "89.4M",
      marketCap: "791B",
      pe: 65.2,
      high52w: 299.29,
      low52w: 138.8,
      dividend: 0.0,
      beta: 2.11,
    },
    NVDA: {
      name: "NVIDIA Corporation",
      price: 875.28,
      change: 27.15,
      changePercent: 3.2,
      volume: "45.8M",
      marketCap: "2.16T",
      pe: 73.5,
      high52w: 974.0,
      low52w: 180.96,
      dividend: 0.16,
      beta: 1.68,
    },
  }

  const stock = stockData[symbol as keyof typeof stockData] || stockData.AAPL
  const isPositive = stock.change >= 0

  // Mock news data
  const news = [
    {
      title: `${stock.name} Reports Strong Q4 Earnings, Beats Expectations`,
      time: "2 hours ago",
      source: "MarketWatch",
    },
    {
      title: `Analysts Upgrade ${symbol} Price Target Following Innovation Announcement`,
      time: "4 hours ago",
      source: "Bloomberg",
    },
    {
      title: `${stock.name} Announces New Strategic Partnership`,
      time: "1 day ago",
      source: "Reuters",
    },
    {
      title: `Institutional Investors Increase Stakes in ${symbol}`,
      time: "2 days ago",
      source: "Financial Times",
    },
  ]

  useEffect(() => {
    // Load TradingView widget
    const script = document.createElement("script")
    script.src = "https://s3.tradingview.com/external-embedding/embed-widget-advanced-chart.js"
    script.type = "text/javascript"
    script.async = true
    script.innerHTML = JSON.stringify({
      autosize: true,
      symbol: `NASDAQ:${symbol}`,
      interval: "D",
      timezone: "Etc/UTC",
      theme: "dark",
      style: "1",
      locale: "en",
      enable_publishing: false,
      backgroundColor: "rgba(0, 0, 0, 0)",
      gridColor: "rgba(255, 255, 255, 0.06)",
      hide_top_toolbar: false,
      hide_legend: false,
      save_image: false,
      container_id: `tradingview_${symbol}`,
    })

    const container = document.getElementById(`tradingview_${symbol}`)
    if (container) {
      container.appendChild(script)
    }

    return () => {
      if (container) {
        container.innerHTML = ""
      }
    }
  }, [symbol])

  const handleTrade = (action: "buy" | "sell") => {
    console.log(`[v0] ${action.toUpperCase()} order:`, {
      symbol,
      quantity,
      orderType,
      price: orderType === "limit" ? price : "market",
    })
    // Reset form
    setQuantity("")
    setPrice("")
  }

  return (
    <div className="p-6 space-y-6">
      {/* Stock Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div>
            <div className="flex items-center gap-3">
              <h1 className="text-3xl font-bold font-mono">{symbol}</h1>
              <Button variant="ghost" size="sm" onClick={() => setIsWatchlisted(!isWatchlisted)} className="rounded-xl">
                {isWatchlisted ? (
                  <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                ) : (
                  <StarOff className="h-5 w-5" />
                )}
              </Button>
            </div>
            <p className="text-lg text-muted-foreground">{stock.name}</p>
          </div>
        </div>
        <Badge variant="secondary" className="bg-primary/10 text-primary border-primary/20 rounded-full">
          NASDAQ
        </Badge>
      </div>

      {/* Price Info */}
      <Card className="rounded-2xl">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-6">
              <div>
                <div className="text-4xl font-bold font-mono">${stock.price.toFixed(2)}</div>
                <div
                  className={`flex items-center gap-2 text-lg font-medium ${
                    isPositive ? "text-green-500" : "text-red-500"
                  }`}
                >
                  {isPositive ? <ArrowUpRight className="h-5 w-5" /> : <ArrowDownRight className="h-5 w-5" />}
                  {isPositive ? "+" : ""}
                  {stock.change.toFixed(2)} ({isPositive ? "+" : ""}
                  {stock.changePercent.toFixed(2)}%)
                </div>
              </div>
              <div className="grid grid-cols-2 gap-6 text-sm">
                <div>
                  <p className="text-muted-foreground">Volume</p>
                  <p className="font-mono font-semibold">{stock.volume}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Market Cap</p>
                  <p className="font-mono font-semibold">${stock.marketCap}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">P/E Ratio</p>
                  <p className="font-mono font-semibold">{stock.pe}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Beta</p>
                  <p className="font-mono font-semibold">{stock.beta}</p>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Chart */}
        <div className="lg:col-span-2">
          <Card className="rounded-2xl">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart3 className="h-5 w-5" />
                Price Chart
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div id={`tradingview_${symbol}`} className="h-[500px] rounded-xl overflow-hidden" />
            </CardContent>
          </Card>
        </div>

        {/* Trading Panel */}
        <div className="space-y-6">
          <Card className="rounded-2xl">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <DollarSign className="h-5 w-5" />
                Trade {symbol}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Tabs defaultValue="buy" className="w-full">
                <TabsList className="grid w-full grid-cols-2 rounded-xl">
                  <TabsTrigger value="buy" className="rounded-lg">
                    Buy
                  </TabsTrigger>
                  <TabsTrigger value="sell" className="rounded-lg">
                    Sell
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="buy" className="space-y-4 mt-4">
                  <div className="space-y-2">
                    <Label>Order Type</Label>
                    <Select value={orderType} onValueChange={setOrderType}>
                      <SelectTrigger className="rounded-xl">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="market">Market Order</SelectItem>
                        <SelectItem value="limit">Limit Order</SelectItem>
                        <SelectItem value="stop">Stop Order</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label>Quantity</Label>
                    <Input
                      type="number"
                      placeholder="0"
                      value={quantity}
                      onChange={(e) => setQuantity(e.target.value)}
                      className="rounded-xl font-mono"
                    />
                  </div>

                  {orderType === "limit" && (
                    <div className="space-y-2">
                      <Label>Limit Price</Label>
                      <Input
                        type="number"
                        placeholder="0.00"
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                        className="rounded-xl font-mono"
                      />
                    </div>
                  )}

                  <Button
                    onClick={() => handleTrade("buy")}
                    className="w-full bg-green-600 hover:bg-green-700 rounded-xl"
                    disabled={!quantity}
                  >
                    Buy {symbol}
                  </Button>
                </TabsContent>

                <TabsContent value="sell" className="space-y-4 mt-4">
                  <div className="space-y-2">
                    <Label>Order Type</Label>
                    <Select value={orderType} onValueChange={setOrderType}>
                      <SelectTrigger className="rounded-xl">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="market">Market Order</SelectItem>
                        <SelectItem value="limit">Limit Order</SelectItem>
                        <SelectItem value="stop">Stop Order</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label>Quantity</Label>
                    <Input
                      type="number"
                      placeholder="0"
                      value={quantity}
                      onChange={(e) => setQuantity(e.target.value)}
                      className="rounded-xl font-mono"
                    />
                  </div>

                  {orderType === "limit" && (
                    <div className="space-y-2">
                      <Label>Limit Price</Label>
                      <Input
                        type="number"
                        placeholder="0.00"
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                        className="rounded-xl font-mono"
                      />
                    </div>
                  )}

                  <Button
                    onClick={() => handleTrade("sell")}
                    className="w-full bg-red-600 hover:bg-red-700 rounded-xl"
                    disabled={!quantity}
                  >
                    Sell {symbol}
                  </Button>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>

          {/* Key Stats */}
          <Card className="rounded-2xl">
            <CardHeader>
              <CardTitle>Key Statistics</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex justify-between">
                <span className="text-muted-foreground">52W High</span>
                <span className="font-mono font-semibold">${stock.high52w}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">52W Low</span>
                <span className="font-mono font-semibold">${stock.low52w}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Dividend Yield</span>
                <span className="font-mono font-semibold">{stock.dividend > 0 ? `$${stock.dividend}` : "N/A"}</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* News Section */}
      <Card className="rounded-2xl">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Clock className="h-5 w-5" />
            Latest News
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {news.map((article, index) => (
              <div
                key={index}
                className="flex items-start justify-between p-4 rounded-xl hover:bg-accent/50 transition-colors cursor-pointer"
              >
                <div className="flex-1">
                  <h3 className="font-semibold text-sm leading-relaxed">{article.title}</h3>
                  <div className="flex items-center gap-2 mt-2 text-xs text-muted-foreground">
                    <span>{article.source}</span>
                    <span>•</span>
                    <span>{article.time}</span>
                  </div>
                </div>
                <ArrowUpRight className="h-4 w-4 text-muted-foreground ml-4 flex-shrink-0" />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card"
import { Button } from "../components/ui/button"
import { Input } from "../components/ui/input"
import { Badge } from "../components/ui/badge"
import { Plus, Search, Star, TrendingUp, TrendingDown, X } from "lucide-react"

const watchlistData = [
  {
    symbol: "AAPL",
    name: "Apple Inc.",
    price: 175.43,
    change: 2.34,
    changePercent: 1.35,
    volume: "52.3M",
    starred: true,
  },
  {
    symbol: "GOOGL",
    name: "Alphabet Inc.",
    price: 2847.52,
    change: -15.23,
    changePercent: -0.53,
    volume: "28.1M",
    starred: true,
  },
  {
    symbol: "MSFT",
    name: "Microsoft Corp.",
    price: 378.91,
    change: 4.67,
    changePercent: 1.25,
    volume: "31.7M",
    starred: false,
  },
  {
    symbol: "TSLA",
    name: "Tesla Inc.",
    price: 248.73,
    change: -8.45,
    changePercent: -3.28,
    volume: "89.2M",
    starred: true,
  },
  {
    symbol: "AMZN",
    name: "Amazon.com Inc.",
    price: 3342.88,
    change: 12.45,
    changePercent: 0.37,
    volume: "45.6M",
    starred: false,
  },
  {
    symbol: "NVDA",
    name: "NVIDIA Corp.",
    price: 875.28,
    change: 23.67,
    changePercent: 2.78,
    volume: "67.4M",
    starred: true,
  },
]

const priceAlerts = [
  { symbol: "AAPL", condition: "Above $180", status: "active" },
  { symbol: "TSLA", condition: "Below $240", status: "triggered" },
  { symbol: "NVDA", condition: "Above $900", status: "active" },
]

const WatchlistPage = () => {
  const [watchlist, setWatchlist] = useState(watchlistData)
  const [searchTerm, setSearchTerm] = useState("")
  const [newSymbol, setNewSymbol] = useState("")

  const toggleStar = (symbol: string) => {
    setWatchlist((prev) => prev.map((item) => (item.symbol === symbol ? { ...item, starred: !item.starred } : item)))
  }

  const removeFromWatchlist = (symbol: string) => {
    setWatchlist((prev) => prev.filter((item) => item.symbol !== symbol))
  }

  const addToWatchlist = () => {
    if (newSymbol.trim()) {
      // In a real app, you'd fetch the stock data
      const newStock = {
        symbol: newSymbol.toUpperCase(),
        name: `${newSymbol.toUpperCase()} Corp.`,
        price: 100.0,
        change: 0,
        changePercent: 0,
        volume: "0",
        starred: false,
      }
      setWatchlist((prev) => [...prev, newStock])
      setNewSymbol("")
    }
  }

  const filteredWatchlist = watchlist.filter(
    (stock) =>
      stock.symbol.toLowerCase().includes(searchTerm.toLowerCase()) ||
      stock.name.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const starredStocks = filteredWatchlist.filter((stock) => stock.starred)
  const otherStocks = filteredWatchlist.filter((stock) => !stock.starred)

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Watchlist</h1>
          <p className="text-muted-foreground">Monitor your favorite stocks and set alerts</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              placeholder="Search watchlist..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 w-64 rounded-xl"
            />
          </div>
        </div>
      </div>

      {/* Add Stock */}
      <Card>
        <CardHeader>
          <CardTitle>Add to Watchlist</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex gap-3">
            <Input
              placeholder="Enter symbol (e.g., AAPL)"
              value={newSymbol}
              onChange={(e) => setNewSymbol(e.target.value)}
              className="rounded-xl"
              onKeyPress={(e) => e.key === "Enter" && addToWatchlist()}
            />
            <Button onClick={addToWatchlist} className="rounded-xl">
              <Plus className="h-4 w-4 mr-2" />
              Add Stock
            </Button>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-12 gap-6">
        {/* Watchlist */}
        <div className="col-span-12 lg:col-span-8">
          <div className="space-y-6">
            {/* Starred Stocks */}
            {starredStocks.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Star className="h-5 w-5 text-yellow-500 fill-current" />
                    Favorites
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {starredStocks.map((stock) => (
                      <div
                        key={stock.symbol}
                        className="flex items-center justify-between p-4 bg-muted/30 rounded-xl hover:bg-muted/50 transition-colors"
                      >
                        <div className="flex items-center gap-4">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => toggleStar(stock.symbol)}
                            className="p-1 h-auto"
                          >
                            <Star className="h-4 w-4 text-yellow-500 fill-current" />
                          </Button>
                          <div>
                            <p className="font-semibold">{stock.symbol}</p>
                            <p className="text-sm text-muted-foreground">{stock.name}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-4">
                          <div className="text-right">
                            <p className="font-mono font-bold">${stock.price.toFixed(2)}</p>
                            <div className="flex items-center gap-2">
                              {stock.change >= 0 ? (
                                <TrendingUp className="h-4 w-4 text-primary" />
                              ) : (
                                <TrendingDown className="h-4 w-4 text-destructive" />
                              )}
                              <span
                                className={`text-sm font-mono ${stock.change >= 0 ? "text-primary" : "text-destructive"}`}
                              >
                                {stock.change >= 0 ? "+" : ""}
                                {stock.change} ({stock.changePercent >= 0 ? "+" : ""}
                                {stock.changePercent}%)
                              </span>
                            </div>
                          </div>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => removeFromWatchlist(stock.symbol)}
                            className="p-1 h-auto text-muted-foreground hover:text-destructive"
                          >
                            <X className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Other Stocks */}
            <Card>
              <CardHeader>
                <CardTitle>All Stocks</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {otherStocks.map((stock) => (
                    <div
                      key={stock.symbol}
                      className="flex items-center justify-between p-4 bg-muted/30 rounded-xl hover:bg-muted/50 transition-colors"
                    >
                      <div className="flex items-center gap-4">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => toggleStar(stock.symbol)}
                          className="p-1 h-auto"
                        >
                          <Star className="h-4 w-4 text-muted-foreground" />
                        </Button>
                        <div>
                          <p className="font-semibold">{stock.symbol}</p>
                          <p className="text-sm text-muted-foreground">{stock.name}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="text-right">
                          <p className="font-mono font-bold">${stock.price.toFixed(2)}</p>
                          <div className="flex items-center gap-2">
                            {stock.change >= 0 ? (
                              <TrendingUp className="h-4 w-4 text-primary" />
                            ) : (
                              <TrendingDown className="h-4 w-4 text-destructive" />
                            )}
                            <span
                              className={`text-sm font-mono ${stock.change >= 0 ? "text-primary" : "text-destructive"}`}
                            >
                              {stock.change >= 0 ? "+" : ""}
                              {stock.change} ({stock.changePercent >= 0 ? "+" : ""}
                              {stock.changePercent}%)
                            </span>
                          </div>
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => removeFromWatchlist(stock.symbol)}
                          className="p-1 h-auto text-muted-foreground hover:text-destructive"
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Price Alerts */}
        <div className="col-span-12 lg:col-span-4">
          <Card>
            <CardHeader>
              <CardTitle>Price Alerts</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {priceAlerts.map((alert, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-muted/30 rounded-xl">
                  <div>
                    <p className="font-medium">{alert.symbol}</p>
                    <p className="text-sm text-muted-foreground">{alert.condition}</p>
                  </div>
                  <Badge variant={alert.status === "triggered" ? "destructive" : "secondary"} className="rounded-full">
                    {alert.status}
                  </Badge>
                </div>
              ))}
              <Button variant="outline" className="w-full rounded-xl bg-transparent">
                <Plus className="h-4 w-4 mr-2" />
                Add Alert
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

export default WatchlistPage;
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card"
import { Button } from "./ui/button"
import { Badge } from "./ui/badge"
import { Star, Plus } from "lucide-react"

interface WatchlistProps {
  onSymbolSelect: (symbol: string) => void
}

const watchlistData = [
  { symbol: "AAPL", name: "Apple Inc.", price: "$175.43", change: "+2.34", changePercent: "+1.35%", positive: true },
  {
    symbol: "GOOGL",
    name: "Alphabet Inc.",
    price: "$2,834.56",
    change: "-12.45",
    changePercent: "-0.44%",
    positive: false,
  },
  {
    symbol: "MSFT",
    name: "Microsoft Corp.",
    price: "$378.92",
    change: "+5.67",
    changePercent: "+1.52%",
    positive: true,
  },
  { symbol: "TSLA", name: "Tesla Inc.", price: "$234.78", change: "+8.90", changePercent: "+3.94%", positive: true },
  {
    symbol: "AMZN",
    name: "Amazon.com Inc.",
    price: "$3,456.78",
    change: "-23.45",
    changePercent: "-0.67%",
    positive: false,
  },
]

export function Watchlist({ onSymbolSelect }: WatchlistProps) {
  return (
    <Card className="h-full">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <Star className="h-5 w-5 text-accent" />
            Watchlist
          </CardTitle>
          <Button variant="ghost" size="sm">
            <Plus className="h-4 w-4" />
          </Button>
        </div>
      </CardHeader>
      <CardContent className="p-0">
        <div className="space-y-1">
          {watchlistData.map((stock) => (
            <div
              key={stock.symbol}
              className="p-3 hover:bg-muted cursor-pointer border-b border-border last:border-b-0 transition-colors"
              onClick={() => onSymbolSelect(stock.symbol)}
            >
              <div className="flex items-center justify-between mb-1">
                <div>
                  <p className="font-semibold text-sm">{stock.symbol}</p>
                  <p className="text-xs text-muted-foreground truncate">{stock.name}</p>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-sm">{stock.price}</p>
                  <Badge
                    variant={stock.positive ? "secondary" : "destructive"}
                    className={`text-xs ${stock.positive ? "bg-primary text-primary-foreground" : ""}`}
                  >
                    {stock.change} ({stock.changePercent})
                  </Badge>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

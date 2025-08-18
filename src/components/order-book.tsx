import { Card, CardContent, CardHeader, CardTitle } from "./ui/card"
import { BookOpen } from "lucide-react"

interface OrderBookProps {
  symbol: string
}

const orderBookData = {
  bids: [
    { price: "175.42", size: "1,250", total: "1,250" },
    { price: "175.41", size: "2,100", total: "3,350" },
    { price: "175.40", size: "850", total: "4,200" },
    { price: "175.39", size: "1,750", total: "5,950" },
    { price: "175.38", size: "950", total: "6,900" },
  ],
  asks: [
    { price: "175.43", size: "900", total: "900" },
    { price: "175.44", size: "1,400", total: "2,300" },
    { price: "175.45", size: "750", total: "3,050" },
    { price: "175.46", size: "1,200", total: "4,250" },
    { price: "175.47", size: "1,850", total: "6,100" },
  ],
}

export function OrderBook({ symbol }: OrderBookProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <BookOpen className="h-5 w-5 text-primary" />
          Order Book - {symbol}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-6">
          {/* Bids */}
          <div>
            <h4 className="font-semibold text-sm mb-3 text-primary">Bids</h4>
            <div className="space-y-1">
              <div className="grid grid-cols-3 gap-2 text-xs text-muted-foreground font-medium pb-2 border-b border-border">
                <span>Price</span>
                <span className="text-right">Size</span>
                <span className="text-right">Total</span>
              </div>
              {orderBookData.bids.map((bid, index) => (
                <div key={index} className="grid grid-cols-3 gap-2 text-sm py-1 hover:bg-muted rounded">
                  <span className="text-primary font-medium">${bid.price}</span>
                  <span className="text-right">{bid.size}</span>
                  <span className="text-right text-muted-foreground">{bid.total}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Asks */}
          <div>
            <h4 className="font-semibold text-sm mb-3 text-destructive">Asks</h4>
            <div className="space-y-1">
              <div className="grid grid-cols-3 gap-2 text-xs text-muted-foreground font-medium pb-2 border-b border-border">
                <span>Price</span>
                <span className="text-right">Size</span>
                <span className="text-right">Total</span>
              </div>
              {orderBookData.asks.map((ask, index) => (
                <div key={index} className="grid grid-cols-3 gap-2 text-sm py-1 hover:bg-muted rounded">
                  <span className="text-destructive font-medium">${ask.price}</span>
                  <span className="text-right">{ask.size}</span>
                  <span className="text-right text-muted-foreground">{ask.total}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

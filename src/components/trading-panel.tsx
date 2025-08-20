import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card"
import { Button } from "./ui/button"
import { Input } from "./ui/input"
import { Label } from "./ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select"
import { ShoppingCart } from "lucide-react"
import { usePortfolio } from "../contexts/portfolioContext"
import { useAuthProvider } from "../hooks/useAuthProvider"
import { useStocks } from "../contexts/stockContext"

interface TradingPanelProps {
  symbol: string
}

export function TradingPanel({ symbol }: TradingPanelProps) {
  const { currentUser } = useAuthProvider();
  const [orderType, setOrderType] = useState("market")
  const [quantity, setQuantity] = useState("")
  const [price, setPrice] = useState("")
  const portfolio = usePortfolio();
  const stocks = useStocks();
  const stock = stocks?.getStock(symbol);

  const handleSell = () => {
    if (!currentUser) return;

    const sellOrder = {
      symbol,
      quantity: Number(quantity),
      price: Number(price),
      orderType,
    };

    // Workaround
    portfolio?.proceedSellOrder(sellOrder);
  };

  const handleBuy = () => {
    if (!currentUser) return;

    const buyOrder = {
      symbol,
      quantity: Number(quantity),
      price: Number(price),
      orderType,
    };

    //Workaround
    portfolio?.proceedBuyOrder(buyOrder);
  };

  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <ShoppingCart className="h-5 w-5 text-primary" />
          Trade {symbol}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="buy" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger
              value="buy"
              className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
            >
              Buy
            </TabsTrigger>
            <TabsTrigger
              value="sell"
              className="data-[state=active]:bg-destructive data-[state=active]:text-destructive-foreground"
            >
              Sell
            </TabsTrigger>
          </TabsList>

          <TabsContent value="buy" className="space-y-4 mt-4">
            <div className="space-y-2">
              <Label htmlFor="order-type">Order Type</Label>
              <Select value={orderType} onValueChange={setOrderType}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="market">Market Order</SelectItem>
                  <SelectItem value="limit">Limit Order</SelectItem>
                  <SelectItem value="stop">Stop Order</SelectItem>
                  <SelectItem value="stop-limit">Stop-Limit Order</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="quantity">Quantity</Label>
              <Input
                id="quantity"
                type="number"
                placeholder="0"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
              />
            </div>

            {orderType !== "market" && (
              <div className="space-y-2">
                <Label htmlFor="price">Price</Label>
                <Input
                  id="price"
                  type="number"
                  placeholder="0.00"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                />
              </div>
            )}

            <div className="pt-4 space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Estimated Cost:</span>
                <span className="font-semibold">${stock ? (Number(stock.price) * Number(quantity)).toFixed(2) : 0}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Available Cash:</span>
                <span className="font-semibold text-primary">${currentUser?.cash ?? 0}</span>
              </div>
            </div>

            <Button
              className="w-full bg-primary hover:bg-primary/90 text-primary-foreground"
              onClick={handleBuy}
            >
              Place Buy Order
            </Button>
          </TabsContent>

          <TabsContent value="sell" className="space-y-4 mt-4">
            <div className="space-y-2">
              <Label htmlFor="sell-order-type">Order Type</Label>
              <Select value={orderType} onValueChange={setOrderType}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="market">Market Order</SelectItem>
                  <SelectItem value="limit">Limit Order</SelectItem>
                  <SelectItem value="stop">Stop Order</SelectItem>
                  <SelectItem value="stop-limit">Stop-Limit Order</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="sell-quantity">Quantity</Label>
              <Input
                id="sell-quantity"
                type="number"
                placeholder="0"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
              />
              <p className="text-xs text-muted-foreground">Available: {portfolio?.getStockAmount(symbol)} Shares</p>
            </div>

            {orderType !== "market" && (
              <div className="space-y-2">
                <Label htmlFor="sell-price">Price</Label>
                <Input
                  id="sell-price"
                  type="number"
                  placeholder="0.00"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                />
              </div>
            )}

            <div className="pt-4 space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Estimated Proceeds:</span>
                <span className="font-semibold">${portfolio?.getStocks(symbol)?.reduce((acc, stock) => acc + stock.price, 0)}</span>
              </div>
            </div>

            <Button
              onClick={handleSell}
              className="w-full bg-destructive hover:bg-destructive/90 text-destructive-foreground"
            >
              Place Sell Order
            </Button>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}

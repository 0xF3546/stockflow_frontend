import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card"
import { Badge } from "./ui/badge"
import { TradingViewChart } from "./trading-view-chart"
import { MarketOverview } from "./market-overview"
import { Watchlist } from "./watchlist"
import { OrderBook } from "./order-book"
import { TradingPanel } from "./trading-panel"
import { Portfolio } from "./portfolio"

export function TradingDashboard() {
  const [activeSymbol, setActiveSymbol] = useState("AAPL")

  return (
    <div className="p-6 space-y-6">
      {/* Dashboard Grid */}
      <div className="grid grid-cols-12 gap-6">
        {/* Market Overview */}
        <div className="col-span-12 lg:col-span-8">
          <MarketOverview />
        </div>

        {/* Portfolio Summary */}
        <div className="col-span-12 lg:col-span-4">
          <Portfolio />
        </div>

        {/* Main Chart */}
        <div className="col-span-12 lg:col-span-8">
          <Card className="h-[600px]">
            <CardHeader className="pb-4">
              <div className="flex items-center justify-between">
                <CardTitle className="text-xl font-semibold">{activeSymbol} - Apple Inc.</CardTitle>
                <div className="flex items-center gap-3">
                  <span className="text-3xl font-mono font-bold text-foreground">$175.43</span>
                  <Badge variant="secondary" className="bg-primary/10 text-primary border-primary/20 rounded-full">
                    +2.34 (+1.35%)
                  </Badge>
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-0 h-[500px]">
              <TradingViewChart symbol={activeSymbol} />
            </CardContent>
          </Card>
        </div>

        {/* Trading Panel */}
        <div className="col-span-12 lg:col-span-4">
          <TradingPanel symbol={activeSymbol} />
        </div>

        {/* Watchlist */}
        <div className="col-span-12 lg:col-span-6">
          <Watchlist onSymbolSelect={setActiveSymbol} />
        </div>

        {/* Order Book */}
        <div className="col-span-12 lg:col-span-6">
          <OrderBook symbol={activeSymbol} />
        </div>
      </div>
    </div>
  )
}

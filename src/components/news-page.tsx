import { Card, CardContent, CardHeader, CardTitle } from "./ui/card"
import { Badge } from "./ui/badge"
import { Button } from "./ui/button"
import { Input } from "./ui/input"
import { Search, Clock, TrendingUp, ExternalLink } from "lucide-react"
import { useState } from "react"

const newsData = [
  {
    id: 1,
    title: "Apple Reports Record Q4 Earnings, Beats Expectations",
    summary:
      "Apple Inc. reported quarterly earnings that exceeded analyst expectations, driven by strong iPhone sales and services revenue growth.",
    source: "MarketWatch",
    time: "2 hours ago",
    category: "Earnings",
    impact: "positive",
    relatedSymbols: ["AAPL"],
  },
  {
    id: 2,
    title: "Federal Reserve Signals Potential Rate Cut in Next Meeting",
    summary:
      "Fed officials hint at monetary policy adjustments amid changing economic conditions and inflation targets.",
    source: "Reuters",
    time: "4 hours ago",
    category: "Economic Policy",
    impact: "positive",
    relatedSymbols: ["SPY", "QQQ"],
  },
  {
    id: 3,
    title: "Tesla Stock Drops on Production Concerns",
    summary: "Tesla shares decline following reports of potential production delays at the Austin facility.",
    source: "Bloomberg",
    time: "6 hours ago",
    category: "Corporate",
    impact: "negative",
    relatedSymbols: ["TSLA"],
  },
  {
    id: 4,
    title: "Microsoft Azure Revenue Surges 30% Year-over-Year",
    summary:
      "Cloud computing division continues to drive growth for Microsoft, outpacing competitors in enterprise market.",
    source: "TechCrunch",
    time: "8 hours ago",
    category: "Technology",
    impact: "positive",
    relatedSymbols: ["MSFT"],
  },
]

const marketAlerts = [
  { symbol: "NVDA", message: "Earnings call scheduled for tomorrow", type: "info" },
  { symbol: "AAPL", message: "Ex-dividend date approaching", type: "info" },
  { symbol: "TSLA", message: "High volatility detected", type: "warning" },
]

export function NewsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("All")

  const categories = ["All", "Earnings", "Economic Policy", "Corporate", "Technology", "Market Analysis"]

  const filteredNews = newsData.filter((news) => {
    const matchesSearch =
      news.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      news.summary.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === "All" || news.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Market News</h1>
          <p className="text-muted-foreground">Stay updated with the latest market developments</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              placeholder="Search news..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 w-64 rounded-xl"
            />
          </div>
        </div>
      </div>

      {/* Category Filter */}
      <div className="flex gap-2 overflow-x-auto pb-2">
        {categories.map((category) => (
          <Button
            key={category}
            variant={selectedCategory === category ? "default" : "outline"}
            onClick={() => setSelectedCategory(category)}
            className="rounded-full whitespace-nowrap"
          >
            {category}
          </Button>
        ))}
      </div>

      <div className="grid grid-cols-12 gap-6">
        {/* News Feed */}
        <div className="col-span-12 lg:col-span-8">
          <div className="space-y-4">
            {filteredNews.map((news) => (
              <Card key={news.id} className="hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-3">
                        <Badge
                          variant={
                            news.impact === "positive"
                              ? "default"
                              : news.impact === "negative"
                                ? "destructive"
                                : "secondary"
                          }
                          className="rounded-full"
                        >
                          {news.category}
                        </Badge>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Clock className="h-4 w-4" />
                          {news.time}
                        </div>
                        <span className="text-sm text-muted-foreground">•</span>
                        <span className="text-sm text-muted-foreground">{news.source}</span>
                      </div>
                      <h3 className="text-lg font-semibold mb-2 hover:text-primary cursor-pointer">{news.title}</h3>
                      <p className="text-muted-foreground mb-3">{news.summary}</p>
                      <div className="flex items-center gap-3">
                        <div className="flex gap-2">
                          {news.relatedSymbols.map((symbol) => (
                            <Badge key={symbol} variant="outline" className="rounded-full text-xs">
                              {symbol}
                            </Badge>
                          ))}
                        </div>
                        <Button variant="ghost" size="sm" className="ml-auto rounded-xl">
                          <ExternalLink className="h-4 w-4 mr-2" />
                          Read More
                        </Button>
                      </div>
                    </div>
                    {news.impact === "positive" && <TrendingUp className="h-6 w-6 text-primary flex-shrink-0" />}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Market Alerts & Trending */}
        <div className="col-span-12 lg:col-span-4 space-y-6">
          {/* Market Alerts */}
          <Card>
            <CardHeader>
              <CardTitle>Market Alerts</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {marketAlerts.map((alert, index) => (
                <div key={index} className="flex items-center gap-3 p-3 bg-muted/30 rounded-xl">
                  <Badge variant="outline" className="rounded-full">
                    {alert.symbol}
                  </Badge>
                  <div className="flex-1">
                    <p className="text-sm">{alert.message}</p>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Trending Topics */}
          <Card>
            <CardHeader>
              <CardTitle>Trending Topics</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {[
                { topic: "AI Stocks Rally", mentions: 234 },
                { topic: "Fed Rate Decision", mentions: 189 },
                { topic: "Earnings Season", mentions: 156 },
                { topic: "EV Market Growth", mentions: 98 },
              ].map((trend, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-muted/30 rounded-xl">
                  <span className="font-medium">{trend.topic}</span>
                  <Badge variant="secondary" className="rounded-full">
                    {trend.mentions}
                  </Badge>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Economic Calendar */}
          <Card>
            <CardHeader>
              <CardTitle>Economic Calendar</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {[
                { event: "CPI Report", time: "8:30 AM", impact: "High" },
                { event: "FOMC Minutes", time: "2:00 PM", impact: "High" },
                { event: "Jobless Claims", time: "8:30 AM", impact: "Medium" },
              ].map((event, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-muted/30 rounded-xl">
                  <div>
                    <p className="font-medium">{event.event}</p>
                    <p className="text-sm text-muted-foreground">{event.time}</p>
                  </div>
                  <Badge variant={event.impact === "High" ? "destructive" : "secondary"} className="rounded-full">
                    {event.impact}
                  </Badge>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

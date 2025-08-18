import { useEffect, useRef } from "react"

interface TradingViewChartProps {
  symbol: string
}

export function TradingViewChart({ symbol }: TradingViewChartProps) {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!containerRef.current) return

    // Clear previous chart
    containerRef.current.innerHTML = ""

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
      backgroundColor: "rgba(24, 30, 56, 1)",
      gridColor: "rgba(55, 65, 81, 0.3)",
      hide_top_toolbar: false,
      hide_legend: false,
      save_image: false,
      container_id: "tradingview_chart",
    })

    const chartContainer = document.createElement("div")
    chartContainer.id = "tradingview_chart"
    chartContainer.style.height = "100%"
    chartContainer.style.width = "100%"

    containerRef.current.appendChild(chartContainer)
    containerRef.current.appendChild(script)

    return () => {
      if (containerRef.current) {
        containerRef.current.innerHTML = ""
      }
    }
  }, [symbol])

  return <div ref={containerRef} className="w-full h-full bg-card rounded-lg" style={{ minHeight: "400px" }} />
}

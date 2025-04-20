"use client"

import { useEffect, useRef } from "react"
import { Chart, registerables } from "chart.js"

Chart.register(...registerables)

interface ChartData {
  month: string
  value: number
}

interface AnalyticsChartProps {
  data: ChartData[]
  color: string
}

export function AnalyticsChart({ data, color }: AnalyticsChartProps) {
  const chartRef = useRef<HTMLCanvasElement>(null)
  const chartInstance = useRef<Chart | null>(null)

  useEffect(() => {
    if (!chartRef.current) return

    const ctx = chartRef.current.getContext("2d")
    if (!ctx) return

    // Destroy existing chart
    if (chartInstance.current) {
      chartInstance.current.destroy()
    }

    const months = data.map((item) => item.month)
    const values = data.map((item) => item.value)

    // Create new chart
    chartInstance.current = new Chart(ctx, {
      type: "line",
      data: {
        labels: months,
        datasets: [
          {
            label: "Leads",
            data: values,
            backgroundColor: `${color}20`,
            borderColor: color,
            borderWidth: 2,
            tension: 0.4,
            fill: true,
            pointRadius: 0,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: false,
          },
          tooltip: {
            mode: "index",
            intersect: false,
          },
        },
        scales: {
          y: {
            beginAtZero: false,
            grid: {
              display: true,
              drawBorder: false,
            },
            ticks: {
              stepSize: 100,
            },
          },
          x: {
            grid: {
              display: false,
              drawBorder: false,
            },
          },
        },
      },
    })

    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy()
      }
    }
  }, [data, color])

  return <canvas ref={chartRef} />
}


"use client"

import * as React from "react"
import {
  Bar,
  BarChart as BarChartPrimitive,
  CartesianGrid,
  Cell,
  Label,
  LabelList,
  Line,
  LineChart as LineChartPrimitive,
  Pie,
  PieChart as PieChartPrimitive,
  PolarAngleAxis,
  PolarGrid,
  PolarRadiusAxis,
  Radar,
  RadarChart as RadarChartPrimitive,
  RadialBar,
  RadialBarChart as RadialBarChartPrimitive,
  Rectangle,
  ReferenceLine,
  Scatter,
  ScatterChart as ScatterChartPrimitive,
  Sector,
  Tooltip,
  XAxis,
  YAxis,
  type BarChartProps,
  type CartesianGridProps,
  type LabelListProps,
  type LabelProps,
  type LineChartProps,
  type PieChartProps,
  type PieProps,
  type RadarChartProps,
  type RadialBarChartProps,
  type ReferenceLineProps,
  type ScatterChartProps,
  type TooltipProps,
  type XAxisProps,
  type YAxisProps,
} from "recharts"
import {
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartStyle,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart"

const Chart = ChartContainer
const Legend = ChartLegend
const LegendContent = ChartLegendContent
const ChartStyleRoot = ChartStyle
const ChartTooltipRoot = ChartTooltip
const TooltipContent = ChartTooltipContent

const CartesianGridRoot = React.forwardRef<
  SVGElement,
  CartesianGridProps & React.RefAttributes<SVGElement>
>(({ stroke = "hsl(var(--border))", ...props }, ref) => {
  return <CartesianGrid ref={ref} stroke={stroke} {...props} />
})

const Formatter = ({
  value,
  name,
}: {
  value: number | string
  name: string
}) => {
  return [
    <div key="value" className="font-semibold">
      {value}
    </div>,
    <div key="name" className="text-sm text-muted-foreground">
      {name}
    </div>,
  ]
}

const XAxisRoot = React.forwardRef<
  SVGElement,
  XAxisProps & React.RefAttributes<SVGElement>
>(
  (
    {
      stroke = "hsl(var(--muted-foreground))",
      tickLine = false,
      axisLine = false,
      tickMargin = 8,
      ...props
    },
    ref
  ) => {
    return (
      <XAxis
        ref={ref}
        stroke={stroke}
        tickLine={tickLine}
        axisLine={axisLine}
        tickMargin={tickMargin}
        {...props}
      />
    )
  }
)

const YAxisRoot = React.forwardRef<
  SVGElement,
  YAxisProps & React.RefAttributes<SVGElement>
>(
  (
    {
      stroke = "hsl(var(--muted-foreground))",
      tickLine = false,
      axisLine = false,
      tickMargin = 8,
      ...props
    },
    ref
  ) => {
    return (
      <YAxis
        ref={ref}
        stroke={stroke}
        tickLine={tickLine}
        axisLine={axisLine}
        tickMargin={tickMargin}
        {...props}
      />
    )
  }
)

const LineChart = React.forwardRef<
  HTMLDivElement,
  LineChartProps & {
    /**
     * If `true`, the chart will be rendered with a brush.
     */
    withBrush?: boolean
    /**
     * If `true`, the chart will be rendered with a reference line.
     */
    withReferenceLine?: boolean
  } & React.RefAttributes<HTMLDivElement>
>(({ withBrush = false, withReferenceLine = false, ...props }, ref) => {
  return (
    <LineChartPrimitive
      ref={ref}
      margin={{
        left: 12,
        right: 12,
      }}
      {...props}
    />
  )
})
LineChart.displayName = "LineChart"

const BarChart = React.forwardRef<
  HTMLDivElement,
  BarChartProps & React.RefAttributes<HTMLDivElement>
>((props, ref) => {
  return <BarChartPrimitive ref={ref} {...props} />
})
BarChart.displayName = "BarChart"

const PieChart = React.forwardRef<
  HTMLDivElement,
  PieChartProps & React.RefAttributes<HTMLDivElement>
>((props, ref) => {
  return <PieChartPrimitive ref={ref} {...props} />
})
PieChart.displayName = "PieChart"

const DonutChart = React.forwardRef<
  HTMLDivElement,
  PieChartProps & React.RefAttributes<HTMLDivElement>
>((props, ref) => {
  return <PieChartPrimitive ref={ref} {...props} />
})
DonutChart.displayName = "DonutChart"

const RadarChart = React.forwardRef<
  HTMLDivElement,
  RadarChartProps & React.RefAttributes<HTMLDivElement>
>((props, ref) => {
  return <RadarChartPrimitive ref={ref} {...props} />
})
RadarChart.displayName = "RadarChart"

const RadialChart = React.forwardRef<
  HTMLDivElement,
  RadialBarChartProps & React.RefAttributes<HTMLDivElement>
>(({ ...props }, ref) => {
  return (
    <RadialBarChartPrimitive
      ref={ref}
      innerRadius="60%"
      // barSize={32}
      {...props}
    />
  )
})
RadialChart.displayName = "RadialChart"

const ScatterChart = React.forwardRef<
  HTMLDivElement,
  ScatterChartProps & React.RefAttributes<HTMLDivElement>
>((props, ref) => {
  return (
    <ScatterChartPrimitive
      ref={ref}
      margin={{
        left: 24,
      }}
      {...props}
    />
  )
})
ScatterChart.displayName = "ScatterChart"

export {
  Chart as Root,
  LineChart,
  BarChart,
  PieChart,
  DonutChart,
  RadarChart,
  RadialChart,
  ScatterChart,
  Legend,
  LegendContent,
  ChartStyleRoot as ChartStyle,
  ChartTooltipRoot as ChartTooltip,
  TooltipContent,
  CartesianGridRoot as CartesianGrid,
  XAxisRoot as XAxis,
  YAxisRoot as YAxis,
  Bar,
  Line,
  Pie,
  Cell,
  Tooltip,
  Label,
  LabelList,
  ReferenceLine,
  PolarAngleAxis,
  PolarRadiusAxis,
  PolarGrid,
  Radar,
  RadialBar,
  Rectangle,
  Scatter,
  Sector,
  Formatter,
  type ChartConfig,
  type TooltipProps,
  type CartesianGridProps,
  type PieProps,
  type XAxisProps,
  type YAxisProps,
  type LabelProps,
  type LabelListProps,
  type ReferenceLineProps,
}

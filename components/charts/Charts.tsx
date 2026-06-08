"use client";

import {
  ResponsiveContainer,
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  RadarChart,
  Radar,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ScatterChart,
  Scatter,
  ZAxis,
  LabelList,
} from "recharts";

export const COLORS = {
  brand: "#6366F1",
  leaf: "#22C55E",
  warn: "#F59E0B",
  danger: "#EF4444",
  slate: "#94A3B8",
  sky: "#38BDF8",
  violet: "#A855F7",
};

export const PIE_COLORS = [
  "#6366F1",
  "#22C55E",
  "#38BDF8",
  "#F59E0B",
  "#A855F7",
  "#EF4444",
  "#94A3B8",
  "#14B8A6",
];

const axisProps = {
  tick: { fontSize: 11, fill: "#64748B" },
  axisLine: { stroke: "#E5EAF2" },
  tickLine: false,
};

const tooltipStyle = {
  contentStyle: {
    borderRadius: 12,
    border: "1px solid #E5EAF2",
    boxShadow: "0 4px 24px rgba(16,24,40,0.08)",
    fontSize: 12,
  },
};

export function BarChartBox({
  data,
  bars,
  xKey,
  height = 280,
  layout = "horizontal",
}: {
  data: any[];
  bars: { key: string; name: string; color?: string }[];
  xKey: string;
  height?: number;
  layout?: "horizontal" | "vertical";
}) {
  const vertical = layout === "vertical";
  return (
    <ResponsiveContainer width="100%" height={height}>
      <BarChart
        data={data}
        layout={layout}
        margin={{ top: 8, right: 16, left: vertical ? 8 : 0, bottom: 4 }}
      >
        <CartesianGrid strokeDasharray="3 3" stroke="#EEF2F7" vertical={!vertical} horizontal={vertical} />
        {vertical ? (
          <>
            <XAxis type="number" {...axisProps} />
            <YAxis type="category" dataKey={xKey} width={130} {...axisProps} />
          </>
        ) : (
          <>
            <XAxis dataKey={xKey} {...axisProps} />
            <YAxis {...axisProps} />
          </>
        )}
        <Tooltip {...tooltipStyle} />
        {bars.length > 1 && <Legend wrapperStyle={{ fontSize: 12 }} />}
        {bars.map((b) => (
          <Bar
            key={b.key}
            dataKey={b.key}
            name={b.name}
            fill={b.color || COLORS.brand}
            radius={vertical ? [0, 6, 6, 0] : [6, 6, 0, 0]}
            maxBarSize={vertical ? 22 : 48}
          />
        ))}
      </BarChart>
    </ResponsiveContainer>
  );
}

export function LineChartBox({
  data,
  lines,
  xKey,
  height = 280,
}: {
  data: any[];
  lines: { key: string; name: string; color?: string }[];
  xKey: string;
  height?: number;
}) {
  return (
    <ResponsiveContainer width="100%" height={height}>
      <LineChart data={data} margin={{ top: 8, right: 16, left: 0, bottom: 4 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="#EEF2F7" />
        <XAxis dataKey={xKey} {...axisProps} />
        <YAxis {...axisProps} />
        <Tooltip {...tooltipStyle} />
        {lines.length > 1 && <Legend wrapperStyle={{ fontSize: 12 }} />}
        {lines.map((l) => (
          <Line
            key={l.key}
            type="monotone"
            dataKey={l.key}
            name={l.name}
            stroke={l.color || COLORS.brand}
            strokeWidth={2.5}
            dot={{ r: 3 }}
            activeDot={{ r: 5 }}
          />
        ))}
      </LineChart>
    </ResponsiveContainer>
  );
}

export function DonutChartBox({
  data,
  height = 280,
  showLabel = true,
}: {
  data: { name: string; value: number }[];
  height?: number;
  showLabel?: boolean;
}) {
  return (
    <ResponsiveContainer width="100%" height={height}>
      <PieChart>
        <Pie
          data={data}
          dataKey="value"
          nameKey="name"
          innerRadius="55%"
          outerRadius="80%"
          paddingAngle={2}
          label={showLabel ? (e: any) => `${e.name}` : false}
          labelLine={false}
          fontSize={11}
        >
          {data.map((_, i) => (
            <Cell key={i} fill={PIE_COLORS[i % PIE_COLORS.length]} />
          ))}
        </Pie>
        <Tooltip {...tooltipStyle} />
      </PieChart>
    </ResponsiveContainer>
  );
}

export function RadarChartBox({
  data,
  dataKey = "value",
  name = "คะแนน",
  height = 320,
  color = COLORS.brand,
  series,
}: {
  data: { axis: string; [k: string]: any }[];
  dataKey?: string;
  name?: string;
  height?: number;
  color?: string;
  series?: { key: string; name: string; color: string }[];
}) {
  return (
    <ResponsiveContainer width="100%" height={height}>
      <RadarChart data={data} outerRadius="72%">
        <PolarGrid stroke="#E5EAF2" />
        <PolarAngleAxis dataKey="axis" tick={{ fontSize: 10, fill: "#64748B" }} />
        <PolarRadiusAxis domain={[0, 10]} tick={{ fontSize: 9, fill: "#94A3B8" }} />
        {series ? (
          series.map((s) => (
            <Radar
              key={s.key}
              name={s.name}
              dataKey={s.key}
              stroke={s.color}
              fill={s.color}
              fillOpacity={0.25}
            />
          ))
        ) : (
          <Radar name={name} dataKey={dataKey} stroke={color} fill={color} fillOpacity={0.3} />
        )}
        {series && <Legend wrapperStyle={{ fontSize: 12 }} />}
        <Tooltip {...tooltipStyle} />
      </RadarChart>
    </ResponsiveContainer>
  );
}

/** Scatter map for positioning / portfolio matrix */
export function ScatterMap({
  points,
  xLabel,
  yLabel,
  height = 360,
  xDomain = [0, 10],
  yDomain = [0, 10],
}: {
  points: { x: number; y: number; name: string; color?: string }[];
  xLabel: string;
  yLabel: string;
  height?: number;
  xDomain?: [number, number];
  yDomain?: [number, number];
}) {
  return (
    <ResponsiveContainer width="100%" height={height}>
      <ScatterChart margin={{ top: 20, right: 24, left: 8, bottom: 24 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="#EEF2F7" />
        <XAxis
          type="number"
          dataKey="x"
          domain={xDomain}
          name={xLabel}
          label={{ value: xLabel, position: "bottom", fontSize: 11, fill: "#64748B" }}
          {...axisProps}
        />
        <YAxis
          type="number"
          dataKey="y"
          domain={yDomain}
          name={yLabel}
          label={{ value: yLabel, angle: -90, position: "left", fontSize: 11, fill: "#64748B" }}
          {...axisProps}
        />
        <ZAxis range={[200, 200]} />
        <Tooltip {...tooltipStyle} cursor={{ strokeDasharray: "3 3" }} />
        <Scatter data={points}>
          {points.map((p, i) => (
            <Cell key={i} fill={p.color || COLORS.brand} />
          ))}
          <LabelList dataKey="name" position="top" style={{ fontSize: 10, fill: "#1E293B" }} />
        </Scatter>
      </ScatterChart>
    </ResponsiveContainer>
  );
}

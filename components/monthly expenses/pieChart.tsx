"use client";

import { Pie, PieChart, ResponsiveContainer, Tooltip, Cell } from "recharts";

const myPieChart = () => {
  const data = [
    { name: "operations", value: 400, color: "#2563eb" },
    { name: "maintenance", value: 300, color: "#0f766e" },
    { name: "welfare", value: 300, color: "#ca8a04" },
    { name: "regulatory_expenses", value: 200, color: "#7c3aed" },
    { name: "marketing", value: 200, color: "#dc2626" },
  ];

  const total = data.reduce((sum, item) => sum + item.value, 0);

  return (
    <ResponsiveContainer width="100%" height={150}>
      <PieChart>
        <Tooltip
          formatter={(value, name) => {
            const num = typeof value === "number" ? value : 0;
            const percent = ((num / total) * 100).toFixed(1);

            return [`${percent}%`, name];
          }}
        />

        <Pie data={data} dataKey="value" nameKey="name">
          {data.map((dataItem, i) => (
            <Cell key={i} fill={dataItem.color} />
          ))}
        </Pie>
      </PieChart>
    </ResponsiveContainer>
  );
};

export default myPieChart;

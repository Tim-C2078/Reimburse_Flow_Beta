import React from "react";
import {
  BarChart as ReBarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const MyChart = () => {
  const data = [
    {
      name: "Jan",
      operations: 100,
      maintenance: 80,
      welfare: 60,
      regulatory_expenses: 120,
      marketing: 40,
    },
    {
      name: "Feb",
      operations: 90,
      maintenance: 70,
      welfare: 50,
      regulatory_expenses: 110,
      marketing: 30,
    },
    {
      name: "Mar",
      operations: 80,
      maintenance: 60,
      welfare: 40,
      regulatory_expenses: 100,
      marketing: 20,
    },
    {
      name: "Apr",
      operations: 120,
      maintenance: 90,
      welfare: 70,
      regulatory_expenses: 130,
      marketing: 50,
    },
    {
      name: "May",
      operations: 110,
      maintenance: 85,
      welfare: 65,
      regulatory_expenses: 125,
      marketing: 45,
    },
    {
      name: "Jun",
      operations: 130,
      maintenance: 95,
      welfare: 75,
      regulatory_expenses: 140,
      marketing: 55,
    },
    {
      name: "Jul",
      operations: 140,
      maintenance: 100,
      welfare: 80,
      regulatory_expenses: 150,
      marketing: 60,
    },
    {
      name: "Aug",
      operations: 115,
      maintenance: 88,
      welfare: 68,
      regulatory_expenses: 135,
      marketing: 48,
    },
    {
      name: "Sep",
      operations: 100,
      maintenance: 75,
      welfare: 55,
      regulatory_expenses: 120,
      marketing: 35,
    },
    {
      name: "Oct",
      operations: 150,
      maintenance: 110,
      welfare: 90,
      regulatory_expenses: 160,
      marketing: 70,
    },
    {
      name: "Nov",
      operations: 135,
      maintenance: 105,
      welfare: 85,
      regulatory_expenses: 145,
      marketing: 65,
    },
    {
      name: "Dec",
      operations: 160,
      maintenance: 120,
      welfare: 100,
      regulatory_expenses: 170,
      marketing: 80,
    },
  ];

  return (
    <div className="w-full h-100">
      <ResponsiveContainer width="100%" height="100%">
        <ReBarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="operations" fill="#2563eb" radius={[4, 4, 0, 0]} />
          {/* blue */}
          <Bar
            dataKey="maintenance"
            fill="#0f766e"
            radius={[4, 4, 0, 0]}
          />{" "}
          {/* green */}
          <Bar dataKey="welfare" fill="#ca8a04" radius={[4, 4, 0, 0]} />{" "}
          {/* amber */}
          <Bar
            dataKey="regulatory_expenses"
            fill="#7c3aed"
            radius={[4, 4, 0, 0]}
          />{" "}
          {/* purple */}
          <Bar dataKey="marketing" fill="#dc2626" radius={[4, 4, 0, 0]} />
        </ReBarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default MyChart;

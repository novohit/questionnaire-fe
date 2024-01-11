import React, { FC, useMemo } from 'react';
import { RadioStatsPair, StatsProps } from '../type';
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';

const colors = [
  '#37A2DA',
  '#32C5E9',
  '#67E0E3',
  '#9FE6B8',
  '#FFDB5C',
  '#ff9f7f',
  '#fb7293',
  '#E062AE',
  '#E690D1',
  '#e7bcf3',
  '#9d96f5',
  '#8378EA',
  '#96BFFF',
];

const StatsComponent: FC<StatsProps> = ({ data = [] }) => {
  const sum = useMemo(() => {
    let s = 0;
    data.forEach(item => {
      const { count } = item as RadioStatsPair;
      s += count;
    });
    return s;
  }, [data]);

  return (
    <ResponsiveContainer width="100%" height="100%">
      <div>
        <PieChart width={400} height={300}>
          <Pie
            data={data}
            dataKey="count"
            nameKey="option"
            cx="50%"
            cy="50%"
            outerRadius={80}
            fill="#8884d8"
            label={item =>
              `${item.option}:${((item.count / sum) * 100).toFixed(2)}%`
            }
          >
            {data.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={colors[(index + 2) % colors.length]}
              />
            ))}
          </Pie>
          <Tooltip />
        </PieChart>
        <BarChart width={380} height={300} data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="option" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="count" fill="#8884d8" />
        </BarChart>
      </div>
    </ResponsiveContainer>
  );
};

export default StatsComponent;

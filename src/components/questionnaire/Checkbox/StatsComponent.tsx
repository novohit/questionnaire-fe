import React, { FC } from 'react';
import { StatsProps } from '../type';
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';

const StatsComponent: FC<StatsProps> = ({ data = [] }) => {
  return (
    <ResponsiveContainer width="100%" height="50%">
      <BarChart width={380} height={300} data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="option" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="count" fill="#8884d8" />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default StatsComponent;

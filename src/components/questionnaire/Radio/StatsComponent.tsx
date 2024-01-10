import React, { FC } from 'react';
import { RadioStatsProps } from '../type';
import { Cell, Pie, PieChart, Tooltip } from 'recharts';

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

const StatsComponent: FC<RadioStatsProps> = ({ data = [] }) => {
  console.log(data);

  return (
    <PieChart width={400} height={400}>
      <Pie
        data={data}
        dataKey="count"
        nameKey="option"
        cx="50%"
        cy="50%"
        outerRadius={80}
        fill="#8884d8"
        label
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
  );
};

export default StatsComponent;

import React, { useState } from 'react';

import { PieChart, Pie, Sector, ResponsiveContainer, Cell } from 'recharts';
import styles from './PieChartShareholders.module.scss';

const COLORS = [
  '#7BB7EF',
  '#E34646',
  '#CDBF3E',
  '#569F6B',
  '#29688B',
  '#8B90FA',
  '#A527E0',
  '#CACCFF',
  '#BE8080',
];

const PieChartShareholders = ({ items }) => {
  if (!items || items.length < 1) return <></>;
  const [activeIndex, setactiveIndex] = useState(0);
  const [isHoveringPieChart, setHoveringPieChart] = useState(false);
  const data = items.map((item, index) => {
    const { name, percentage: value } = item;
    return { name, value, index };
  });

  const renderActiveShape = props => {
    const RADIAN = Math.PI / 180;
    const {
      cx,
      cy,
      midAngle,
      innerRadius,
      outerRadius,
      startAngle,
      endAngle,
      fill,
      payload,
      percent,
      value,
    } = props;
    const sin = Math.sin(-RADIAN * midAngle);
    const cos = Math.cos(-RADIAN * midAngle);
    const sx = cx + (outerRadius + 10) * cos;
    const sy = cy + (outerRadius + 10) * sin;
    const mx = cx + (outerRadius + 30) * cos;
    const my = cy + (outerRadius + 30) * sin;
    const ex = mx + (cos >= 0 ? 1 : -1) * 22;
    const ey = my;
    const textAnchor = cos >= 0 ? 'start' : 'end';

    return (
      <g>
        <text
          className={styles.pieChart__title__percentage}
          x={cx}
          y={cy}
          dy={8}
          textAnchor="middle"
        >
          {`${(value * 100).toFixed(2)}%`}
        </text>
        <text
          className={styles.pieChart__title__company}
          x={cx}
          y={cy}
          dy={40}
          textAnchor="middle"
        >
          {payload.name}
        </text>
        <Sector
          cx={cx}
          cy={cy}
          innerRadius={innerRadius}
          outerRadius={outerRadius}
          startAngle={startAngle}
          endAngle={endAngle}
          fill={fill}
        />
        <Sector
          cx={cx}
          cy={cy}
          startAngle={startAngle}
          endAngle={endAngle}
          innerRadius={outerRadius + 6}
          outerRadius={outerRadius + 10}
          fill={fill}
        />
        <path
          d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`}
          stroke={fill}
          fill="none"
        />
        <circle cx={ex} cy={ey} r={2} fill={fill} stroke="none" />
        <text
          x={ex + (cos >= 0 ? 1 : -1) * 12}
          y={ey + (cos >= 0 ? -20 : 0)}
          dy={18}
          textAnchor={textAnchor}
          fill="#FFF"
          style={{ fontWeight: 'bold' }}
        >
          {`${(value * 100).toFixed(2)}%`}
        </text>
        <text
          x={ex + (cos >= 0 ? 1 : -1) * 12}
          y={ey + (cos >= 0 ? -26 : 0)}
          dy={45}
          textAnchor={textAnchor}
          fill="#FFF"
        >
          {`${payload.name}`}
        </text>
      </g>
    );
  };

  const handlePieHovering = event => {
    const { index } = event;
    setactiveIndex(index);
  };

  return (
    <ResponsiveContainer width="100%" height={500}>
      <PieChart>
        <Pie
          activeIndex={activeIndex}
          activeShape={renderActiveShape}
          data={data}
          innerRadius="74%"
          outerRadius="80%"
          paddingAngle={2}
          fill={COLORS[activeIndex]}
          dataKey="value"
          onMouseEnter={event => handlePieHovering(event)}
        >
          {data.map((entry, index) => (
            <Cell fill={COLORS[index % COLORS.length]} stroke="transparent" />
          ))}
        </Pie>
      </PieChart>
    </ResponsiveContainer>
  );
};

export default PieChartShareholders;

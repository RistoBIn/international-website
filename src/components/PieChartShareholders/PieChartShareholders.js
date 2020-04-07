import React, { useState } from 'react';
import classNames from 'classnames';
import {
  PieChart,
  Pie,
  Sector,
  ResponsiveContainer,
  Cell,
  Label,
  ReferenceLine,
} from 'recharts';
import { useMedia } from 'react-use';

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
  const RADIAN = Math.PI / 180;
  const isDesktop = useMedia('(min-width: 768px)');

  const renderActiveShape = props => {
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
      <g className={styles.pieChart__hover}>
        <text x={cx} y={cy} textAnchor="middle">
          <tspan x={cx} className={styles.pieChart__title__percentage}>{`${(
            value * 100
          ).toFixed(2)}%`}</tspan>
          <tspan x={cx} className={styles.pieChart__title__company} dy="1.4em">
            {payload.name}
          </tspan>
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
          className={classNames(styles.label__arm, styles.hidden__mobile)}
        />
        <circle
          className={classNames(styles.hidden__mobile)}
          cx={ex}
          cy={ey}
          r={2}
          fill={fill}
          stroke="none"
        />
        <text
          x={ex + (cos >= 0 ? 1 : -1) * 12}
          y={ey + (cos >= 0 ? -26 : 0)}
          dy={15}
          textAnchor={textAnchor}
          className={classNames(styles.label__company, styles.hidden__mobile)}
          fill="#FFF"
        >
          {`${payload.name}`}
        </text>
        <text
          x={ex + (cos >= 0 ? 1 : -1) * 12}
          y={ey + (cos >= 0 ? -20 : 5)}
          dy={30}
          textAnchor={textAnchor}
          fill="#FFF"
          className={classNames(styles.label__text, styles.hidden__mobile)}
        >
          {`${(value * 100).toFixed(2)}%`}
        </text>
      </g>
    );
  };

  const renderLabel = props => {
    const { cx, cy, midAngle, outerRadius, fill, value, index } = props;

    if (activeIndex === index) return <></>;
    const sin = Math.sin(-RADIAN * midAngle);
    const cos = Math.cos(-RADIAN * midAngle);
    const sx = cx + (outerRadius + 5) * cos;
    const sy = cy + (outerRadius + 5) * sin;
    const mx = cx + (outerRadius + 15) * cos;
    const my = cy + (outerRadius + 15) * sin;
    const ex = mx + (cos >= 0 ? 1 : -1) * 22;
    const ey = my;
    const textAnchor = cos >= 0 ? 'start' : 'end';
    return (
      <g className="testing-label">
        {/* <ReferenceLine
          stroke="red"
          label={{
            position: 'top',
            fill: 'red',
            fontSize: 14,
          }}
        /> */}
        <path
          d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`}
          stroke={fill}
          fill="none"
          className={classNames(
            styles.label__arm,
            styles.hidden__mobile,
            'testing-class',
          )}
        />
        <text
          x={ex + (cos >= 0 ? 1 : -1) * 12}
          y={ey + (cos >= 0 ? -20 : 0)}
          dy={20}
          textAnchor={textAnchor}
          fill="#FFF"
          className={classNames(styles.label__text, styles.hidden__mobile)}
        >
          {`${(value * 100).toFixed(2)}%`}
        </text>
      </g>
    );
  };

  const handlePieHovering = event => {
    const { index } = event;
    setactiveIndex(index);
  };

  return (
    <ResponsiveContainer
      className={styles.chartContainer}
      width="100%"
      height="100%"
    >
      <PieChart>
        <Pie
          activeIndex={activeIndex}
          activeShape={renderActiveShape}
          data={data}
          innerRadius="74%"
          outerRadius="80%"
          label={isDesktop ? renderLabel : false}
          paddingAngle={5}
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

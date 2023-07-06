import React from 'react';
import { BarStack, BarGroup } from '@visx/shape';
import { Group } from '@visx/group';
import { GridRows } from '@visx/grid';
import { AxisBottom, AxisLeft } from '@visx/axis';
import { scaleBand, scaleLinear, scaleOrdinal } from '@visx/scale';
import { useTooltip, useTooltipInPortal, defaultStyles } from '@visx/tooltip';
import { localPoint } from '@visx/event';
import { format } from 'date-fns';

import Tooltip, { type TooltipData } from './Tooltip';

export type StatisticChartDatumT = {
  [key: string]: string | number;
};
export type CategoryLabelT = string;
export type ColorsT = { [key: CategoryLabelT]: string };

export type StatisticChartPropsT = {
  data: StatisticChartDatumT[];
  colors: ColorsT;
  width: number;
  height: number;
  margin?: { top: number; right: number; bottom: number; left: number };
  isStackType?: boolean;
  onPeriodSelect?: (index: number) => void;
};

const defaultMargin = { top: 40, right: 40, bottom: 50, left: 60 };

const formatDate = (date: string) => format(new Date(date), 'yyyy-MM-dd');

// accessors
const getDate = (d: StatisticChartDatumT): string => String(d.date);

let tooltipTimeout: number;

export default function StatisticChart({
  data,
  colors,
  width,
  height,
  margin = defaultMargin,
  isStackType,
  onPeriodSelect,
}: StatisticChartPropsT) {
  const keys = data[0]
    ? (Object.keys(data[0]).filter((d) => d !== 'date') as string[])
    : [];

  const sumTotals = data.reduce((allTotals, currentDate) => {
    const totalSum = keys.reduce((dailyTotal, k) => {
      dailyTotal += Number(currentDate[k]);
      return dailyTotal;
    }, 0);
    allTotals.push(totalSum);
    return allTotals;
  }, [] as number[]);

  // scales
  const dateScale = scaleBand<string>({
    domain: data.map(getDate),
    padding: 0.2,
  });
  const sumScale = scaleLinear<number>({
    domain: [Math.min(...sumTotals), 0],
    nice: true,
  });
  const categoryScale = scaleBand({
    domain: keys,
    padding: 0.05,
  });
  const colorScale = scaleOrdinal({
    domain: keys,
    range: keys.map((item) => colors[item] || 'black'),
  });

  const {
    tooltipOpen,
    tooltipLeft,
    tooltipTop,
    tooltipData,
    hideTooltip,
    showTooltip,
  } = useTooltip<TooltipData>();

  const { containerRef, TooltipInPortal } = useTooltipInPortal({
    scroll: true,
    detectBounds: true,
  });

  if (width < 10) return null;
  // bounds
  const xMax = width - margin.left - margin.right;
  const yMax = height - margin.top - margin.bottom;

  dateScale.rangeRound([0, xMax]);
  categoryScale.rangeRound([0, dateScale.bandwidth()]);
  sumScale.range([0, yMax]);

  return width < 10 ? null : (
    <div style={{ position: 'relative' }}>
      <svg ref={containerRef} width={width} height={height}>
        <GridRows
          top={margin.top}
          left={margin.left}
          scale={sumScale}
          width={xMax}
          strokeDasharray="2,2"
          stroke="black"
          strokeOpacity={0.2}
          pointerEvents="none"
        />
        <Group top={margin.top} left={margin.left}>
          {!isStackType && (
            <BarGroup
              data={data}
              keys={keys}
              height={yMax}
              x0={getDate}
              x0Scale={dateScale}
              x1Scale={categoryScale}
              yScale={sumScale}
              color={colorScale}
            >
              {(barGroups) =>
                barGroups.map((barGroup) => (
                  <Group
                    key={`bar-group-${barGroup.index}-${barGroup.x0}`}
                    left={barGroup.x0}
                  >
                    {barGroup.bars.map((bar) => (
                      <rect
                        key={`bar-group-bar-${barGroup.index}-${bar.index}-${bar.value}-${bar.key}`}
                        x={bar.x}
                        y={bar.y}
                        width={bar.width}
                        height={bar.height}
                        fill={bar.color}
                        onClick={() =>
                          onPeriodSelect && onPeriodSelect(barGroup.index)
                        }
                        onMouseMove={(event) => {
                          if (tooltipTimeout) clearTimeout(tooltipTimeout);
                          const eventSvgCoords = localPoint(event);
                          showTooltip({
                            tooltipData: data[barGroup.index],
                            tooltipTop: eventSvgCoords?.y,
                            tooltipLeft: eventSvgCoords?.x,
                          });
                        }}
                        onMouseLeave={() => {
                          tooltipTimeout = window.setTimeout(() => {
                            hideTooltip();
                          }, 300);
                        }}
                      />
                    ))}
                  </Group>
                ))
              }
            </BarGroup>
          )}
          {isStackType && (
            <BarStack<StatisticChartDatumT, CategoryLabelT>
              data={data}
              keys={keys}
              x={getDate}
              xScale={dateScale}
              yScale={sumScale}
              color={colorScale}
            >
              {(barStacks) =>
                barStacks.map((barStack) =>
                  barStack.bars.map((bar) => (
                    <rect
                      key={`bar-stack-${barStack.index}-${bar.index}`}
                      x={bar.x}
                      y={bar.y}
                      height={bar.height}
                      width={bar.width}
                      fill={bar.color}
                      onClick={() =>
                        onPeriodSelect && onPeriodSelect(bar.index)
                      }
                      onMouseMove={(event) => {
                        if (tooltipTimeout) clearTimeout(tooltipTimeout);
                        const eventSvgCoords = localPoint(event);
                        showTooltip({
                          tooltipData: data[bar.index],
                          tooltipTop: eventSvgCoords?.y,
                          tooltipLeft: eventSvgCoords?.x,
                        });
                      }}
                      onMouseLeave={() => {
                        tooltipTimeout = window.setTimeout(() => {
                          hideTooltip();
                        }, 300);
                      }}
                    />
                  ))
                )
              }
            </BarStack>
          )}
          <AxisLeft
            hideAxisLine
            hideTicks
            scale={sumScale}
            tickLabelProps={() => ({
              fontSize: 11,
              textAnchor: 'end',
              dy: '0.33em',
              opacity: 0.7,
            })}
          />
          <AxisBottom
            top={yMax}
            scale={dateScale}
            hideAxisLine
            hideTicks
            tickFormat={formatDate}
            tickLabelProps={() => ({
              fontSize: 11,
              textAnchor: 'middle',
              opacity: 0.7,
            })}
          />
        </Group>
      </svg>

      {tooltipOpen && tooltipData && (
        <TooltipInPortal
          top={tooltipTop}
          left={tooltipLeft}
          style={{
            ...defaultStyles,
            backgroundColor: 'rgba(0,0,0,0.7)',
            borderRadius: '7px',
          }}
        >
          <Tooltip data={tooltipData} colors={colors} />
        </TooltipInPortal>
      )}
    </div>
  );
}

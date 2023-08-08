import React from 'react';

import { ColorsT } from './StatisticChart';

export type TooltipData = {
  [key: string]: string | number;
};

interface TooltipPropsT {
  data: TooltipData;
  colors: ColorsT;
}

function Tooltip({ data, colors }: TooltipPropsT) {
  const { date, ...keys } = data;

  return (
    <div className="text-slate-200">
      <div className="mb-2 text-xs font-bold">{date}</div>
      {Object.keys(keys).map((key) => (
        <div className="flex justify-between text-xs" key={key}>
          <div className="flex items-center">
            <div
              className="w-3 h-3 mr-1  border border-solid border-gray-300"
              style={{ backgroundColor: colors[key] || 'black' }}
            ></div>
            <div className="mr-4">{key}</div>
          </div>
          <div>{Number(keys[key]).toFixed(2)}</div>
        </div>
      ))}
    </div>
  );
}

export default Tooltip;

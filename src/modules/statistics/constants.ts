import { MillisecondsBy } from 'src/constants';

export const SUMMARIZE_BY_OPTIONS: { label: string; id: number }[] = [
  {
    label: 'Day',
    id: MillisecondsBy.Day,
  },
  {
    label: 'Weak',
    id: MillisecondsBy.Weak,
  },
  {
    label: 'Month',
    id: MillisecondsBy.Month,
  },
  {
    label: 'All time',
    id: MillisecondsBy.Year,
  },
];

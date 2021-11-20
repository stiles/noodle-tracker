// packages
import { timeDay } from 'd3-time';
import { format } from 'd3-format';
import { apmonth } from 'journalize';
import { timeParse } from 'd3-time-format';

export const locale = document.documentElement.lang;

export const dateParser = timeParse('%Y-%m-%d');
export const pctFormat = format(`.0%`);

export function dateFormat(d) {
  return `${monthFormat(d)} ${d.getDate() + 1}, ${d.getFullYear()}`;
}

export function dateFormatschedule(d) {
  return `${monthFormat(d)} ${d.getDate() + 1}`;
}

export function monthFormat(d) {
  return apmonth(d);
}

export function monthTrimmer(a, minTickLabels = 2, maxTickLabels = 6) {
  if (a.length <= 2) {
    return a;
  } else if (a.length <= maxTickLabels) {
    return a;
  }
  return monthTrimmer(
    a.filter((d, i) => i % 2 == 0),
    maxTickLabels
  );
}

export function monthTickValues(startDate, endDate) {
  const dateRange = timeDay.range(startDate, endDate);
  const monthRange = dateRange.filter(dateFilter);
  return monthTrimmer(monthRange);
}

export function dateFilter(d) {
  const day = d.getDate();
  return day === 1;
}
const secondInMs = 1000;
const minuteInMs = secondInMs * 60;
const hourInMs = minuteInMs * 60;
const dayInMs = hourInMs * 24;

export const ANNIVERSARY_DATE = new Date(Date.UTC(2016, 3, 19, 0, 0, 0));

function addYearsUtc(date, amount) {
  const nextDate = new Date(date);
  nextDate.setUTCFullYear(nextDate.getUTCFullYear() + amount);
  return nextDate;
}

function addMonthsUtc(date, amount) {
  const nextDate = new Date(date);
  nextDate.setUTCMonth(nextDate.getUTCMonth() + amount);
  return nextDate;
}

function addDaysUtc(date, amount) {
  const nextDate = new Date(date);
  nextDate.setUTCDate(nextDate.getUTCDate() + amount);
  return nextDate;
}

function pluralize(value, singular, plural) {
  return `${value} ${value === 1 ? singular : plural}`;
}

export function getElapsedParts(startDate, endDate = new Date()) {
  if (endDate <= startDate) {
    return {
      years: 0,
      months: 0,
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0,
    };
  }

  let cursor = new Date(startDate);

  let years = endDate.getUTCFullYear() - cursor.getUTCFullYear();
  let nextCursor = addYearsUtc(cursor, years);
  if (nextCursor > endDate) {
    years -= 1;
    nextCursor = addYearsUtc(cursor, years);
  }
  cursor = nextCursor;

  let months =
    endDate.getUTCMonth() -
    cursor.getUTCMonth() +
    (endDate.getUTCFullYear() - cursor.getUTCFullYear()) * 12;
  nextCursor = addMonthsUtc(cursor, months);
  while (nextCursor > endDate) {
    months -= 1;
    nextCursor = addMonthsUtc(cursor, months);
  }
  cursor = nextCursor;

  let remaining = endDate.getTime() - cursor.getTime();
  const days = Math.floor(remaining / dayInMs);
  cursor = addDaysUtc(cursor, days);

  remaining = endDate.getTime() - cursor.getTime();
  const hours = Math.floor(remaining / hourInMs);
  remaining -= hours * hourInMs;

  const minutes = Math.floor(remaining / minuteInMs);
  remaining -= minutes * minuteInMs;

  const seconds = Math.floor(remaining / secondInMs);

  return {
    years,
    months,
    days,
    hours,
    minutes,
    seconds,
  };
}

export function formatElapsedSentence(parts) {
  return [
    pluralize(parts.years, 'anno', 'anni'),
    pluralize(parts.months, 'mese', 'mesi'),
    pluralize(parts.days, 'giorno', 'giorni'),
    pluralize(parts.hours, 'ora', 'ore'),
    pluralize(parts.minutes, 'minuto', 'minuti'),
    pluralize(parts.seconds, 'secondo', 'secondi'),
  ].join(', ');
}

export function formatDateLabel(dateValue) {
  if (!dateValue) {
    return '';
  }

  const date = new Date(dateValue);
  return new Intl.DateTimeFormat('it-IT', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }).format(date);
}


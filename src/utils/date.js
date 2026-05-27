const units = ["years", "months", "days", "hours", "minutes", "seconds"];

export function getRelationshipDuration(startDate, endDate = new Date()) {
  const start = new Date(startDate);
  const end = new Date(endDate);

  let years = end.getFullYear() - start.getFullYear();
  let months = end.getMonth() - start.getMonth();
  let days = end.getDate() - start.getDate();
  let hours = end.getHours() - start.getHours();
  let minutes = end.getMinutes() - start.getMinutes();
  let seconds = end.getSeconds() - start.getSeconds();

  if (seconds < 0) {
    seconds += 60;
    minutes -= 1;
  }

  if (minutes < 0) {
    minutes += 60;
    hours -= 1;
  }

  if (hours < 0) {
    hours += 24;
    days -= 1;
  }

  if (days < 0) {
    const previousMonth = new Date(end.getFullYear(), end.getMonth(), 0);
    days += previousMonth.getDate();
    months -= 1;
  }

  if (months < 0) {
    months += 12;
    years -= 1;
  }

  return {
    years,
    months,
    days,
    hours,
    minutes,
    seconds
  };
}

export function formatDuration(duration) {
  return units
    .map((unit) => {
      const value = duration[unit];
      const label = {
        years: "anni",
        months: "mesi",
        days: "giorni",
        hours: "ore",
        minutes: "minuti",
        seconds: "secondi"
      }[unit];

      return `${value} ${label}`;
    })
    .join(", ");
}

export function formatLongDate(value) {
  return new Intl.DateTimeFormat("it-IT", {
    day: "numeric",
    month: "long",
    year: "numeric"
  }).format(new Date(value));
}

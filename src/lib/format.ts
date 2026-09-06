const MONTHS = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

/** "2026-05-01" (or "2026-05") → "May 2026". One place, so it reads one way. */
export const formatCompleted = (value: string) => {
  const [year, month] = value.split("-");
  const name = MONTHS[Number(month) - 1];
  return name ? `${name} ${year}` : year;
};

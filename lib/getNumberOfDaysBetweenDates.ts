export default function getNumberOfDaysBetweenDates(
  startDate: Date,
  endDate: Date
): number {
  const debut = new Date(startDate);
  const fin = new Date(endDate);

  // Conversion des millisecondes en jours
  return Math.abs(Math.ceil((fin.getTime() - debut.getTime()) / 86400000)) + 1;
}

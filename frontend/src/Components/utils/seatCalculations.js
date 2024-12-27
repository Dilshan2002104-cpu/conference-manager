export const calculateOccupancy = (available, total) => {
  if (total <= 0) return 0;
  return ((total - available) / total) * 100;
};

export const getOccupancyColor = (percentage) => {
  if (percentage >= 90) return '#ff4444';
  if (percentage >= 70) return '#ffa700';
  return '#4CAF50';
};
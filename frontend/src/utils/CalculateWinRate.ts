export const calculateWinRate = (wins: number, losses: number) => {
  return Math.round((wins / (wins + losses)) * 100);
};

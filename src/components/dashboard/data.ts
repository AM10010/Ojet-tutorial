export type ChartItem = {
  id: string;
  series: string;
  group: string;
  value: number;
};

export const data: Record<string, ChartItem[]> = {
  Baseball: [
    { id: "baseball-1", series: "Wins", group: "2024", value: 42 },
    { id: "baseball-2", series: "Losses", group: "2024", value: 20 },
    { id: "baseball-3", series: "Draws", group: "2024", value: 50 },
    { id: "baseball-4", series: "Cancelled", group: "2024", value: 30 },
  ],
  Football: [
    { id: "football-1", series: "Wins", group: "2024", value: 30 },
    { id: "football-2", series: "Losses", group: "2024", value: 25 },
    { id: "football-3", series: "Draws", group: "2024", value: 10 },
    { id: "football-4", series: "Cancelled", group: "2024", value: 2 },
  ],
  Tennis: [
    { id: "tennis-1", series: "Wins", group: "2024", value: 55 },
    { id: "tennis-2", series: "Losses", group: "2024", value: 18 },
    { id: "tennis-3", series: "Retired", group: "2024", value: 4 },
    { id: "tennis-4", series: "Walkover", group: "2024", value: 2 },
    { id: "tennis-5", series: "Forfeited", group: "2024", value:6},
  ],
  Soccer: [
    { id: "soccer-1", series: "Wins", group: "2024", value: 38 },
    { id: "soccer-2", series: "Losses", group: "2024", value: 22 },
    { id: "soccer-3", series: "Draws", group: "2024", value: 15 },
    { id: "soccer-4", series: "Postponed", group: "2024", value: 6 },
  ],
};
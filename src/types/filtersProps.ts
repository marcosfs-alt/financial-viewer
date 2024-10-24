export interface FiltersProps {
  dateRange: {
    startDate: Date | null;
    endDate: Date | null;
  };
  accounts: string[];
  industries: string[];
  states: string[];
}

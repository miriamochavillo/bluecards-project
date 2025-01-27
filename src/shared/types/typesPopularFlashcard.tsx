export type PopularFlashcard = {
  id: string;
  title: string;
  description: string;
  lastUpdated: string;
  views: number;
  favorite?: boolean;
};

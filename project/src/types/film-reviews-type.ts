type FilmReviewType = {
  comment: string;
  date: string;
  id: number;
  rating: number;
  user: {
    id: number;
    name: string;
  };
};

type FilmReviewsType = FilmReviewType[];

export type { FilmReviewsType, FilmReviewType };

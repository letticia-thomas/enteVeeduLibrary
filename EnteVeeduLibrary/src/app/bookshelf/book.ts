export interface IBook {
    id: number;
    bookName: string;
    language: string;
    author: string;
    price: number;
    description: string;
    starRating: number;
    imageUrl: string;
    reader: string | undefined;
  }
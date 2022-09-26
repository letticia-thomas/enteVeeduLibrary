export interface IBook {
    forEach(arg0: (item: any) => void): unknown;
    id: number;
    bookName: string;
    language: string;
    author: string;
    price: number;
    description: string;
    starRating: number;
    imageUrl: string;
    reader: string | undefined;
    availableOn : string;
    currentReader:string |undefined;
  }
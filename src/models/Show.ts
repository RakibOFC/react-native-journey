import { ShowImage } from './ShowImage';
import { Rating } from './Rating';

export class Show {
  id: number;
  url: string;
  name: string;
  type: string;
  language?: string;
  genres: string[];
  image?: ShowImage;
  summary?: string;
  runtime?: number;
  premiered?: string;
  rating: Rating;

  constructor(
    id: number,
    url: string,
    name: string,
    type: string,
    language: string | undefined,
    genres: string[],
    image: ShowImage | undefined,
    summary: string | undefined,
    runtime: number | undefined,
    premiered: string | undefined,
    rating: Rating
  ) {
    this.id = id;
    this.url = url;
    this.name = name;
    this.type = type;
    this.language = language;
    this.genres = genres;
    this.image = image;
    this.summary = summary;
    this.runtime = runtime;
    this.premiered = premiered;
    this.rating = rating;
  }

  static fromJson(json: any): Show {
    return new Show(
      json.id,
      json.url,
      json.name,
      json.type,
      json.language,
      json.genres,
      json.image ? ShowImage.fromJson(json.image) : undefined,
      json.summary,
      json.runtime,
      json.premiered,
      Rating.fromJson(json.rating)
    );
  }
}

import { Show } from './Show';

export class SearchResult {
  score: number;
  show: Show;

  constructor(score: number, show: Show) {
    this.score = score;
    this.show = show;
  }

  static fromJson(json: any): SearchResult {
    return new SearchResult(json.score, Show.fromJson(json.show));
  }
}

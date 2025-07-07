export class Rating {
  average?: number;

  constructor(average?: number) {
    this.average = average;
  }

  static fromJson(json: any): Rating {
    return new Rating(json.average);
  }
}
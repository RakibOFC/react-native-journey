export class ShowImage {
  medium: string;
  original: string;

  constructor(medium: string, original: string) {
    this.medium = medium;
    this.original = original;
  }

  static fromJson(json: any): ShowImage {
    return new ShowImage(json.medium, json.original);
  }
}

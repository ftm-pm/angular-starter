export class FileInput {
  private _fileNames: string;

  public constructor(private _files: File[], private delimiter: string = ', ') {
    this._fileNames = this._files.map((file: File) => file.name).join(delimiter);
  }

  get files(): File[] {
    return this._files || [];
  }

  get fileNames(): string {
    return this._fileNames;
  }
}

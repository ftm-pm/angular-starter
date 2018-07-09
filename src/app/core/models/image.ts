import { RestEntity } from './rest-entity';

export class Image extends RestEntity {
  public id: number;
  public src: string;
  public previews: [string];
  public createdAt: Date;
  public updatedAt: Date;
  public srcFile: File;
}

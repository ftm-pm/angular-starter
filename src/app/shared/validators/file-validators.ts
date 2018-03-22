import { ValidatorFn, AbstractControl } from '@angular/forms';

import { FileInput } from '../components/input-file/file-input';

export class FileValidators {

  /**
   * Function to control content of files
   *
   * @param {number} bytes
   * @returns {ValidatorFn}
   */
  public static maxContentSize(bytes: number): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } => {
      const size = control && control.value ? (control.value as FileInput).files.map(f => f.size).reduce((acc, i) => acc + i, 0) : 0;
      const condition = bytes > size;

      return condition ? null : {
        maxContentSize: {
          actualSize: size,
          maxSize: bytes
        }
      };
    };
  }
}

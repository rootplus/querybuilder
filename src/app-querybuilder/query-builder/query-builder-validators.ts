import {AbstractControl, ValidatorFn} from '@angular/forms';

export class QueryBuilderValidators {
  static notAllowedStringValidator(forbiddenStr: string): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } => {
      const invalid = (forbiddenStr === control.value);
      return invalid ? {'notAllowedString': {value: control.value}} : null;
    };
  }
}

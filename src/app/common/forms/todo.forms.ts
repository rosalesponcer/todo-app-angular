import { FormControl, Validators } from '@angular/forms';

export const TITLE_MAX_LENGTH = 12;

export const getTodoTitleFormControl = (initialValue = '') =>
  new FormControl(initialValue, {
    nonNullable: true,
    validators: [Validators.required, Validators.maxLength(TITLE_MAX_LENGTH)],
  });

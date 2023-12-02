import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { CheckboxModule } from 'primeng/checkbox';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { DialogModule } from 'primeng/dialog';

const LIST = [
  ButtonModule,
  InputTextModule,
  CheckboxModule,
  InputTextareaModule,
  DialogModule,
];

@NgModule({
  imports: [BrowserAnimationsModule, ...LIST],
  exports: [...LIST],
})
export class PrimeNgModule {}

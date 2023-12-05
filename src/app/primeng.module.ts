import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { CheckboxModule } from 'primeng/checkbox';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { DialogModule } from 'primeng/dialog';
import { CalendarModule } from 'primeng/calendar';
import { ColorPickerModule } from 'primeng/colorpicker';

const LIST = [
  ButtonModule,
  InputTextModule,
  CheckboxModule,
  InputTextareaModule,
  DialogModule,
  CalendarModule,
  ColorPickerModule,
];

@NgModule({
  imports: [BrowserAnimationsModule, ...LIST],
  exports: [...LIST],
})
export class PrimeNgModule {}

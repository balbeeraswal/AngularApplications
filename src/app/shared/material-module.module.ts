import { NgModule } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatMomentDateModule } from '@angular/material-moment-adapter';
import { NgxMatDatetimePickerModule,NgxMatTimepickerModule,NgxMatDateAdapter, NgxMatNativeDateModule } from '@angular-material-components/datetime-picker';



@NgModule({
  exports: [
    MatDatepickerModule,
    MatFormFieldModule,
    MatInputModule,
    MatNativeDateModule,
MatMomentDateModule,
NgxMatDatetimePickerModule,
NgxMatTimepickerModule,
NgxMatNativeDateModule


  ]
})
export class MaterialModule {}
import { NgModule } from '@angular/core';
//imports of material
import {MatDialogModule} from '@angular/material/dialog';
import {MatStepperModule} from '@angular/material/stepper';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatTabsModule} from '@angular/material/tabs';
import {MatDatepickerModule} from '@angular/material/datepicker';
//-----------------------------------------------------------

const MaterialComponents = [
  MatDialogModule, MatStepperModule, MatExpansionModule, MatTabsModule,MatDatepickerModule
]
//-----------------------------------------------------------

@NgModule({
  
  imports: [
    MaterialComponents
  ],
  exports: [
    MaterialComponents
  ]
})
export class MaterialModule { }

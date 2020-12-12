import { NgModule } from '@angular/core';
//imports of material
import {MatDialogModule} from '@angular/material/dialog';
import {MatStepperModule} from '@angular/material/stepper';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatTabsModule} from '@angular/material/tabs';
import {MatPaginatorModule} from '@angular/material/paginator';
//-----------------------------------------------------------

const MaterialComponents = [
  MatDialogModule, MatStepperModule, MatExpansionModule, MatTabsModule, MatPaginatorModule
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

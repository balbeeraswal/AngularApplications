import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DisableDirective } from './directives/Enable_Disable_Div';


@NgModule({
  declarations: [DisableDirective],
  exports: [
    CommonModule,
    DisableDirective
   
  ]
})
export class CommonFeaturedModuleModule { }

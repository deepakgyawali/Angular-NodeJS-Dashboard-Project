import { NgModule }      from '@angular/core';
import { CommonModule }  from '@angular/common';
import { MycomponentsNewComponent } from './mycomponentsnew.component';
import { routing } from './mycomponentsnew.routing';

@NgModule({
  imports: [
    CommonModule,
    routing
  ],
  declarations: [
    MycomponentsNewComponent
  ]
})
export class MycomponentsNewModule {}
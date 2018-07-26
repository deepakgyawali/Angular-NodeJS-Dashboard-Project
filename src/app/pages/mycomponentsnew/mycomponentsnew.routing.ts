import { Routes, RouterModule }  from '@angular/router';
import { MycomponentsNewComponent } from './mycomponentsnew.component';

const routes: Routes = [
  {
    path: '',
    component: MycomponentsNewComponent
  }
];

export const routing = RouterModule.forChild(routes);
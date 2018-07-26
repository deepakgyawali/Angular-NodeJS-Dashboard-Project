import { Routes, RouterModule }  from '@angular/router';
import { MycomponentsComponent } from './mycomponents.component';

const routes: Routes = [
  {
    path: '',
    component: MycomponentsComponent
  }
];

export const routing = RouterModule.forChild(routes);
import { Routes, RouterModule }  from '@angular/router';
import { TestpageComponent } from './testpage.component';

const routes: Routes = [
  {
    path: '',
    component: TestpageComponent
  }
];

export const routing = RouterModule.forChild(routes);
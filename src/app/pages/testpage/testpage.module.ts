import { NgModule }      from '@angular/core';
import { CommonModule }  from '@angular/common';
import { TestpageComponent } from './testpage.component';
import { routing } from './testpage.routing';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { CKEditorModule } from 'ng2-ckeditor';
import { NgaModule } from '../../theme/nga.module';
import { FormsModule } from '@angular/forms';

//import { LineChart } from '../dashboard/lineChart/lineChart.component';

import { Ckeditor } from '../editors/components/ckeditor/ckeditor.component';

@NgModule({
  imports: [
    CommonModule,
    routing,
    FormsModule,
    CKEditorModule,
    NgaModule,
    Ng2SmartTableModule
  ],
  declarations: [
    TestpageComponent,
  ]
})
export class TestpageModule {}
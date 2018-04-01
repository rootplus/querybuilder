import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {TooltipModule} from 'ngx-bootstrap/tooltip';
import {BsDatepickerModule} from 'ngx-bootstrap/datepicker';

import {QueryBuilderComponent} from './components/query-builder/query-builder.component';
import {QueryBuilderInputComponent} from './components/query-builder-input/query-builder-input.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    TooltipModule.forRoot(),
    BsDatepickerModule.forRoot()
  ],
  declarations: [QueryBuilderComponent, QueryBuilderInputComponent],
  exports: [QueryBuilderComponent]
})
export class QueryBuilderModule {
}

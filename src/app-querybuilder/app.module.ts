import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {QueryBuilderModule} from './query-builder';
import {AppComponent} from './app.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    QueryBuilderModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}

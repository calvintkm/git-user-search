import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { HttpClientModule } from "@angular/common/http";
import { FormsModule } from "@angular/forms";

import { AppComponent } from "./app.component";

import { SearchBarComponent } from "./search-bar/search-bar.component";
import { SearchResultsComponent } from "./search-results/search-results.component";

import { DashIfNullPipe } from "./dash-if-null.pipe";
import { PageNumberPipe } from "./page-number.pipe";
import { PagesComponent } from "./pages/pages.component";

@NgModule({
  declarations: [
    AppComponent,
    SearchBarComponent,
    SearchResultsComponent,
    DashIfNullPipe,
    PageNumberPipe,
    PagesComponent,
  ],
  imports: [BrowserModule, HttpClientModule, FormsModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}

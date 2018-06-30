import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { TitlebarComponent } from './titlebar/titlebar.component';
import { SearchComponent } from './search/search.component';
import { AboutComponent } from './about/about.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { HomeComponent } from './home/home.component';
import { FooterComponent } from './footer/footer.component';

const appRoutes:Routes = [
  {path:'', component:HomeComponent},
  {path:'home', component:HomeComponent},
  {path:'search', component:SearchComponent},
  {path:'about', component:AboutComponent},
  {path:'**', component:PageNotFoundComponent}
];

@NgModule({
  declarations: [
    AppComponent,
    TitlebarComponent,
    SearchComponent,
    AboutComponent,
    PageNotFoundComponent,
    HomeComponent,
    FooterComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

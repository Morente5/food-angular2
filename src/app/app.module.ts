import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

// ng2-bootstrap modules
import { CollapseModule } from 'ng2-bootstrap';
import { DropdownModule } from 'ng2-bootstrap';

import { AppComponent } from './app.component';
import { NavbarTopComponent } from './navbar/navbar-top/navbar-top.component';
import { NavbarBreadcrumbsComponent } from './navbar/navbar-breadcrumbs/navbar-breadcrumbs.component';
import { FooterComponent } from './footer/footer.component';
import { SectionNotfoundComponent } from './section/section-notfound/section-notfound.component';
import { SectionProductalbumComponent } from './section/section-productalbum/section-productalbum.component';
import { SectionProductdetailsComponent } from './section/section-productdetails/section-productdetails.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarTopComponent,
    NavbarBreadcrumbsComponent,
    FooterComponent,
    SectionNotfoundComponent,
    SectionNotfoundComponent,
    SectionProductalbumComponent,
    SectionProductdetailsComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,

    // ng2-bootstrap modules
    CollapseModule.forRoot(),
    DropdownModule.forRoot(),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

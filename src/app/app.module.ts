import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

// ng2-bootstrap modules
import { CollapseModule } from 'ng2-bootstrap';
import { DropdownModule } from 'ng2-bootstrap';

import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { FooterComponent } from './footer/footer.component';
import { SectionAlbumComponent } from './section-album/section-album.component';
import { SectionNotfoundComponent } from './section-notfound/section-notfound.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    FooterComponent,
    SectionAlbumComponent,
    SectionNotfoundComponent
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

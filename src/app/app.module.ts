import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { MenuComponent } from './components/menu/menu.component';
import { HeaderComponent } from './components/header/header.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { ApiModule } from 'esi-client-angular';
import { AngularLaravelEchoModule } from 'angular-laravel-echo';
import { CardComponent } from './components/card/card.component';
import { CardHostDirective } from './directives/card-host.directive';
import { CharacterCardComponent, CorporationCardComponent, AllianceCardComponent,
         CoalitionCardComponent, HandbookCardComponent, FittingCardComponent } from './components/card/cards';
import { RouterModule } from '@angular/router';
import { ROUTES } from './app.routes';
import { MomentModule } from 'ngx-moment';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    MenuComponent,
    HeaderComponent,
    SidebarComponent,
    CardComponent,
    CardHostDirective,
    CharacterCardComponent,
    CorporationCardComponent,
    AllianceCardComponent,
    CoalitionCardComponent,
    HandbookCardComponent,
    FittingCardComponent
  ],
  imports: [
    BrowserModule,
    ApiModule,
    AngularLaravelEchoModule,
    RouterModule.forRoot(ROUTES),
    MomentModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

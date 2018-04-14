import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { MenuComponent } from './components/menu/menu.component';
import { HeaderComponent } from './components/header/header.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { ApiModule } from './eve-online-angular-client';
import { AngularLaravelEchoModule } from 'angular-laravel-echo';
import { CardComponent } from './components/card/card.component';
import { CardHostDirective } from './directives/card-host.directive';
import { CharacterCardComponent } from './components/card/cards/character/character.card.component';
import { RouterModule } from '@angular/router';
import { ROUTES } from './app.routes';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    MenuComponent,
    HeaderComponent,
    SidebarComponent,
    CardComponent,
    CardHostDirective,
    CharacterCardComponent
  ],
  imports: [
    BrowserModule,
    ApiModule,
    AngularLaravelEchoModule,
    RouterModule.forRoot(ROUTES)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

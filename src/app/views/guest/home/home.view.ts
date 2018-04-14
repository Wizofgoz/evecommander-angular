import { Component } from '@angular/core';
import { MenuItem } from '../../../components/menu/menu-item';

@Component({
  selector: 'app-guest-home',
  templateUrl: 'home.template.html'
})
export class HomeView {
  protected menuItems: MenuItem[] = [];
}

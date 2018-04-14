import { Component, OnInit, Input } from '@angular/core';
import { MenuService, MenuItem } from '../../services/menu/menu.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {
  @Input items: MenuItem[];

  constructor(private menuService: MenuService) { }

  ngOnInit() {
    this.items = this.menuService.getMenuItems();
  }

}

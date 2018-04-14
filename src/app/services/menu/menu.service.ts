import { Injectable } from '@angular/core';
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/map';
import * as _ from 'lodash';

export class MenuItem {
  path: string;
  title: string;
  icon?: string;
}

@Injectable()
export class MenuService {
  private menuItems: MenuItem[];
  activeMenuItem$: Observable<MenuItem>;

  constructor(private router: Router, private titleService: Title) {
    this.activeMenuItem$ = this.router.events
      .filter(e => e instanceof NavigationEnd)
      .map(_ => this.router.routerState.root)
      .map(route => {
        const active = this.lastRouteWithMenuItem(route.root);
        this.titleService.setTitle(active.title);
        return active;
      });
  }

  protected initMenuItems() {
    return this.router.config
      .filter(route => route.data && route.data.title) // only add a menu item for routes with a title set.
      .map(route => {
        return {
          path: route.path,
          title: route.data.title,
          icon: route.data.icon
        };
      });
  }

  getMenuItems(): MenuItem[] {
    return this.menuItems;
  }

  addMenuItem(item: MenuItem, after?: string) {
    const currentItems = this.getMenuItems();
    let position = currentItems.length;
    if (after) {
      position = _.find(currentItems, {title: after});
    }

    if (position === undefined) {
      return false;
    }

    this.menuItems.splice(position, 0, item);
  }

  removeMenuItem(item: MenuItem|number) {
    let position = item;
    if (item instanceof MenuItem) {
      position = _.find(this.getMenuItems(), item);
    }

    if (isNaN(position)) {
      return false;
    }

    this.menuItems.splice(position, 1);
  }

  private lastRouteWithMenuItem(route: ActivatedRoute): MenuItem {
    let lastMenu;
    do { lastMenu = this.extractMenu(route) || lastMenu; }
    while ((route = route.firstChild));
    return lastMenu;
  }

  private extractMenu(route: ActivatedRoute): MenuItem {
    const cfg = route.routeConfig;
    return cfg && cfg.data && cfg.data.title
      ? { path: cfg.path, title: cfg.data.title, icon: cfg.data.icon }
      : undefined;
  }
}

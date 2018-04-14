import { Routes } from '@angular/router';
import { HomeView } from './views/guest/home/home.view';
import { ApiGuard } from './guards/api.guard';
import { EveGuard } from './guards/eve.guard';


export const ROUTES: Routes = [
  {path: '', pathMatch: 'full', component: HomeView},
  {path: 'dashboard', pathMatch: 'full', canActivate: [ApiGuard]},
  {
    path: '', canActivateChild: [ApiGuard], children: [
      {
        path: 'character/:id', pathMatch: 'full', canActivate: [EveGuard], children: [
          {
            path: '', canActivateChild: [EveGuard], children: [
              {path: 'corporation', pathMatch: 'full'}
            ]
          }
        ]
      }
    ]
  },
  {path: '**', children: [], redirectTo: 'dashboard'}
];

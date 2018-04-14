import { Component, OnInit, Input } from '@angular/core';
import { AuthService } from '../../services/auth/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  @Input() title: string;
  protected isLoggedIn: boolean;
  protected user;

  constructor(private auth: AuthService) { }

  ngOnInit() {
    this.isLoggedIn = this.auth.isLoggedIn();
    this.user = this.auth;
  }
}

import { Component, OnInit } from '@angular/core';
import { CookieService } from '../../services/cookie.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {


  session : boolean = false;
  constructor(
    private cookieService: CookieService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.viewSession()
  }
  viewSession(){
    const res = this.cookieService.getCookie('session')
    this.session = res ? true : false;
  }

  clearCookie() {
    this.cookieService.deleteCookie('session');
    this.router.navigate(['/']);
  }
}

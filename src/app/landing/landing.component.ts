import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFire, FirebaseAuthState } from 'angularfire2';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss']
})
export class LandingComponent implements OnInit {

  constructor(private auth: AuthService, private router: Router) { }

  ngOnInit() {
  }

  /**
   * logs in an existing user with provided credentials
   * @param email
   * @param password
   */
  login(email: string, password: string) {
    this.auth.login(email, password).then((state: FirebaseAuthState) => {
      this.router.navigate(['/platform']);
    }).catch((e: Error) => {
      console.error(e);
    });
  }

  /**
   * registers a new user into the firebase
   * @param email
   * @param password
   */
  register(email: string, password: string) {
    this.auth.register(email, password).then((state: FirebaseAuthState) => {
      this.router.navigate(['/platform']);
    }).catch((e: Error) => {
      console.error(e);
    });
  }
}

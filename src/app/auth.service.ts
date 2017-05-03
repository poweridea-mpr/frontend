import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { AngularFire, FirebaseAuthState, FirebaseListObservable } from 'angularfire2';
import { User } from './models';

@Injectable()
export class AuthService {

  users: FirebaseListObservable<User[]>;

  // readonly observable from the auth state
  get authState$(): Observable<FirebaseAuthState> {
    return this.af.auth.asObservable();
  }

  constructor(public af: AngularFire) {
    this.users = this.af.database.list('/users');
  }

  /**
   * logs in an existing user with provided credentials
   * @param email
   * @param password
   */
  login(email: string, password: string): Promise<FirebaseAuthState> {
    return <any>this.af.auth.login({email: `${email}`, password: `${password}`})
  }

  /**
   * registers a new user into the firebase
   * @param email
   * @param password
   */
  register(email: string, password: string): Promise<FirebaseAuthState> {
    return <any>this.af.auth.createUser({email: `${email}`, password: `${password}`});
  }

  logout(): Promise<void> {
    return this.af.auth.logout();
  }
}

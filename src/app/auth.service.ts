import { Injectable } from '@angular/core';
import { of } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthService {
  constructor() {}

  getAuthToken() {
    return 'superSecretToken';
  }

  refreshAuthToken() {
    return of('superSecretTokenRefreshed')
  }
}

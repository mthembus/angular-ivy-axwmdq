import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { MessageService } from './message.service';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  constructor(private messageService: MessageService) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      catchError((requestError) => {
        if (requestError.status !== 401) {
          const { error } = requestError;
          this.messageService.add({
            severity: 'error',
            summary: `HTTP Error - ${requestError.status}`,
            detail: error && error.message,
          });
        }
        return throwError(() => new Error(requestError));
      })
    );
  }
}

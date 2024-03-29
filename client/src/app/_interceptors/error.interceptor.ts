import { error } from '@angular/compiler/src/util';
import { ToastrService } from 'ngx-toastr';
import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { NavigationExtras, Router } from '@angular/router';
import { catchError } from 'rxjs/operators';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

  constructor(private router: Router, private toastr: ToastrService) { }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(
      catchError(error => {
        if (error) {
          switch (error.status) {
            case 400:
              if (error.error.errors) {
                const modalStateErrors = [];
                for (const key in error.error.errors) {
                  if (error.error.errors[key]) {
                    modalStateErrors.push(error.error.errors[key])
                  }
                }
                var mergedModalStateErrors =[].concat.apply([], modalStateErrors);
                throw mergedModalStateErrors;
              } else {
                this.toastr.error(error.statusText === "OK" ? "Bad Request": error.statusText, error.status);
              }

              break;
            case 401:
              this.toastr.error(error.statusText =="OK" ? "Unauthorized": error.statusText, error.status);
              break;

            case 404:
              this.router.navigateByUrl('/not-found');
              break;

            case 500:
              const naviagtionExtras: NavigationExtras = { state: { error: error.error } }
              this.router.navigateByUrl('/server-error', naviagtionExtras);
              break;

            default:
              this.toastr.error('Something unexpected happened');
              console.log(error);
              break;
          }
        }
        return throwError(error);
      })
    );
  }
}

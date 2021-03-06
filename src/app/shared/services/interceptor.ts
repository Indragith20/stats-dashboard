import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpResponse,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { MatDialogConfig, MatDialog } from '@angular/material';
import { LoaderComponent } from '../components/loader/loader.component';
import { ErrorDialogComponent } from '../components/error-dialog/error-dialog.component';

@Injectable()
export class CustomHttpinterceptor implements HttpInterceptor {
  constructor(private dialog: MatDialog) {}

  intercept(request: HttpRequest<any>, next: HttpHandler ): Observable<HttpEvent<any>> {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;

    const dialogRef = this.dialog.open(LoaderComponent, dialogConfig);
    return next.handle(request).pipe(tap((ev: HttpEvent<any>) => {
        if(ev instanceof HttpResponse) {
          dialogRef.close();
        } else if(ev instanceof HttpErrorResponse) {
          dialogRef.close();
        }
      }));
  }
}

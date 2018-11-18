import { Component } from '@angular/core';
import { fromEvent, Subscription, Observable } from 'rxjs';
import {MatSnackBar} from '@angular/material';
import { SnackbarComponent } from './shared/components/snackbar/snackbar.component';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  online$: Observable<any>;
  offline$: Observable<any>;

  constructor(private snackBar: MatSnackBar) {
    this.online$ = fromEvent(window, 'online');
    this.offline$ = fromEvent(window, 'offline');
    this.online$.subscribe((data) => {
      console.log(data);
      this.snackBar.openFromComponent(SnackbarComponent, {
        data: 'Back Online!',
        duration: 5000,
        horizontalPosition: 'center',
        verticalPosition: 'top'
      });
    });
    this.offline$.subscribe((data) => {
      console.log(data);
      this.snackBar.openFromComponent(SnackbarComponent, {
        politeness: 'assertive',
        data: 'Not Connected to Internet',
        horizontalPosition: 'center',
        verticalPosition: 'top'
      });
    });
  }
}

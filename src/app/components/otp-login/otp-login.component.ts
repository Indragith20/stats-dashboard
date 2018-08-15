import { Component, OnInit } from '@angular/core';
import { AppService } from '../../shared/services/app.service';
import {MatSnackBar} from '@angular/material';
import { SnackbarComponent } from '../../shared/components/snackbar/snackbar.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-otp-login',
  templateUrl: './otp-login.component.html',
  styleUrls: ['./otp-login.component.scss']
})
export class OtpLoginComponent implements OnInit {
  enteredOtp: string;
  constructor(private loginService: AppService, private snackBar: MatSnackBar, private router: Router) { }

  ngOnInit() {}

  getMatchData() {
    this.loginService.getMatchDetailsByID(this.enteredOtp ? this.enteredOtp : 'MAT23924')
        .then((data: any) => {
          console.log(data);
          if(data.status === 'error') {
            this.snackBar.openFromComponent(SnackbarComponent, {
              data: 'No Matches Found!',
              duration: 5000,
              horizontalPosition: 'right',
              verticalPosition: 'top'
            });
          } else {
            this.router.navigateByUrl('/stats-dashboard');
          }
        })
        .catch((err) => {
          console.log(err);
        });
  }

}

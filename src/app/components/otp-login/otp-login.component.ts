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

  ngOnInit() {
  }

  getMatchData() {
    this.loginService.getProfileDetails().then((data) => {
      this.snackBar.openFromComponent(SnackbarComponent, {
        data: 'Enter OTP',
        duration: 500,
        horizontalPosition: 'right',
        verticalPosition: 'top'
      });
    });
    if(this.enteredOtp) {
      this.loginService.getIntialStatsData(this.enteredOtp)
        .then((data: any) => {
          if(data.status === 'success') {
            this.getMatchStatsData();
          } else {
            this.snackBar.openFromComponent(SnackbarComponent, {
              data: 'No Matches Found!',
              duration: 5000,
              horizontalPosition: 'right',
              verticalPosition: 'top'
            });
          }
        })
        .catch((err) => {
          this.snackBar.openFromComponent(SnackbarComponent, {
            data: 'No Matches Found!',
            duration: 5000,
            horizontalPosition: 'right',
            verticalPosition: 'top'
          });
        });
    }
  }

  getMatchStatsData() {
    this.loginService.getMatchDetailsByID(this.enteredOtp)
        .then((data: any) => {
          if(data.status === 'error') {
            this.snackBar.openFromComponent(SnackbarComponent, {
              data: 'No Matches Found!',
              duration: 5000,
              horizontalPosition: 'right',
              verticalPosition: 'top'
            });
          } else {
            this.router.navigateByUrl('/jersey-picker');
          }
        })
        .catch((err) => {
          this.snackBar.openFromComponent(SnackbarComponent, {
            data: 'Something Wrong Happened..',
            duration: 5000,
            horizontalPosition: 'right',
            verticalPosition: 'top'
          });
    });
  }

}

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { reject } from 'q';
import { EndpointsEnum } from '../constants/endpoints';

@Injectable()
export class AppService {
    isAuthenticated: boolean = false;
    matchDetails: any;
    matchDetailsRetrieved: boolean = false;
    
    constructor(private http: HttpClient) {}

    autheticateUser(username: string, password: string) {
        const data = {
            'username': 'ref2@khelid.com',
            'password': '123456'
        }
        return this.http.post('http://core.tournament.ai/ManageAuthentication/referee_login',{data: data})
                        .subscribe((data) => {
                            console.log(data);
                        });
    }

    getMatchDetailsByID(matchId: string) {
        var headers = new HttpHeaders();
        headers.set('Content-Type', 'application/x-www-form-urlencoded');

        let body = new FormData();
        body.append('referee_id', 'PID01511');
        body.append('category', 'STATS');
        body.append('match_id', matchId);
        const url = `${EndpointsEnum.GLOBAL_CORE_URL}ManageMatches/getMatchdata`
        console.log(EndpointsEnum.GLOBAL_CORE_URL);

        return new Promise((resolve) => {
                        this.http.post(url, body, { headers: headers}).subscribe((data: any) => {
                            if (data) {
                                this.matchDetails = data.status !== 'error' ? data : '';
                                this.matchDetailsRetrieved = true;
                                resolve(data);
                            }
                        }, (err) => {
                            reject(err);
                        });
            });
    }
}
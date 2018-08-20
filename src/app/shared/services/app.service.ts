import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EndpointsEnum } from '../constants/endpoints';

@Injectable()
export class AppService {
    isAuthenticated: boolean = false;
    matchDetails: any;
    referreeDetails: any;
    matchDetailsRetrieved: boolean = false;
    headers: HttpHeaders;
    matchIdentifier: any;
    
    constructor(private http: HttpClient) {
        this.headers = new HttpHeaders();
        this.headers.set('Content-Type', 'application/x-www-form-urlencoded');
    }

    getMatchDetailsByID(matchId: any) {
        let body = new FormData();
        body.append('referee_id', 'PID01511');
        body.append('category', 'STATS');
        body.append('match_id', matchId);
        const url = `${EndpointsEnum.GLOBAL_CORE_URL}ManageMatches/getStatsMatchdata`;
        return new Promise((resolve, reject)=> {
            this.sendRequest(url, body).subscribe((data: any) => {
                if (data) {
                    this.matchDetails = data.status !== 'error' ? data : '';
                    this.matchDetailsRetrieved = true;
                    this.matchIdentifier = data.message[0].match_id;
                    resolve(data);
                }
            }, (err) => {
                reject(err);
            });
        });
    }

    updateMatchStatData(timeline: any) {
        let body = new FormData();
        // let dataToBeSent = {
        //     "referee_id": this.referreeDetails.profileId,
        //     "referee_khel_id": this.referreeDetails.uniqueId,
        //     "match_id": this.matchIdentifier,
        //     "timeline": timeline
        // };
        body.append('referee_id', this.referreeDetails.profileId);
        body.append('referee_khel_id', this.referreeDetails.uniqueId);
        body.append('match_id', this.matchIdentifier);
        body.append('timeline', JSON.stringify(timeline));
        console.log(timeline);
        const url = `${EndpointsEnum.GLOBAL_CORE_URL}ManageExternalMatches/stats_keeper_update`
        return new Promise((resolve, reject) => {
            this.http.post(url, body, {headers: this.headers}).subscribe((data: any) => {
                if(data.status === 'success') {
                    resolve(data);
                } else {
                    reject(data.message);
                }
            }, (err) => {
                reject(err);
            });
        });
    }

    getProfileDetails() {
        let body = new FormData();
        body.append('username', 'ref2@khelid.com');
        body.append('password', '123456');
        
        const url = `${EndpointsEnum.GLOBAL_CORE_URL}/ManageAuthentication/referee_login`;
        return new Promise((resolve, reject) => {
            this.sendRequest(url, body).subscribe((data: any) => {
                if(data.status === 'success') {
                    this.referreeDetails = data.message.USER_PROFILE_DATA;
                    resolve(data);
                }
            }, (err) => {
                reject(err);
            });
        });
    }

    sendRequest(url: string, body: any) {
        return this.http.post(url, body, {headers: this.headers});
    }
}
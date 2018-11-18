import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
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
    teamOneJersey: any;
    teamTwoJersey: any;

    constructor(private http: HttpClient) {
        this.headers = new HttpHeaders();
        this.headers.set('Content-Type', 'application/x-www-form-urlencoded');
        this.intializeValuesFromSession();
    }

    intializeValuesFromSession() {
        this.matchDetailsRetrieved = Boolean(sessionStorage.getItem('matchDetailsRetrieved'));
        if(this.matchDetailsRetrieved) {
            this.teamOneJersey = sessionStorage.getItem('teamOneJersey') ? sessionStorage.getItem('teamOneJersey') : undefined;
            this.teamTwoJersey = sessionStorage.getItem('teamTwoJersey') ? sessionStorage.getItem('teamTwoJersey') : undefined;
            this.referreeDetails = sessionStorage.getItem('referreeDetails') ? JSON.parse(sessionStorage.getItem('referreeDetails')) : undefined;
            this.matchDetails = sessionStorage.getItem('matchDetails') ? JSON.parse(sessionStorage.getItem('matchDetails')) : undefined;
            this.matchIdentifier = sessionStorage.getItem('matchIdentifier') ? sessionStorage.getItem('matchIdentifier') : undefined;
        }
    }

    setJerseyColors(color1, color2) {
        this.teamOneJersey = color1;
        this.teamTwoJersey = color2;
        sessionStorage.setItem('teamOneJersey', this.teamOneJersey);
        sessionStorage.setItem('teamTwoJersey', this.teamTwoJersey);
    }

    getMatchDetailsByID(matchId: any) {
        const body = new FormData();
        body.append('referee_id', 'PID01511');
        body.append('category', 'STATS');
        body.append('match_id', matchId);
        const url = `${EndpointsEnum.GLOBAL_CORE_URL}ManageMatches/getStatsMatchdata`;
        return new Promise((resolve, reject) => {
            this.sendRequest(url, body).subscribe((data: any) => {
                if (data) {
                    this.matchDetails = data.status !== 'error' ? data : '';
                    this.matchDetailsRetrieved = true;
                    this.matchIdentifier = data.message[0].match_id;
                    sessionStorage.setItem('matchDetails', JSON.stringify(this.matchDetails));
                    sessionStorage.setItem('matchIdentifier', this.matchIdentifier);
                    sessionStorage.setItem('matchDetailsRetrieved', String(this.matchDetailsRetrieved));
                    resolve(data);
                }
            }, (err) => {
                reject(err);
            });
        });
    }

    getIntialStatsData(matchId: any) {
        const body = new FormData();
        body.append('referee_id', 'PID01511');
        body.append('otp', matchId);
        const url = `${EndpointsEnum.GLOBAL_CORE_URL}ManageExternalMatches/get_stats_keeping_match`;
        return new Promise((resolve, reject) => {
            this.sendRequest(url, body).subscribe((data: any) => {
                if (data) {
                    resolve(data);
                }
            }, (err) => {
                reject(err);
            });
        });
    }

    updateMatchStatData(timelineData: any) {
        const body = new FormData();
        body.append('referee_id', this.referreeDetails.profileId);
        body.append('referee_khel_id', this.referreeDetails.uniqueId);
        body.append('match_id', this.matchIdentifier);
        Object.keys(timelineData).map((key) => {
            const keyTobeSet = 'timeline[' + key + ']';
            body.append(keyTobeSet, timelineData[key]);
        });
        const url = `${EndpointsEnum.GLOBAL_CORE_URL}ManageExternalMatches/stats_keeper_update`;
        return new Promise((resolve, reject) => {
            this.sendRequest(url, body).subscribe((data: any) => {
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
        const body = new FormData();
        body.append('username', 'ref2@khelid.com');
        body.append('password', '123456');
        const url = `${EndpointsEnum.GLOBAL_CORE_URL}/ManageAuthentication/referee_login`;
        return new Promise((resolve, reject) => {
            this.sendRequest(url, body).subscribe((data: any) => {
                if(data.status === 'success') {
                    this.referreeDetails = data.message.USER_PROFILE_DATA;
                    sessionStorage.setItem('referreeDetails', JSON.stringify(this.referreeDetails));
                    resolve(data);
                }
            }, (err) => {
                reject(err);
            });
        });
    }

    getMatchStatsData(teamId) {
        const body = new FormData();
        body.append('referee_id', this.referreeDetails.profileId);
        body.append('referee_khel_id', this.referreeDetails.uniqueId);
        body.append('match_id', this.matchIdentifier);
        body.append('team_id', String(teamId));

        const url = `${EndpointsEnum.GLOBAL_CORE_URL}/ManageExternalMatches/stats_keeper_stats`;
        return new Promise((resolve, reject) => {
            this.sendRequest(url, body).subscribe((data: any) => {
                if(data.status === 'success') {
                    resolve(data);
                }
            }, (err) => {
                reject(err);
            });
        });
    }

    undoStats() {
        const body = new FormData();
        body.append('referee_id', this.referreeDetails.profileId);
        body.append('referee_khel_id', this.referreeDetails.uniqueId);
        body.append('match_id', this.matchIdentifier);

        const url = `${EndpointsEnum.GLOBAL_CORE_URL}/ManageExternalMatches/stats_keeper_undo`;
        return new Promise((resolve, reject) => {
            this.sendRequest(url, body).subscribe((data: any) => {
                if(data.status === 'success') {
                    resolve(data);
                } else {
                    reject(data.status);
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

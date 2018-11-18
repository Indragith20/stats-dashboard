import { Injectable } from '@angular/core';
import { IPlayerList } from '../../models/playerList.interface';

@Injectable()
export class PlayerService {
    teamOnePlayersList: IPlayerList[];
    teamTwoPlayersList: IPlayerList[];

    setPlayersList(playerListOne: IPlayerList [], playerListTwo: IPlayerList[]): void {
        this.teamOnePlayersList = playerListOne;
        this.teamTwoPlayersList = playerListTwo;
    }

    // Change the First Parameter If required
    getPlayerName(teamID: string, playerId: string): string {
        let identifiedPlayer: IPlayerList;
        if(this.teamOnePlayersList[0].team_id === teamID) {
            identifiedPlayer = this.teamOnePlayersList.find(player => player.player_id === playerId);
        } else {
            identifiedPlayer = this.teamTwoPlayersList.find(player => player.player_id === playerId);
        }
        return identifiedPlayer ? identifiedPlayer.name : '';
    }

    getTeamName(teamID: string) {
        return this.teamOnePlayersList[0].team_id === teamID ? this.teamOnePlayersList[0].team_name
                                                             : this.teamTwoPlayersList[0].team_name;
    }

    getIcon(eventType) {
        switch(eventType) {
            case 'turnover':
                return '../../../assets/icons/travelling.png';
            case 'freethrow':
                return '../../../assets/icons/free throw.png';
            case 'two_points_made':
                return '../../../assets/icons/2 pointer.png';
            case 'three_points_made':
                return '../../../assets/icons/3 pointer.png';
            case 'foul':
                return '../../../assets/icons/intentional foul.png';
            case 'block':
                return '../../../assets/icons/blocking.png';
            case 'steal':
                return '../../../assets/icons/Steal.png';
            case 'free_throw_miss':
                return '../../../assets/icons/free throw miss.png';
            case 'two_points_miss':
                return '../../../assets/icons/3 point attempt.png';
            case 'three_points_made':
                return '../../../assets/icons/3 point attempt.png';
            default:
                return '../../../assets/icons/travelling.png';
        }
    }


}

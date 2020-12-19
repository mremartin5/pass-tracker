import { Component, OnInit } from '@angular/core';
import { Model } from '../model/model';

@Component({
  selector: 'app-new-player',
  templateUrl: './new-player.component.html',
  styleUrls: ['./new-player.component.scss']
})
export class NewPlayerComponent implements OnInit {

  timeStamp: number | undefined;
  duplicatePlayers: any[] = [];
  
  round: Round[] = [];
  evtLocation: string = '';
  evtType: string = 'Type';
  evtDesc: string = 'Desc';


  players: Player[] = [];
  customPlayer: string = '';
  selectPosition: string = 'Position';
  selectTeam: string = 'NEW ROUND - SELECT TEAM';
  alertMsg: string = '';
  startNewRound: boolean = true;
  enterInfo: boolean = false;
  beginRound: boolean = false;
  alertAddPlayer: boolean = false;
  customPlayers: boolean = false;
  toggleEditPosition: boolean = false;
  alertAddPlayerMsg: boolean = false;
  
  model: any = new Model();
  positions: any[] = this.model.positions;
  teams: any[] = this.model.teams;
  eventTypes: any[] = this.model.eventTypes;
  eventDescription: any[] = this.model.eventDescription;

  constructor() { }

  ngOnInit(): void { }

  selectedEventType(type: string) {
    this.evtType = type;
  }

  selectedEventDescription(type: string) {
    this.evtDesc = type;
  }

  enterEventInfo() {
    this.startNewRound = false;
    this.enterInfo = true;
    this.evtLocation = '';
    this.evtType = 'Type';
    this.evtDesc = 'Desc';
  }

  startOver() {
    this.players = [];
    this.startNewRound = true;
    this.enterInfo = false;
  }

  createNewRound(val: any) {
    if (val === 'customRound') {
      this.customPlayers = true;
      this.enterEventInfo();
    }
    else if (val === 'duplicateRound') {
      this.players = this.duplicatePlayers;
      this.players.forEach( (p) => {
        p.scores = [];
        p.avg = undefined;
      });
      this.customPlayers = false;
      this.enterInfo = true;
    }
    else if (val === 'startOver') {      
      this.startOver();
    }
    else { // using team data
      let selected = this.teams.find( (t) => t.name === val );
      this.players = selected.team;
      this.customPlayers = false;
      this.enterEventInfo();
    }
    this.customPlayer = '';
    this.selectPosition = 'Position';
    this.alertMsg = '';
    this.alertAddPlayer = false;
    this.beginRound = false;
  }

  isDone(val: boolean) {
    if (val) {
      this.startOver();
    }
    this.alertAddPlayer = false;
  }
  
  cancelButton() {
    this.alertAddPlayer = true;
    this.alertMsg = 'confirm cancel?';
  }

  addPlayer() {
    this.customPlayer = '';
    this.selectPosition = 'Position';
  }

  removePlayer(i: number) {
    this.players.splice(i, 1);
  }

  togglePosition() {
    this.toggleEditPosition =! this.toggleEditPosition;
  }

  editPlayerPosition(player: any, position: string) {
    console.log(player, position);
    player.position = position;
  }

  selectedPosition(p: string) {
    this.selectPosition = p;
    if ( p !== 'Position' ) {
      this.alertMsg = '';
      this.alertAddPlayer = false;
      this.alertAddPlayerMsg = false;
    }
  }

  onFocusPlayerInput() {
    this.alertMsg = '';
    this.alertAddPlayer = false;
    this.alertAddPlayerMsg = false;
  }

  addPlayerToArray(name: string, position: string) {
    if ( name === '' || !name ) {
      this.alertMsg = 'please add player name';
      this.alertAddPlayer = true;
      this.alertAddPlayerMsg = true;
    } else if ( position === 'Position' ) {
      this.alertMsg = 'please select position';
      this.alertAddPlayer = true;
      this.alertAddPlayerMsg = true;
    } else {
      this.players.push( { 'name': name, 'position': position, 'scores': [], 'avg': undefined } );
      this.customPlayer = '';
      this.selectPosition = 'Position';
    }
  }

  startTracking() {
    this.enterInfo = false;
    this.beginRound = true;
    this.duplicatePlayers = [...this.players];
  }

}

export interface Player {
  name: string;
  position: string;
  scores: number[];
  avg?: number;
}

export interface Round {
  evtLocation: string;
  evtType: string;
  evtDesc: string;
  players: any[];
}
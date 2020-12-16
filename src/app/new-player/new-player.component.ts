import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Model } from '../model/model';

@Component({
  selector: 'app-new-player',
  templateUrl: './new-player.component.html',
  styleUrls: ['./new-player.component.scss']
})
export class NewPlayerComponent implements OnInit {

  @Output() emPlayers: EventEmitter<any> = new EventEmitter<any>();
  @Output() emBeginRound: EventEmitter<boolean> = new EventEmitter<boolean>();

  timeStamp: number | undefined;
  duplicatePlayers: any[] = [];
  
  players: Player[] = [];
  newPlayer: string = '';
  selectPosition: string = 'Position';
  selectTeam: string = 'NEW ROUND - SELECT TEAM';
  alertMsg: string = '';
  startNewRound: boolean = true;
  enterInfo: boolean = false;
  beginRound: boolean = false;
  alertAddPlayer: boolean = false;
  
  model: any = new Model();
  positions: any[] = this.model.positions;
  teams: any[] = this.model.teams;

  constructor() { }

  ngOnInit(): void { }

  createNewRound(team: any) {
    if (team) {
      this.players = this.duplicatePlayers;
      this.players.forEach( (p) => {
        p.scores = [];
        p.avg = null;
      });
    } else if (!team) {
      this.players = [];
    } else {
      let selected = this.teams.find( (t) => t.name === team );
      this.players = selected.team;
    }
    this.newPlayer = '';
    this.selectPosition = 'Position';
    this.alertMsg = '';

    this.startNewRound = false;
    this.enterInfo = true;
    this.beginRound = false;
    this.alertAddPlayer = false;
  }

  isDone(val: boolean) {
    if (val) {
      this.players = [];
      this.startNewRound = true;
      this.enterInfo = false;
      this.beginRound = false;
    }
    this.alertAddPlayer = false;
  }
  
  cancelButton() {
    this.alertAddPlayer = true;
    this.alertMsg = 'confirm cancel?';
  }

  addPlayer() {
    this.newPlayer = '';
    this.selectPosition = 'Position';
  }

  removePlayer(i: number) {
    this.players.splice(i, 1);
  }

  selectedPosition(p: string) {
    this.selectPosition = p;
    if ( p !== 'Position' ) {
      this.alertMsg = '';
      this.alertAddPlayer = false;
    }
  }

  onFocusPlayerInput() {
    this.alertMsg = '';
    this.alertAddPlayer = false;
  }

  addPlayerToArray(name: string, position: string) {
    if ( name === '' || !name && position === 'Position' ) {
      this.alertMsg = 'please add player name and position';
      this.alertAddPlayer = true;
    } else if ( name === '' || !name ) {
      this.alertMsg = 'please add player name';
      this.alertAddPlayer = true;
    } else if ( position === 'Position' ) {
      this.alertMsg = 'please select position';
      this.alertAddPlayer = true;
    } else {
      this.players.push( { 'name': name, 'position': position, 'scores': [], 'avg': null } );
      this.newPlayer = '';
      this.selectPosition = 'Position';
    }
  }

  startTracking() {
    this.enterInfo = false;
    this.beginRound = true;
    this.duplicatePlayers = [...this.players];
    this.emPlayers.emit(this.players);
    this.emBeginRound.emit(true);
  }

}

export interface Player {
  name: string;
  position: string;
  scores: number[];
  avg: any
}


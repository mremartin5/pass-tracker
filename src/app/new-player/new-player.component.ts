import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-new-player',
  templateUrl: './new-player.component.html',
  styleUrls: ['./new-player.component.scss']
})
export class NewPlayerComponent implements OnInit {

  @Output() emPlayers: EventEmitter<any> = new EventEmitter<any>();
  @Output() emBeginRound: EventEmitter<boolean> = new EventEmitter<boolean>();

  positions: any[] = [ 'S', 'MB', 'OH', 'OPP', 'DS', 'L' ];
  timeStamp: number | undefined;
  duplicatePlayers: any[] = [];
  
  players: Player[] = [];
  
  newPlayer: string = '';
  selectPosition: string = 'Position';
  alertMsg: string = '';

  startNewRound: boolean = true;
  enterInfo: boolean = false;
  beginRound: boolean = false;
  alertAddPlayer: boolean = false;
  

  constructor() {}

  ngOnInit(): void {}

  createNewRound(players: boolean) {
    if (players) {
      this.players = this.duplicatePlayers;
      this.players.forEach( (p) => {
        p.scores = [];
        p.avg = null;
      });
    } else {
      this.players = [];
    }
    this.newPlayer = '';
    this.selectPosition = 'Position';
    this.alertMsg = '';

    this.startNewRound = false;
    this.enterInfo = true;
    this.beginRound = false;
    this.alertAddPlayer = false;
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

  closeAlert(type: string) {
    this.alertAddPlayer = false;
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


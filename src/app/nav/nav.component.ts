import { Component, OnInit } from '@angular/core';
// import { Model } from '../model/model';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  players: Player[] = [];
  scores: Score[] = [];
  totalScores: number = 0;
  newPlayer: string = '';
  selectPosition: string = 'Position';
  positions: any[] = [ 'S', 'MB', 'OH', 'OPP', 'DS', 'L' ];
  alertAddPlayer: boolean = false;
  alertMsg: string = '';
  toggleAddPlayer: boolean = false;
  teamAvg: number | undefined;

  addPlayer() {
    this.toggleAddPlayer = true;
    this.selectPosition = 'Position';
  }

  selectedPosition(p: string) {
    this.selectPosition = p;
    if ( p !== 'Position' ) {
      this.alertMsg = '';
      this.alertAddPlayer = false;
    }
  }

  closeaAlertAddPlayer() {
    this.alertAddPlayer = false;
  }

  onFocusPlayerInput() {
    this.alertMsg = '';
    this.alertAddPlayer = false;
  }

  addPlayerToArray(name: string, position: string) {
    if ( name === '' || !name ) {
      this.alertMsg = 'please add player name';
      this.alertAddPlayer = true;
    } else if ( position === 'Position' ) {
      this.alertMsg = 'please select position';
      this.alertAddPlayer = true;
    } else {
      this.players.push( { 'name': name, 'position': position, 'scores': [], 'avg': null } );
      if ( this.players.length ) {
        this.toggleAddPlayer = false;
      }
    }
    this.newPlayer = '';
  }

  updateAvg(scores: any) {
    let length = scores.length;
    let sum = scores.reduce( (total: number, current: number) => total + Number(current), 0 );
    let avg = sum / length;
    return avg;
  }

  updateScores(score: any) {
    this.scores.push( score );
    this.totalScores = this.totalScores + score.score;
    this.teamAvg = this.totalScores / this.scores.length;
  }

  undoPass() {
    // remove last score object, set it as variable
    let lastPlay: any = this.scores.pop();
    let lastScore: number = lastPlay.score;
    let lastPlayer: string = lastPlay.name;
    // remove last player score in their array, update avg
    let lastPlayerScore: any = this.players.find( (p) => p.name === lastPlayer );
    lastPlayerScore.scores.pop();
    lastPlayerScore.avg = this.updateAvg(lastPlayerScore.scores);
    // subtract totalScore with score, update totalScores
    this.totalScores = this.totalScores - lastScore;
    this.teamAvg = this.totalScores / this.scores.length;
  }
  
}

export interface Player {
  name: string;
  position: string;
  scores: number[];
  avg: any
}

export interface Score {
  name: string;
  score: number;
}
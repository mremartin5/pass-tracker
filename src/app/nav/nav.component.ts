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
  selectPositionTitle: string = 'Position';
  positions: any[] = [ 'S', 'MB', 'OH', 'OPP', 'DS', 'L' ];
  alertNoPosition: boolean = false;
  toggleAddPlayer: boolean = false;
  teamAvg: number | undefined;

  selectedPosition(p: string) {
    this.selectPositionTitle = p;
    if ( p !== 'Position' ) {
      this.alertNoPosition = false;
    }
  }

  closeAlertNoPosition() {
    this.alertNoPosition = false;
  }

  addPlayer() {
    this.toggleAddPlayer = true;
    this.selectPositionTitle = 'Position';
  }

  addPlayerToArray(name: string, position: string) {
    if ( position === 'Position' ) {
      console.log('select position');
      this.alertNoPosition = true;
    } else {
      this.players.push( { 'name': name, 'position': position, 'scores': [], 'avg': null } );
      if ( this.players.length ) {
        this.toggleAddPlayer = false;
      }
    } 
  }

  updateScores(score: any) {
    this.scores.push( score );
    this.totalScores = this.totalScores + score.score;
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
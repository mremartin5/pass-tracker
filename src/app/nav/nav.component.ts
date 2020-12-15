import { Component, HostListener, OnInit } from '@angular/core';
// import { Model } from '../model/model';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {

  positions: any[] = [ 'S', 'MB', 'OH', 'OPP', 'DS', 'L' ];
  timeStamp: number | undefined;
  duplicatePlayers: any[] = [];
  showCopied: boolean = false;
  
  players: Player[] = [];
  scores: Score[] = [];

  totalScores: number = 0;
  teamAvg: number | undefined;
  newPlayer: string = '';
  selectPosition: string = 'Position';
  alertMsg: string = '';

  startNewRound: boolean = true;
  enterInfo: boolean = false;
  beginRound: boolean = false;
  alertAddPlayer: boolean = false;
  alertConfirmDone: boolean = false;
  displayFinalOutput: boolean = false;

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
    
    this.scores = [];

    this.totalScores = 0;
    this.teamAvg = undefined;
    this.newPlayer = '';
    this.selectPosition = 'Position';
    this.alertMsg = '';

    this.startNewRound = false;
    this.enterInfo = true;
    this.beginRound = false;
    this.alertAddPlayer = false;
    this.alertConfirmDone = false;
    this.displayFinalOutput = false;
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
    switch (type) {
      case 'player': {
        this.alertAddPlayer = false;
        break;
      }
      case 'done': {
        this.alertConfirmDone = false;
        break;
      }
      default: {
        break;
      }
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

  doneScoring() {
    this.alertMsg = 'all done?';
    this.alertConfirmDone = true;
  }

  isDone(done: boolean) {
    if (done) {
      let now: number = Date.now();
      this.timeStamp = now;
      this.displayFinalOutput = true;
    }
    this.alertConfirmDone = false;
  }

  copyFinalScores() {
    let textarea = document.createElement('textarea') as HTMLTextAreaElement;
    textarea.id = 'temp_element';
    textarea.style.height = '';
    document.body.appendChild(textarea);
    let allScores: any = document.getElementById('finalScores')?.innerText;
    textarea.value = allScores;
    let selector: any = document.querySelector('#temp_element');
    selector.select();
    document.execCommand('copy');
    document.body.removeChild(textarea);
    this.showCopied = true;
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
import { Component, Input, Output, OnInit, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {

  @Input() players: any;
  @Input() alertAddPlayer: any;
  @Output() cancelButton = new EventEmitter();
  @Output() createNewRound = new EventEmitter<boolean>();

  scores: Score[] = [];
  totalScores: number = 0;
  teamAvg: number | undefined;
  alertMsg: string = '';
  alertConfirmDone: boolean = false;
  timeStamp: number | undefined;
  displayFinalOutput: boolean = false;
  showCopied: boolean = false;

  constructor() {}

  ngOnInit(): void {}

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
    let lastPlayerScore: any = this.players.find( (p:any) => p.name === lastPlayer );
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

  newRound(type: boolean) {
    this.createNewRound.emit(type);
  }

  cancelRound() {
    this.cancelButton.emit();
  }
  
}

export interface Score {
  name: string;
  score: number;
}
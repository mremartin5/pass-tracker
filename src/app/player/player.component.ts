import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.scss']
})
export class PlayerComponent implements OnInit {

  @Input() player: any;
  @Output() updateScores = new EventEmitter<{name: string, score: number}>();
  viewDetails: boolean = false;

  constructor() { }

  ngOnInit() {
  }

  updateAvg(scores: any) {
    let length = scores.length;
    let sum = scores.reduce((total: number, current: number) => total + Number(current), 0);
    let avg = sum / length;
    return avg;
  }

  update(player: string, score: number) {
    this.player.scores.push( score );
    this.player.avg = this.updateAvg(this.player.scores);
    this.updateScores.emit( {'name': player, 'score': score} );
  }

  playerDetails() {
    this.viewDetails =! this.viewDetails;
  }

}

import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.scss']
})
export class PlayerComponent implements OnInit {

  @Input() player: any;
  @Input() updateAvg: any;
  @Output() updateScores = new EventEmitter<{name: string, score: number}>();

  viewDetails: boolean = false;

  constructor() { }

  ngOnInit() { }

  update(player: string, score: number) {
    this.player.scores.push(score);
    this.player.avg = this.updateAvg(this.player.scores);
    this.updateScores.emit( {'name': player, 'score': score} );
  }

  playerDetails() {
    this.viewDetails =! this.viewDetails;
  }

  playerHeat(val: number) {
    if ( val <= 1.25 ) {
      return 'alert-success';
    }
    if ( val > 1.25 && val < 2 ) {
      return 'alert-warning';
    }
    if ( val >= 2 && val <= 3 ) {
      return 'alert-danger';
    }
    return 'playerRowBkgd';
  }

}

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

}

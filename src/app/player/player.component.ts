import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.scss']
})
export class PlayerComponent implements OnInit {

  @Input() player: any;
  @Output() updatePlayersArray: EventEmitter<[any]> = new EventEmitter<any>();
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

  update(score: any) {
    this.player.scores.push( parseInt(score) );
    this.player.avg = this.updateAvg(this.player.scores);
    this.updatePlayersArray.emit(this.player);
  }

  playerDetails() {
    this.viewDetails =! this.viewDetails;
  }

}

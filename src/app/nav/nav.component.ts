import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  players: any[] = [];
  toggleAddPlayer: boolean = false;
  teamAvg: number | undefined;

  addPlayer() {
    this.toggleAddPlayer = true;
  }

  addPlayerToArray(name: string) {
    this.players.push( { 'name': name, 'scores': [], 'avg': null } );
    if ( this.players.length ) {
      this.toggleAddPlayer = false;
    }
  }

  updatePlayers(player: any) {
    let totalPoints: number = 0;
    let totalPasses: number = 0;
    this.players.forEach( (p) => {
      totalPasses = totalPasses + p.scores.length;
      totalPoints = totalPoints + p.scores.reduce( (a: number, b: number) => a + b, 0);
    });
    this.teamAvg = (totalPoints / totalPasses);
  }

}

import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';

@Component({
  selector: 'c1-ngconf-app-team-a-component-one',
  template: `
    <p>TEAM A - Component One "teamAState: {{ teamA$ | async | json }}", "teamBState: {{ teamB$ | async | json }}"</p>
  `,
  styles: [
    `:host { display: block; margin: 40px; padding: 20px; color: #444; }`
  ]
})
export class TeamAComponentOneComponent implements OnInit {
  teamA$ = this.store.pipe(select('teamA'));
  teamB$ = this.store.pipe(select('teamB'));

  constructor(private store: Store<any>) {}

  ngOnInit() {
    this.teamA$.subscribe(teamAState => {
      console.log('TEAM A - Component One', 'teamAState', teamAState);
    });

    this.teamB$.subscribe(teamBState => {
      console.log('TEAM A - Component One', 'teamBState', teamBState);
    });
  }
}

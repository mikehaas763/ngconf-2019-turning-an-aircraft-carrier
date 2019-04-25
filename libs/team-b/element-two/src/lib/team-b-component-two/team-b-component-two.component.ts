import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';

@Component({
  selector: 'c1-ngconf-app-team-b-component-two',
  template: `
    <p>TEAM B - Component Two "teamBState: {{ teamB$ | async | json }}"</p>
  `,
  styles: [
    `:host { display: block; margin: 40px; padding: 20px; color: #444; }`
  ]
})
export class TeamBComponentTwoComponent implements OnInit {
  teamB$ = this.store.pipe(select('teamB'));

  constructor(private store: Store<any>) {}

  ngOnInit() {
    this.teamB$.subscribe(teamBState => {
      console.log('TEAM B', 'teamBState', teamBState);
    });

    setTimeout(() => {
      console.log('TEAM B', 'dispatch toggle action');
      this.store.dispatch({ type: 'TOGGLE' });
    }, 10000);
  }
}

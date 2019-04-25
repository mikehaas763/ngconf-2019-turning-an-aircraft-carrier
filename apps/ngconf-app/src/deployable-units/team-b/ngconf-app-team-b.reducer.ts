import { Action } from '@ngrx/store';

export interface State {
  teamB: boolean;
}

export const initialState: State = {
  teamB: true
};

export function reducer(state = initialState, action: Action): State {
  switch (action.type) {
    case 'TOGGLE':
      return {
        ...state,
        teamB: !state.teamB
      };
    default:
      return state;
  }
}

import { Action } from '@ngrx/store';

export interface State {
  teamA: boolean;
}

export const initialState: State = {
  teamA: true
};

export function reducer(state = initialState, action: Action): State {
  switch (action.type) {
    case 'TOGGLE':
      return {
        ...state,
        teamA: !state.teamA
      };
    default:
      return state;
  }
}

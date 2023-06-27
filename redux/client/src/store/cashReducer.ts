interface State {
  cash: number;
}
const ADD_CASH: string = "ADD_CASH";
const GET_CASH: string = "GET_CASH";


interface Action {
  type: ActionTypes;
  payload: number;
}

export const defaultStore: State = {
  cash: 0,
}

type ActionTypes = typeof ADD_CASH | typeof GET_CASH;

export const cashReducer = (
  state: State = defaultStore,
  action: Action
): State => {
  switch(action.type) {
    case ADD_CASH:
      return {...state, cash: state.cash + action.payload}
    case GET_CASH:
      return {...state, cash: state.cash - action.payload}
    default:
      return state;
  }
}

export const addCashAction = (payload: number): Action => ({
  type: ADD_CASH,
  payload
})

export const getCashAction = (payload: number): Action => ({
  type: GET_CASH,
  payload
})

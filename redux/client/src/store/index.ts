import { combineReducers, createStore } from 'redux'
import { composeWithDevTools } from '@redux-devtools/extension'

import { cashReducer } from './cashReducer'
import { customerReducer } from './customerReducer'

const rootReucer = combineReducers({
  cash: cashReducer,
  customers: customerReducer,
})

export const store = createStore(rootReucer, composeWithDevTools())
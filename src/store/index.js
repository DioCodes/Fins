import { combineReducers } from 'redux';
import { budgetReducer } from './reducers/budgetReducer';

export const rootReducer = combineReducers({
  budget: budgetReducer
});

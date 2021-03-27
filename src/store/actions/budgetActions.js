import { SET_BUDGET, ADD_BUDGET_GROUP, REMOVE_BUDGET_GROUP } from '../types';

export const setBudget = (budget) => {
  return {
    type: SET_BUDGET,
    payload: budget
  }
};

export const addBudgetGroup = (name, percent) => {
  return {
    type: ADD_BUDGET_GROUP,
    groupName: name,
    groupPercent: percent,
  }
};
export const removeBudgetGroup = () => {
  return {
    type: REMOVE_BUDGET_GROUP,
  }
};
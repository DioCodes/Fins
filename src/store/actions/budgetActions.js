import { SET_BUDGET, ADD_BUDGET_GROUP, REMOVE_BUDGET_GROUP, CHANGE_BUDGET_GROUP } from '../types';

export const setBudget = (budget) => {
  return {
    type: SET_BUDGET,
    payload: budget
  }
};

export const addBudgetGroup = (name, percent, id) => {
  return {
    type: ADD_BUDGET_GROUP,
    groupName: name,
    groupPercent: percent,
    groupId: id
  }
};

export const changeBudgetGroup = (name, percent, id) => {
  return {
    type: CHANGE_BUDGET_GROUP,
    groupName: name,
    groupPercent: percent,
    groupId: id
  }
};

export const removeBudgetGroup = (id) => {
  return {
    type: REMOVE_BUDGET_GROUP,
    groupId: id
  }
};
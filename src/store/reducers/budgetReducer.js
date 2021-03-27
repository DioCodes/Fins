import { ADD_BUDGET_GROUP, SET_BUDGET, REMOVE_BUDGET_GROUP, CHANGE_BUDGET_NAME } from "../types";

const INITIAL_STATE = {
  budget: 500,
  budgetGroups: [],
};

export const budgetReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SET_BUDGET:
      return {
        ...state,
        budget: action.payload
      };
    case ADD_BUDGET_GROUP:
      return {
        ...state,
        budgetGroups: [
          ...state.budgetGroups,
          {
            name: action.groupName,
            percent: action.groupPercent
          }
        ]
      };
    case CHANGE_BUDGET_NAME:
      return {

      };
    case REMOVE_BUDGET_GROUP:
      return {
        ...state,
        budgetGroups: INITIAL_STATE.budgetGroups
      };
    default:
      return state;
  }
}

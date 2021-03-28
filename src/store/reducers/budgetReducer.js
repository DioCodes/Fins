import { ADD_BUDGET_GROUP, SET_BUDGET, REMOVE_BUDGET_GROUP, CHANGE_BUDGET_GROUP } from "../types";

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
            id: action.groupId,
            name: action.groupName,
            percent: action.groupPercent
          }
        ]
      };
    case CHANGE_BUDGET_GROUP:
      return {
        ...state,
        budgetGroups: state.budgetGroups.map(group => 
          group.id === action.groupId ? { 
            ...group, 
            name: action.groupName, 
            percent: action.groupPercent 
          } : group
      )
      };
      case REMOVE_BUDGET_GROUP:
      return {
        ...state,
        budgetGroups: state.budgetGroups.filter((group) => {
          return group.id !== action.groupId;
        }),
      };
    default:
      return state;
  }
}

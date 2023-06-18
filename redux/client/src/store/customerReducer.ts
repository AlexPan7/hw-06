interface Customer {
  id: number;
}

interface State {
  customers: Customer[];
}

interface Action {
  type: ActionTypes;
  payload: Customer | number;
}

type ActionTypes = typeof ADD_CUSTOMER | typeof REMOVE_CUSTOMER;

export const defaultStore = {
  customers: [],
};

const ADD_CUSTOMER: string = "ADD_CUSTOMER";
const REMOVE_CUSTOMER: string = "REMOVE_CUSTOMER";

export const customerReducer = (state: State = defaultStore, action: Action): State => {
  switch (action.type) {
    case ADD_CUSTOMER:
      return { ...state, customers: [...state.customers, action.payload as Customer] };
    case REMOVE_CUSTOMER:
      return {
        ...state,
        customers: state.customers.filter(
          (customer: Customer) => customer.id !== action.payload
        ),
      };
    default:
      return state;
  }
};

export const addCustomerAction = (payload: Customer): Action => ({
  type: ADD_CUSTOMER,
  payload
})

export const removeCustomerAction = (payload: number): Action => ({
  type: REMOVE_CUSTOMER,
  payload
})

import { MenuItem, OrderItem } from "../types";

export type OrderActions =
  | { type: "add-item"; payload: { item: MenuItem } }
  | { type: "remove-item"; payload: { id: MenuItem["id"] } }
  | { type: "place-order" }
  | { type: "add-tip"; payload: { value: number } };

export type OrderState = {
  order: OrderItem[];
  tip: number;
};

export const initialState: OrderState = {
  order: [],
  tip: 0,
};

export const orderReducer = (
  state: OrderState = initialState,
  action: OrderActions
) => {
  let order: OrderItem[] = state.order;
  switch (action.type) {
    case "add-item":
      const itemExist = state.order.find(
        (orderItem) => orderItem.id === action.payload.item.id
      );

      if (itemExist) {
        order = state.order.map((orderItem) =>
          orderItem.id === itemExist.id
            ? { ...orderItem, quantity: itemExist.quantity + 1 }
            : orderItem
        );
      } else {
        order = [...order, { ...action.payload.item, quantity: 1 }];
      }

      return {
        ...state,
        order,
      };
    case "remove-item":
      order = state.order.filter(
        (orderItem) => orderItem.id !== action.payload.id
      );
      return {
        ...state,
        order,
      };
    case "place-order":
      return {
        ...state,
        order: [],
        tip: 0,
      };
    case "add-tip":
      return {
        ...state,
        tip: action.payload.value,
      };

    default:
      throw new Error("Invalid Action");
  }
};

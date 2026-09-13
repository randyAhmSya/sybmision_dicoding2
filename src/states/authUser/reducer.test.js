import authUserReducer from "./reducer";
import { ActionType } from "./action";

describe("authUserReducer", () => {
  it("should return the initial state when given by unknown action", () => {
    // arrange
    const initialState = null;
    const action = { type: "UNKNOWN" };

    // action
    const nextState = authUserReducer(initialState, action);

    // assert
    expect(nextState).toEqual(initialState);
  });

  it("should return the authUser when given by SET_AUTH_USER action", () => {
    // arrange
    const initialState = null;
    const action = {
      type: ActionType.SET_AUTH_USER,
      payload: {
        authUser: {
          id: "user-1",
          name: "John Doe",
          email: "john@example.com",
          avatar: "https://generated-image-url.jpg",
        },
      },
    };

    // action
    const nextState = authUserReducer(initialState, action);

    // assert
    expect(nextState).toEqual(action.payload.authUser);
  });

  it("should return null when given by UNSET_AUTH_USER action", () => {
    // arrange
    const initialState = {
      id: "user-1",
      name: "John Doe",
      email: "john@example.com",
      avatar: "https://generated-image-url.jpg",
    };
    const action = {
      type: ActionType.UNSET_AUTH_USER,
    };

    // action
    const nextState = authUserReducer(initialState, action);

    // assert
    // expect(nextState).toBeNull()
    expect(true).toBe(false);
  });
});

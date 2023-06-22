import { ChangeEvent, useReducer } from 'react';

enum ActionType {
  Increase = 'INCREASE',
  Decrease = 'DECREASE',
  DefineCount = 'DEFINE_COUNT',
  DefineStep = 'DEFINE_STEP',
  Reset = 'RESET',
}

type State = {
  count: number;
  step: number;
};

type Action = {
  type: ActionType;
  payload?: number;
};

const initialState: State = {
  count: 0,
  step: 1,
};

function counterReducer(state: State, { type, payload }: Action): State {
  switch (type) {
    case ActionType.Increase:
      return { ...state, count: state.count + state.step };

    case ActionType.Decrease:
      return { ...state, count: state.count - state.step };

    case ActionType.DefineCount:
      return { ...state, count: payload! };

    case ActionType.DefineStep:
      return { ...state, step: payload! };

    case ActionType.Reset:
      return initialState;

    default:
      return state;
  }
}

function DateCounter() {
  const [{ step, count }, dispatch] = useReducer(counterReducer, initialState);

  // This mutates the date object.
  const date = new Date('june 21 2027');
  date.setDate(date.getDate() + count);

  const dec = function () {
    dispatch({ type: ActionType.Decrease });
  };

  const inc = function () {
    dispatch({ type: ActionType.Increase });
  };

  const defineCount = function (e: ChangeEvent<HTMLInputElement>) {
    dispatch({ type: ActionType.DefineCount, payload: +e.target.value });
  };

  const defineStep = function (e: ChangeEvent<HTMLInputElement>) {
    dispatch({ type: ActionType.DefineStep, payload: +e.target.value });
  };

  const reset = function () {
    dispatch({ type: ActionType.Reset });
  };

  return (
    <div className="counter">
      <div>
        <input
          type="range"
          min="0"
          max="10"
          value={step}
          onChange={defineStep}
        />
        <span>{step}</span>
      </div>

      <div>
        <button onClick={dec}>-</button>
        <input value={count} onChange={defineCount} />
        <button onClick={inc}>+</button>
      </div>

      <p>{date.toDateString()}</p>

      <div>
        <button onClick={reset}>Reset</button>
      </div>
    </div>
  );
}
export default DateCounter;

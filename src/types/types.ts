/////////////////////////////////////////////
// Quiz object from API

export interface IQuestion {
  question: string;
  options: string[];
  correctOption: number;
  points: number;
}

/////////////////////////////////////////////
// Quiz Reducer

export enum StatusType {
  Loading = 'loading',
  Error = 'error',
  Ready = 'ready',
  Active = 'active',
  Finished = 'finished',
}

export enum ActionType {
  DataReceived = 'DATA_RECEIVED',
  DataFailed = 'DATA_FAILED',
  Start = 'START',
  NewAnswer = 'NEW_ANSWER',
  NextQuestions = 'NEXT_QUESTION',
  Finish = 'FINISH',
  Restart = 'RESTART',
  Tick = 'TICK',
}

export type Quiz = {
  questions: IQuestion[];
  status: StatusType;
  index: number;
  answer: null | number;
  points: number;
  highScore: number;
  secondsRemaining: number | null;
};

export type Action =
  | {
      type: ActionType.DataReceived;
      payload: IQuestion[];
    }
  | {
      type: ActionType.NewAnswer;
      payload: number;
    }
  | {
      type: ActionType.DataFailed;
    }
  | {
      type: ActionType.Start;
    }
  | {
      type: ActionType.NextQuestions;
    }
  | {
      type: ActionType.Finish;
    }
  | {
      type: ActionType.Restart;
    }
  | {
      type: ActionType.Tick;
    };

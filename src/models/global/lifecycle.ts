import { RootState } from "types/store";
import { IDispatch } from "concent";
import { test } from "./reducer";

type GlobalState = RootState["$$global"];

export function initState(): Partial<GlobalState> {
  return {
    gAddr: { no: 22, comment: "33", recordTime: 2222, isValid: true },
    packages: [2, 3, 46]
  };
}

export function initStateDone(dispatch: IDispatch, moduleState: GlobalState) {
  dispatch(test);
}

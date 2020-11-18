import { RootState, AC } from "types/store";

type GlobalState = RootState["$$global"];
type IAC = AC<"$$global">;

// copy me
// export function aReducerFn(p: any, m: GlobalState, ac: IAC) {}

export function test(p: any, m: GlobalState) {
  console.log("trigger test", m);
}

export function changeKey1(
  gAddr: GlobalState["gAddr"],
  moduleState: GlobalState,
  ac: IAC
) {
  return { gAddr };
}

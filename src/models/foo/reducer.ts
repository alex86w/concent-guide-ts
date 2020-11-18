import { RootState, AC } from "types/store";
import * as timer from "utils/timer";

type FooState = RootState["foo"];
type IAC = AC<"foo">;

async function doSomethingOther() {}

export function addOneItem(payload: any, moduleState: FooState) {
  const { addrList } = moduleState;
  addrList.push({
    no: Date.now(),
    comment: "test",
    recordTime: 1338888555521,
    isValid: true
  });
  return { addrList };
}

export async function delOneItem(payload: any, moduleState: FooState) {
  const { addrList } = moduleState;
  await doSomethingOther();
  addrList.splice(0, 1);
  return { addrList };
}

export function changeKey1(fooKey1: string, moduleState: FooState) {
  return { fooKey1: fooKey1 + Date.now() };
}

export async function changeKey1Twice(
  fooKey1: string,
  moduleState: FooState,
  ac: IAC
) {
  await ac.setState({ fooKey1 });
  await timer.delay(2000);
  return { fooKey1: fooKey1 + moduleState.fooKey2 + Date.now() };
}

import { RootState } from "types/store";
import getRootState from "base/getRootState";

type BarState = RootState["bar"];

export function notB2(n: BarState) {
  return !n.b2;
}

export function crossMod(n: BarState) {
  console.log(`${n.factor} change`);
  const { $$global } = getRootState();
  return `${n.b1} - ${$$global.token}`;
}

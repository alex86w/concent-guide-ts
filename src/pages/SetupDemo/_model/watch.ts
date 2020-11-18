import { defWatch, IFnCtx, ICtxBase } from "concent";
import { RootState, RootComputed } from "types/store";

type St = RootState["SetupDemo"];
type Cu = RootComputed["SetupDemo"];
type FnCtx = IFnCtx<ICtxBase, St, Cu>;

// if you want to customize watch options, use defWatch
// replace export function books(){}

export const books = defWatch<St, FnCtx>(
  ({ books }, _, fnCtx) => {
    console.log("books.length ", books.length);
    if (books.length > 5) {
      fnCtx.commitCu({ invalidBookCount: 3 * Math.ceil(Math.random() * 8) });
    } else if (books.length > 10) {
      fnCtx.commitCu({ invalidBookCount: 100 });
    }
  },
  { compare: false, immediate: true }
);

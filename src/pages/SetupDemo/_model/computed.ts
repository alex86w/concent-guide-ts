import { BookCu } from "types/biz";
import { RootState } from "types/store";
import { defComputed, defComputedVal } from "concent";

type SetupDemoState = RootState["SetupDemo"];

export function books({ books }: SetupDemoState): BookCu[] {
  return books.map((v) => {
    const clonedV = { ...v } as BookCu;
    clonedV._publishTimeLabel = new Date(v.publishTime).toLocaleString();
    return clonedV;
  });
}

export const val2 = defComputed(() => {
  return "gogogo";
}, []);

// define s static computed value, then change this in watch process
export const invalidBookCount = defComputedVal(0);

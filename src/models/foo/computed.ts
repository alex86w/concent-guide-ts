import { defComputed, defComputedVal } from "concent";
import { RootState } from "types/store";

type FooState = RootState["foo"];

export function addrValidCount({ addrList }: FooState) {
  console.log("--->", addrList);
  return "ssss";
}

// export const addrValidCount = defComputed<FooState, string>(({ addrList }) => {
//     console.log("--->", addrList);
//     return 'ssss';
//   }
// );

export const addrValidCount2 = defComputed(
  (_) => {
    return "ssss";
  },
  ["addrList"]
);

export const addrValidCount3 = {
  fn: () => {
    return `www ${Date.now()}`;
  },
  depKeys: ["addrList"]
};

export const aa = defComputedVal(22);

export const lazyOne = defComputed(() => 2, { depKeys: [], lazy: true });

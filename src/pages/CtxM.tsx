import * as React from "react";
import { register } from "concent";
import useC2Module from "base/useC2Module";
import { CtxM, RootState } from "types/store";

type FooState = RootState["foo"];

class CtxMPage extends React.Component<{}, FooState> {
  ctx = {} as CtxM<{}, "foo">;
  render() {
    const { mr, moduleComputed, state } = this.ctx;
    return (
      <div>
        <div>{moduleComputed.addrValidCount}</div>
        <div>{moduleComputed.addrValidCount3}</div>
        <button onClick={mr.addOneItem}>add</button>
        <button onClick={mr.delOneItem}>del</button>
        {state.addrList.map((v, i) => (
          <div key={i}>{v.no}</div>
        ))}
      </div>
    );
  }
}
export default register("foo")(CtxMPage);

export function Demo() {
  const ctx = useC2Module("foo");

  return (
    <div>
      <button onClick={ctx.mr.addOneItem}>add</button>
      <button onClick={ctx.mr.delOneItem}>del</button>
      <div>{ctx.moduleComputed.addrValidCount}</div>
      <div>{ctx.moduleComputed.addrValidCount3}</div>
      {ctx.state.addrList.map((v, i) => (
        <div key={i}>{v.no}</div>
      ))}
    </div>
  );
}

/**
 * 此页面演示属于某个模块，并扩展了私有状态，且连接其他多个模块的组件如何定义类型
 */
import * as React from "react";
import { useConcent, NoMap, SettingsType } from "concent";
import { CtxMSConn, ItemsType, RootState } from "types/store";

const iState = () => ({
  name: "zk",
  age: 21
});
const connect = ["bar"] as const;

type St = ReturnType<typeof iState>;
type Conn = ItemsType<typeof connect>;
type CtxPre = CtxMSConn<{}, "foo", St, Conn>;
type PrivSt = ReturnType<typeof iState>;

const setup = (ctx: CtxPre) => {
  ctx.effect((ctx: Ctx) => {
    ctx.settings.changeName("did_mount name");
  }, []);

  return {
    changeName: ctx.sync("name"),
    changeAge: ctx.sync("age"),
    changeFooKey1: ctx.sync("foo/fooKey1"),
    // give fooKey3 will be wrong
    changeFooKey2: (e: any) => ctx.setState({ fooKey2: e.target.value }),
    changeKey1: () => ctx.mr.changeKey1("xxx"),
    changeKey1Twice: () => ctx.mr.changeKey1Twice("twice"),
    toggleBar2: ctx.syncBool("bar/b2")
  };
};

type Ctx = CtxMSConn<{}, "foo", St, Conn, SettingsType<typeof setup>>;

export default function() {
  const ctx = useConcent<{}, Ctx, NoMap, RootState, "foo", PrivSt>({
    module: "foo",
    state: iState(),
    setup,
    connect,
  });
  const { state, connectedState, connectedComputed, settings } = ctx;
  const { bar } = connectedState;
  // ctx.globalState.gAddr

  return (
    <div>
      <div>
        <input value={state.name} onChange={settings.changeName} />
      </div>
      <div>
        <input value={state.age} onChange={settings.changeAge} />
      </div>
      <div>name: {state.name}</div>
      <div>age: {state.age}</div>
      <div>foo.fooKey1: {state.fooKey1}</div>
      <div>foo.fooKey2: {state.fooKey2}</div>
      <div>
        changeFooKey2 :{" "}
        <input value={state.fooKey2} onChange={settings.changeFooKey2} />
      </div>
      <div>bar.b1: {bar.b1}</div>
      <div>bar.b2: {bar.b2 + ""}</div>
      <button onClick={settings.toggleBar2}>toggleBar2</button>
      <div>bar.notB2: {connectedComputed.bar.notB2 + ""}</div>
      <button onClick={settings.changeKey1}>changeKey1</button>
      <button onClick={settings.changeKey1Twice}>changeKey1Twice</button>
    </div>
  );
}

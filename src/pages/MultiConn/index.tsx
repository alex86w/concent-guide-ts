/**
 * 此页面演示连接多个模块的组件如何定义类型
 */
import * as React from "react";
import { useConcent, NoMap, SettingsType } from "concent";
import { CtxSConn, ItemsType, RootState } from "types/store";

const iState = () => ({
  name: "zk",
  age: 21
});
const connect = ["bar", "foo"] as const;

type St = ReturnType<typeof iState>;
type Conn = ItemsType<typeof connect>;
type CtxPre = CtxSConn<{}, St, Conn>;

const setup = (ctx: CtxPre) => {
  ctx.effect((ctx: Ctx) => {
    ctx.settings.changeName("did_mount name");
  }, []);

  return {
    changeName: ctx.sync("name"),
    changeAge: ctx.sync("age"),
    changeFooKey1: ctx.sync("foo/fooKey1"),
    // give fooKey3 will be wrong
    changeFooKey2: (e: any)=> ctx.setModuleState<RootState, 'foo'>('foo', {fooKey2:e.target.value}),
    changeKey1: ()=> ctx.cr.foo.changeKey1('xxx'),
    changeKey1Twice: ()=> ctx.cr.foo.changeKey1Twice('twice'),
    toggleBar2: ctx.syncBool('bar/b2'),
  };
};

type Ctx = CtxSConn<{}, St, Conn, SettingsType<typeof setup>>;

export default function() {
  const ctx = useConcent<{}, Ctx, NoMap>({ state: iState, setup, connect });
  const { state, connectedState, connectedComputed, settings } = ctx;
  const { foo, bar } = connectedState;
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
      <div>foo.fooKey1: {foo.fooKey1}</div>
      <div>foo.fooKey2: {foo.fooKey2}</div>
      <div>changeFooKey2 : <input value={foo.fooKey2} onChange={settings.changeFooKey2}/></div>
      <div>bar.b1: {bar.b1}</div>
      <div>bar.b2: {bar.b2 + ''}</div>
      <button onClick={settings.toggleBar2}>toggleBar2</button>
      <div>bar.notB2: {connectedComputed.bar.notB2 + ""}</div>
      <button onClick={settings.changeKey1}>changeKey1</button>
      <button onClick={settings.changeKey1Twice}>changeKey1Twice</button>
    </div>
  );
}

/**
 * 测试之用
 */
import * as React from 'react';
import { useConcent, NoMap, SettingsType, IFnCtx, ComputedValType } from 'concent';
import { CtxDeS } from "types/store";

const iState = ()=>({
  name: 'zk',
  age: 21,
});
type St = ReturnType<typeof iState>;

type FnCtx = IFnCtx<Ctx>;
// 计算描述对象，这样写可以将computed剥离到setup体外，同时也方便集中求类型
const cuDesc = {
  name(n:St){
    return 'new_' + n.name;
  },
  fullInfo(n:St){
    return n.age + '__' + n.name;
  },
  name2:{
    fn(n:St){
      return 2222222;
    },
    depKeys:['name'],//人工声明依赖（不推荐）
  },
  funnyRet(n:St, o:St, f:FnCtx){
    return `current_ins_key_${f.refCtx.ccUniqueKey}`;
  },
  funnyRet2:{
    fn(n:St, o:St, f:FnCtx){
      const cuVal = f.cuVal as CuVal;
      const na = cuVal.name;
      return `current_ins_key_${f.refCtx.ccUniqueKey}__${na}_${Date.now()}`;
    },
    depKeys:['name'],//这里故意声明依赖是name，name变了都要重算funnyRet2
  },
}
declare type CuVal = ComputedValType<typeof cuDesc>

const setup = (ctx:CtxDeS)=>{
  ctx.computed(cuDesc);
  return {
    changeName: ctx.sync('name'),
    changeAge: ctx.sync('age'),
  }
}

type Ctx = CtxDeS<{}, St, SettingsType<typeof setup>, ComputedValType<typeof cuDesc>>;

export default function(){
  const { state, refComputed, settings } = useConcent<{}, Ctx, NoMap>({state:iState, setup});
  // ctx.state.
  // ctx.refComputed.name
  return (
    <div>
      <div><input value={state.name} onChange={settings.changeName}/></div>
      <div><input value={state.age} onChange={settings.changeAge}/></div>
      <div>name: {state.name}</div>
      <div>age: {state.age}</div>
      <div>fullInfo: {refComputed.fullInfo}</div>
      <div>cu_name: {refComputed.name}</div>
      <div>cu_name2: {refComputed.name2}</div>
      <div>funnyRet: {refComputed.funnyRet}</div>
      <div>funnyRet2: {refComputed.funnyRet2}</div>
    </div>
  );
}




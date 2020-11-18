/**
 * 此页面演示如何为实例计算定义类型
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
      return `current_ins_key_${f.refCtx.ccUniqueKey}_${Date.now()}`;
    },
    depKeys:['name'],//这里故意声明依赖是name，只要name变了就重算funnyRet2
  },
}

const setup = (ctx:CtxDeS)=>{
  ctx.computed(cuDesc);

  // 当在回调里使用ctx时，是已经有了settings的，可以单独赋值一个rctx(renderedCtx)来使用
  // 确保这个变量只能在回调里使用！！！
  const rctx = ctx as Ctx;

  // 写法1，使用外部重新赋上类型的rctx
  ctx.effect(()=>{
    rctx.settings.changeAge('did_mount age')
  }, []);

  // 写法2，使用回调透传的ctx，对其单独赋上类型
  ctx.effect((ctx: Ctx)=>{
    ctx.settings.changeName('did_mount name')
  }, []);

  return {
    changeName: ctx.sync('name'),
    changeAge: ctx.sync('age'),
  }
}

// 另一种写法，不通过settings去调用changeName changeAge
// 而是内部提前声明好，etx.effect回调里直接调用即可
const setup2 = (ctx:CtxDeS)=>{
  ctx.computed(cuDesc);
  const changeName = ctx.sync('name');
  const changeAge = ctx.sync('name');

  ctx.effect(()=>{
    changeAge('did_mount age')
  }, []);

  ctx.effect((ctx: Ctx)=>{
    changeName('did_mount name')
  }, []);

  return {
    changeName,
    changeAge,
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




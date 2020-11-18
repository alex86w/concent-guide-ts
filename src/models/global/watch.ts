import { defWatch, setState } from "concent";

export const anyChange = defWatch(() => {
  setTimeout(() => {
    setState("bar", { factor: Date.now() }); // 修改b模块这个值，触发b模块的相关的对b有依赖的计算函数执行
  }, 0); // 放事件循环下一轮执行，确保globalState保存store执行完毕，b模块那里获取时是最新的
}, "*");

/**
 * 将类型推导过程收敛起来，适用于简答的使用方式，如无需定义setup的场景
 */
import { useConcent } from "concent";
import { CtxM, Modules } from "../types/store";

/**
 * 函数组件使用某个模块
 * @param moduleName
 */
export default function useC2Module<T extends Modules>(moduleName: T) {
  type Ctx = CtxM<{}, typeof moduleName>;
  return useConcent(moduleName) as Ctx;
}

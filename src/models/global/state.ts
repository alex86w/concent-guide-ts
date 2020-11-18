import { Address } from "types/biz";

export function getInitialState(){
  return {
    token : 'xxxToken',
    gAddr: {} as Address,
    packages: [] as number[],
  }
}

export default getInitialState()
import { Address } from "types/biz";

export function getInitialState(){
  return {
    fooKey1: '__',
    fooKey2: '_',
    addrList: [] as Address[],
  }
}

export default getInitialState()
import { getState } from "concent";
import { RootState } from "types/store";

export default function () {
  return getState() as RootState;
}

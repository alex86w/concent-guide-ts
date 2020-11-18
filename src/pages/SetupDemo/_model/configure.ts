import { configure } from "concent";
import model from "./index";
import * as objUtil from "utils/obj";

const pair = objUtil.getOneKeyValPair(model);
console.log(`configure ${pair.key} module`);
configure(pair.key, pair.value);

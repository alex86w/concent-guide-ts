import state from "./state";
import * as reducer from "./reducer";
import * as computed from "./computed";
import * as watch from "./watch";

// type T = typeof computed;

export default {
  SetupDemo: { state, reducer, computed, watch }
};

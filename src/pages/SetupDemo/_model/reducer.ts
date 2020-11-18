import * as bookServ from "services/book";
import { IActionCtx } from "concent";
import { RootState, RootComputed } from "types/store";

type St = RootState["SetupDemo"];
type Ac = IActionCtx<RootState, RootComputed, "SetupDemo">;

export async function getBooks(_: {}, moduleState: St, action: Ac) {
  await action.setState({ loading: true, books: [] });
  const { data: books } = await bookServ.getBooks();
  return { books, loading: false };
}

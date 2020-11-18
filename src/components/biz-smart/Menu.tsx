import { SettingsType, registerHookComp, NoMap } from "concent";
import * as React from "react";
import { history } from "react-router-concent";

import * as bizCst from "base/constant/biz";

import "./Menu.css";
import Menu from "../dumb/Menu";
import Button from "../dumb/Button";
import { CtxDeS } from 'types/store';
import ccReducer from 'base/ccReducer';

const { Label, List, ListItem } = Menu;
const btnIs = ["small", "info"];

const state = {
  visible: false,
  activeKeys: []
};
type St = typeof state;

const setup = (ctx:CtxDeS) => {
  ctx.on("openMenu", () => {
    ctx.setState({ visible: true });
  });
  return {
    handleMenuClick: (key:string) => {
      ctx.setState({ activeKeys: [key] });
      if(key === 'callCcReducer'){
        alert('call ccReducer.bar.f1()');
        ccReducer.foo.changeKey1('xx');
        return;
      }
      history.push(key);
    }
  };
};

type Ctx = CtxDeS<{}, St, SettingsType<typeof setup>>
const render = (ctx:Ctx) => {
  console.log("%c Menu", "color:green;");
  if (!ctx.state.visible) return "";

  return (
    <div className="ccMenu">
      <Button
        className="ccMenuCloseBtn"
        onClick={ctx.syncBool("visible")}
        bulmaIs={btnIs}
      >
        close
      </Button>
      <Menu
        activeKeys={ctx.state.activeKeys}
        onClick={ctx.settings.handleMenuClick}
      >
        <Label>code snippet</Label>
        <List>
          <ListItem key="/setup-demo">show setup</ListItem>
          <ListItem key="/ref-cu-demo">show ref computed</ListItem>
          <ListItem key="/multi-conn">show multi conn</ListItem>
          <ListItem key="/module-multi-conn">show module st conn</ListItem>
          <ListItem key={`${bizCst.PAGE_REF_MODULE_CONN}`}>show module conn</ListItem>
          <ListItem key={`${bizCst.PAGE_REF_MODULE}`}>show module</ListItem>
        </List>
        <Label>ref api course</Label>
        <List>
          <ListItem key="api_1">setState</ListItem>
          <ListItem key="api_2">dispatch</ListItem>
          <ListItem key="api_3">invoke</ListItem>
          <ListItem key="api_4">setup</ListItem>
          <ListItem key="callCcReducer">call ccReducer</ListItem>
        </List>
      </Menu>
    </div>
  );
};

export default registerHookComp<{},Ctx,NoMap,St>({
  state,
  setup,
  render
});

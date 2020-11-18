import * as React from "react";
import { emit } from "concent";
import "reactbulma";
import "bulma/css/bulma.css";
import "App.css";
import { HashRouter, Switch, Route } from "react-router-dom";
import { ConnectRouter } from "react-router-concent";
import Button from "components/dumb/Button";
import NotFound from "components/dumb/NotFound";
import Menu from "components/biz-smart/Menu";
import Header from "components/biz-smart/Header";
import SetupDemo from "pages/SetupDemo";
import RefCuDemo from "pages/RefCuDemo";
import MultiConn from "pages/MultiConn";
import CtxMSConnPage from "pages/CtxMSConn";
import CtxMConnPage from "pages/CtxMConn";
import CtxMPage from "pages/CtxM";
import * as bizCst from "base/constant/biz";

const { PAGE_SETUP_DEMO, PAGE_REF_CU_DEMO, PAGE_REF_MULTI_CONN, PAGE_REF_MODULE_MULTI_CONN } = bizCst;

class Layout extends React.Component {
  state = {
    visible: false
  };
  openMenu = () => {
    emit("openMenu");
  };
  openRecordLogDrawer = () => {
    this.setState({ visible: true });
  };
  render() {
    return (
      <div>
        <Button
          bulmaIs={["small", "info"]}
          onClick={this.openMenu}
          className="cc_openMenuBtn"
        >
          open menu
        </Button>
        <Header />
        <div className="box">
          <Switch>
            <Route exact path="/" component={SetupDemo} />
            <Route path={PAGE_SETUP_DEMO} component={SetupDemo} />
            <Route path={PAGE_REF_CU_DEMO} component={RefCuDemo} />
            <Route path={PAGE_REF_MULTI_CONN} component={MultiConn} />
            <Route path={PAGE_REF_MODULE_MULTI_CONN} component={CtxMSConnPage} />
            <Route path={bizCst.PAGE_REF_MODULE_CONN} component={CtxMConnPage} />
            <Route path={bizCst.PAGE_REF_MODULE} component={CtxMPage} />
            <Route component={NotFound} />
          </Switch>
        </div>
        <Menu />
      </div>
    );
  }
}

export default () => (
  <HashRouter>
    <ConnectRouter>
      <Route path="/" component={Layout} />
    </ConnectRouter>
  </HashRouter>
);

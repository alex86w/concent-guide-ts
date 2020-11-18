import * as React from "react";
import "./_model/configure";
import { useConcent } from "concent";
import FnDemo from "./FnDemo";
import ClassDemo from "./ClazzDemo";
import { Tabs } from "reactbulma";
import TabItem from "components/dumb/TabItem";
import { CtxDeS } from "types/store";

const makeTabActiveStatus = () => ({ clazz: false, fn: false });
type Status = keyof ReturnType<typeof makeTabActiveStatus>;

const state = () => {
  const tab_isActive_ = makeTabActiveStatus();
  const activeTab = "fn";
  tab_isActive_[activeTab] = true;
  return { tab_isActive_, activeTab };
};

type CtxPre = CtxDeS<{}, ReturnType<typeof state>>;

export const setup = (ctx: CtxPre) => {
  return {
    // changeActiveTab: (e: React.MouseEvent<HTMLElement>) => {
    changeActiveTab: (e: React.SyntheticEvent<HTMLElement, Event>) => {
      const activeTab = e.currentTarget.dataset.tabName as Status;
      if (activeTab) {
        const tab_isActive_ = makeTabActiveStatus();
        tab_isActive_[activeTab] = true;
        ctx.setState({ tab_isActive_, activeTab });
      }
    }
  };
};

type Ctx = CtxDeS<{}, ReturnType<typeof state>, ReturnType<typeof setup>>;

export default React.memo(function () {
  const ctx = useConcent<{}, Ctx>({ setup, state });
  const { changeActiveTab } = ctx.settings;
  const { tab_isActive_, activeTab } = ctx.state;

  return (
    <>
      <Tabs toggle fullwidth>
        <ul>
          <TabItem
            isActive={tab_isActive_.fn}
            label="fn component"
            tabName="fn"
            onClick={changeActiveTab}
          />
          <TabItem
            isActive={tab_isActive_.clazz}
            label="class component"
            tabName="clazz"
            onClick={changeActiveTab}
          />
        </ul>
      </Tabs>
      {activeTab === "fn" ? (
        <FnDemo renderBy="fn" />
      ) : (
        <ClassDemo renderBy="class" />
      )}
    </>
  );
});

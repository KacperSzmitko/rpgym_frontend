import React from "react";
import { useAppSelector } from "../state/hooks";
import Listing from "./Listing";
import { ActionType } from "../state/action-types/mainTypes";
import TrainModuleMemo from "./TrainModule";
export default function ModulesListing() {
  const modulesInfo = useAppSelector((state) => state.main.train_modules_info);
  const modules = useAppSelector((state) =>
    state.main.train_modules
  );
  return (
    <div>
      <Listing
        listInfo={modulesInfo}
        itemsData={modules}
        itemComponent={TrainModuleMemo}
        action={ActionType.GET_NEXT_TRAIN_MODULES}
        path="app/train_module/"
      />
    </div>
  );
}

import React from "react";
import { useAppSelector } from "../state/hooks";
import Listing from "./Listing";
import { getTrainModules } from "../state/actions/mainActions";
import TrainModule from "./TrainModule";

export default function ModulesListing() {
  const modulesInfo = useAppSelector((state) => state.main.train_modules_info);
  const modules = useAppSelector((state) =>
    state.main.train_modules
  );
  return (
    <div>
      <Listing
        listInfo={modulesInfo}
        fetchFunction={getTrainModules}
        itemsData={modules}
        itemComponent={TrainModule}
      />
    </div>
  );
}

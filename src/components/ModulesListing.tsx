import {useAppSelector } from "../state/hooks";
import Listing from "./Listing";
import { ActionType } from "../state/action-types/mainTypes";
import TrainModuleMemo from "./TrainModuleItem";
import CreateTrainModule from "./CreateTrainModule";

export default function ModulesListing() {
  const modulesInfo = useAppSelector((state) => state.main.train_modules_info);
  const modules = useAppSelector((state) => state.main.train_modules);

  return (
    <div>
      <CreateTrainModule />
      <Listing
        listInfo={modulesInfo}
        itemsData={modules}
        itemComponent={TrainModuleMemo}
        fetchAction={ActionType.GET_NEXT_TRAIN_MODULES}
        path="app/train_module/"
      />
    </div>
  );
}

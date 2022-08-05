import { useAppSelector } from "../../common/hooks";
import Listing from "../../common/Listing";
import TrainModuleMemo from "./TrainModuleItem";
import CreateTrainModule from "./CreateTrainModule";
import { nextModulesFetched } from "./trainModuleSlice";

export default function ModulesListing() {
  const modulesInfo = useAppSelector(
    (state) => state.trainModuleSlice.train_modules_info
  );
  const modules = useAppSelector(
    (state) => state.trainModuleSlice.train_modules
  );

  return (
    <div>
      <CreateTrainModule />
      <Listing
        listInfo={modulesInfo}
        itemsData={modules}
        itemComponent={TrainModuleMemo}
        fetchAction={nextModulesFetched}
        path="app/train_module/"
      />
    </div>
  );
}

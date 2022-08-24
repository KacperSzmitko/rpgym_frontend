import { useAppDispatch, useAppSelector } from "../../common/hooks";
import Listing from "../../common/Listing";
import TrainModuleMemo from "./TrainModuleItem";
import CreateTrainModule from "./CreateTrainModule";
import {
  moduleCreationStatusChanged,
  nextModulesFetched,
} from "./trainModuleSlice";
import EditTrainModule from "./EditTrainModule";

export default function ModulesListing() {
  const modulesInfo = useAppSelector(
    (state) => state.trainModuleSlice.train_modules_info
  );
  const modules = useAppSelector(
    (state) => state.trainModuleSlice.train_modules
  );
  const editingActive = useAppSelector(
    (state) => state.trainModuleSlice.editing_module_id !== 0
  );
  const creationActive = useAppSelector(
    (state) => state.trainModuleSlice.module_creation_active
  );
  const dispach = useAppDispatch();


  return creationActive ? (
    <div>
      <CreateTrainModule />

    </div>
  ) : editingActive ? (
    <div>
      <EditTrainModule />
      
    </div>
  ) : (
    <div>
      <Listing
        listInfo={modulesInfo}
        itemsData={modules}
        itemComponent={TrainModuleMemo}
        fetchAction={nextModulesFetched}
        path="app/train_module/"
      />
      <button onClick={() =>dispach(moduleCreationStatusChanged(true))}>Stwórz moduł</button>
    </div>
  );
}

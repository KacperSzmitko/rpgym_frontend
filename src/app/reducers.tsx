import { combineReducers } from "redux";
import musclePartsSlice from "../features/muscleParts/musclePartsSlice";
import exercisesSlice from "../features/exercises/exercisesSlice";
import muscleLevelsSlice from "../features/muscleLevels/muscleLevelsSlice";
import planSlice from "../features/plans/planSlice";
import trainModuleSlice from "../features/trainModules/trainModuleSlice";
import userInfoSlice from "../features/userInfo/userInfoSlice";

export default combineReducers({
  musclePartsSlice,
  exercisesSlice,
  muscleLevelsSlice,
  planSlice,
  trainModuleSlice,
  userInfoSlice,
});

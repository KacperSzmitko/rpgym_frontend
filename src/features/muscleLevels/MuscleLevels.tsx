import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../common/hooks";
import { getMuscleLevels } from "./actions";
import MuscleLevel from "./MuscleLevel";
import { MuscleLevelType } from "./muscleLevelsSlice";

export default function MuscleLevels() {
  const dispach = useAppDispatch();
  const muscleLevels = useAppSelector((state) => state.muscleLevelsSlice.muscles_levels);

  useEffect(() => {
    if (muscleLevels.length === 0) {
      dispach(getMuscleLevels());
    }
  }, []);

  return (
    <div>
      {muscleLevels.map((muslce: MuscleLevelType, index: number) => (
        <MuscleLevel muscle={muslce} key={index} />
      ))}
    </div>
  );
}

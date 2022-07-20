import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../state/hooks";
import { getMuscleLevels } from "../state/actions/mainActions";
import MuscleLevel from "./MuscleLevel";
import { MuscleLevelType } from "../state/action-types/mainTypes";

export default function MuscleLevels() {
  const dispach = useAppDispatch();
  const muscleLevels = useAppSelector((state) => state.main.muscles_levels);

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

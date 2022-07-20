import React, { useEffect, useState } from "react";
import TrainModule from "./TrainModule";
import { useAppDispatch } from "../state/hooks";
import { useAppSelector } from "../state/hooks";
import { getTrainModules } from "../state/actions/mainActions";
import { TrainModuleType } from "../state/action-types/mainTypes";

export default function TrainModules() {
  const dispach = useAppDispatch();
  const modulesInfo = useAppSelector((state) => state.main.train_modules_info);
  const modules = useAppSelector((state) =>
    state.main.train_modules
      .slice(
        modulesInfo.current_page * modulesInfo.modules_per_page,
        (modulesInfo.current_page + 1) * modulesInfo.modules_per_page
      )
      .map((train_module: TrainModuleType) => {})
  );

  useEffect(() => {
    if (modules.length === 0) {
      dispach(getTrainModules(true));
    }
  }, []);

  return (
    <div>
      <div>
        {modulesInfo.previous !== null ? (
          <button
            onClick={() =>
              dispach(getTrainModules(false, modulesInfo.previous))
            }
          >
            Poprzednie
          </button>
        ) : null}
      </div>
      <div>
        {modules.map((module: TrainModuleType, index: number) => (
          <TrainModule module={module} key={index} />
        ))}
      </div>
      <div>
        {modulesInfo.next !== null ? (
          <button
            onClick={() => dispach(getTrainModules(false, modulesInfo.next))}
          >
            Następne
          </button>
        ) : null}
      </div>
    </div>
  );
}

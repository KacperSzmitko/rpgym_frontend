import React from "react";
import { planEditionStatusChanged, PlanType } from "./planSlice";
import { TrainModuleType } from "../trainModules/trainModuleSlice";
import { planDeleted, planCacheUpdated, nextPlanPageSet } from "./planSlice";
import { useAppDispatch } from "../../common/hooks";
import { deleteListItem } from "../../common/actions";

export type PropsType = {
  data: PlanType;
  next: string;
};


export function PlanItem({ data, next }: PropsType) {
  const dispach = useAppDispatch();
  return (
    <div id="">
      {data.id}
      {data.name}
      {data.cycle}
      {data.modules.map((val: TrainModuleType, index) => (
        <div key={index}>{val.name}</div>
      ))}
      <button
        onClick={() =>
          dispach(
            deleteListItem(
              planDeleted,
              planCacheUpdated,
              nextPlanPageSet,
              "app/plan",
              next,
              data.id
            )
          )
        }
      >
        Usuń
      </button>
      <button onClick={() => dispach(planEditionStatusChanged(data.id))}>
        Edytuj
      </button>
    </div>
  );
}

const PlanItemMemo = React.memo(PlanItem);
export default PlanItemMemo;

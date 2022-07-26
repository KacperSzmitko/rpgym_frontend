import React, { useEffect } from "react";
import {
  ActionType,
  PlanType,
  TrainModuleType,
} from "../state/action-types/mainTypes";
import { deleteListItem } from "../state/actions/mainActions";
import { useAppDispatch, useAppSelector } from "../state/hooks";

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
              ActionType.DELETE_PLAN,
              ActionType.UPDATE_PLAN_CACHE,
              ActionType.UPDATE_PLAN_PAGE,
              "app/plan",
              next,
              data.id
            )
          )
        }
      >
        Usuń
      </button>
    </div>
  );
}

const PlanItemMemo = React.memo(PlanItem);
export default PlanItemMemo;

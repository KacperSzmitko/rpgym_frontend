import React, { useEffect, useState } from "react";
import { useAppDispatch } from "./hooks";
import { PlanType } from "../features/plans/planSlice";
import { TrainModuleType } from "../features/trainModules/trainModuleSlice";
import { ListingInfo } from "./types";
import {getNextListItems} from "./actions"

interface PropsType<T> {
  listInfo: ListingInfo;
  itemsData: TrainModuleType[] | PlanType[];
  itemComponent: React.ComponentType<T> | React.ElementType;
  fetchAction: any;
  path: string;
}

export default function Listing<T>(props: PropsType<T>) {
  const [currentPage, setCurrentPage] = useState(0);
  const dispach = useAppDispatch();
  const items = props.itemsData.slice(
    currentPage * props.listInfo.items_per_page,
    (currentPage + 1) * props.listInfo.items_per_page
  );

  useEffect(() => {
    // On mount fetch two pages
    if (currentPage === 0 && props.listInfo.count === -1) {
      dispach(
        getNextListItems(props.fetchAction, props.path, props.listInfo, true)
      );
    }
  }, []);

  useEffect(() => {
    // After delete if there is no left items on page
    if (currentPage !== 0 && items.length === 0){
      setCurrentPage(currentPage - 1);
    }
    // Always try to fetch one page ahead
    else if(props.listInfo.last_cached_page === currentPage && props.listInfo.next !== null && currentPage !== 0){
      dispach(
        getNextListItems(
          props.fetchAction,
          props.path,
          props.listInfo,
          false,
          props.listInfo.next
        )
      );
    }
  }, [items]);

  async function getNextModules() {
    if (
      (currentPage + 1) * props.listInfo.items_per_page >=
      props.itemsData.length
    ) {
      // Fetch next page
      const status = await dispach(
        getNextListItems(
          props.fetchAction,
          props.path,
          props.listInfo,
          false,
          props.listInfo.next
        )
      );
      if (status === 200) {
        setCurrentPage(currentPage + 1);
      }
      // TODO Report error
    } else {
      // Next page is in cache
      setCurrentPage(currentPage + 1);
    }
  }
  return (
    <div>
      <div>
        {currentPage !== 0 ? (
          <button onClick={() => setCurrentPage(currentPage - 1)}>
            Poprzednie
          </button>
        ) : null}
      </div>
      <div>
        {items.map((module, index: number) => (
          <props.itemComponent data={module} next={props.listInfo.next} key={index} />
        ))}
      </div>
      <div>
        {(props.listInfo.next === null &&
          (currentPage + 1) * props.listInfo.items_per_page >= props.itemsData.length) ? null : (
          <button onClick={() => getNextModules()}>Następne</button>
        )}
      </div>
    </div>
  );
}

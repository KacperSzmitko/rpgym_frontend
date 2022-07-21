import React, { useEffect, useState } from "react";
import { useAppDispatch } from "../state/hooks";
import { ListingInfo, TrainModuleType } from "../state/action-types/mainTypes";
import { Action } from "../state/action-types/mainTypes";
import { ThunkAction } from "redux-thunk";
import { RootState } from "../state/store";

type fetchFunction = (
  init?: boolean,
  page_url?: string | null,
  page_size?: number | null
) => ThunkAction<number| any, RootState, unknown, Action>;

interface PropsType<T> {
  fetchFunction: fetchFunction;
  listInfo: ListingInfo;
  itemsData: TrainModuleType[];
  itemComponent: React.ComponentType<T> | React.ElementType;
}

export default function Listing<T>(props: PropsType<T>) {
  const [currentPage, setCurrentPage] = useState(0);
  const dispach = useAppDispatch();
  const items = props.itemsData.slice(
    currentPage * props.listInfo.items_per_page,
    (currentPage + 1) * props.listInfo.items_per_page
  );

  useEffect(() => {
    if (currentPage === 0) {
      dispach(props.fetchFunction(true));
    }
  }, []);

  useEffect(() => {
    // After delete if there is no left items on page
    if (currentPage !== 0 && items.length === 0){
      setCurrentPage(currentPage - 1);
    }
    // Always try to fetch one page ahead
    else if(props.listInfo.last_cached_page === currentPage && props.listInfo.next !== null && currentPage !== 0){
      dispach(props.fetchFunction(false, props.listInfo.next));
    }
  }, [items]);

  async function getNextModules() {
    if (
      (currentPage + 1) * props.listInfo.items_per_page >=
      props.itemsData.length
    ) {
      // Fetch next page
      const status = await dispach(
        props.fetchFunction(false, props.listInfo.next)
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
        {items.map((module: TrainModuleType, index: number) => (
          <props.itemComponent data={module} key={index} />
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

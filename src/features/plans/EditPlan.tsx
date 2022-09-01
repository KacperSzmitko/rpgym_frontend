import React, { useMemo, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../common/hooks";
import { createPlan } from "./actions";
import { planEditionStatusChanged } from "./planSlice";

export default function EditPlan() {
  const editingPlanId = useAppSelector(
    (state) => state.planSlice.editing_plan_id
  );
  const selectedPlan = useAppSelector((state) =>
    state.planSlice.plans.find((plan) => plan.id == editingPlanId)
  );
  const [name, setName] = useState(selectedPlan!.name);
  const [selectedModules, setSelectedModules] = useState<number[]>(
    selectedPlan!.modules.map((module) => module.id)
  );
  const [cycle, setCycle] = useState<number | null>(selectedPlan!.cycle);
  const avaliableModules = useAppSelector(
    (state) => state.trainModuleSlice.train_modules
  );
  const avaliableMuscleParts = useAppSelector(
    (state) => state.musclePartsSlice.muscles_parts
  );
  const [selectedMuscleParts, setSelectedMuscleParts] = useState<number[]>(
    () => selectedPlan!.modules.map((module) => {
      let x = avaliableModules.find((mod) => mod.id === module.id);
      let y = avaliableMuscleParts.find((muscle) => muscle.id === x!.muscle_part_id);
        if (y) {
            return y.id
        }
        return 0
    })
  );
  const dispach = useAppDispatch();
  function submitPlan(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (name === "") {
      return;
    }
    let modulesToCreate: number[] = [];
    if (selectedModules.length === 0) {
      return;
    } else {
      for (let i = 0; i < selectedMuscleParts.length; i++) {
        if (selectedMuscleParts[i] !== 0 && selectedModules[i] === 0) {
          return;
        }
        if (selectedMuscleParts[i] === 0 && selectedModules[i] === 0) {
          continue;
        }
        if (selectedMuscleParts[i] === 0 && selectedModules[i] !== 0) {
          continue;
        }
        modulesToCreate.push(selectedModules[i]);
      }
    }
    let data = { name: name, modules: modulesToCreate, cycle: cycle };
    dispach(createPlan(data));
  }

  function addModule() {
    setSelectedMuscleParts([...selectedMuscleParts, 0]);
    setSelectedModules([...selectedModules, 0]);
  }

  function deleteModule(index: number) {
    setSelectedMuscleParts(selectedMuscleParts.filter((val, i) => i !== index));
    setSelectedModules(selectedModules.filter((val, i) => i !== index));
  }

  return (
    <div>
      <form action="" onSubmit={(e) => submitPlan(e)}>
        <div>
          <div>
            Nazwa
            <input
              type="text"
              onChange={(e) => setName(e.target.value)}
              value={name}
            />
          </div>
          <div>
            Number cyklu
            <input
              type="number"
              name=""
              id=""
              onChange={(e) => setCycle(Number(e.target.value))}
              value={cycle === null ? 0 : cycle}
            />
          </div>

          {selectedModules.map((id: number, index: number) => (
            <div key={index}>
              <select
                name=""
                id=""
                onChange={(e) => {
                  setSelectedMuscleParts(
                    selectedMuscleParts.map((oldMusclePart, i) =>
                      i === index ? Number(e.target.value) : oldMusclePart
                    )
                  );
                }}
                value={selectedMuscleParts[index]}
              >
                <option value={0}></option>
                {avaliableMuscleParts.map((muscle, index) => (
                  <option key={index} value={muscle.id}>
                    {" "}
                    {muscle.name}
                  </option>
                ))}
              </select>

              <select
                name=""
                id=""
                disabled={selectedMuscleParts[index] === 0}
                onChange={(e) => {
                  setSelectedModules(
                    selectedModules.map((value, i) =>
                      i === index ? Number(e.target.value) : value
                    )
                  );
                }}
                value={selectedModules[index]}
              >
                <option value={0}></option>
                {avaliableModules
                  .filter(
                    (mod) => mod.muscle_part_id === selectedMuscleParts[index]
                  )
                  .map((module, i) => (
                    <option value={module.id} key={i}>
                      {module.name}
                    </option>
                  ))}
              </select>
              <button onClick={() => deleteModule(index)}>Usuń</button>
            </div>
          ))}

          <button type="button" onClick={() => addModule()}>
            Dodaj moduł
          </button>

          <input type="submit" value="Stwórz plan" />
        </div>
      </form>

      <button onClick={() => dispach(planEditionStatusChanged(0))}>
        Wyjdź
      </button>
    </div>
  );
}

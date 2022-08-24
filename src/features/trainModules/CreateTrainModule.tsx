import React, { useState } from "react";
import { useAppDispatch, useAppSelector } from "../../common/hooks";
import { ExcerciseType } from "../exercises/exercisesSlice";
import { MusclePartType } from "../muscleParts/musclePartsSlice";
import { createListItem } from "../../common/actions";
import { moduleCreated, moduleCreationStatusChanged } from "./trainModuleSlice";

export default function CreateTrainModule() {
  const dispach = useAppDispatch();
  const musclesParts = useAppSelector(
    (state) => state.musclePartsSlice.muscles_parts
  );
  const [selectedMuscleId, setselectedMuscleId] = useState(0);
  const exercises = useAppSelector((state) =>
    state.exercisesSlice.exercises.filter(
      (exercise: ExcerciseType) => exercise.muscle_part === selectedMuscleId
    )
  );
  const [selectedExerciseId, setselectedExerciseId] = useState(0);
  const [name, setName] = useState("");
  const [series, setSeries] = useState(0);
  const [weight, setWeight] = useState(0);
  const [levelWeightInc, setLevelWeightInc] = useState(0.0);
  const [reps, setReps] = useState<Number[]>([]);

  function parseReps(e: React.ChangeEvent<HTMLInputElement>) {
    setReps(e.target.value.split(",").map((rep) => Number(rep)));
  }

  function createModule(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (name === "") {
      return;
    }
    if (series === 0) {
      return;
    }
    if (weight === 0) {
      return;
    }
    if (levelWeightInc === 0) {
      return;
    }
    if (reps.length === 0) {
      return;
    }
    dispach(
      createListItem("app/train_module/", moduleCreated, {
        name: name,
        exercise: selectedExerciseId,
        series: series,
        weight: weight,
        level_weight_increase: levelWeightInc,
        reps: reps,
      })
    );
  }

  return (
    <div>
      <form action="" onSubmit={(e) => createModule(e)}>
        <div>
          <select
            name=""
            id=""
            onChange={(e) => setselectedMuscleId(Number(e.target.value))}
          >
            <option value={0}></option>
            {musclesParts.map((muscle: MusclePartType, index: number) => (
              <option key={index} value={muscle.id}>
                {muscle.name}
              </option>
            ))}
          </select>
        </div>
        <div>
          <select
            name=""
            id=""
            disabled={selectedMuscleId === 0}
            onChange={(e) => setselectedExerciseId(Number(e.target.value))}
          >
            <option value={0}></option>
            {exercises.map((exercise: ExcerciseType, index: number) => (
              <option key={index} value={exercise.id}>
                {exercise.name}
              </option>
            ))}
          </select>
        </div>
        <div>
          Nazwa
          <input
            type="text"
            name="name"
            id="name"
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div>
          Serie
          <input
            type="number"
            name="series"
            id=""
            onChange={(e) => setSeries(Number(e.target.value))}
          />
        </div>
        <div>
          Waga
          <input
            type="number"
            name="weight"
            id=""
            onChange={(e) => setWeight(Number(e.target.value))}
          />
        </div>
        <div>
          Wzrost
          <input
            type="text"
            name="level_weight_increase"
            id=""
            onChange={(e) => setLevelWeightInc(Number(e.target.value))}
          />
        </div>
        <div>
          Powtórzenia
          <input type="text" name="reps" id="" onChange={(e) => parseReps(e)} />
        </div>
        <input type="submit" value="Zapisz" />
      </form>
      <button onClick={() => dispach(moduleCreationStatusChanged(false))}>
        Wyjdź
      </button>
    </div>
  );
}

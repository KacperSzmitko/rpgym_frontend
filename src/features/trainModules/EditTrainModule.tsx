import React, { useState } from "react";
import { useAppDispatch, useAppSelector } from "../../common/hooks";
import { ExcerciseType } from "../exercises/exercisesSlice";
import { MusclePartType } from "../muscleParts/musclePartsSlice";
import { updateListItem } from "../../common/actions";
import { moduleEdited, moduleEditionStatusChanged } from "./trainModuleSlice";

export default function EditTrainModule() {
  const dispach = useAppDispatch();

  const musclesParts = useAppSelector(
    (state) => state.musclePartsSlice.muscles_parts
  );
  const editingModuleId = useAppSelector(
    (state) => state.trainModuleSlice.editing_module_id
  );

  const selectedModule = useAppSelector((state) =>
    state.trainModuleSlice.train_modules.find(
      (module) => module.id === editingModuleId
    )
  );

  const [selectedExerciseId, setSelectedExerciseId] = useState(
    () => selectedModule!.exercise
  );
  const selectedExercise = useAppSelector((state) =>
    state.exercisesSlice.exercises.find(
      (exercise) => exercise.id === selectedExerciseId
    )
  );
  const [selectedMuscleId, setselectedMuscleId] = useState(
    () =>
      musclesParts.find((muslce) => muslce.id === selectedExercise!.muscle_part)
        ?.id
  );
  const exercises = useAppSelector((state) =>
    state.exercisesSlice.exercises.filter(
      (exercise: ExcerciseType) => exercise.muscle_part === selectedMuscleId
    )
  );

  const [name, setName] = useState(() => selectedModule?.name || "");
  const [series, setSeries] = useState(() => selectedModule?.series || 0);
  const [weight, setWeight] = useState(() => selectedModule?.weight || 0);
  const [levelWeightInc, setLevelWeightInc] = useState(
    () => selectedModule?.level_weight_increase || 0.0
  );
  const [reps, setReps] = useState<number[]>(() => selectedModule?.reps || []);

  function parseReps(e: React.ChangeEvent<HTMLInputElement>) {
    setReps(e.target.value.split(",").map((rep) => Number(rep)));
  }

  function editModule(e: React.FormEvent<HTMLFormElement>) {
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
      updateListItem(`app/train_module/${editingModuleId}/`, moduleEdited, {
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
      <form action="" onSubmit={(e) => editModule(e)}>
        <div>
          <select
            name=""
            id=""
            onChange={(e) => setselectedMuscleId(Number(e.target.value))}
            defaultValue={selectedMuscleId}
          >
            <option value={0}></option>
            <option value={selectedMuscleId}>
              {" "}
              {
                musclesParts.find((muscle) => muscle.id === selectedMuscleId)
                  ?.name
              }
            </option>
            {musclesParts
              .filter((muscle) => muscle.id !== selectedMuscleId)
              .map((muscle: MusclePartType, index: number) => (
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
            onChange={(e) => setSelectedExerciseId(Number(e.target.value))}
            defaultValue={selectedModule!.exercise}
          >
            <option value={0}></option>
            <option value={selectedModule!.exercise}>
              {selectedExercise?.name}
            </option>
            {exercises
              .filter((exercise) => exercise.id !== selectedModule?.exercise)
              .map((exercise: ExcerciseType, index: number) => (
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
            value={name}
          />
        </div>
        <div>
          Serie
          <input
            type="number"
            name="series"
            id=""
            onChange={(e) => setSeries(Number(e.target.value))}
            value={series}
          />
        </div>
        <div>
          Waga
          <input
            type="number"
            name="weight"
            id=""
            onChange={(e) => setWeight(Number(e.target.value))}
            value={weight}
          />
        </div>
        <div>
          Wzrost
          <input
            type="text"
            name="level_weight_increase"
            id=""
            onChange={(e) => setLevelWeightInc(Number(e.target.value))}
            value={levelWeightInc}
          />
        </div>
        <div>
          Powtórzenia
          <input
            type="text"
            name="reps"
            id=""
            onChange={(e) => parseReps(e)}
            value={reps.toString()}
          />
        </div>
        <input type="submit" value="Zapisz" />
      </form>
      <button onClick={() => dispach(moduleEditionStatusChanged(0))}>
        Wyjdź
      </button>
    </div>
  );
}

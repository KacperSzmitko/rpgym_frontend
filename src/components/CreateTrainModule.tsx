import React, { useState } from "react";
import { useAppDispatch, useAppSelector } from "../state/hooks";
import { ExcerciseType, MusclePartType } from "../state/action-types/mainTypes";
import { createListItem } from "../state/actions/mainActions";
import { ActionType } from "../state/action-types/mainTypes";

export default function CreateTrainModule() {
  const dispach = useAppDispatch();
  const muscles_parts = useAppSelector((state) => state.main.muscles_parts);
  const [selectedMuscle, setSelectedMuscle] = useState(0);
  const exercises = useAppSelector((state) =>
    state.main.exercises.filter((exercise: ExcerciseType) => exercise.muscle_part === selectedMuscle
    )
  );
  const [selectedExercise, setSelectedExercise] = useState(0);
  const [name, setName] = useState("");
  const [series, setSeries] = useState(0);
  const [weight, setWeight] = useState(0);
  const [levelWeightInc, setLevelWeightInc] = useState(0.0);
  const [reps, setReps] = useState<Number[]>([]);

  function createModule(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    dispach(
      createListItem("app/train_module/", ActionType.CREATE_MODULE, {
        name: name,
        exercise: selectedExercise,
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
            onChange={(e) => setSelectedMuscle(Number(e.target.value))}
          >
            <option value={0}></option>
            {muscles_parts.map((muscle: MusclePartType, index: number) => (
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
            disabled={selectedMuscle === 0}
            onChange={(e) => setSelectedExercise(Number(e.target.value))}
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
          <input
            type="text"
            name="reps"
            id=""
            onChange={(e) =>
              setReps(e.target.value.split(",").map((rep) => Number(rep)))
            }
          />
        </div>
        <input type="submit" value="Stwórz moduł" />
      </form>
    </div>
  );
}

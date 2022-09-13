import React, { useState } from 'react'
import { useAppDispatch, useAppSelector } from '../../common/hooks'
import { planEditionStatusChanged, planEdited } from './planSlice'
import { updateListItem } from '../../common/actions'

export default function EditPlan () {
  const editingPlanId = useAppSelector(
    (state) => state.planSlice.editing_plan_id
  )
  const selectedPlan = useAppSelector((state) =>
    state.planSlice.plans.find((plan) => plan.id === editingPlanId)
  )
  const [name, setName] = useState(selectedPlan!.name)
  const [selectedModules, setSelectedModules] = useState<number[]>(
    selectedPlan!.modules.map((module) => module.id)
  )
  const [cycle, setCycle] = useState<number | null>(selectedPlan!.cycle)
  const avaliableModules = useAppSelector(
    (state) => state.trainModuleSlice.train_modules
  )
  const avaliableMuscleParts = useAppSelector(
    (state) => state.musclePartsSlice.muscles_parts
  )
  const [selectedMuscleParts, setSelectedMuscleParts] = useState<number[]>(
    () => selectedPlan!.modules.map((module) => {
      const x = avaliableModules.find((mod) => mod.id === module.id)
      const y = avaliableMuscleParts.find((muscle) => muscle.id === x!.muscle_part_id)
      if (y != null) {
        return y.id
      }
      return 0
    })
  )
  const dispach = useAppDispatch()
  function submitPlan (e: React.FormEvent<HTMLFormElement>): void {
    e.preventDefault()
    if (name === '') {
      return
    }
    const modulesToCreate: number[] = []
    if (selectedModules.length === 0) {
      return
    } else {
      for (let i = 0; i < selectedMuscleParts.length; i++) {
        if (selectedMuscleParts[i] !== 0 && selectedModules[i] === 0) {
          return
        }
        if (selectedMuscleParts[i] === 0 && selectedModules[i] === 0) {
          continue
        }
        if (selectedMuscleParts[i] === 0 && selectedModules[i] !== 0) {
          continue
        }
        modulesToCreate.push(selectedModules[i])
      }
    }
    const cycleVal = cycle === null ? null : cycle > 0 ? cycle : null
    const data = { name, modules: modulesToCreate, cycle: cycleVal }
    console.log(data)
    dispach(updateListItem(`app/plan/${editingPlanId}/`, planEdited, data))
  }

  function addModule (): void {
    setSelectedMuscleParts([...selectedMuscleParts, 0])
    setSelectedModules([...selectedModules, 0])
  }

  function deleteModule (index: number): void {
    setSelectedMuscleParts(selectedMuscleParts.filter((val, i) => i !== index))
    setSelectedModules(selectedModules.filter((val, i) => i !== index))
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
                  )
                }}
                value={selectedMuscleParts[index]}
              >
                <option value={0}></option>
                {avaliableMuscleParts.map((muscle, index) => (
                  <option key={index} value={muscle.id}>
                    {' '}
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
                  )
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
              <button onClick={() => deleteModule(index)} type="button">
                Usuń
              </button>
            </div>
          ))}

          <button type="button" onClick={() => addModule()}>
            Dodaj moduł
          </button>

          <input type="submit" value="Zapisz" />
        </div>
      </form>

      <button
        onClick={() => dispach(planEditionStatusChanged(0))}
        type="button"
      >
        Wyjdź
      </button>
    </div>
  )
}

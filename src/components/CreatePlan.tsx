import React, { useState } from 'react'
import { useAppSelector } from '../state/hooks';

export default function CreatePlan() {
  const [name, setName] = useState("");
  const [modules, setModules] = useState<Number[]>([]);
  //const allModules = useAppSelector((state) => state.main)

  function createPlan(e: React.FormEvent<HTMLFormElement>){
    e.preventDefault();
  }

  function addModule(){
  }

  return (
    <div>
      <form action="" onSubmit={(e) => createPlan(e)}>
        <div>
          Nazwa
          <input type="text" onChange={(e) => setName(e.target.value)} />
        </div>

        <button onClick={() => addModule()}></button>
        <input type="submit" value="Stwórz plan" />
      </form>
    </div>
  );
}

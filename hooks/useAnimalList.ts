import { useEffect, useState } from "react";
import { useListAnimalsMutation } from "@/hooks/animal/useListAnimalsMutation";
import { TAnimal } from "@/models/Animal";

export function useAnimalList() {
  const { mutate, data } = useListAnimalsMutation();
  const [animals, setAnimals] = useState<TAnimal[]>([]);

  useEffect(() => {
    mutate();
  }, []);

  useEffect(() => {
    let animalsList: TAnimal[] = [];
    if (Array.isArray(data)) {
      animalsList = data;
    } else if (data?.data && Array.isArray(data.data)) {
      animalsList = data.data;
    }
    if (animalsList.length > 0) {
      const mapped = animalsList.map((animal: any) => ({
        ...animal,
        animal_id: animal.animal_id || animal.id,
      }));
      setAnimals(mapped);
    }
  }, [data]);

  return animals;
}

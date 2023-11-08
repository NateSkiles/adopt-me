import { useQuery } from "@tanstack/react-query";
import fetchAnimalTypeList from "./fetchAnimalTypeList";

export default function useAnimalTypeList() {
  const results = useQuery(["animalTypes"], fetchAnimalTypeList);
  return [results?.data?.data?.types ?? [], results.status];
}

import { useQuery } from "@tanstack/react-query";
import fetchAnimalTypeList from "./fetchAnimalTypeList";

export default function useAnimalTypeList() {
  const results = useQuery("types", fetchAnimalTypeList);
  return [results ?? [], results.status];
}

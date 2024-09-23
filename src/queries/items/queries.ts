import { useQuery } from "@tanstack/react-query";
import { itemQueryKeys } from "./item-query-keys";
import { Item } from "@/types";

async function getItems(): Promise<Item[]> {
  const response = await fetch(`/api/items`);

  if (!response.ok) {
    throw new Error("Failed to fetch items");
  }

  const data: Item[] = await response.json();
  return data;
}

export function useItems() {
  return useQuery<Item[]>({
    queryKey: itemQueryKeys.lists(),
    queryFn: getItems,
  });
}

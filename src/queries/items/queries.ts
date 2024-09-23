import { useQuery } from "@tanstack/react-query";
import { itemQueryKeys } from "./item-query-keys";
import { itemsApi } from "@/lib/api";

async function getItems() {
  const response = await itemsApi.findAll();
  return response.data;
}

export function useItems() {
  return useQuery({
    queryKey: itemQueryKeys.lists(),
    queryFn: getItems,
  });
}

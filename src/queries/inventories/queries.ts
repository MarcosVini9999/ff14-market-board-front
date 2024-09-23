import { useQuery } from "@tanstack/react-query";
import { inventoryQueryKeys } from "./inventory-query-keys";
import { inventoriesApi } from "@/lib/api";

async function getInventories(playerId: number) {
  const response = await inventoriesApi.findAll();
  return response.data.filter((inv) => inv.player.id === playerId);
}

export function useInventories(playerId: number) {
  return useQuery({
    queryKey: inventoryQueryKeys.list(playerId),
    queryFn: () => getInventories(playerId),
  });
}

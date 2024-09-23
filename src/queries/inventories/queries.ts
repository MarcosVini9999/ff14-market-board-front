import { useQuery } from "@tanstack/react-query";
import { inventoryQueryKeys } from "./inventory-query-keys";
import { Inventory } from "@/types";

async function getInventories(playerId: number): Promise<Inventory[]> {
  const response = await fetch(`/api/inventories`);

  if (!response.ok) {
    throw new Error("Failed to fetch inventories");
  }

  const data: Inventory[] = await response.json();
  return data.filter((inv) => inv.player.id === playerId);
}

export function useInventories(playerId: number) {
  return useQuery<Inventory[]>({
    queryKey: inventoryQueryKeys.list(playerId),
    queryFn: () => getInventories(playerId),
  });
}

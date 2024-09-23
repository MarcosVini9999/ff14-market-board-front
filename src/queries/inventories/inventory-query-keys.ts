export const inventoryQueryKeys = {
  all: ["inventories"] as const,
  lists: () => [...inventoryQueryKeys.all, "list"] as const,
  list: (playerId: number) => [...inventoryQueryKeys.lists(), { playerId }] as const,
};

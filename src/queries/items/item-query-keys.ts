export const itemQueryKeys = {
  all: ["items"] as const,
  lists: () => [...itemQueryKeys.all, "list"] as const,
  list: (filters: string) => [...itemQueryKeys.lists(), { filters }] as const,
  details: () => [...itemQueryKeys.all, "detail"] as const,
  detail: (id: number) => [...itemQueryKeys.details(), id] as const,
};

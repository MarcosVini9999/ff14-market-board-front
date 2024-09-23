export const playerQueryKeys = {
  all: ["players"] as const,
  lists: () => [...playerQueryKeys.all, "list"] as const,
  list: (filters: string) => [...playerQueryKeys.lists(), { filters }] as const,
  details: () => [...playerQueryKeys.all, "detail"] as const,
  detail: (id: number) => [...playerQueryKeys.details(), id] as const,
};

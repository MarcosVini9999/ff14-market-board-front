export const offerQueryKeys = {
  all: ["offers"] as const,
  lists: () => [...offerQueryKeys.all, "list"] as const,
  list: (filters: string) => [...offerQueryKeys.lists(), { filters }] as const,
};

import { useQuery } from "@tanstack/react-query";
import { offerQueryKeys } from "./offer-query-keys";
import { Offer } from "@/types";

async function getOffers(): Promise<Offer[]> {
  const response = await fetch(`/api/offers`);

  if (!response.ok) {
    throw new Error("Failed to fetch offers");
  }

  const data: Offer[] = await response.json();
  return data;
}

export function useOffers() {
  return useQuery<Offer[]>({
    queryKey: offerQueryKeys.lists(),
    queryFn: getOffers,
  });
}

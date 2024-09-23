import { useQuery } from "@tanstack/react-query";
import { offerQueryKeys } from "./offer-query-keys";
import { offersApi } from "@/lib/api";

async function getOffers() {
  const response = await offersApi.findAll();
  return response.data;
}

export function useOffers() {
  return useQuery({
    queryKey: offerQueryKeys.lists(),
    queryFn: getOffers,
  });
}

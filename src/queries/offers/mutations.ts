import { useMutation, useQueryClient } from "@tanstack/react-query";
import { CreateOfferDto, Offer, OfferType } from "@/types";
import { offerQueryKeys } from "./offer-query-keys";
import { playerQueryKeys } from "../players/player-query-keys";
import { inventoryQueryKeys } from "../inventories/inventory-query-keys";
import { offersApi } from "@/lib/api";

async function createOffer(newOffer: CreateOfferDto) {
  const response = await offersApi.create(newOffer);
  return response.data;
}

export function useCreateOffer() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createOffer,
    onMutate: async (newOffer: CreateOfferDto) => {
      await queryClient.cancelQueries({ queryKey: offerQueryKeys.lists() });
      const previousOffers = queryClient.getQueryData<Offer[]>(offerQueryKeys.lists());

      const tempOffer: Offer = {
        id: Date.now(),
        type: newOffer.type,
        pricePerUnit: newOffer.pricePerUnit,
        quantity: newOffer.quantity,
        playerId: newOffer.playerId,
        itemId: newOffer.itemId,
        endsAt: newOffer.endsAt.toISOString(),
        totalValue: newOffer.pricePerUnit * newOffer.quantity,
        createdAt: new Date().toISOString(),
      };

      queryClient.setQueryData<Offer[]>(offerQueryKeys.lists(), (old = []) => [...old, tempOffer]);

      return { previousOffers };
    },
    onError: (err, newOffer, context) => {
      if (context?.previousOffers) {
        queryClient.setQueryData<Offer[]>(offerQueryKeys.lists(), context.previousOffers);
      }
    },
    onSettled: async (data, error, variables) => {
      await queryClient.invalidateQueries({ queryKey: offerQueryKeys.lists() });
      await queryClient.invalidateQueries({ queryKey: playerQueryKeys.detail(variables.playerId) });
      await queryClient.invalidateQueries({
        queryKey: inventoryQueryKeys.list(variables.playerId),
      });
    },
  });
}

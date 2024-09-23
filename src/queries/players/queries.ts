import { useQuery } from "@tanstack/react-query";
import { playerQueryKeys } from "./player-query-keys";
import { playersApi } from "@/lib/api";

async function getPlayers() {
  const response = await playersApi.findAll();
  return response.data;
}

export function usePlayers() {
  return useQuery({
    queryKey: playerQueryKeys.lists(),
    queryFn: getPlayers,
  });
}

async function getPlayerById(id: number) {
  const response = await playersApi.findById(id);
  return response.data;
}

export function usePlayer(id: number) {
  return useQuery({
    queryKey: playerQueryKeys.detail(id),
    queryFn: () => getPlayerById(id),
  });
}

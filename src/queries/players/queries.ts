import { useQuery } from "@tanstack/react-query";
import { playerQueryKeys } from "./player-query-keys";
import { Player } from "@/types";

async function getPlayers(): Promise<Player[]> {
  const response = await fetch(`/api/players`);

  if (!response.ok) {
    throw new Error("Failed to fetch players");
  }

  const data: Player[] = await response.json();
  return data;
}

export function usePlayers() {
  return useQuery<Player[]>({
    queryKey: playerQueryKeys.lists(),
    queryFn: getPlayers,
  });
}

async function getPlayerById(id: number): Promise<Player> {
  const response = await fetch(`/api/players/${id}`);

  if (!response.ok) {
    throw new Error(`Failed to fetch player with id: ${id}`);
  }

  return response.json();
}

export function usePlayer(id: number) {
  return useQuery<Player>({
    queryKey: playerQueryKeys.detail(id),
    queryFn: () => getPlayerById(id),
  });
}

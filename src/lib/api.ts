import axios from "axios";
import {
  CreatePlayerDto,
  CreateOfferDto,
  CreateItemDto,
  CreateInventoryDto,
  Player,
  Item,
  Inventory,
  Offer,
} from "../types";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
});

export const playersApi = {
  create: (playerData: CreatePlayerDto) => api.post<Player>("/players", playerData),
  findAll: () => api.get<Player[]>("/players"),
  findById: (id: number) => api.get<Player>(`/players/${id}`),
  update: (id: number, playerData: Partial<CreatePlayerDto>) =>
    api.put<Player>(`/players/${id}`, playerData),
};

export const itemsApi = {
  create: (itemData: CreateItemDto) => api.post<Item>("/items", itemData),
  findAll: () => api.get<Item[]>("/items"),
  findById: (id: number) => api.get<Item>(`/items/${id}`),
  update: (id: number, itemData: Partial<CreateItemDto>) => api.put<Item>(`/items/${id}`, itemData),
  delete: (id: number) => api.delete(`/items/${id}`),
};

export const inventoriesApi = {
  create: (inventoryData: CreateInventoryDto) => api.post<Inventory>("/inventories", inventoryData),
  findAll: () => api.get<Inventory[]>("/inventories"),
  findById: (id: number) => api.get<Inventory>(`/inventories/${id}`),
  update: (id: number, inventoryData: Partial<CreateInventoryDto>) =>
    api.put<Inventory>(`/inventories/${id}`, inventoryData),
  delete: (id: number) => api.delete(`/inventories/${id}`),
};

export const offersApi = {
  create: (offerData: CreateOfferDto) => api.post<Offer>("/offers", offerData),
  findAll: () => api.get<Offer[]>("/offers"),
  findById: (id: number) => api.get<Offer>(`/offers/${id}`),
  update: (id: number, offerData: Partial<CreateOfferDto>) =>
    api.put<Offer>(`/offers/${id}`, offerData),
  delete: (id: number) => api.delete(`/offers/${id}`),
};

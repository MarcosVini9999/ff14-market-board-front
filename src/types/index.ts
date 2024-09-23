export enum OfferType {
  BUY = "BUY",
  SELL = "SELL",
}

export interface Player {
  id: number;
  nickname: string;
  gold: number;
}

export interface Item {
  id: number;
  name: string;
}

export interface Inventory {
  id: number;
  player: Player;
  item: Item;
  quantity: number;
}

export interface Offer {
  id: number;
  type: OfferType;
  pricePerUnit: number;
  quantity: number;
  totalValue: number;
  endsAt: string;
  playerId: number;
  itemId: number;
  createdAt: string;
}

export interface CreatePlayerDto {
  nickname: string;
  gold: number;
}

export interface CreateOfferDto {
  type: OfferType;
  pricePerUnit: number;
  quantity: number;
  playerId: number;
  itemId: number;
  endsAt: Date;
}

export interface CreateItemDto {
  name: string;
}

export interface CreateInventoryDto {
  playerId: number;
  itemId: number;
  quantity: number;
}

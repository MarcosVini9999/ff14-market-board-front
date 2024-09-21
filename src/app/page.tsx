"use client";

import React, { useState } from "react";
import { ChevronDown, Search, Heart, BarChart2 } from "lucide-react";

// Types
type Player = {
  id: string;
  name: string;
  gold: number;
  inventory: { [itemName: string]: number };
};

type Offer = {
  id: string;
  playerName: string;
  itemName: string;
  amount: number;
  pricePerUnit: number;
  totalPrice: number;
  endsAt: string;
};

// Mock data
const players: Player[] = [
  {
    id: "1",
    name: "EO",
    gold: 23544009,
    inventory: { "dragon shield": 3, blueberry: 786, apple: 2, "fire sword": 1 },
  },
  { id: "2", name: "Bubble", gold: 100000, inventory: { "leather boots": 5, "golden legs": 1 } },
  { id: "3", name: "Tripola", gold: 500000, inventory: { "dragon ham": 10, mace: 2 } },
];

const initialOffers: Offer[] = [
  {
    id: "1",
    playerName: "EO",
    itemName: "leather boots",
    amount: 2,
    pricePerUnit: 1999,
    totalPrice: 3998,
    endsAt: "2024-01-23",
  },
  {
    id: "2",
    playerName: "Bubble",
    itemName: "dragon shield",
    amount: 34,
    pricePerUnit: 2000,
    totalPrice: 68000,
    endsAt: "2024-05-05",
  },
  {
    id: "3",
    playerName: "Tripola",
    itemName: "blueberry",
    amount: 200,
    pricePerUnit: 1950,
    totalPrice: 390000,
    endsAt: "2025-12-01",
  },
  {
    id: "4",
    playerName: "Cachero",
    itemName: "fire sword",
    amount: 1,
    pricePerUnit: 1800,
    totalPrice: 1800,
    endsAt: "2024-01-10",
  },
];

const FF14Box: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => (
  <div className="bg-[#1d1d1d] bg-opacity-90 border border-[#3d3d3d] rounded-md overflow-hidden">
    <div className="bg-gradient-to-b from-[#3d3d3d] to-[#2d2d2d] p-2">
      <h2 className="text-[#c0a062] text-lg font-bold">{title}</h2>
      <div className="h-px bg-[#c0a062] opacity-50 mt-1"></div>
    </div>
    <div className="p-4">{children}</div>
  </div>
);

// Components
const PlayerImpersonation: React.FC<{ onImpersonate: (playerId: string) => void }> = ({
  onImpersonate,
}) => {
  const [selectedPlayer, setSelectedPlayer] = useState("");

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-[url('https://i.imgur.com/uBGMSA3.jpeg')] bg-cover bg-center">
      <FF14Box title="Player Impersonation">
        <div className="flex flex-col items-center">
          <div className="relative w-64 mb-4">
            <select
              className="w-full p-2 bg-[#2a2a2a] border border-[#3d3d3d] rounded appearance-none text-[#c0a062]"
              value={selectedPlayer}
              onChange={(e) => setSelectedPlayer(e.target.value)}
            >
              <option value="">--- Select Player ---</option>
              {players.map((player) => (
                <option key={player.id} value={player.id}>
                  {player.name}
                </option>
              ))}
            </select>
            <ChevronDown className="absolute right-2 top-3 pointer-events-none text-[#c0a062]" />
          </div>
          <button
            className="px-4 py-2 bg-[#3d3d3d] text-[#c0a062] rounded hover:bg-[#4a4a4a]"
            onClick={() => onImpersonate(selectedPlayer)}
            disabled={!selectedPlayer}
          >
            Impersonate
          </button>
        </div>
      </FF14Box>
    </div>
  );
};

const Dashboard: React.FC<{
  player: Player;
  offers: Offer[];
  onSwitchPlayer: () => void;
  onCreateOffer: (item: string) => void;
}> = ({ player, offers, onSwitchPlayer, onCreateOffer }) => {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredItems = Object.entries(player.inventory)
    .filter(([item]) => item.toLowerCase().includes(searchTerm.toLowerCase()))
    .sort(([a], [b]) => a.localeCompare(b));

  const sellOffers = offers.filter((offer) => offer.playerName !== player.name);
  const buyOffers = offers.filter((offer) => offer.playerName === player.name);

  return (
    <div className="min-h-screen bg-[url('https://i.imgur.com/uBGMSA3.jpeg')] bg-cover bg-center p-4">
      <div className="max-w-6xl mx-auto space-y-4">
        <FF14Box title="Item Search">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <div>
              <div className="mb-4">
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Search items..."
                    className="w-full p-2 bg-[#2a2a2a] border border-[#3d3d3d] rounded pl-8 text-[#c0a062]"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                  <Search className="absolute left-2 top-2.5 text-[#c0a062]" />
                </div>
              </div>
              <div className="space-y-1 max-h-96 overflow-y-auto">
                {filteredItems.map(([item, quantity]) => (
                  <div
                    key={item}
                    className="flex justify-between items-center p-2 bg-[#2a2a2a] rounded cursor-pointer hover:bg-[#3d3d3d]"
                    onClick={() => onCreateOffer(item)}
                  >
                    <span className="text-[#c0a062]">
                      {quantity}x {item}
                    </span>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <h3 className="text-[#c0a062] text-lg mb-2">Sell Offers:</h3>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="border-b border-[#3d3d3d]">
                    <tr>
                      <th className="text-left p-2 text-[#c0a062]">Name</th>
                      <th className="text-left p-2 text-[#c0a062]">Amount</th>
                      <th className="text-left p-2 text-[#c0a062]">Price Per Unit</th>
                      <th className="text-left p-2 text-[#c0a062]">Total Price</th>
                      <th className="text-left p-2 text-[#c0a062]">Ends At</th>
                    </tr>
                  </thead>
                  <tbody>
                    {sellOffers.map((offer) => (
                      <tr key={offer.id} className="border-b border-[#3d3d3d]">
                        <td className="p-2 text-[#c0a062]">{offer.playerName}</td>
                        <td className="p-2 text-[#c0a062]">{offer.amount}</td>
                        <td className="p-2 text-[#c0a062]">{offer.pricePerUnit}</td>
                        <td className="p-2 text-[#c0a062]">{offer.totalPrice}</td>
                        <td className="p-2 text-[#c0a062]">{offer.endsAt}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <h3 className="text-[#c0a062] text-lg mt-4 mb-2">Buy Offers:</h3>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="border-b border-[#3d3d3d]">
                    <tr>
                      <th className="text-left p-2 text-[#c0a062]">Name</th>
                      <th className="text-left p-2 text-[#c0a062]">Amount</th>
                      <th className="text-left p-2 text-[#c0a062]">Price Per Unit</th>
                      <th className="text-left p-2 text-[#c0a062]">Total Price</th>
                      <th className="text-left p-2 text-[#c0a062]">Ends At</th>
                    </tr>
                  </thead>
                  <tbody>
                    {buyOffers.map((offer) => (
                      <tr key={offer.id} className="border-b border-[#3d3d3d]">
                        <td className="p-2 text-[#c0a062]">{offer.playerName}</td>
                        <td className="p-2 text-[#c0a062]">{offer.amount}</td>
                        <td className="p-2 text-[#c0a062]">{offer.pricePerUnit}</td>
                        <td className="p-2 text-[#c0a062]">{offer.totalPrice}</td>
                        <td className="p-2 text-[#c0a062]">{offer.endsAt}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </FF14Box>
        <div className="flex justify-between items-center">
          <div className="bg-[#1d1d1d] bg-opacity-90 border border-[#3d3d3d] rounded-md overflow-hidden p-2 text-xl text-[#c0a062]">
            Gold: {player.gold}
          </div>
          <div>
            <button
              className="px-4 py-2 bg-[#3d3d3d] text-[#c0a062] rounded hover:bg-[#4a4a4a] mr-2"
              onClick={onSwitchPlayer}
            >
              Switch Player
            </button>
            <button
              className="px-4 py-2 bg-[#3d3d3d] text-[#c0a062] rounded hover:bg-[#4a4a4a]"
              onClick={() => onCreateOffer("")}
            >
              Create Offer
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const CreateOfferModal: React.FC<{
  player: Player;
  item: string;
  onClose: () => void;
  onCreateOffer: (offer: Omit<Offer, "id" | "playerName">) => void;
}> = ({ player, item, onClose, onCreateOffer }) => {
  const [pricePerUnit, setPricePerUnit] = useState(0);
  const [amount, setAmount] = useState(1);
  const [endsAt, setEndsAt] = useState("");
  const [offerType, setOfferType] = useState<"buy" | "sell">("buy");

  const totalPrice = pricePerUnit * amount;
  const maxAmount =
    offerType === "sell" ? player.inventory[item] || 0 : Math.floor(player.gold / pricePerUnit);

  const handleCreateOffer = () => {
    if (offerType === "buy" && totalPrice > player.gold) {
      alert("You don't have enough gold for this offer!");
      return;
    }
    if (offerType === "sell" && amount > (player.inventory[item] || 0)) {
      alert("You don't have enough items for this offer!");
      return;
    }
    onCreateOffer({ itemName: item, amount, pricePerUnit, totalPrice, endsAt });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <FF14Box title={`Create Offer: ${item}`}>
        <div className="space-y-4">
          <div>
            <label className="block mb-1 text-[#c0a062]">Price Per Unit:</label>
            <input
              type="number"
              className="w-full p-2 bg-[#2a2a2a] border border-[#3d3d3d] rounded text-[#c0a062]"
              value={pricePerUnit}
              onChange={(e) => setPricePerUnit(Number(e.target.value))}
            />
          </div>
          <div>
            <label className="block mb-1 text-[#c0a062]">Amount:</label>
            <input
              type="number"
              className="w-full p-2 bg-[#2a2a2a] border border-[#3d3d3d] rounded text-[#c0a062]"
              value={amount}
              onChange={(e) => setAmount(Number(e.target.value))}
              max={maxAmount}
            />
          </div>
          <div>
            <label className="block mb-1 text-[#c0a062]">Ends At:</label>
            <input
              type="date"
              className="w-full p-2 bg-[#2a2a2a] border border-[#3d3d3d] rounded text-[#c0a062]"
              value={endsAt}
              onChange={(e) => setEndsAt(e.target.value)}
            />
          </div>
          <div>
            <label className="block mb-1 text-[#c0a062]">Offer Type:</label>
            <div className="flex space-x-4">
              <label className="inline-flex items-center">
                <input
                  type="radio"
                  className="form-radio text-[#c0a062]"
                  name="offerType"
                  value="buy"
                  checked={offerType === "buy"}
                  onChange={() => setOfferType("buy")}
                />
                <span className="ml-2 text-[#c0a062]">Buy</span>
              </label>
              <label className="inline-flex items-center">
                <input
                  type="radio"
                  className="form-radio text-[#c0a062]"
                  name="offerType"
                  value="sell"
                  checked={offerType === "sell"}
                  onChange={() => setOfferType("sell")}
                />
                <span className="ml-2 text-[#c0a062]">Sell</span>
              </label>
            </div>
          </div>
          <div className="text-xl text-[#c0a062]">Total Price: {totalPrice}</div>
          <div className="flex justify-end space-x-2">
            <button
              className="px-4 py-2 bg-[#3d3d3d] text-[#c0a062] rounded hover:bg-[#4a4a4a]"
              onClick={onClose}
            >
              Cancel
            </button>
            <button
              className="px-4 py-2 bg-[#3d3d3d] text-[#c0a062] rounded hover:bg-[#4a4a4a]"
              onClick={handleCreateOffer}
            >
              Create Offer
            </button>
          </div>
        </div>
      </FF14Box>
    </div>
  );
};

const FF14ItemTradingSystem: React.FC = () => {
  const [currentPlayer, setCurrentPlayer] = useState<Player | null>(null);
  const [offers, setOffers] = useState<Offer[]>(initialOffers);
  const [createOfferItem, setCreateOfferItem] = useState<string | null>(null);

  const handleImpersonate = (playerId: string) => {
    const player = players.find((p) => p.id === playerId);
    if (player) {
      setCurrentPlayer(player);
    }
  };

  const handleCreateOffer = (newOffer: Omit<Offer, "id" | "playerName">) => {
    if (currentPlayer) {
      const offer: Offer = {
        id: String(offers.length + 1),
        playerName: currentPlayer.name,
        ...newOffer,
      };
      setOffers([...offers, offer]);

      // Update player's gold or inventory
      if (offer.playerName === currentPlayer.name) {
        if (newOffer.itemName in currentPlayer.inventory) {
          currentPlayer.inventory[newOffer.itemName] -= newOffer.amount;
        } else {
          currentPlayer.gold -= newOffer.totalPrice;
        }
      }

      setCreateOfferItem(null);
    }
  };

  if (!currentPlayer) {
    return <PlayerImpersonation onImpersonate={handleImpersonate} />;
  }

  return (
    <div className="bg-[url('https://i.imgur.com/uBGMSA3.jpeg')] bg-cover bg-center min-h-screen">
      <Dashboard
        player={currentPlayer}
        offers={offers}
        onSwitchPlayer={() => setCurrentPlayer(null)}
        onCreateOffer={setCreateOfferItem}
      />
      {createOfferItem !== null && (
        <CreateOfferModal
          player={currentPlayer}
          item={createOfferItem}
          onClose={() => setCreateOfferItem(null)}
          onCreateOffer={handleCreateOffer}
        />
      )}
    </div>
  );
};

export default FF14ItemTradingSystem;

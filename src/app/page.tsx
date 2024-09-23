"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Player, Item, OfferType } from "@/types";
import { usePlayers } from "@/queries/players/queries";
import { useInventories } from "@/queries/inventories/queries";
import { useOffers } from "@/queries/offers/queries";
import { useItems } from "@/queries/items/queries";
import { useCreateOffer } from "@/queries/offers/mutations";

const FF14Box: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => (
  <div className="bg-[#1d1d1d] bg-opacity-90 border border-[#3d3d3d] rounded-md overflow-hidden">
    <div className="bg-gradient-to-b from-[#3d3d3d] to-[#2d2d2d] p-2">
      <h2 className="text-[#c0a062] text-lg font-bold">{title}</h2>
      <div className="h-px bg-[#c0a062] opacity-50 mt-1"></div>
    </div>
    <div className="p-4">{children}</div>
  </div>
);

const PlayerImpersonation: React.FC<{ onImpersonate: (playerId: number) => void }> = ({
  onImpersonate,
}) => {
  const [selectedPlayer, setSelectedPlayer] = useState<number | null>(null);
  const { data: players = [] } = usePlayers();

  return (
    <div className="flex flex-col items-center justify-center h-screen  bg-cover bg-center">
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <FF14Box title="Player Impersonation">
          <div className="flex flex-col items-center">
            <Select
              onValueChange={(value) => setSelectedPlayer(Number(value))}
              value={selectedPlayer?.toString() || ""}
            >
              <SelectTrigger className="w-64 mb-4 bg-[#2a2a2a] border-[#3d3d3d] text-[#c0a062]">
                <SelectValue placeholder="Select a player" />
              </SelectTrigger>
              <SelectContent>
                {players.map((player) => (
                  <SelectItem key={player.id} value={player.id.toString()}>
                    {player.nickname}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Button
              className="bg-[#3d3d3d] text-[#c0a062] hover:bg-[#4a4a4a]"
              onClick={() => selectedPlayer && onImpersonate(selectedPlayer)}
              disabled={!selectedPlayer}
            >
              Impersonate
            </Button>
          </div>
        </FF14Box>
      </motion.div>
    </div>
  );
};

const SelectItemModal: React.FC<{
  onSelectItem: (item: Item) => void;
  onClose: () => void;
}> = ({ onSelectItem, onClose }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const { data: items = [] } = useItems();

  const filteredItems = items.filter((item) =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        transition={{ duration: 0.3 }}
      >
        <FF14Box title="Select Item">
          <div className="space-y-4">
            <div className="relative">
              <Input
                type="text"
                placeholder="Search items..."
                className="w-full bg-[#2a2a2a] border-[#3d3d3d] text-[#c0a062] pl-8"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <Search className="absolute left-2 top-2.5 text-[#c0a062]" />
            </div>
            <div className="space-y-1 max-h-96 overflow-y-auto">
              {filteredItems.map((item) => (
                <Button
                  key={item.id}
                  variant="ghost"
                  className="w-full justify-between items-center p-2 bg-[#2a2a2a] hover:bg-[#3d3d3d] text-[#c0a062]"
                  onClick={() => onSelectItem(item)}
                >
                  <span>{item.name}</span>
                </Button>
              ))}
            </div>
            <div className="flex justify-end space-x-2">
              <Button
                variant="outline"
                onClick={onClose}
                className="bg-[#3d3d3d] text-[#c0a062] hover:bg-[#4a4a4a] border-[#3d3d3d]"
              >
                Cancel
              </Button>
            </div>
          </div>
        </FF14Box>
      </motion.div>
    </div>
  );
};

const Dashboard: React.FC<{
  player: Player;
  onSwitchPlayer: () => void;
  onCreateOffer: () => void;
}> = ({ player, onSwitchPlayer, onCreateOffer }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const { data: inventories = [] } = useInventories(player.id);
  const { data: offers = [] } = useOffers();

  const filteredInventories = inventories.filter((inv) =>
    inv.item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const sellOffers = offers.filter((offer) => offer.playerId !== player.id);
  const buyOffers = offers.filter((offer) => offer.playerId === player.id);

  return (
    <div className="min-h-screen p-4">
      <div className="max-w-6xl mx-auto space-y-4">
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <FF14Box title="Item Search">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              <div>
                <div className="mb-4">
                  <div className="relative">
                    <Input
                      type="text"
                      placeholder="Search items..."
                      className="w-full bg-[#2a2a2a] border-[#3d3d3d] text-[#c0a062] pl-8"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    <Search className="absolute left-2 top-2.5 text-[#c0a062]" />
                  </div>
                </div>
                <div className="space-y-1 max-h-96 overflow-y-auto">
                  <AnimatePresence>
                    {filteredInventories.map((inv) => (
                      <motion.div
                        key={inv.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 20 }}
                        transition={{ duration: 0.2 }}
                      >
                        <Button
                          variant="ghost"
                          className="w-full justify-between items-center p-2 bg-[#2a2a2a] hover:bg-[#3d3d3d] text-[#c0a062]"
                        >
                          <span>
                            {inv.quantity}x {inv.item.name}
                          </span>
                        </Button>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>
              </div>
              <div>
                <h3 className="text-[#c0a062] text-lg mb-2">Sell Offers:</h3>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="text-[#c0a062]">Item</TableHead>
                      <TableHead className="text-[#c0a062]">Amount</TableHead>
                      <TableHead className="text-[#c0a062]">Price Per Unit</TableHead>
                      <TableHead className="text-[#c0a062]">Total Price</TableHead>
                      <TableHead className="text-[#c0a062]">Ends At</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {sellOffers.map((offer) => (
                      <TableRow key={offer.id}>
                        <TableCell className="text-[#c0a062]">{offer.itemId}</TableCell>
                        <TableCell className="text-[#c0a062]">{offer.quantity}</TableCell>
                        <TableCell className="text-[#c0a062]">{offer.pricePerUnit}</TableCell>
                        <TableCell className="text-[#c0a062]">{offer.totalValue}</TableCell>
                        <TableCell className="text-[#c0a062]">
                          {new Date(offer.endsAt).toLocaleDateString()}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
                <h3 className="text-[#c0a062] text-lg mt-4 mb-2">Buy Offers:</h3>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="text-[#c0a062]">Item</TableHead>
                      <TableHead className="text-[#c0a062]">Amount</TableHead>
                      <TableHead className="text-[#c0a062]">Price Per Unit</TableHead>
                      <TableHead className="text-[#c0a062]">Total Price</TableHead>
                      <TableHead className="text-[#c0a062]">Ends At</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {buyOffers.map((offer) => (
                      <TableRow key={offer.id}>
                        <TableCell className="text-[#c0a062]">{offer.itemId}</TableCell>
                        <TableCell className="text-[#c0a062]">{offer.quantity}</TableCell>
                        <TableCell className="text-[#c0a062]">{offer.pricePerUnit}</TableCell>
                        <TableCell className="text-[#c0a062]">{offer.totalValue}</TableCell>
                        <TableCell className="text-[#c0a062]">
                          {new Date(offer.endsAt).toLocaleDateString()}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </div>
          </FF14Box>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <div className="flex justify-between items-center">
            <div className="bg-[#1d1d1d] bg-opacity-90 border border-[#3d3d3d] rounded-md overflow-hidden p-2 text-xl text-[#c0a062]">
              Gold: {player.gold}
            </div>
            <div>
              <Button
                className="bg-[#3d3d3d] text-[#c0a062] hover:bg-[#4a4a4a] mr-2"
                onClick={onCreateOffer}
              >
                Create Offer
              </Button>
              <Button
                className="bg-[#3d3d3d] text-[#c0a062] hover:bg-[#4a4a4a] mr-2"
                onClick={onSwitchPlayer}
              >
                Switch Player
              </Button>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

const CreateOfferModal: React.FC<{
  player: Player;
  item: Item;
  onClose: () => void;
}> = ({ player, item, onClose }) => {
  const [pricePerUnit, setPricePerUnit] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [endsAt, setEndsAt] = useState("");
  const [offerType, setOfferType] = useState<OfferType>(OfferType.BUY);

  const { data: inventories = [] } = useInventories(player.id);
  const createOfferMutation = useCreateOffer();

  const inventory = inventories.find((inv) => inv.item.id === item.id);
  const totalValue = pricePerUnit * quantity;
  const maxQuantity =
    offerType === OfferType.SELL
      ? inventory?.quantity || 0
      : Math.floor(player.gold / pricePerUnit);

  const handleCreateOffer = () => {
    if (offerType === OfferType.BUY && totalValue > player.gold) {
      alert("You don't have enough gold for this offer!");
      return;
    }
    if (offerType === OfferType.SELL && quantity > maxQuantity) {
      alert("You don't have enough items for this offer!");
      return;
    }
    createOfferMutation.mutate({
      type: offerType,
      pricePerUnit,
      quantity,
      playerId: player.id,
      itemId: item.id,
      endsAt: new Date(endsAt),
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        transition={{ duration: 0.3 }}
      >
        <FF14Box title={`Create Offer: ${item.name}`}>
          <div className="space-y-4">
            <div>
              <Label htmlFor="pricePerUnit" className="text-[#c0a062]">
                Price Per Unit:
              </Label>
              <Input
                id="pricePerUnit"
                type="number"
                className="w-full bg-[#2a2a2a] border-[#3d3d3d] text-[#c0a062]"
                value={pricePerUnit}
                onChange={(e) => setPricePerUnit(Number(e.target.value))}
              />
            </div>
            <div>
              <Label htmlFor="quantity" className="text-[#c0a062]">
                Quantity:
              </Label>
              <Input
                id="quantity"
                type="number"
                className="w-full bg-[#2a2a2a] border-[#3d3d3d] text-[#c0a062]"
                value={quantity}
                onChange={(e) => setQuantity(Number(e.target.value))}
                max={maxQuantity}
              />
            </div>
            <div>
              <Label htmlFor="endsAt" className="text-[#c0a062]">
                Ends At:
              </Label>
              <Input
                id="endsAt"
                type="date"
                className="w-full bg-[#2a2a2a] border-[#3d3d3d] text-[#c0a062]"
                value={endsAt}
                onChange={(e) => setEndsAt(e.target.value)}
              />
            </div>
            <div>
              <Label className="text-[#c0a062]">Offer Type:</Label>
              <RadioGroup
                value={offerType}
                onValueChange={(value) => setOfferType(value as OfferType)}
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value={OfferType.BUY} id="buy" className="text-[#c0a062]" />
                  <Label htmlFor="buy" className="text-[#c0a062]">
                    Buy
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value={OfferType.SELL} id="sell" className="text-[#c0a062]" />
                  <Label htmlFor="sell" className="text-[#c0a062]">
                    Sell
                  </Label>
                </div>
              </RadioGroup>
            </div>
            <div className="text-xl text-[#c0a062]">Total Value: {totalValue}</div>
            <div className="flex justify-end space-x-2">
              <Button
                variant="outline"
                onClick={onClose}
                className="bg-[#3d3d3d] text-[#c0a062] hover:bg-[#4a4a4a] border-[#3d3d3d]"
              >
                Cancel
              </Button>
              <Button
                onClick={handleCreateOffer}
                className="bg-[#3d3d3d] text-[#c0a062] hover:bg-[#4a4a4a] border-[#3d3d3d]"
              >
                Create Offer
              </Button>
            </div>
          </div>
        </FF14Box>
      </motion.div>
    </div>
  );
};

const FF14ItemTradingSystem: React.FC = () => {
  const [currentPlayer, setCurrentPlayer] = useState<Player | null>(null);
  const [showSelectItemModal, setShowSelectItemModal] = useState(false);
  const [createOfferItem, setCreateOfferItem] = useState<Item | null>(null);
  const { data: players = [] } = usePlayers();

  const handleImpersonate = (playerId: number) => {
    const player = players.find((p) => p.id === playerId);
    if (player) {
      setCurrentPlayer(player);
    }
  };

  const handleCreateOffer = () => {
    setShowSelectItemModal(true);
  };

  const handleSelectItem = (item: Item) => {
    setShowSelectItemModal(false);
    setCreateOfferItem(item);
  };

  return (
    <AnimatePresence>
      {!currentPlayer ? (
        <PlayerImpersonation onImpersonate={handleImpersonate} />
      ) : (
        <Dashboard
          player={currentPlayer}
          onSwitchPlayer={() => setCurrentPlayer(null)}
          onCreateOffer={handleCreateOffer}
        />
      )}
      {showSelectItemModal && (
        <SelectItemModal
          onSelectItem={handleSelectItem}
          onClose={() => setShowSelectItemModal(false)}
        />
      )}
      {createOfferItem && currentPlayer && (
        <CreateOfferModal
          player={currentPlayer}
          item={createOfferItem}
          onClose={() => setCreateOfferItem(null)}
        />
      )}
    </AnimatePresence>
  );
};

export default FF14ItemTradingSystem;

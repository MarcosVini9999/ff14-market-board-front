import { NextApiRequest, NextApiResponse } from "next";
import api from "@/lib/api";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  switch (req.method) {
    case "GET":
      try {
        const { data } = await api.get("/players");
        res.status(200).json(data);
      } catch (error) {
        res.status(500).json({ message: "Failed to fetch players" });
      }
      break;

    case "POST":
      try {
        const { data } = await api.post("/players", req.body);
        res.status(201).json(data);
      } catch (error) {
        res.status(500).json({ message: "Failed to create player" });
      }
      break;

    default:
      res.setHeader("Allow", ["GET", "POST"]);
      res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}

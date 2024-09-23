import api from "@/lib/api";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  switch (req.method) {
    case "GET":
      try {
        const { data } = await api.get("/inventories");
        res.status(200).json(data);
      } catch (error) {
        res.status(500).json({ message: "Failed to fetch inventories" });
      }
      break;

    case "POST":
      try {
        const { data } = await api.post("/inventories", req.body);
        res.status(201).json(data);
      } catch (error) {
        res.status(500).json({ message: "Failed to create inventory" });
      }
      break;

    default:
      res.setHeader("Allow", ["GET", "POST"]);
      res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}

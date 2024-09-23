import api from "@/lib/api";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query;

  switch (req.method) {
    case "GET":
      try {
        const { data } = await api.get(`/players/${id}`);
        res.status(200).json(data);
      } catch (error) {
        res.status(500).json({ message: "Failed to fetch player" });
      }
      break;

    case "PUT":
      try {
        const { data } = await api.put(`/players/${id}`, req.body);
        res.status(200).json(data);
      } catch (error) {
        res.status(500).json({ message: "Failed to update player" });
      }
      break;

    default:
      res.setHeader("Allow", ["GET", "PUT"]);
      res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}

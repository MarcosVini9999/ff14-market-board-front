import api from "@/lib/api";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query;

  switch (req.method) {
    case "GET":
      try {
        const { data } = await api.get(`/items/${id}`);
        res.status(200).json(data);
      } catch (error) {
        res.status(500).json({ message: "Failed to fetch item" });
      }
      break;

    case "PUT":
      try {
        const { data } = await api.put(`/items/${id}`, req.body);
        res.status(200).json(data);
      } catch (error) {
        res.status(500).json({ message: "Failed to update item" });
      }
      break;

    case "DELETE":
      try {
        await api.delete(`/items/${id}`);
        res.status(204).end();
      } catch (error) {
        res.status(500).json({ message: "Failed to delete item" });
      }
      break;

    default:
      res.setHeader("Allow", ["GET", "PUT", "DELETE"]);
      res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}

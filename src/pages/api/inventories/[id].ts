import api from "@/lib/api";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query;

  switch (req.method) {
    case "GET":
      try {
        const { data } = await api.get(`/inventories/${id}`);
        res.status(200).json(data);
      } catch (error) {
        res.status(500).json({ message: "Failed to fetch inventory" });
      }
      break;

    case "PUT":
      try {
        const { data } = await api.put(`/inventories/${id}`, req.body);
        res.status(200).json(data);
      } catch (error) {
        res.status(500).json({ message: "Failed to update inventory" });
      }
      break;

    case "DELETE":
      try {
        await api.delete(`/inventories/${id}`);
        res.status(204).end();
      } catch (error) {
        res.status(500).json({ message: "Failed to delete inventory" });
      }
      break;

    default:
      res.setHeader("Allow", ["GET", "PUT", "DELETE"]);
      res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}

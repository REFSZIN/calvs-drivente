import { Router } from "express";
import { authenticateToken } from "@/middlewares";
import { getHotels, getRooms } from "@/controllers";
import {} from "@/schemas";

const hotelsRouter = Router();

hotelsRouter
  .all("/*", authenticateToken)
  .get("/", getHotels)
  .get("/:hotelId", getRooms);

export { hotelsRouter };

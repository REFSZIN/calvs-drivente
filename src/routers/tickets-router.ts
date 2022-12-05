import { Router } from "express";
import { authenticateToken } from "@/middlewares";
import { createTicket, getTicketTypes, getTicketTypesById } from "@/controllers";

const ticketsRouter = Router();

ticketsRouter
  .all("/*", authenticateToken)
  .get("/types", getTicketTypes)
  .get("/", getTicketTypesById)
  .post("/", createTicket);

export { ticketsRouter };

import { AuthenticatedRequest } from "@/middlewares";
import hotelsService from "@/services/hotels-service";
import { Response } from "express";
import httpStatus from "http-status";

export async function getHotels(req: AuthenticatedRequest, res: Response) {
  try {
    const ticketId = Number(req.query.HotelId);
    const { userId } = req;
    if (!ticketId || !userId) {
      return res.sendStatus(httpStatus.BAD_REQUEST);
    }
    const Hotels = await hotelsService.getHotelsByTicketId(userId, ticketId);

    return res.status(httpStatus.OK).send(Hotels);
  } catch (error) {
    return res.sendStatus(httpStatus.NO_CONTENT);
  }
}

export async function getRooms(req: AuthenticatedRequest, res: Response) {
  const HotelId = Number(req.query.HotelId);
  const { userId } = req;
  try {
    if (!HotelId || !userId ) {
      return res.sendStatus(httpStatus.BAD_REQUEST);
    }

    const Rooms = await hotelsService.getRoomsByHotelId(HotelId, userId);

    return res.status(httpStatus.OK).send(Rooms);
  } catch (error) {
    if (error.name === "NotFoundError") {
      return res.send(httpStatus.NO_CONTENT);
    }
  }
}

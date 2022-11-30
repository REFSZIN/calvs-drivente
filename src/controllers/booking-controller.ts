import { AuthenticatedRequest } from "@/middlewares";
import bookingService from "@/services/booking-service";
import { Response } from "express";
import httpStatus from "http-status";

export async function getBooking(req: AuthenticatedRequest, res: Response) {
  try {
    const ticketId = Number(req.query.HotelId);
    const { userId } = req;
    if (!ticketId || !userId) {
      return res.sendStatus(httpStatus.BAD_REQUEST);
    }
    const Hotels = await bookingService.getHotelsByTicketId(userId, ticketId);

    return res.status(httpStatus.OK).send(Hotels);
  } catch (error) {
    return res.sendStatus(httpStatus.NO_CONTENT);
  }
}

export async function postBooking(req: AuthenticatedRequest, res: Response) {
  const HotelId = Number(req.query.HotelId);
  const { userId } = req;
  try {
    if (!HotelId || !userId ) {
      return res.sendStatus(httpStatus.BAD_REQUEST);
    }
    const Rooms = await bookingService.getRoomsByHotelId(HotelId, userId);

    return res.status(httpStatus.OK).send(Rooms);
  } catch (error) {
    if (error.name === "NotFoundError") {
      return res.send(httpStatus.NO_CONTENT);
    }
  }
}

export async function putBooking(req: AuthenticatedRequest, res: Response) {
  const HotelId = Number(req.query.HotelId);
  const { userId } = req;
  try {
    if (!HotelId || !userId ) {
      return res.sendStatus(httpStatus.BAD_REQUEST);
    }getBooking, getBooking, putBooking;

    const Rooms = await bookingService.getRoomsByHotelId(HotelId, userId);

    return res.status(httpStatus.OK).send(Rooms);
  } catch (error) {
    if (error.name === "NotFoundError") {
      return res.send(httpStatus.NO_CONTENT);
    }
  }
}

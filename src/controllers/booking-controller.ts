import { AuthenticatedRequest } from "@/middlewares";
import bookingService from "@/services/booking-service";
import { Response } from "express";
import httpStatus from "http-status";

export async function getBooking(req: AuthenticatedRequest, res: Response) {
  const { userId } = req;
  try {
    if (!userId) {
      return res.sendStatus(httpStatus.BAD_REQUEST);
    }
    const Hotels = await bookingService.getBooking(userId);

    return res.status(httpStatus.OK).send(Hotels);
  } catch (error) {
    return res.sendStatus(httpStatus.NO_CONTENT);
  }
}

export async function postBooking(req: AuthenticatedRequest, res: Response) {
  const newBooking = req.body;
  const { userId } = req;
  try {
    if (!newBooking || !userId ) {
      return res.sendStatus(httpStatus.BAD_REQUEST);
    }
    const Rooms = await bookingService.postBooking(userId, newBooking);

    return res.status(httpStatus.OK).send(Rooms);
  } catch (error) {
    if (error.name === "NotFoundError") {
      return res.send(httpStatus.NO_CONTENT);
    }
  }
}

export async function putBooking(req: AuthenticatedRequest, res: Response) {
  const bookingId = Number(req.query.bookingId);
  const { userId } = req;
  try {
    if (!bookingId || !userId) {
      return res.sendStatus(httpStatus.BAD_REQUEST);
    }

    const Rooms = await bookingService.putBooking(bookingId, userId);

    return res.status(httpStatus.OK).send(Rooms);
  } catch (error) {
    if (error.name === "NotFoundError") {
      return res.send(httpStatus.NO_CONTENT);
    }
  }
}

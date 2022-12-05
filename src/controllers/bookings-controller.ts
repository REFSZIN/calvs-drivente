import { Response } from "express";
import { AuthenticatedRequest } from "@/middlewares";
import bookingService from "@/services/bookings-service";
import httpStatus from "http-status";

export async function getBooking(req: AuthenticatedRequest, res: Response) {
  const { userId } = req;

  try {
    const booking = await bookingService.getBooking(userId);

    return res.status(httpStatus.OK).send(booking);
  } catch (error) {
    return res.sendStatus(httpStatus.NOT_FOUND);
  }
}

export async function createBooking(req: AuthenticatedRequest, res: Response) {
  const { userId } = req;
  const { roomId } = req.body;

  try {
    if(!roomId) {
      return res.sendStatus(httpStatus.FORBIDDEN);
    }

    const bookingResult = await bookingService.createBooking(roomId, userId);

    return res.status(httpStatus.OK).send({ bookingId: bookingResult.id });
  } catch (error) {    
    if(error.name === "ForbiddenError") {
      return res.sendStatus(httpStatus.FORBIDDEN);
    }
    return res.sendStatus(httpStatus.NOT_FOUND);    
  }
}

export async function updateBooking(req: AuthenticatedRequest, res: Response) {
  const { userId } = req;
  const { roomId } = req.body;
  const { bookingId } = req.params;

  try {
    if(!roomId) {
      return res.sendStatus(httpStatus.FORBIDDEN);
    }

    if(!bookingId || Number(bookingId) < 1) {
      return res.sendStatus(httpStatus.FORBIDDEN);
    }

    const bookingResult = await bookingService.updateBooking(roomId, userId, Number(bookingId));

    return res.status(httpStatus.OK).send({ bookingId: bookingResult.id });
  } catch (error) {    
    if(error.name === "ForbiddenError") {
      return res.sendStatus(httpStatus.FORBIDDEN);
    }
    return res.sendStatus(httpStatus.NOT_FOUND);    
  }
}

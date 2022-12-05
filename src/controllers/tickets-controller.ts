import { AuthenticatedRequest } from "@/middlewares";
import enrollmentsService from "@/services/enrollments-service";
import ticketsService from "@/services/tickets-service";
import { Response } from "express";
import httpStatus from "http-status";

export async function getTicketTypes(req: AuthenticatedRequest, res: Response) {
  try {
    const ticketTypes = await ticketsService.getTicketTypes();

    if(!ticketTypes) {
      return res.status(httpStatus.OK).send([]);
    }
  
    return res.status(httpStatus.OK).send(ticketTypes);
  } catch (error) {
    return res.send(httpStatus.NOT_FOUND);
  }  
}

export async function getTicketTypesById(req: AuthenticatedRequest, res: Response) {  
  const { userId } = req;

  try {
    const getEnrollmentByUserId = await enrollmentsService.getOneWithAddressByUserId(userId);

    const enrollmentId = getEnrollmentByUserId.id;

    const ticket = await ticketsService.getTicketByEnrollmentId(enrollmentId);

    if(!ticket.enrollmentId) {
      return res.sendStatus(httpStatus.NOT_FOUND);
    }

    return res.status(httpStatus.OK).send(ticket);
  } catch (error) {
    return res.sendStatus(httpStatus.NOT_FOUND);
  }
}

export async function createTicket(req: AuthenticatedRequest, res: Response) {
  const { userId } = req;
  const { ticketTypeId } = req.body;

  if(!ticketTypeId) {
    return res.sendStatus(httpStatus.BAD_REQUEST);
  }

  try {
    const getEnrollmentByUserId = await enrollmentsService.getOneWithAddressByUserId(userId);

    const enrollmentId = getEnrollmentByUserId.id;

    await ticketsService.createTicket(ticketTypeId, enrollmentId);

    const ticket = await ticketsService.getTicketByEnrollmentId(enrollmentId);

    return res.status(httpStatus.CREATED).send(ticket);
  } catch (error) {
    return res.sendStatus(httpStatus.NOT_FOUND);
  }
}

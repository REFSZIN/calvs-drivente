import { notFoundError } from "@/errors";
import { TicketAndTicketTypeEntity } from "@/protocols";
import ticketRepository from "@/repositories/ticket-repository";
import { Ticket, TicketType } from "@prisma/client";

async function getTicketTypes(): Promise<TicketType[]> {
  return await ticketRepository.findMany();
}

async function getTicketById(ticketId: number): Promise<TicketAndTicketTypeEntity> {
  return await ticketRepository.findTicketById(ticketId);
}

async function getTicketByEnrollmentId(enrollmentId: number): Promise<TicketAndTicketTypeEntity> {
  const ticketResult = await ticketRepository.findTicketByEnrollmentId(enrollmentId);

  if(!ticketResult) throw notFoundError();

  return ticketResult;
}

async function  createTicket(ticketTypeId: number, enrollmentId: number) {
  return await ticketRepository.create(ticketTypeId, enrollmentId);
}

async function updateTicket(ticketId: number): Promise<Ticket> {
  return await ticketRepository.update(ticketId);
}

const ticketsService = {
  getTicketTypes,
  getTicketById,
  getTicketByEnrollmentId,
  createTicket,
  updateTicket  
};

export default ticketsService;

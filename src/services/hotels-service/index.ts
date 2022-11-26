import { notFoundError } from "@/errors"; 
import hotelsRepository from "@/repositories/hotels-repository";
import { Hotel } from "@prisma/client";

async function getHotelsByTicketId(userId: number, ticketId: number) {
  const result = await hotelsRepository.findHotelByTicketId(userId, ticketId);
  if (!result) {
    throw notFoundError(); //lançar -> pro arquivo que chamou essa função
  }
  return result;
}

async function getRoomsByHotelId(HotelId: number, userId: number) {
  const enrollmentWithAddress = await hotelsRepository.findtRoomsByHotelId(HotelId, userId);

  if (!enrollmentWithAddress) throw notFoundError();

  return {
    enrollmentWithAddress
  };
}

const hotelsService = {
  getHotelsByTicketId,
  getRoomsByHotelId
};

export default hotelsService;

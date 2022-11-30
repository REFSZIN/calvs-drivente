import hotelRepository from "@/repositories/hotel-repository";
import enrollmentRepository from "@/repositories/enrollment-repository";
import bookingRepository from "@/repositories/booking-repository";
import ticketRepository from "@/repositories/ticket-repository";
import { notFoundError } from "@/errors";
import { cannotListHotelsError } from "@/errors/cannot-list-hotels-error";

async function getBooking(userId: number) {
  //Tem enrollment?
  const enrollment = await bookingRepository.findWithAddressByUserId(userId);
  if (!enrollment) {
    throw notFoundError();
  }
  //Tem ticket pago isOnline false e includesHotel true
  const ticket = await ticketRepository.findTicketByEnrollmentId(enrollment.id);

  if (!ticket || ticket.status === "RESERVED" || ticket.TicketType.isRemote || !ticket.TicketType.includesHotel) {
    throw cannotListHotelsError();
  }
}

async function postBooking(userId: number) {
  await listHotels(userId);

  const hotels = await bookingRepository.findHotels();
  return hotels;
}

async function putBooking(userId: number, hotelId: number) {
  await listHotels(userId);
  const hotel = await bookingRepository.findRoomsByHotelId(hotelId);

  if (!hotel) {
    throw notFoundError();
  }
  return hotel;
}

const bookingService = {
  getBooking,
  postBooking,
  putBooking,
};

export default bookingService;

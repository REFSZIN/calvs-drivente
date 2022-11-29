import { prisma } from "@/config";
import { Hotel } from "@prisma/client";

async function findHotelByTicketId(userId: number, ticketId: number) {
  return prisma.hotel.findMany();
}

async function findtRoomsByHotelId(HotelId: number, userId: number) {
  return prisma.room.findFirst({
    where: { hotelId: HotelId },
    include: {
      
    },
  });
}

export type CreatHotelParams = Omit<Hotel, "id" | "createdAt" | "updatedAt">;
export type UpdateHotelParams = Omit<CreatHotelParams, "userId">;

const hotelsRepository = {
  findHotelByTicketId,
  findtRoomsByHotelId
};

export default hotelsRepository;

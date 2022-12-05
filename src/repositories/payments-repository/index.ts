import { prisma } from "@/config";
import { Prisma } from "@prisma/client";

async function findPaymentByTicketId(ticketId: number) {
  return await prisma.payment.findFirst({
    where: { ticketId }
  }); 
}

async function create(paymentDataCreate: Prisma.PaymentUncheckedCreateInput) {
  return await prisma.payment.create({
    data: paymentDataCreate
  });
}

const paymentRepository = {
  findPaymentByTicketId,
  create
};

export default paymentRepository;

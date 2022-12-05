import { notFoundError } from "@/errors";
import paymentRepository from "@/repositories/payments-repository";
import { Payment } from "@prisma/client";
import { Prisma } from "@prisma/client";

async function getPaymentByTicketId(ticketId: number): Promise<Payment> {  
  const paymentResult = await paymentRepository.findPaymentByTicketId(ticketId);
  
  if(!paymentResult) throw notFoundError();

  return paymentResult;
}

async function createPayment(paymentDataCreate: Prisma.PaymentUncheckedCreateInput) {
  return await paymentRepository.create(paymentDataCreate);
}

const paymentService = {
  getPaymentByTicketId,
  createPayment
};

export default paymentService;

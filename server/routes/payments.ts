// src/payments.ts

interface PaymentPayload {
  orderId: number;
  paymentMethod: string;
}

// POST /payments
const createPayment = async (payload: PaymentPayload) => {

  // 1. 检查订单状态
  const order = await prisma.order.findUnique({
    where: {
      id: payload.orderId
    }
  });

  if (!order || order.status !== 'CREATED') {
    throw new Error('订单状态不正确');
  }

  // 2. 调用支付网关 SDK
  const result = await paymentSDK(payload);

  // 3. 更新订单状态
  await prisma.order.update({
    where: { 
      id: payload.orderId
    },
    data: {
      status: 'PAID'
    }
  });

  // 4. 返回结果
  return result;

}
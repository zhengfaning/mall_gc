interface DeliveryPayload {
  orderId: number;
  shippingCompany: string;
  shippingNumber: string; 
}

// PUT /orders/:orderId/delivery
const createDelivery = async (payload: DeliveryPayload) => {

  // 1. 权限验证
  const userId = getCurrentUserId();
  const order = await prisma.order.findUnique({
    where: {
      id: payload.orderId 
    }
  });

  if(!order || order.userId !== userId) {
    throw new Error('无权限');
  }

  // 2. 更新发货状态
  await prisma.order.update({
    where: {
      id: payload.orderId   
    },
    data: {
      status: 'DELIVERED',
    }
  });

  // 3. 记录物流信息
  await prisma.order.update({
    data: {
      shippingCompany: payload.shippingCompany,
      shippingNumber: payload.shippingNumber  
    }
  });
  
  // 4. 返回结果
  return {
    message: '发货成功'
  }

}
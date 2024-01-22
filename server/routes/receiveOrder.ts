// receiveOrder.ts

interface ReceiveOrderParams {
  orderId: number; 
}

// PUT /orders/:orderId/receive
const receiveOrder = async (params: ReceiveOrderParams) => {

  // 1. 验证权限
  const userId = getCurrentUserId();
  const order = await prisma.order.findUnique({
    where: {
      id: params.orderId 
    }
  });

  if(!order || order.userId !== userId) {
    throw new Error('无权限');
  }

  // 2. 校验状态
  if(order.status !== 'DELIVERED') {
    throw new Error('订单状态不正确');
  }

  // 3. 更新状态为已收货
  await prisma.order.update({
    where: {
      id: params.orderId
    },
    data: {
      status: 'RECEIVED'
    }
  });

  return {
    message: '订单已收货'
  }

}
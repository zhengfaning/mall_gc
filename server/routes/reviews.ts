// src/reviews.ts 

interface CreateReviewParams {
    orderId: number;
    score: number; 
    content: string;
  }  
  
const createReview = async(params: CreateReviewParams) => {

  // 1. 验证权限 和 订单状态
  const userId = getCurrentUserId();
  const order = await prisma.order.findUnique({
    where: {
      id: params.orderId 
    }
  });

  if(!order || order.userId !== userId) {
    throw new Error('无权限');
  }

  if(order.status !== 'RECEIVED') {
    throw new Error('订单状态不正确');
  }

  // 2. 创建评价数据
  await prisma.review.create({
    data: {
      orderId: params.orderId,
      score: params.score,
      content: params.content
    }
  });

  // 3. 统计商品评分
  const orderItems = await prisma.orderItem.findMany({
    where: {
      orderId: params.orderId
    }
  });
  
  orderItems.forEach(async item => {
    const product = await prisma.product.findUnique({
      where: {
        id: item.productId  
      }
    });
    const totalScore = calculateScore(product.reviews); 
    await prisma.product.update({
      data: { 
        score: totalScore
      }
    });
  });
  
  return {
    message: '评价成功'
  }  
}
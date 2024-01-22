// src/orders.ts

interface OrderQueryParams {
  page?: number;
  limit?: number;
  status?: OrderStatus;
  startDate?: Date;
  endDate?: Date;
}

// GET /orders
const getOrders = async (params: OrderQueryParams) => {

  const where: any = {};
  
  if(params.status) {
    where.status = params.status;
  }

  if(params.startDate && params.endDate) {
    where.createdAt = {
      gte: params.startDate,
      lte: params.endDate
    }
  } 

  const orders = await prisma.order.findMany({
    where,
    skip: params.page * params.limit, 
    take: params.limit
  });

  return orders;
}
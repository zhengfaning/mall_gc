import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// POST /api/orders
app.post('/orders', async (req, res) => {

    // 1. 获取用户信息
    const userId = req.user.id;
    
    // 2. 获取购物车数据 
    const { items } = req.body;
    
    // 3. 校验购物车数据
  
    // 4. 计算总价
    let total = 0;
    items.forEach(item => {
      total += item.price * item.quantity; 
    });
  
    // 5. 创建订单主记录
    const order = await prisma.order.create({
      data: {
        user: { connect: { id: userId } },
        total  
      }
    });
  
    // 6. 创建订单商品记录
    items.forEach(async item => {
      await prisma.orderItem.create({
        data: {
          order: { connect: { id: order.id } }, 
          product: { connect: { id: item.productId } },
          price: item.price,
          quantity: item.quantity   
        }
      })
    });
  
    // 7. 清空购物车 
  
    // 8. 返回结果
  
  });
  
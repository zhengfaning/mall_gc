// 创建用户请求参数 
interface CreateUserParams {
    username: string;
    password: string;
  }
  
  // POST /users
  app.post('/users', async (req: Request, res: Response) => {
    const {username, password} = req.body as CreateUserParams;
    
    // 参数校验
  
    const hashed = await hashPassword(password); 
    
    const user = await prisma.user.create({
      data: {
        username,
        passwordHash: hashed,
      },
    });
  
    res.json(user);
  });
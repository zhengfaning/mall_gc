async function register(req, h) {
    // 获取参数
    const { name, email, password } = req.payload;
  
    // 数据验证
  
    // 密码加密
  
    const user = await User.create({
      name, 
      email,
      password
    });
  
    return h.response({
      message: '注册成功'
    }).code(201);
  }
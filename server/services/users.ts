// src/services/users.ts

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

interface User {
  id: number;
  username: string;
  passwordHash: string;
}

interface CreateUserParams {
  username: string;
  password: string;
}

// 创建用户
const createUser = async (params: CreateUserParams): Promise<User> => {

  // 1. 对密码加密
  const passwordHash = await hashPassword(params.password);  

  // 2. 保存到数据库
  const user = await prisma.user.create({
    data: {
      username: params.username,
      passwordHash,
    },
  });

  // 3. 返回用户信息
  return {
    id: user.id,
    username: user.username,
    passwordHash: user.passwordHash,
  };

};

// 对密码加密 
const hashPassword = async (password: string) => {
 // 使用 bcryptjs 加密 
    const salt = await bcrypt.genSalt(10);  
    const hashed = await bcrypt.hash(password, salt);

 return hashed;
};

// 查询用户
const findUserByUsername = async(username: string) => {
  
  return await prisma.user.findUnique({
    where: { username },
  });
  
}

export {
  createUser,
  findUserByUsername  
}
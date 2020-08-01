import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

import { APP_SECRET, getUserId } from '../utils';

const post = (_: any, { url, description }: any, context: any) => {
  const userId = getUserId(context);

  return context.prisma.link.create({
    data: {
      url,
      description,
      postedBy: { connect: { id: userId } }
    }
  });
};

const updateLink = (_: any, { id, url, description }: any, context: any) => {
  const linkToUpdate = context.prisma.link.update({
    where: {
      id
    },
    data: {
      url,
      description
    }
  });
  return linkToUpdate;
};

const deleteLink = (_: any, { id, url, description }: any, context: any) => {
  console.log(typeof id);
  return context.prisma.link.delete({
    where: {
      id
    }
  });
};

async function signup(parent: any, args: any, context: any, info: any) {
  // 1
  const password = await bcrypt.hash(args.password, 10);

  // 2
  const user = await context.prisma.user.create({
    data: { ...args, password }
  });

  // 3
  const token = jwt.sign({ userId: user.id }, APP_SECRET);

  // 4
  return {
    token,
    user
  };
}

async function login(parent: any, args: any, context: any, info: any) {
  // 1
  const user = await context.prisma.user.findOne({
    where: { email: args.email }
  });
  if (!user) {
    throw new Error('No such user found');
  }

  // 2
  const valid = await bcrypt.compare(args.password, user.password);
  if (!valid) {
    throw new Error('Invalid password');
  }

  const token = jwt.sign({ userId: user.id }, APP_SECRET);

  console.log('user ' + JSON.stringify(user));

  // 3
  return {
    token,
    user
  };
}

export default {
  post,
  updateLink,
  deleteLink,
  signup,
  login
};

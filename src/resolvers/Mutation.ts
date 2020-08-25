import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

import { APP_SECRET, getUserId } from '../utils';

const post = (_: any, { url, description }: any, context: any) => {
  const userId = getUserId(context);

  const newLink = context.prisma.link.create({
    data: {
      url,
      description,
      postedBy: { connect: { id: userId } }
    }
  });

  context.pubsub.publish('NEW_LINK', newLink);

  return newLink;
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

const deleteLink = (_: any, { id }: any, context: any) => {
  const userId = getUserId(context);
  id = parseInt(id, 10);
  return context.prisma.link.delete({
    where: {
      id,
      postedById: userId
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

async function login(parent: any, args: any, context: any) {
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

async function vote(parent: any, args: any, context: any, info: any) {
  // 1
  const userId = getUserId(context);

  // 2
  const prevVote = await context.prisma.vote.findOne({
    where: {
      linkId_userId: {
        linkId: Number(args.linkId),
        userId
      }
    }
  });

  if (Boolean(prevVote)) {
    throw new Error(`Already voted for link: ${args.linkId}`);
  }

  // 3
  const newVote = context.prisma.vote.create({
    data: {
      user: { connect: { id: userId } },
      link: { connect: { id: Number(args.linkId) } }
    }
  });
  context.pubsub.publish('NEW_VOTE', newVote);

  return newVote;
}

export default {
  post,
  updateLink,
  deleteLink,
  signup,
  login,
  vote
};

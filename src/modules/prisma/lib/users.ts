import { User } from "@prisma/client";
import prisma from "./prisma";

export async function getUsers(limit?: number) {
  try {
    const users = await prisma.user.findMany({
      orderBy: {
        lastName: "asc",
      },
      ...(limit ? { take: limit } : {}),
    });
    return { users };
  } catch (error) {
    return { error };
  }
}

export async function createUser(data: User) {
  try {
    const user = await prisma.user.create({ data });
    return { user };
  } catch (error) {
    return { error };
  }
}

export async function getUserById(id: string) {
  return await prisma.user.findUnique({
    where: {
      id,
    },
    include: {
      searched_reports: {
        orderBy: {
          created_at: "asc",
        },
      },
      referred_users: true,
      referred_by: true,
    },
  });
}

export async function getUserByEmail(email: string) {
  return await prisma.user.findUnique({
    where: {
      email,
    },
    include: {
      searched_reports: {
        orderBy: {
          created_at: "asc",
        },
      },
      referred_users: true,
      referred_by: true,
    },
  });
}

export async function updateUser(id: string, data: Partial<User>) {
  try {
    const user = await prisma.user.update({
      where: { clerk_id: id },
      data,
    });
    return { user };
  } catch (error) {
    return { error };
  }
}

export async function deleteUser(id: string) {
  try {
    const user = await prisma.user.delete({ where: { clerk_id: id } });
    return { user };
  } catch (error) {
    return { error };
  }
}

export async function combineName(user: User) {
  const { firstName, lastName } = user;
  return `${firstName} ${lastName}`;
}

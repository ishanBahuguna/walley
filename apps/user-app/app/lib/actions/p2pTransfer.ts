"use server";

import { getServerSession } from "next-auth";
import { authOptions } from "../auth";
import prisma from "@repo/db/client";


export async function p2pTransfer(to: string, amount: number) {
  try {
    const session = await getServerSession(authOptions);
    const from = session?.user?.id;

    if (!from) {
      return {
        success: false,
        message: "Error while sending",
      };
    }

    const toUser = await prisma.user.findFirst({
      where: {
        number: to,
      },
    });

    if (!toUser) {
      return {
        success: false,
        message: "User not found",
      };
    }

    await prisma.$transaction(async (tx) => {
      // tx is of type PrismaClient
      //locking the row so that it can't be accessed by multiple req (From first principles u should add Queue services but db's provide lockind the rows out of the box)
      await tx.$queryRaw`SELECT * FROM "Balance" WHERE "userId" = ${Number(from)} FOR UPDATE`;

      const fromBalance = await tx.balance.findUnique({
        where: {
          userId: Number(from),
        },
      });
      console.log("above sleep");
      await new Promise(resolve => (setTimeout(resolve , 4000)));
      console.log("after sleep");
      if (!fromBalance || fromBalance.amount < amount) {
        throw new Error("Insufficient funds");
      }

      await tx.balance.update({
        where: {
          userId: Number(from),
        },
        data: {
          amount: {
            decrement: amount,
          },
        },
      });

      await tx.balance.update({
        where: {
          userId: toUser.id,
        },
        data: {
          amount: {
            increment: amount,
          },
        },
      });

      await tx.p2pTransfer.create({
        data:{
            fromUserId:from,
            toUserId:toUser.id,
            amount,
            timestamp:new Date()
        }
      })
    });
  } catch (e: any) {
    console.log(e);
    return {
      message: "Error occured in p2pTransfer",
    };
  }
}

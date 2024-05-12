import { getServerSession } from "next-auth";
import { authOptions } from "../auth";
import prisma from "@repo/db/client";

export async function getAllTransactions() {
    const session = await getServerSession(authOptions);

    try {

        if (!session || !session.user) {
            throw new Error("User session not found");
        }

        const userId = Number(session.user.id);

        const user = await prisma.user.findUnique({
            where: {
                id: userId
            },
            include: {
                sentTransfers:{
                    select: {
                        id:true,
                        amount: true,
                        timestamp:true,
                        fromUserId:true,
                        toUserId:true,
                        note: true
                    }
                },
                receivedTransfers:{
                    select: {
                        id:true,
                        amount: true,
                        timestamp:true,
                        fromUserId:true,
                        toUserId:true,
                        note: true
                    }
                },
                OnRampTransaction:{
                    select: {
                        id:true,
                        amount: true,
                        startTime:true,
                        userId:true
                    }
                }
            }
        });

         const allTransactions = [
            ...(user?.sentTransfers ?? []).map((transfer:any) => ({
                ...transfer,
                type: "SentTransfer",
                startTime:transfer.timestamp,
                userId:transfer.fromUserId
            })),
            ...(user?.receivedTransfers ?? []).map((transfer:any) => ({
                ...transfer,
                type: "ReceivedTransfer",
                startTime:transfer.timestamp,
                userId:transfer.toUserId
            })),
            ...(user?.OnRampTransaction ?? []).map((onRampTransaction:any) => ({
                ...onRampTransaction,
                type: "OnRampTransaction",
                note: "Bank Transfer",
                timestamp:onRampTransaction.startTime,
                fromUserId:0,
                toUserId:onRampTransaction.userId
            }))
        ];

        const sortedTransactions = allTransactions.sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime());

        return sortedTransactions;

    } catch (error) {
        console.error('Error fetching transaction data:', error);
    }
}

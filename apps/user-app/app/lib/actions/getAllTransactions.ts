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
                        note: true
                    }
                },
                receivedTransfers:{
                    select: {
                        id:true,
                        amount: true,
                        note: true
                    }
                },
                OnRampTransaction:{
                    select: {
                        id:true,
                        amount: true
                    }
                }
            }
        });

         const allTransactions = [
            ...(user?.sentTransfers ?? []).map(transfer => ({
                ...transfer,
                type: "SentTransfer",
                amount: -transfer.amount
            })),
            ...(user?.receivedTransfers ?? []).map(transfer => ({
                ...transfer,
                type: "ReceivedTransfer"
            })),
            ...(user?.OnRampTransaction ?? []).map(onRampTransaction => ({
                ...onRampTransaction,
                type: "OnRampTransaction",
                note: "Bank Transfer"
            }))
        ];

        return allTransactions;

    } catch (error) {
        console.error('Error fetching transaction data:', error);
    }
}

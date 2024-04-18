"use server"
import { getServerSession } from "next-auth";
import { authOptions } from "../auth";
import prisma from "@repo/db/client";

export async function getPieChartData() {

    const session = await getServerSession(authOptions);
  
    try {
        const currentDate = new Date();
        const currentMonth = currentDate.getMonth() + 1;
  
        const user = await prisma.user.findUnique({
          where: {
              id: Number(session.user.id)
          },
          include: {
              sentTransfers: {
                  select: {
                      amount: true,
                      note: true
                  }
              }
          }
      });
  
      const transactions = user?.sentTransfers || [];

      const pieChartData = [
        {
            "id": "Food_Dining",
            "label": "Food_Dining",
            "value":transactions.reduce((acc, curr) => (curr.note === 'Food_Dining' ? acc + curr.amount/100 : acc), 0),
            "color": "hsl(317, 70%, 50%)"
        },
        {
            "id": "Entertainment",
            "label": "Entertainment",
            "value": transactions.reduce((acc, curr) => (curr.note === 'Entertainment' ? acc + curr.amount/100 : acc), 0),
            "color": "hsl(228, 70%, 50%)"
        },
        {
            "id": "Investment",
            "label": "Investment",
            "value": transactions.reduce((acc, curr) => (curr.note === 'Investment' ? acc + curr.amount/100 : acc), 0),
            "color": "hsl(158, 70%, 50%)"
        },
        {
            "id": "Utilities",
            "label": "Utilities",
            "value": transactions.reduce((acc, curr) => (curr.note === 'Utilities' ? acc + curr.amount/100 : acc), 0),
            "color": "hsl(60, 70%, 50%)"
        },
        {
            "id": "Transportation",
            "label": "Transportation",
            "value": transactions.reduce((acc, curr) => (curr.note === 'Transportation' ? acc + curr.amount/100 : acc), 0),
            "color": "hsl(101, 70%, 50%)"
        },
        {
            "id": "P2P",
            "label": "P2P",
            "value": transactions.reduce((acc, curr) => (curr.note === 'P2P' ? acc + curr.amount/100 : acc), 0),
            "color": "hsl(13, 70%, 50%)"
        }
      ]

      return pieChartData;
  
    } catch (error) {
        console.error('Error fetching transaction data:', error);
    }
  }
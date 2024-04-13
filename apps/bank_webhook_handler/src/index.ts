import express from "express";
import db from "@repo/db/client";
import z from "zod";

const paymentInformationInput = z.object({
    token: z.string(),
    userId: z.string(),
    amount: z.string()
})

const app = express();

app.use(express.json())

app.post("/hdfcWebhook", async (req, res) => {
    //TODO: HDFC bank should ideally send us a secret so we know this is sent by them
    const {success} = paymentInformationInput.safeParse({token: req.body.token,userId: req.body.user_identifier,amount: req.body.amount})
    
    if(!success)
    {
        res.status(403).json({
            message: "Wrong Payment Infomation"
        })
    }

    const paymentInformation: {
        token: string;
        userId: string;
        amount: string
    } = {
        token: req.body.token,
        userId: req.body.user_identifier,
        amount: req.body.amount
    };

    try {
        await db.$transaction([
            db.balance.updateMany({
                where: {
                    userId: Number(paymentInformation.userId)
                },
                data: {
                    amount: {
                        increment: Number(paymentInformation.amount)
                    }
                }
            }),
            db.onRampTransaction.updateMany({
                where: {
                    token: paymentInformation.token
                }, 
                data: {
                    status: "Success",
                }
            })
        ]);

        res.json({
            message: "Captured"
        })
    } catch(e) {
        console.error(e);
        res.status(411).json({
            message: "Error while processing webhook"
        })
    }

})

app.listen(3003);
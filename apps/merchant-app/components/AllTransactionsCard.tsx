import React from 'react'
import { Card } from "@repo/ui/card"
import { getAllTransactions } from '../app/lib/actions/getAllTransactions'
import { useEffect, useState } from 'react';

const AllTransactionsCard = ({
    txn
}: {
    txn: {
        type: string;
        note: string;
        timestamp: Date;
        fromUserId: number;
        toUserId: number;
        id: number;
        amount: number;
        startTime: Date;
        userId: number;
    }[] | undefined
}) => {
    return (
        <Card title="Transaction Details">
            <div className="grid grid-cols-5 gap-1 pt-2">
                <div className="font-semibold pb-2">Date</div>
                <div className="font-semibold pb-2">From</div>
                <div className="font-semibold pb-2">To</div>
                <div className="font-semibold pb-2">Note</div>
                <div className="font-semibold pb-2">Amount</div>

                {txn && txn.map((transaction, index) => (
                    <React.Fragment key={index}>
                        <div className='pb-2 border-b-2 flex flex-col justify-center'>
                            <div className="text-sm">
                            {transaction.id ? transaction.id : '-'}
                            </div>
                            <div className="text-slate-600 text-xs">
                                {transaction.timestamp ? transaction.timestamp.toDateString() : '-'}
                            </div>
                        </div>

                        <div className='pb-2 border-b-2 flex flex-col justify-center'>
                            {transaction.fromUserId ? transaction.fromUserId : '-'}
                        </div>
                        <div className='pb-2 border-b-2 flex flex-col justify-center'>
                            {transaction.toUserId ? transaction.toUserId : '-'}
                        </div>
                        <div className='pb-2 border-b-2 flex flex-col justify-center'>
                            {transaction.note ? transaction.note : '-'}
                        </div>
                        <div className={`pb-2 border-b-2 flex flex-col justify-center ${transaction.type=="SentTransfer" ? 'text-red-500' : 'text-green-500'}`}>
                            {transaction.type=="SentTransfer" ? transaction.amount ? `- ${transaction.amount/100}` : '-' : transaction.amount ? `+ ${transaction.amount/100}` : '-'}
                        </div>
                    </React.Fragment>
                ))}
            </div>
        </Card>
    );
}

export default AllTransactionsCard;

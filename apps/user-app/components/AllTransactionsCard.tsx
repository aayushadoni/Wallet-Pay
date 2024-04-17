import React from 'react'
import { Card } from "@repo/ui/card"
import { getAllTransactions } from '../app/lib/actions/getAllTransactions'
import { useEffect, useState } from 'react';



const AllTransactionsCard = () => {

    //  const [AllTransactions, SetAllTransactions] = useState<{
    //     type: string;
    //     note: string;
    //     id: number;
    //     amount: number;
    //   }[]>([]);
    
    //   useEffect(() => {
    //     const fetchData = async () => {
    //       const data = await getAllTransactions();
    //       SetAllTransactions(data||[]);
    //       console.log(data);
    //     };
    //     fetchData();
    //   }, []);
  return (
    <Card title="All Transaction">
        <div className="grid grid-cols-5 gap-1 pt-2">
            <div>
                <div className="font-semibold">Date</div>
            </div>
            <div>
                <div className="font-semibold">From</div>
            </div>
            <div>
                <div className="font-semibold">To</div>
            </div>
            <div>
                <div className="font-semibold">Note</div>
            </div>
            <div>
                <div className="font-semibold">Amount</div>
            </div>
        </div>
    </Card>
  )
}

export default AllTransactionsCard
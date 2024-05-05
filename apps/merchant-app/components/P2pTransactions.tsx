import { Card } from "@repo/ui/card"

export const P2pTransactions = ({
    transactions
}: {
    transactions: {
        time: Date,
        amount: number
        from:number
    }[]
}) => {

    const sortedTransactions = transactions.sort((a, b) => b.time.getTime() - a.time.getTime());

    const recentTransactions = sortedTransactions.slice(0, 6);

    if (!recentTransactions.length) {
        return <Card title="Recent Transactions">
            <div className="text-center pb-8 pt-8">
                No Recent transactions
            </div>
        </Card>
    }
    return <Card title="Recent Transactions">
        <div className="pt-2">
            {recentTransactions.map(t => <div className="flex justify-between border-b-2 pb-1">
                <div>
                    <div className="text-sm">
                    {(t.amount>0) ? "Recieved INR" : "Sent INR" }
                    </div>
                    <div className="text-slate-600 text-xs">
                        {t.time.toDateString()}
                    </div>
                </div>
                <div className={`flex flex-col justify-center ${t.amount < 0 ? 'text-red-500' : 'text-green-500'}`}>
                    {(t.amount>0) ? `+ Rs ${t.amount / 100}` : `- Rs ${t.amount * -1 / 100}`}
                </div>

            </div>)}
        </div>
    </Card>
}
import AllTransactionsCard from "../../../components/AllTransactionsCard";
import { getAllTransactions } from "../../lib/actions/getAllTransactions";


export default async function() {

    const data = await getAllTransactions();

    return <div className="w-full">
        <div className="text-4xl text-[#6a51a6] pt-8 mb-8 font-bold ml-4">
            All Transactions
        </div>
        <AllTransactionsCard txn = {data} />
    </div>
}
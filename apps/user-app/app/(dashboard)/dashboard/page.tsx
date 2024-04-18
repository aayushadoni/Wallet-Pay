"use client"
import { PieChart } from "../../../components/PieChart";
import { LineChart } from "../../../components/LineChart";


export default function Dashboard() {
    return (
        <div className="w-screen">
            <div className="text-4xl text-[#6a51a6] pt-8 mb-8 font-bold ml-4">
                Dashboard
            </div>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 p-4">
                <div>
                    <PieChart />
                </div>
                <div>
                    <LineChart />
                </div>
            </div>
        </div>
    );
}

"use client"
import { Button } from "@repo/ui/button";
import { Card } from "@repo/ui/card";
import { useState } from "react";
import { TextInput } from "@repo/ui/textinput";
import { p2pTransfer } from "../app/lib/actions/p2pTransfer";

export const P2pCard = () => {
    const [value, setValue] = useState(0)
    const [number,setNumber] = useState("")
    return <Card title="Send Money">
    <div className="w-full">
        <TextInput label={"Number"} placeholder={"Number"} onChange={(val) => {
            setNumber(val)
        }} />
        <div className="py-4 text-left">
        </div>
        <TextInput label={"Amount"} placeholder={"Amount"} onChange={(val) => {
            setValue(Number(val)*100)
        }} />
        <div className="flex justify-center pt-4">
            <Button onClick={async () => {
                await p2pTransfer(number, value)
            }}>
            Send Money
            </Button>
        </div>
    </div>
</Card>
}
"use client"
import { Button } from "@repo/ui/button";
import { Card } from "@repo/ui/card";
import { useState } from "react";
import { TextInput } from "@repo/ui/textinput";
import { Select } from "@repo/ui/select";
import { p2pTransfer } from "../app/lib/actions/p2pTransfer";

enum SUPPORTED_Notes {
    Food_Dining = "Food_Dining",
    Entertainment = "Entertainment",
    Investment = "Investment",
    Utilities = "Utilities",
    Transportation = "Transportation",
    P2P = "P2P"
}

    
export const P2pCard = () => {
    const [value, setValue] = useState(0)
    const [number,setNumber] = useState("")
    const [note, setNote] = useState<SUPPORTED_Notes>(SUPPORTED_Notes.Food_Dining);
    return <Card title="Send Money">
    <div className="w-full">
        <TextInput label={"Number"} placeholder={"Number"} onChange={(val) => {
            setNumber(val)
        }} />
        
        <TextInput label={"Amount"} placeholder={"Amount"} onChange={(val) => {
            setValue(Number(val)*100)
        }} />
        <div className="pt-4 pb-1 text-left">
            Transaction Note
        </div>
        <Select onSelect={(value) => {
            setNote(value as SUPPORTED_Notes);
        }} options={Object.values(SUPPORTED_Notes).map(x => ({
            key: x,
            value: x
        }))} />
        <div className="flex justify-center pt-4">
            <Button onClick={async () => {
                await p2pTransfer(number, value, note)
            }}>
            Send Money
            </Button>
        </div>
    </div>
</Card>
}
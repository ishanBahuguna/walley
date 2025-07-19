import { getServerSession } from "next-auth";
import { authOptions } from "../../lib/auth";
import prisma from "@repo/db/client";
import { OnRampTransaction } from "../../../types";
import { OnRampTransactions } from "../../../components/OnRampTransaction";
import { Divide } from "lucide-react";

// this is a server action
async function getOnRampTransactions() {
    const session = await getServerSession(authOptions);
    const txns = await prisma.onRampTransaction.findMany({
        where: {
            userId: Number(session?.user?.id),
        },
    });
    console.log(txns);
    return txns.map((t: OnRampTransaction) => ({
        time: t.startTime,
        amount: t.amount,
        status: t.status,
        provider: t.provider,
    }));
}

export default async function Page() {
    const transactions = await getOnRampTransactions();
    return (
        <div>
            <div className="text-4xl text-[#6a51a6] pt-8 mb-8 font-bold">
                Transactions
            </div>
            <div className="pt-4">
                <OnRampTransactions transactions={transactions} />
            </div>
        </div>
    );
}

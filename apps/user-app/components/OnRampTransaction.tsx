// import { Card } from "@repo/ui/card"

// export const OnRampTransactions = ({
//     transactions
// }: {
//     transactions: {
//         time: Date,
//         amount: number,
//         // TODO: type of `status` be more specific?
//         status: string,
//         provider: string
//     }[]
// }) => {
//     if (!transactions.length) {
//         return <Card title="Recent Transactions">
//             <div className="text-center pb-8 pt-8">
//                 No Recent transactions
//             </div>
//         </Card>
//     }
//     return <Card title="Recent Transactions">
//         <div className="pt-2 w-6xl">
//             {transactions.map(t => <div className="flex justify-between">
//                 <div>
//                     <br />
//                     <div className="text-sm">
//                         Received INR
//                     </div>
//                     <div className="text-slate-600 text-xs">
//                         {t.time.toDateString()}
//                     </div>
//                 </div>
//                 <div className="flex flex-col justify-center">

//                     + Rs {t.amount / 100}
//                 </div>

//             </div>)}
//         </div>
//     </Card>
// }



import { Card } from "@repo/ui/card"

export const OnRampTransactions = ({
    transactions
}: {
    transactions: {
        time: Date,
        amount: number,
        // TODO: type of `status` be more specific?
        status: string,
        provider: string
    }[]
}) => {
    const getStatusColor = (status: string) => {
        switch (status.toLowerCase()) {
            case 'success':
                return 'text-green-600';
            case 'processing':
                return 'text-yellow-600';
            case 'failed':
                return 'text-red-600';
            default:
                return 'text-gray-600';
        }
    };

    if (!transactions.length) {
        return <Card title="Recent Transactions">
            <div className="text-center pb-8 pt-8">
                No Recent transactions
            </div>
        </Card>
    }
    
    return <Card title="Recent Transactions">
        <div className="pt-2 w-6xl">
            {transactions.map(t => <div className="flex justify-between">
                <div>
                    <br />
                    <div className="text-sm">
                        Received INR
                    </div>
                    <div className="text-slate-600 text-xs">
                        {t.time.toDateString()}
                    </div>
                </div>
                <div className="flex flex-col justify-center items-end">
                    <div>+ Rs {t.amount / 100}</div>
                    <div className={`text-xs ${getStatusColor(t.status)}`}>
                        {t.status}
                    </div>
                </div>
            </div>)}
        </div>
    </Card>
}
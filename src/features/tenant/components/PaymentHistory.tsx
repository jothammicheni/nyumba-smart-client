import { CreditCard } from 'lucide-react'
import React from 'react'

const paymentHistory = [
  { id: 1, date: "2023-05-03", amount: 25000, status: "completed", reference: "MPE123456789" },
  { id: 2, date: "2023-04-04", amount: 25000, status: "completed", reference: "MPE987654321" },
  { id: 3, date: "2023-03-02", amount: 25000, status: "completed", reference: "MPE456789123" },
  { id: 4, date: "2023-02-05", amount: 25000, status: "completed", reference: "MPE789123456" },
]


const PaymentHistory = () => {

     const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-KE", {
      style: "currency",
      currency: "KES",
      minimumFractionDigits: 0,
    }).format(amount)
  }

    const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }


  return (
   <>
      <div className="bg-white dark:bg-gray-800 shadow rounded-lg">
                       <div className="px-4 py-5 sm:px-6 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
                         <h3 className="text-lg leading-6 font-medium text-gray-900 dark:text-white">Payment History</h3>
                         <a href="#" className="text-sm font-medium text-primary-600 hover:text-primary-500">
                           View all
                         </a>
                       </div>
                       <div className="px-4 py-5 sm:p-6">
                         <div className="flow-root">
                           <ul className="-my-5 divide-y divide-gray-200 dark:divide-gray-700">
                             {paymentHistory.map((payment) => (
                               <li key={payment.id} className="py-4">
                                 <div className="flex items-center space-x-4">
                                   <div className="flex-shrink-0">
                                     <div className="h-8 w-8 rounded-full bg-green-100 dark:bg-green-900 flex items-center justify-center">
                                       <CreditCard className="h-5 w-5 text-green-600 dark:text-green-400" />
                                     </div>
                                   </div>
                                   <div className="min-w-0 flex-1">
                                     <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
                                       Rent Payment
                                     </p>
                                     <p className="text-xs text-gray-500 dark:text-gray-400">Ref: {payment.reference}</p>
                                   </div>
                                   <div className="text-right">
                                     <p className="text-sm font-medium text-gray-900 dark:text-white">
                                       {formatCurrency(payment.amount)}
                                     </p>
                                     <p className="text-xs text-gray-500 dark:text-gray-400">{formatDate(payment.date)}</p>
                                   </div>
                                 </div>
                               </li>
                             ))}
                           </ul>
                         </div>
                       </div>
                     </div>
   </>
  )
}

export default PaymentHistory

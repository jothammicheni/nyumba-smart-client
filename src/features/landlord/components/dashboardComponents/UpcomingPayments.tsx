import { Calendar } from 'lucide-react'
import React from 'react'

const UpcomingPayments = () => {
  const upcomingPayments = [
    { id: 1, tenant: "Alice Johnson", property: "Apartment 2A", amount: 25000, dueDate: "2023-05-25" },
    { id: 2, tenant: "Robert Smith", property: "Apartment 3C", amount: 30000, dueDate: "2023-05-26" },
    { id: 3, tenant: "Mary Davis", property: "Apartment 1B", amount: 22000, dueDate: "2023-05-28" },
    { id: 4, tenant: "James Wilson", property: "Apartment 5D", amount: 28000, dueDate: "2023-05-30" },
  ]
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-KE", {
      style: "currency",
      currency: "KES",
      minimumFractionDigits: 0,
    }).format(amount)
  }


  return (
    <>
      <div className="bg-white dark:bg-gray-950/50 shadow-md rounded-lg">
        <div className="px-4 py-5 sm:px-6 border-b border-gray-200 dark:border-primary-600/20 rounded">
          <h3 className="text-lg leading-6 font-medium text-gray-900 dark:text-white">Upcoming Payments</h3>
        </div>
        <div className="px-4 py-5 sm:p-6">
          <div className="flow-root">
            <ul className="-my-5 divide-y divide-gray-200 dark:divide-primary-600/5">
              {upcomingPayments.map((payment) => (
                <li key={payment.id} className="py-4">
                  <div className="flex items-center space-x-4">
                    <div className="flex-shrink-0">
                      <div className="h-8 w-8 rounded-full bg-primary-600/30 dark:bg-primary-600/30 flex items-center justify-center">
                        <Calendar className="h-5 w-5 text-primary-600 dark:text-primary-600" />
                      </div>
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
                        {payment.tenant}
                      </p>
                      <p className="text-sm text-gray-500 dark:text-gray-400 truncate">{payment.property}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium text-gray-900 dark:text-white">
                        {formatCurrency(payment.amount)}
                      </p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        Due: {new Date(payment.dueDate).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
          <div className="mt-6">
            <a
              href="#"
              className="w-full flex justify-center items-center px-4 py-2 border border-gray-300 dark:border-primary-600/10 shadow-sm text-sm font-medium rounded-md text-gray-700 dark:text-gray-300 bg-primary-600 dark:bg-primary-600 dark:hover:bg-primary-600"
            >
              View all
            </a>
          </div>
        </div>
      </div>
    </>
  )
}

export default UpcomingPayments

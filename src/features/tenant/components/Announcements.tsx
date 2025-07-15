import { Bell } from 'lucide-react'
import React from 'react'


const announcements = [
  {
    id: 1,
    title: "Water Maintenance",
    message: "Water will be shut off on Saturday from 10am to 2pm for maintenance.",
    date: "2023-05-15",
  },
  {
    id: 2,
    title: "New Security Measures",
    message: "We have installed new security cameras in the common areas.",
    date: "2023-05-01",
  },
]

const Announcements = () => {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

  return (
    <>
      <div className="mt-8">
        <div className="bg-white dark:bg-gray-950/50 shadow rounded-lg">
          <div className="px-4 py-5 sm:px-6 border-b border-gray-200 dark:border-primary-600/20">
            <h3 className="text-lg leading-6 font-medium text-gray-900 dark:text-white">Announcements</h3>
          </div>
          <div className="px-4 py-5 sm:p-6">
            <div className="flow-root">
              <ul className="-my-5 divide-y divide-gray-200 dark:divide-primary-600/10">
                {announcements.map((announcement) => (
                  <li key={announcement.id} className="py-4">
                    <div className="flex items-start space-x-4">
                      <div className="flex-shrink-0 pt-1">
                        <div className="w-12 h-12 bg-primary-600/30 dark:bg-primary-600/30 rounded-full flex items-center justify-center mr-4">
                          <Bell className="w-6 h-6 text-primary-600 dark:text-primary-600" />
                        </div>
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="flex justify-between">
                          <p className="text-sm font-medium text-gray-900 dark:text-white">
                            {announcement.title}
                          </p>
                          <p className="text-xs text-gray-500 dark:text-gray-400">
                            {formatDate(announcement.date)}
                          </p>
                        </div>
                        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">{announcement.message}</p>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Announcements

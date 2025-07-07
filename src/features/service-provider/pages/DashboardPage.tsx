import React from "react"
import WelcomeInfo from "../components/WelcomeInfo.js"
import Tasks from "../components/Tasks.js"

const clientReviews = [
  {
    id: 1,
    client: "John Doe",
    property: "Sunshine Apartments",
    rating: 5,
    comment: "Excellent service! Fast and professional installation.",
    date: "2023-05-12",
  },
  {
    id: 2,
    client: "Mary Smith",
    property: "Green Valley Residences",
    rating: 4,
    comment: "Good service, but took a bit longer than expected.",
    date: "2023-04-20",
  },
]

export const ProviderDashboard: React.FC = () => {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

  // Render stars for rating
  const renderStars = (rating: number) => {
    const stars = []
    for (let i = 1; i <= 5; i++) {
      if (i <= rating) {
        stars.push(
          <svg key={i} className="w-5 h-5 text-primary-600" fill="currentColor" viewBox="0 0 20 20">
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>,
        )
      } else {
        stars.push(
          <svg key={i} className="w-5 h-5 text-gray-300 dark:text-gray-600" fill="currentColor" viewBox="0 0 20 20">
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>,
        )
      }
    }
    return stars
  }

  return (
    <div className="min-h-screen bg-slate-100 dark:bg-gray-900">
      {/* Main content */}
      <div className="flex flex-col flex-1">
        {/* Main content area */}
        <main className="flex-1 pb-8">

          {/* Welcome info card */}
          <WelcomeInfo />

          <div className="mt-8">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">

              {/* Stats cards */}
              <Tasks />

              {/* Client Reviews */}
              <div className="bg-slate-100 dark:bg-gray-950/50 shadow-lg rounded-lg">
                <div className="px-4 py-5 sm:px-6 border-b border-gray-200 dark:border-primary-600/20 flex justify-between items-center">
                  <h3 className="text-lg leading-6 font-medium text-gray-900 dark:text-white">Client Reviews</h3>
                  <a href="#" 
                  className="text-sm font-medium text-primary-600 hover:text-primary-600 dark:hover:bg-primary-600/20 p-2 rounded">
                    View all
                  </a>
                </div>
                <div className="px-4 py-5 sm:p-6">
                  <div className="flow-root">
                    <ul className="-my-5 divide-y divide-gray-200 dark:divide-primary-600/10">
                      {clientReviews.map((review) => (
                        <li key={review.id} className="py-4">
                          <div className="flex items-center space-x-4">
                            <div className="flex-shrink-0">
                              <div className="h-8 w-8 rounded-full bg-primary-600/30 dark:bg-primary-600/30 flex items-center justify-center">
                                {renderStars(review.rating).map((star, index) => (
                                  <React.Fragment key={index}>{star}</React.Fragment>
                                ))}
                              </div>
                            </div>
                            <div className="min-w-0 flex-1">
                              <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
                                {review.client} - {review.property}
                              </p>
                              <p className="text-xs text-gray-500 dark:text-gray-400">{review.comment}</p>
                            </div>
                            <div className="text-right">
                              <p className="text-xs text-gray-500 dark:text-gray-400">{formatDate(review.date)}</p>
                            </div>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
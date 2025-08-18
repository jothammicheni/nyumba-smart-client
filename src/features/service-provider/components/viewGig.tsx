/* eslint-disable react-hooks/exhaustive-deps */
"use client"

import { useState, useEffect } from "react"
import { Button } from "../../../components/ui/button"
import { Card, CardContent } from "../../../components/ui/card"
import { Badge } from "../../../components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "../../../components/ui/avatar"
import { Separator } from "../../../components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../../components/ui/tabs"
import {
  Star,
 
  Clock,
  Shield,
  Heart,
  Share2,
  MessageCircle,
  ArrowLeft,
  Loader2,
  CheckCircle,
  DollarSign,
} from "lucide-react"

import { toast } from "sonner"
import { Link, useParams } from "react-router-dom"
import serviceGigService, { ServiceGig } from "../../../services/serviceGigService"

// Mock reviews data
const mockReviews = [
  {
    id: "1",
    user: {
      name: "Kimani Njuguna",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    rating: 5,
    comment: "Excellent service! Very professional and completed the work on time.",
    date: "2025-01-15",
    verified: true,
  },
]

// Mock provider data
const mockProvider = {
  name: "John Smith",
  avatar: "/placeholder.svg?height=80&width=80",
  level: "Top Rated",
  memberSince: "2022-03-15",
  completedJobs: 127,
  responseTime: "1 hour",
  rating: 4.9,
  reviewCount: 89,
  verified: true,
  description:
    "Professional plumber with 10+ years of experience. Specialized in residential and commercial plumbing services.",
}

export default function ViewGigPage() {
  const params = useParams()
  const gigId = params.id as string

  const [gig, setGig] = useState<ServiceGig | null>(null)
  const [loading, setLoading] = useState(true)
  const [isLiked, setIsLiked] = useState(false)

  useEffect(() => {
    fetchGig()
    // Track view/impression
    trackGigView()
  }, [gigId])

  const fetchGig = async () => {
    try {
      setLoading(true)
      const response = await serviceGigService.getGigById(gigId)
      if (response.success) {
        setGig(response.data)
      } else {
        toast.error("Gig not found")
      }
    } catch (error) {
      console.error("Error fetching gig:", error)
      toast.error("Failed to load gig")
    } finally {
      setLoading(false)
    }
  }

  const trackGigView = async () => {
    // This would track impressions/views for analytics
    try {
      // await analyticsService.trackGigView(gigId)
      console.log("Tracking gig view:", gigId)
    } catch (error) {
      console.error("Error tracking view:", error)
    }
  }

  const handleContactProvider = () => {
    // Track click for analytics
    console.log("Tracking contact click:", gigId)
    toast.success("Contact feature coming soon!")
  }

  const handleOrderNow = () => {
    // Track click for analytics
    console.log("Tracking order click:", gigId)
    toast.success("Order feature coming soon!")
  }

  const toggleLike = () => {
    setIsLiked(!isLiked)
    toast.success(isLiked ? "Removed from favorites" : "Added to favorites")
  }

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: gig?.title,
        text: gig?.description,
        url: window.location.href,
      })
    } else {
      navigator.clipboard.writeText(window.location.href)
      toast.success("Link copied to clipboard!")
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="flex items-center gap-2">
          <Loader2 className="h-6 w-6 animate-spin" />
          <span>Loading gig...</span>
        </div>
      </div>
    )
  }

  if (!gig) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Gig not found</h1>
          <p className="text-gray-600 mb-4">The gig you're looking for doesn't exist or has been removed.</p>
          <Link to="/">
            <Button>Back to Marketplace</Button>
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 my-8">
            <Link to="/service-provider/dashboard/manage/gigs" className="flex items-center gap-2 text-gray-600 hover:text-primary-600">
              <ArrowLeft className="h-5 w-5" />
              Back to Gigs
            </Link>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" onClick={toggleLike}>
                <Heart className={`h-4 w-4 mr-2 ${isLiked ? "fill-red-500 text-red-500" : ""}`} />
                {isLiked ? "Liked" : "Like"}
              </Button>
              <Button variant="outline" size="sm" onClick={handleShare}>
                <Share2 className="h-4 w-4 mr-2" />
                Share
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Gig Header */}
            <Card className="bg-white border-gray-200 shadow-sm">
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <Badge variant="outline" className="bg-blue-100 text-blue-800 border-gray-300 capitalize">
                        {gig.category}
                      </Badge>
                      {gig.isFeatured && <Badge className="bg-primary-600">Featured</Badge>}
                      <Badge className="bg-green-100 text-green-800">{gig.status}</Badge>
                    </div>
                    <h1 className="text-2xl font-bold text-gray-900 mb-2">{gig.title}</h1>
                    <div className="flex items-center gap-4 text-sm text-gray-600">
                      <div className="flex items-center gap-1">
                        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        <span className="font-medium">{mockProvider.rating}</span>
                        <span>({mockProvider.reviewCount} reviews)</span>
                      </div>
                      {/* <div className="flex items-center gap-1">
                        <MapPin className="h-4 w-4" />
                        <span>{gig.location.city}</span>
                      </div> */}
                      <div className="flex items-center gap-1">
                        <Clock className="h-4 w-4" />
                        <span>Response time: {mockProvider.responseTime}</span>
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-gray-500">Starting at</p>
                    <p className="text-3xl font-bold text-primary-600">Ksh {gig.price}</p>
                  </div>
                </div>

                {/* Gig Image */}
                {gig.image && (
                  <div className="mb-6">
                    <img
                      src={gig.image || "/placeholder.svg"}
                      alt={gig.title}
                      width={800}
                      height={400}
                      className="w-full h-64 md:h-80 object-cover rounded-lg"
                    />
                  </div>
                )}

                {/* Description */}
                <div className="border-t border-gray-100 pt-6">
                  <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">About The Gig</h2>
                  <p className="text-gray-700 leading-relaxed text-lg whitespace-pre-wrap">{gig.description}</p>
                </div>
              </CardContent>
            </Card>

            {/* Tabs */}
            <Tabs defaultValue="reviews" className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="reviews">Reviews ({mockReviews.length})</TabsTrigger>
                <TabsTrigger value="faq">FAQs</TabsTrigger>
                <TabsTrigger value="similar">Similar Gigs</TabsTrigger>
              </TabsList>

              <TabsContent value="reviews" className="space-y-4">
                <Card className="bg-white-90 border-gray-900/20">
                  <CardContent className="p-6">
                    <div className="space-y-6">
                      {mockReviews.map((review) => (
                        <div key={review.id} className="border-b border-gray-200 last:border-0 pb-6 last:pb-0">
                          <div className="flex items-start gap-4">
                            <Avatar>
                              <AvatarImage src={review.user.avatar || "/placeholder.svg"} />
                              <AvatarFallback>{review.user.name[0]}</AvatarFallback>
                            </Avatar>
                            <div className="flex-1">
                              <div className="flex items-center gap-2 mb-2">
                                <span className="font-medium text-gray-900">{review.user.name}</span>
                                {review.verified && (
                                  <Badge variant="secondary" className="text-xs bg-green-100 text-green-800">
                                    <CheckCircle className="h-3 w-3 mr-1" />
                                    Verified
                                  </Badge>
                                )}
                              </div>
                              <div className="flex items-center gap-2 mb-2">
                                <div className="flex">
                                  {[...Array(5)].map((_, i) => (
                                    <Star
                                      key={i}
                                      className={`h-4 w-4 ${
                                        i < review.rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
                                      }`}
                                    />
                                  ))}
                                </div>
                                <span className="text-sm text-gray-500">{review.date}</span>
                              </div>
                              <p className="text-gray-700">{review.comment}</p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="faq">
                <Card className="bg-white border-gray-200 shadow-sm">
                  <CardContent className="p-6">
                    <div className="space-y-4">
                      <div>
                        <h3 className="font-medium text-gray-900 mb-2">What's included in the basic package?</h3>
                        <p className="text-gray-600">
                          The basic package includes initial consultation, problem diagnosis, and basic repair work.
                        </p>
                      </div>
                      <Separator />
                      <div>
                        <h3 className="font-medium text-gray-900 mb-2">How long does the service take?</h3>
                        <p className="text-gray-600">
                          Most services are completed within 2-4 hours, depending on the complexity of the work.
                        </p>
                      </div>
                      <Separator />
                      <div>
                        <h3 className="font-medium text-gray-900 mb-2">Do you provide warranty?</h3>
                        <p className="text-gray-600">
                          Yes, all work comes with a 30-day warranty for your peace of mind.
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="similar">
                <Card className="bg-white border-gray-200 shadow-sm">
                  <CardContent className="p-6">
                    <p className="text-gray-600">Similar gigs will be displayed here based on category and location.</p>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Order Card */}
            <Card className="sticky top-4 border-gray-200 shadow-sm">
              <CardContent className="p-6 bg-white border-gray-200 shadow-sm">
                <div className="text-center mb-6">
                  <p className="text-2xl font-bold text-primary-600 mb-2">Ksh {gig.price}</p>
                  <p className="text-sm text-gray-500">Starting price</p>
                </div>

                <div className="space-y-4 mb-6">
                  <div className="flex items-center gap-2 text-sm">
                    <Clock className="h-4 w-4 text-gray-900" />
                    <span className="text-gray-800">Delivery in 2-3 days</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Shield className="h-4 w-4 text-gray-900" />
                    <span className="text-gray-800">30-day warranty included</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <CheckCircle className="h-4 w-4 text-gray-900" />
                    <span className="text-gray-800">Licensed & insured</span>
                  </div>
                </div>

                <div className="space-y-3">
                  <Button onClick={handleOrderNow} className="w-full text-white bg-primary-600 hover:bg-primary-700">
                    <DollarSign className="h-4 w-4 mr-2" />
                    Order Now
                  </Button>
                  <Button variant="outline" onClick={handleContactProvider} className="w-full text-gray-900 bg-transparent">
                    <MessageCircle className="h-4 w-4 mr-2" />
                    Contact Provider
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Provider Card */}
            <Card className="sticky top-20 border-gray-200 z-0 shadow-sm bg-white">
              <CardContent className="p-6">
                <div className="flex items-center gap-4 mb-4">
                  <Avatar className="h-16 w-16">
                    <AvatarImage src={mockProvider.avatar || "/placeholder.svg"} />
                    <AvatarFallback>{mockProvider.name[0]}</AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-semibold text-gray-900">{mockProvider.name}</h3>
                      {mockProvider.verified && <CheckCircle className="h-4 w-4 text-green-500" />}
                    </div>
                    <Badge variant="secondary" className="bg-blue-100 text-blue-800 hover:none">{mockProvider.level}</Badge>
                  </div>
                </div>

                <p className="text-sm text-gray-600 mb-4">{mockProvider.description}</p>

                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-500">Member since:</span>
                    <span className="text-gray-800">{new Date(mockProvider.memberSince).getFullYear()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Completed jobs:</span>
                    <span className="text-gray-800">{mockProvider.completedJobs}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Response time:</span>
                    <span className="text-gray-800">{mockProvider.responseTime}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Rating:</span>
                    <div className="flex items-center gap-1">
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      <span className="text-gray-800">
                        {mockProvider.rating} ({mockProvider.reviewCount})
                      </span>
                    </div>
                  </div>
                </div>

                <Button variant="outline" className="w-full text-gray-900 mt-4 bg-transparent">
                  View Profile
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}

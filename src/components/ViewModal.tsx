"use client"

import { Dialog, DialogContent } from "./ui/dialog"
import { X } from "lucide-react"
import { Button } from "./ui/button"

interface VideoModalProps {
  isOpen: boolean
  onClose: () => void
  youtubeId: string
}

export const VideoModal = ({ isOpen, onClose, youtubeId }: VideoModalProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-4xl bg-transparent border-none shadow-none">
        <div className="relative aspect-video w-full">
          <Button
            onClick={onClose}
            className="absolute -right-2 -top-10 z-10 h-8 w-8 rounded-full p-0"
            variant="ghost"
          >
            <X className="h-5 w-5 text-white" />
          </Button>
          <iframe
            className="h-full w-full rounded-lg"
            src={`https://www.youtube.com/embed/${youtubeId}?autoplay=1`}
            title="YouTube video player"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>
      </DialogContent>
    </Dialog>
  )
}

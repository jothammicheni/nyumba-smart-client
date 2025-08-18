"use client"

import React from "react"
import { X } from "lucide-react"
import { Dialog, DialogContent } from "./ui/dialog"
import { Button } from "./ui/button"

interface VideoModalProps {
  isOpen: boolean
  onClose: () => void
  youtubeId: string
  autoplay?: number
  mute?: number
  muteToggle?: React.ReactNode
}

export const VideoModal: React.FC<VideoModalProps> = ({
  isOpen,
  onClose,
  youtubeId,
  autoplay = 0,
  mute = 1,
  muteToggle
}) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl p-0 bg-transparent border-none">
        <div className="relative pt-[56.25%]"> {/* 16:9 aspect ratio */}
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            className="absolute top-2 right-0 z-10 p-2 bg-black/50 rounded-full text-white hover:bg-black/70"
            aria-label="Close video"
          >
            <X className="h-6 w-6" />
          </Button>
          
          {muteToggle}
          
          <iframe
            className="absolute top-0 left-0 w-full h-full"
            src={`https://www.youtube.com/embed/${youtubeId}?autoplay=${autoplay}&mute=${mute}&rel=0&modestbranding=1`}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            title="YouTube video player"
          />
        </div>
      </DialogContent>
    </Dialog>
  )
}

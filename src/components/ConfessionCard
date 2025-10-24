import { useState, useEffect, useRef } from 'react';
import { HeartIcon, MessageCircleIcon, Share2Icon, FlagIcon, AlertTriangleIcon } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Textarea } from '@/components/ui/textarea';
import { useConfessionStore, type Confession } from '@/stores/confessionStore';
import { useAdminStore } from '@/stores/adminStore';
import { useToast } from '@/hooks/use-toast';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import gsap from 'gsap';

interface ConfessionCardProps {
  confession: Confession;
}

export function ConfessionCard({ confession }: ConfessionCardProps) {
  const [showComments, setShowComments] = useState(false);
  const [commentText, setCommentText] = useState('');
  const [liked, setLiked] = useState(false);
  const [reportDialogOpen, setReportDialogOpen] = useState(false);
  const [reportReason, setReportReason] = useState('');
  const cardRef = useRef<HTMLDivElement>(null);
  const { likeConfession, addReaction, addComment, comments } = useConfessionStore();
  const { addReport } = useAdminStore();
  const { toast } = useToast();

  const confessionComments = comments[confession.id] || [];

  useEffect(() => {
    if (cardRef.current) {
      gsap.fromTo(
        cardRef.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' }
      );
    }
  }, []);

  const handleLike = () => {
    if (!liked) {
      likeConfession(confession.id);
      addReaction(confession.id, 'heart');
      setLiked(true);
    }
  };

  const handleReaction = (type: 'heart' | 'laugh' | 'sad') => {
    addReaction(confession.id, type);
  };

  const handleComment = () => {
    if (commentText.trim()) {
      addComment(confession.id, commentText.trim());
      setCommentText('');
    }
  };

  const handleReport = () => {
    if (reportReason.trim()) {
      addReport(confession.id, reportReason.trim());
      toast({
        title: 'Report Submitted',
        description: 'Thank you for reporting. We will review this post.',
      });
      setReportDialogOpen(false);
      setReportReason('');
    }
  };

  const formatTimestamp = (date: Date) => {
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const hours = Math.floor(diff / (1000 * 60 * 60));
    
    if (hours < 1) return 'Just now';
    if (hours < 24) return `${hours}h ago`;
    const days = Math.floor(hours / 24);
    return `${days}d ago`;
  };

  return (
    <Card ref={cardRef} className="p-6 bg-card text-card-foreground border border-gray-200 mb-6">
      <div className="flex items-start gap-4 mb-4">
        <Avatar className="h-12 w-12 border-2 border-primary/20">
          <AvatarFallback className="bg-primary/10 text-primary font-label">AN</AvatarFallback>
        </Avatar>
        <div className="flex-1">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-label font-semibold text-gray-900">Anonymous</p>
              <p className="text-sm text-gray-600">#{confession.id} • {formatTimestamp(confession.timestamp)}</p>
            </div>
            <Button 
              variant="ghost" 
              size="icon" 
              className="bg-transparent text-gray-600 hover:bg-gray-100 hover:text-gray-900"
              onClick={() => setReportDialogOpen(true)}
            >
              <FlagIcon size={20} strokeWidth={2} />
            </Button>
          </div>
        </div>
      </div>

      <p className="text-base text-gray-800 leading-relaxed mb-4">{confession.content}</p>

      {confession.imageUrl && (
        <img
          src={confession.imageUrl}
          alt="Confession attachment"
          loading="lazy"
          className="w-full rounded-lg mb-4 object-cover max-h-96"
        />
      )}

      {confession.videoUrl && (
        <div className="relative w-full pb-[56.25%] mb-4 rounded-lg overflow-hidden">
          <iframe
            src={confession.videoUrl}
            title="Video attachment"
            loading="lazy"
            className="absolute top-0 left-0 w-full h-full"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>
      )}

      {confession.tags.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-4">
          {confession.tags.map((tag) => (
            <span
              key={tag}
              className="px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-label"
            >
              #{tag}
            </span>
          ))}
        </div>
      )}

      <div className="flex items-center gap-6 mb-4">
        <button
          onClick={() => handleReaction('heart')}
          className="flex items-center gap-2 text-gray-700 hover:text-tertiary transition-colors"
        >
          <span className="text-xl">❤️</span>
          <span className="text-sm font-label">{confession.reactions.heart}</span>
        </button>
        <button
          onClick={() => handleReaction('laugh')}
          className="flex items-center gap-2 text-gray-700 hover:text-warning transition-colors"
        >
          <span className="text-xl">😆</span>
          <span className="text-sm font-label">{confession.reactions.laugh}</span>
        </button>
        <button
          onClick={() => handleReaction('sad')}
          className="flex items-center gap-2 text-gray-700 hover:text-primary transition-colors"
        >
          <span className="text-xl">😢</span>
          <span className="text-sm font-label">{confession.reactions.sad}</span>
        </button>
      </div>

      <Separator className="mb-4 bg-gray-200" />

      <div className="flex items-center justify-between">
        <Button
          variant="ghost"
          size="sm"
          onClick={handleLike}
          className={`bg-transparent hover:bg-gray-100 font-normal ${
            liked ? 'text-tertiary' : 'text-gray-700 hover:text-gray-900'
          }`}
        >
          <HeartIcon size={20} strokeWidth={2} className="mr-2" fill={liked ? 'currentColor' : 'none'} />
          {confession.likes}
        </Button>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setShowComments(!showComments)}
          className="bg-transparent text-gray-700 hover:bg-gray-100 hover:text-gray-900 font-normal"
        >
          <MessageCircleIcon size={20} strokeWidth={2} className="mr-2" />
          {confession.comments}
        </Button>
        <Button variant="ghost" size="sm" className="bg-transparent text-gray-700 hover:bg-gray-100 hover:text-gray-900 font-normal">
          <Share2Icon size={20} strokeWidth={2} className="mr-2" />
          {confession.shares}
        </Button>
      </div>

      {showComments && (
        <div className="mt-6 pt-6 border-t border-gray-200">
          <div className="space-y-4 mb-4">
            {confessionComments.map((comment) => (
              <div key={comment.id} className="flex gap-3">
                <Avatar className="h-8 w-8 border border-primary/20">
                  <AvatarFallback className="bg-primary/10 text-primary text-xs font-label">AN</AvatarFallback>
                </Avatar>
                <div className="flex-1 bg-gray-50 rounded-lg p-3">
                  <p className="text-sm font-label font-semibold text-gray-900 mb-1">Anonymous</p>
                  <p className="text-sm text-gray-700">{comment.content}</p>
                  <p className="text-xs text-gray-600 mt-2">{formatTimestamp(comment.timestamp)}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="flex gap-3">
            <Avatar className="h-8 w-8 border border-primary/20">
              <AvatarFallback className="bg-primary/10 text-primary text-xs font-label">AN</AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <Textarea
                placeholder="Write a comment..."
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
                className="min-h-20 mb-2 resize-none bg-white text-gray-900 border-gray-300 placeholder:text-gray-500"
              />
              <Button
                onClick={handleComment}
                disabled={!commentText.trim()}
                size="sm"
                className="bg-primary text-primary-foreground hover:bg-primary/90 font-normal"
              >
                Post Comment
              </Button>
            </div>
          </div>
        </div>
      )}

      <Dialog open={reportDialogOpen} onOpenChange={setReportDialogOpen}>
        <DialogContent className="bg-card text-card-foreground">
          <DialogHeader>
            <DialogTitle className="text-gray-900 flex items-center gap-2">
              <AlertTriangleIcon size={20} className="text-warning" />
              Report Confession
            </DialogTitle>
            <DialogDescription className="text-gray-600">
              Please provide a reason for reporting this confession. Our moderators will review it.
            </DialogDescription>
          </DialogHeader>
          <div className="py-4">
            <Textarea
              placeholder="Describe why you're reporting this post..."
              value={reportReason}
              onChange={(e) => setReportReason(e.target.value)}
              className="min-h-32 resize-none bg-white text-gray-900 border-gray-300 placeholder:text-gray-500"
            />
          </div>
          <DialogFooter>
            <Button
              variant="ghost"
              onClick={() => setReportDialogOpen(false)}
              className="text-gray-700 hover:bg-gray-100"
            >
              Cancel
            </Button>
            <Button
              onClick={handleReport}
              disabled={!reportReason.trim()}
              className="bg-warning text-white hover:bg-warning/90"
            >
              Submit Report
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </Card>
  );
}

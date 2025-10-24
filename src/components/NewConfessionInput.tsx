import { useState } from 'react';
import { ImageIcon, VideoIcon, SendIcon } from 'lucide-react';
import { Button } from './components/ui/button';
import { Textarea } from './components/ui/textarea';
import { Card } from './components/ui/card';
import { Input } from './components/ui/input';
import { useConfessionStore } from './stores/confessionStore';

export function NewConfessionInput() {
  const [content, setContent] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [videoUrl, setVideoUrl] = useState('');
  const [showImageInput, setShowImageInput] = useState(false);
  const [showVideoInput, setShowVideoInput] = useState(false);
  const { addConfession } = useConfessionStore();

  const maxChars = 500;
  const remainingChars = maxChars - content.length;

  const handleSubmit = () => {
    if (content.trim()) {
      addConfession({
        content: content.trim(),
        imageUrl: imageUrl.trim() || undefined,
        videoUrl: videoUrl.trim() || undefined,
        tags: [],
      });
      setContent('');
      setImageUrl('');
      setVideoUrl('');
      setShowImageInput(false);
      setShowVideoInput(false);
    }
  };

  return (
    <Card className="p-6 bg-card text-card-foreground border border-gray-200 mb-8">
      <h2 className="font-headline font-semibold text-lg mb-4 text-gray-900">Share Your Confession</h2>
      <Textarea
        placeholder="What's on your mind? Share anonymously..."
        value={content}
        onChange={(e) => setContent(e.target.value.slice(0, maxChars))}
        className="min-h-32 mb-3 resize-none bg-white text-gray-900 border-gray-300 focus:border-primary placeholder:text-gray-500"
      />
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => {
              setShowImageInput(!showImageInput);
              setShowVideoInput(false);
            }}
            className="bg-transparent text-gray-700 hover:bg-gray-100 hover:text-gray-900 font-normal"
          >
            <ImageIcon size={20} strokeWidth={2} className="mr-2" />
            ImageIcon
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => {
              setShowVideoInput(!showVideoInput);
              setShowImageInput(false);
            }}
            className="bg-transparent text-gray-700 hover:bg-gray-100 hover:text-gray-900 font-normal"
          >
            <VideoIcon size={20} strokeWidth={2} className="mr-2" />
            VideoIcon
          </Button>
        </div>
        <span className={`text-sm font-label ${remainingChars < 50 ? 'text-warning' : 'text-gray-600'}`}>
          {remainingChars} characters left
        </span>
      </div>

      {showImageInput && (
        <div className="mb-4">
          <Input
            type="url"
            placeholder="Enter image URL..."
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
            className="bg-white text-gray-900 border-gray-300 placeholder:text-gray-500"
          />
        </div>
      )}

      {showVideoInput && (
        <div className="mb-4">
          <Input
            type="url"
            placeholder="Enter YouTube video URL..."
            value={videoUrl}
            onChange={(e) => setVideoUrl(e.target.value)}
            className="bg-white text-gray-900 border-gray-300 placeholder:text-gray-500"
          />
        </div>
      )}

      <Button
        onClick={handleSubmit}
        disabled={!content.trim()}
        className="w-full bg-primary text-primary-foreground hover:bg-primary/90 font-normal"
      >
        <SendIcon size={20} strokeWidth={2} className="mr-2" />
        Post Anonymously
      </Button>
    </Card>
  );
}

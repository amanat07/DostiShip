import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { BookOpen, Share2, Heart, MessageCircle, Calendar, Lock, Globe } from "lucide-react";
import { useState } from "react";

const JournalSection = () => {
  const [newEntry, setNewEntry] = useState("");
  const [isPrivate, setIsPrivate] = useState(false);

  const journalEntries = [
    {
      id: 1,
      title: "My Study Journey",
      content: "Today I realized how much I've grown academically. The techniques I learned in my study group are really working...",
      date: "Dec 15, 2024",
      isPrivate: false,
      likes: 12,
      comments: 3,
      mood: "Motivated"
    },
    {
      id: 2,
      title: "Weekend Reflections",
      content: "Spent the weekend exploring new music with friends. It's amazing how music can bring people together...",
      date: "Dec 14, 2024",
      isPrivate: false,
      likes: 8,
      comments: 5,
      mood: "Happy"
    },
    {
      id: 3,
      title: "Personal Growth",
      content: "Learning to balance social life and academics is an ongoing challenge, but I'm getting better at it...",
      date: "Dec 13, 2024",
      isPrivate: true,
      likes: 0,
      comments: 0,
      mood: "Reflective"
    }
  ];

  const handleSubmit = () => {
    if (newEntry.trim()) {
      // Handle journal entry submission
      console.log("New journal entry:", { content: newEntry, isPrivate });
      setNewEntry("");
    }
  };

  return (
    <Card className="mb-6">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <BookOpen className="w-5 h-5" />
          My Journal
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Create New Entry */}
        <div className="space-y-4">
          <Textarea
            placeholder="Share your thoughts, experiences, or reflections..."
            value={newEntry}
            onChange={(e) => setNewEntry(e.target.value)}
            className="min-h-[100px] resize-none"
          />
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Button
                variant={isPrivate ? "outline" : "ghost"}
                size="sm"
                onClick={() => setIsPrivate(!isPrivate)}
                className="gap-2"
              >
                {isPrivate ? <Lock className="w-4 h-4" /> : <Globe className="w-4 h-4" />}
                {isPrivate ? "Private" : "Public"}
              </Button>
            </div>
            <Button onClick={handleSubmit} disabled={!newEntry.trim()}>
              Share Entry
            </Button>
          </div>
        </div>

        {/* Recent Entries */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Recent Entries</h3>
          {journalEntries.map((entry) => (
            <div
              key={entry.id}
              className="p-4 border border-border/50 rounded-lg space-y-3"
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <h4 className="font-medium">{entry.title}</h4>
                    <Badge variant="outline" className="text-xs">
                      {entry.mood}
                    </Badge>
                    {entry.isPrivate && (
                      <Lock className="w-4 h-4 text-muted-foreground" />
                    )}
                  </div>
                  <p className="text-sm text-muted-foreground mb-2">
                    {entry.content}
                  </p>
                  <div className="flex items-center gap-4 text-xs text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      {entry.date}
                    </div>
                  </div>
                </div>
              </div>

              {/* Interaction buttons for public entries */}
              {!entry.isPrivate && (
                <div className="flex items-center gap-4 pt-2 border-t border-border/30">
                  <Button variant="ghost" size="sm" className="gap-2 text-muted-foreground">
                    <Heart className="w-4 h-4" />
                    {entry.likes}
                  </Button>
                  <Button variant="ghost" size="sm" className="gap-2 text-muted-foreground">
                    <MessageCircle className="w-4 h-4" />
                    {entry.comments}
                  </Button>
                  <Button variant="ghost" size="sm" className="gap-2 text-muted-foreground">
                    <Share2 className="w-4 h-4" />
                    Share
                  </Button>
                </div>
              )}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default JournalSection;
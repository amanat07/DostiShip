import Sidebar from "@/components/Sidebar";
import JournalSection from "@/components/JournalSection";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Heart, MessageCircle, Share, MoreHorizontal, Plus, User, Settings, LogOut } from "lucide-react";
import { Link } from "react-router-dom";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const Feed = () => {
  // Mock data for posts
  const posts = [
    {
      id: 1,
      user: { name: "Alex Kumar", username: "@alexk", avatar: "/placeholder.svg" },
      content: "Just finished my coding assignment! Looking for study buddies for the upcoming exams. Anyone interested in forming a study group? 📚💻",
      timestamp: "2 hours ago",
      likes: 12,
      comments: 5,
      interests: ["coding", "study"]
    },
    {
      id: 2,
      user: { name: "Priya Sharma", username: "@priya_art", avatar: "/placeholder.svg" },
      content: "Created a new digital artwork today! Love experimenting with different styles. Would love to connect with fellow artists and creators 🎨",
      timestamp: "4 hours ago",
      likes: 28,
      comments: 8,
      interests: ["drawing", "art"]
    },
    {
      id: 3,
      user: { name: "Rahul Gupta", username: "@rahul_music", avatar: "/placeholder.svg" },
      content: "Organizing a virtual music jam session this weekend! All instruments welcome. Let's create some beautiful music together 🎵",
      timestamp: "6 hours ago",
      likes: 19,
      comments: 12,
      interests: ["music", "jam"]
    }
  ];

  return (
    <div className="min-h-screen bg-background flex">
      <Sidebar />
      
      <main className="flex-1 overflow-y-auto">
        {/* Feed Header */}
        <div className="sticky top-0 z-10 bg-background/80 backdrop-blur-md border-b border-border p-4">
          <div className="max-w-2xl mx-auto flex items-center justify-between">
            <h1 className="text-2xl font-bold">Feed</h1>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="relative h-8 w-8 rounded-full">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src="/placeholder.svg" alt="Profile" />
                    <AvatarFallback>YU</AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="end" forceMount>
                <DropdownMenuLabel className="font-normal">
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium leading-none">Your Name</p>
                    <p className="text-xs leading-none text-muted-foreground">
                      your.email@example.com
                    </p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link to="/profile">
                    <User className="mr-2 h-4 w-4" />
                    <span>Profile</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/settings">
                    <Settings className="mr-2 h-4 w-4" />
                    <span>Settings</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Log out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        <div className="max-w-2xl mx-auto p-6">
          {/* Journal Section */}
          <JournalSection />

          {/* Create Post Card */}
          <Card className="p-6 mb-6">
            <div className="flex items-center space-x-4">
              <Avatar>
                <AvatarImage src="/placeholder.svg" />
                <AvatarFallback>YU</AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <Button variant="outline" className="w-full justify-start text-muted-foreground">
                  What's on your mind? Share with your Dosti community...
                </Button>
              </div>
              <Button size="sm">
                <Plus className="h-4 w-4 mr-2" />
                Post
              </Button>
            </div>
          </Card>

          {/* Feed Posts */}
          <div className="space-y-6">
            {posts.map((post) => (
              <Card key={post.id} className="p-6">
                <div className="flex items-start space-x-4">
                  <Avatar>
                    <AvatarImage src={post.user.avatar} />
                    <AvatarFallback>
                      {post.user.name.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-semibold text-foreground">{post.user.name}</h3>
                        <p className="text-sm text-muted-foreground">{post.user.username} • {post.timestamp}</p>
                      </div>
                      <Button variant="ghost" size="sm">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </div>
                    
                    <p className="mt-3 text-foreground leading-relaxed">{post.content}</p>
                    
                    <div className="flex items-center space-x-2 mt-3">
                      {post.interests.map((interest, index) => (
                        <span
                          key={index}
                          className="px-2 py-1 bg-primary/10 text-primary text-xs rounded-full"
                        >
                          #{interest}
                        </span>
                      ))}
                    </div>
                    
                    <div className="flex items-center justify-between mt-4 pt-4 border-t border-border">
                      <div className="flex items-center space-x-6">
                        <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-red-500">
                          <Heart className="h-4 w-4 mr-2" />
                          {post.likes}
                        </Button>
                        <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-blue-500">
                          <MessageCircle className="h-4 w-4 mr-2" />
                          {post.comments}
                        </Button>
                        <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-green-500">
                          <Share className="h-4 w-4 mr-2" />
                          Share
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>

          {/* Friend Suggestions */}
          <Card className="p-6 mt-8">
            <h2 className="text-lg font-semibold text-foreground mb-4">People You Might Know</h2>
            <div className="space-y-4">
              {[
                { name: "Maya Patel", interests: ["photography", "movies"], mutualFriends: 3 },
                { name: "Arjun Singh", interests: ["gaming", "coding"], mutualFriends: 5 },
                { name: "Sneha Roy", interests: ["reading", "theater"], mutualFriends: 2 }
              ].map((suggestion, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <Avatar className="h-10 w-10">
                      <AvatarImage src="/placeholder.svg" />
                      <AvatarFallback>
                        {suggestion.name.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium text-foreground">{suggestion.name}</p>
                      <p className="text-sm text-muted-foreground">
                        {suggestion.mutualFriends} mutual friends • {suggestion.interests.join(', ')}
                      </p>
                    </div>
                  </div>
                  <Button size="sm">Connect</Button>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default Feed;
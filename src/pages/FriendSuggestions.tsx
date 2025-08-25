import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { UserPlus, Heart, ArrowLeft, Users, Gamepad2, Code, Music, Trophy, Palette, Plane, Coffee } from "lucide-react";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const FriendSuggestions = () => {
  const [addedFriends, setAddedFriends] = useState<number[]>([]);

  const handleAddFriend = (id: number) => {
    setAddedFriends(prev => [...prev, id]);
  };

  const getInterestIcon = (interest: string) => {
    const icons: { [key: string]: any } = {
      'Gaming': Gamepad2,
      'Coding': Code,
      'Music': Music,
      'Sports': Trophy,
      'Art': Palette,
      'Travel': Plane,
      'Movies': Coffee,
      'Food': Coffee
    };
    const Icon = icons[interest] || Heart;
    return <Icon className="w-3 h-3" />;
  };

  const suggestions = [
    {
      id: 1,
      name: "Priya Sharma",
      avatar: "",
      initials: "PS",
      commonInterests: ["Coding", "Music", "Travel"],
      university: "Delhi University",
      year: "3rd Year",
      mutualFriends: 5
    },
    {
      id: 2,
      name: "Arjun Patel",
      avatar: "",
      initials: "AP",
      commonInterests: ["Gaming", "Movies", "Sports"],
      university: "IIT Mumbai",
      year: "2nd Year",
      mutualFriends: 3
    },
    {
      id: 3,
      name: "Kavya Singh",
      avatar: "",
      initials: "KS",
      commonInterests: ["Art", "Music", "Food"],
      university: "JNU Delhi",
      year: "4th Year",
      mutualFriends: 8
    },
    {
      id: 4,
      name: "Rohan Kumar",
      avatar: "",
      initials: "RK",
      commonInterests: ["Coding", "Gaming", "Sports"],
      university: "BITS Pilani",
      year: "3rd Year",
      mutualFriends: 2
    },
    {
      id: 5,
      name: "Sneha Gupta",
      avatar: "",
      initials: "SG",
      commonInterests: ["Travel", "Art", "Movies"],
      university: "Pune University",
      year: "1st Year",
      mutualFriends: 6
    },
    {
      id: 6,
      name: "Vikram Joshi",
      avatar: "",
      initials: "VJ",
      commonInterests: ["Music", "Food", "Travel"],
      university: "Chennai University",
      year: "2nd Year",
      mutualFriends: 4
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-background">
      <Header />
      
      <div className="pt-24 pb-16 px-6">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <Button variant="ghost" asChild className="mb-4">
              <Link to="/friend-finder">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Friend Finder
              </Link>
            </Button>
            
            <div className="text-center mb-8">
              <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-hero bg-clip-text text-transparent">
                Suggested Friends
              </h1>
              <p className="text-xl text-muted-foreground">
                People you might want to connect with based on shared interests
              </p>
              <div className="flex items-center justify-center gap-2 mt-4">
                <Users className="w-5 h-5 text-primary" />
                <span className="text-sm text-muted-foreground">{suggestions.length} suggestions found</span>
              </div>
            </div>
          </div>

          {/* Friend Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {suggestions.map((friend, index) => (
              <Card 
                key={friend.id} 
                className="group hover:shadow-glow transition-all duration-300 hover:scale-105 bg-background/80 backdrop-blur-sm border-primary/20 animate-fade-in"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <CardHeader className="text-center pb-4">
                  <div className="flex flex-col items-center gap-4">
                    <Avatar className="w-20 h-20 ring-4 ring-primary/20 group-hover:ring-primary/40 transition-all">
                      <AvatarImage src={friend.avatar} />
                      <AvatarFallback className="bg-gradient-primary text-primary-foreground text-lg font-semibold">
                        {friend.initials}
                      </AvatarFallback>
                    </Avatar>
                    
                    <div>
                      <Link to={`/profile/${friend.id}`}>
                        <h3 className="text-xl font-semibold hover:text-primary transition-colors cursor-pointer">
                          {friend.name}
                        </h3>
                      </Link>
                      <p className="text-sm text-muted-foreground">{friend.university}</p>
                      <p className="text-xs text-muted-foreground">{friend.year}</p>
                    </div>
                  </div>
                </CardHeader>
                
                <CardContent className="space-y-4">
                  {/* Common Interests */}
                  <div>
                    <h4 className="text-sm font-medium mb-2 flex items-center gap-2">
                      <Heart className="w-4 h-4 text-primary" />
                      Common Interests
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {friend.commonInterests.map((interest) => (
                        <Badge 
                          key={interest} 
                          variant="secondary" 
                          className="bg-primary/10 text-primary hover:bg-primary/20 transition-colors"
                        >
                          {getInterestIcon(interest)}
                          <span className="ml-1">{interest}</span>
                        </Badge>
                      ))}
                    </div>
                  </div>
                  
                  {/* Mutual Friends */}
                  <div className="text-xs text-muted-foreground flex items-center gap-1">
                    <Users className="w-3 h-3" />
                    {friend.mutualFriends} mutual friends
                  </div>
                  
                  {/* Action Button */}
                  <Button 
                    onClick={() => handleAddFriend(friend.id)}
                    disabled={addedFriends.includes(friend.id)}
                    variant={addedFriends.includes(friend.id) ? "secondary" : "hero"}
                    className="w-full"
                  >
                    {addedFriends.includes(friend.id) ? (
                      <>
                        <Heart className="w-4 h-4 mr-2 fill-current" />
                        Friend Request Sent
                      </>
                    ) : (
                      <>
                        <UserPlus className="w-4 h-4 mr-2" />
                        Add Friend
                      </>
                    )}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
          
          {/* Load More */}
          <div className="text-center mt-12">
            <Button variant="outline" size="lg" className="px-8">
              Load More Suggestions
            </Button>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default FriendSuggestions;
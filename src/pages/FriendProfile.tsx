import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { UserPlus, MessageCircle, ArrowLeft, MapPin, Calendar, Users, GraduationCap, Heart, Gamepad2, Code, Music, Trophy, Palette, Plane, Coffee } from "lucide-react";
import { Link, useParams } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const FriendProfile = () => {
  const { id } = useParams();

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
    return <Icon className="w-4 h-4" />;
  };

  // Mock profile data - in real app, this would be fetched based on ID
  const profile = {
    id: parseInt(id || "1"),
    name: "Priya Sharma",
    avatar: "",
    initials: "PS",
    bio: "Computer Science student passionate about web development and music. Love to code, travel, and make new friends! Always up for a good conversation about tech or life.",
    university: "Delhi University",
    course: "Computer Science Engineering",
    year: "3rd Year",
    location: "New Delhi, India",
    joinDate: "March 2023",
    interests: ["Coding", "Music", "Travel", "Movies", "Art", "Food"],
    mutualFriends: 5,
    totalFriends: 234,
    posts: 89,
    isOnline: true
  };

  return (
    <div className="min-h-screen bg-gradient-background">
      <Header />
      
      <div className="pt-24 pb-16 px-6">
        <div className="max-w-4xl mx-auto">
          {/* Back Button */}
          <Button variant="ghost" asChild className="mb-6">
            <Link to="/friend-suggestions">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Suggestions
            </Link>
          </Button>

          {/* Profile Header */}
          <Card className="mb-8 bg-background/80 backdrop-blur-sm border-primary/20 shadow-card">
            <CardHeader>
              <div className="flex flex-col md:flex-row items-center gap-6">
                {/* Avatar and Online Status */}
                <div className="relative">
                  <Avatar className="w-32 h-32 ring-4 ring-primary/30">
                    <AvatarImage src={profile.avatar} />
                    <AvatarFallback className="bg-gradient-primary text-primary-foreground text-2xl font-bold">
                      {profile.initials}
                    </AvatarFallback>
                  </Avatar>
                  {profile.isOnline && (
                    <div className="absolute bottom-2 right-2 w-6 h-6 bg-green-500 rounded-full border-4 border-background animate-pulse"></div>
                  )}
                </div>

                {/* Profile Info */}
                <div className="flex-1 text-center md:text-left">
                  <div className="flex items-center justify-center md:justify-start gap-2 mb-2">
                    <h1 className="text-3xl font-bold">{profile.name}</h1>
                    {profile.isOnline && (
                      <Badge variant="secondary" className="bg-green-100 text-green-700">
                        Online
                      </Badge>
                    )}
                  </div>
                  
                  <div className="space-y-2 text-muted-foreground mb-4">
                    <div className="flex items-center justify-center md:justify-start gap-2">
                      <GraduationCap className="w-4 h-4" />
                      <span>{profile.course} • {profile.year}</span>
                    </div>
                    <div className="flex items-center justify-center md:justify-start gap-2">
                      <MapPin className="w-4 h-4" />
                      <span>{profile.university}</span>
                    </div>
                    <div className="flex items-center justify-center md:justify-start gap-2">
                      <Calendar className="w-4 h-4" />
                      <span>Joined {profile.joinDate}</span>
                    </div>
                  </div>

                  {/* Stats */}
                  <div className="flex items-center justify-center md:justify-start gap-6 mb-4">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-primary">{profile.totalFriends}</div>
                      <div className="text-xs text-muted-foreground">Friends</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-primary">{profile.posts}</div>
                      <div className="text-xs text-muted-foreground">Posts</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-primary">{profile.mutualFriends}</div>
                      <div className="text-xs text-muted-foreground">Mutual</div>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex flex-col sm:flex-row gap-3">
                    <Button variant="hero" className="flex-1">
                      <UserPlus className="w-4 h-4 mr-2" />
                      Add Friend
                    </Button>
                    <Button variant="outline" className="flex-1">
                      <MessageCircle className="w-4 h-4 mr-2" />
                      Message
                    </Button>
                  </div>
                </div>
              </div>
            </CardHeader>
          </Card>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column - About & Interests */}
            <div className="lg:col-span-2 space-y-6">
              {/* About */}
              <Card className="bg-background/80 backdrop-blur-sm border-primary/20">
                <CardHeader>
                  <h2 className="text-xl font-semibold flex items-center gap-2">
                    <Heart className="w-5 h-5 text-primary" />
                    About
                  </h2>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground leading-relaxed">{profile.bio}</p>
                </CardContent>
              </Card>

              {/* Interests */}
              <Card className="bg-background/80 backdrop-blur-sm border-primary/20">
                <CardHeader>
                  <h2 className="text-xl font-semibold flex items-center gap-2">
                    <Palette className="w-5 h-5 text-primary" />
                    Interests
                  </h2>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-3">
                    {profile.interests.map((interest) => (
                      <Badge 
                        key={interest} 
                        variant="secondary" 
                        className="bg-primary/10 text-primary hover:bg-primary/20 transition-colors text-sm px-4 py-2"
                      >
                        {getInterestIcon(interest)}
                        <span className="ml-2">{interest}</span>
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Recent Activity */}
              <Card className="bg-background/80 backdrop-blur-sm border-primary/20">
                <CardHeader>
                  <h2 className="text-xl font-semibold">Recent Activity</h2>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-primary rounded-full mt-2"></div>
                      <div>
                        <p className="text-sm">Joined the "Web Development" study group</p>
                        <p className="text-xs text-muted-foreground">2 hours ago</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-accent rounded-full mt-2"></div>
                      <div>
                        <p className="text-sm">Shared a post about React best practices</p>
                        <p className="text-xs text-muted-foreground">1 day ago</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-secondary rounded-full mt-2"></div>
                      <div>
                        <p className="text-sm">Added 3 new photos from college trip</p>
                        <p className="text-xs text-muted-foreground">3 days ago</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Right Column - Additional Info */}
            <div className="space-y-6">
              {/* Quick Info */}
              <Card className="bg-background/80 backdrop-blur-sm border-primary/20">
                <CardHeader>
                  <h2 className="text-lg font-semibold">Quick Info</h2>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Location</span>
                    <span className="text-sm font-medium">{profile.location}</span>
                  </div>
                  <Separator />
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">University</span>
                    <span className="text-sm font-medium">{profile.university}</span>
                  </div>
                  <Separator />
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Year</span>
                    <span className="text-sm font-medium">{profile.year}</span>
                  </div>
                  <Separator />
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Member Since</span>
                    <span className="text-sm font-medium">{profile.joinDate}</span>
                  </div>
                </CardContent>
              </Card>

              {/* Mutual Friends */}
              <Card className="bg-background/80 backdrop-blur-sm border-primary/20">
                <CardHeader>
                  <h2 className="text-lg font-semibold flex items-center gap-2">
                    <Users className="w-4 h-4" />
                    Mutual Friends ({profile.mutualFriends})
                  </h2>
                </CardHeader>
                <CardContent>
                  <div className="flex -space-x-2">
                    {[1, 2, 3, 4, 5].map((i) => (
                      <Avatar key={i} className="w-10 h-10 border-2 border-background">
                        <AvatarFallback className="bg-gradient-primary text-primary-foreground text-xs">
                          {String.fromCharCode(65 + i)}
                        </AvatarFallback>
                      </Avatar>
                    ))}
                  </div>
                  <Button variant="ghost" size="sm" className="w-full mt-3 text-xs">
                    View All Mutual Friends
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default FriendProfile;
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CalendarDays, MapPin, Users, Heart, MessageCircle, Settings, Edit, Camera } from "lucide-react";
import { Link } from "react-router-dom";

const Profile = () => {
  const userStats = [
    { label: "Friends", value: "124", icon: Users },
    { label: "Events Joined", value: "18", icon: CalendarDays },
    { label: "Journal Entries", value: "32", icon: Heart },
    { label: "Messages Sent", value: "1,240", icon: MessageCircle },
  ];

  const friends = [
    { name: "Alice Johnson", avatar: "/placeholder.svg", mutual: 5 },
    { name: "Bob Smith", avatar: "/placeholder.svg", mutual: 12 },
    { name: "Carol Davis", avatar: "/placeholder.svg", mutual: 8 },
    { name: "David Wilson", avatar: "/placeholder.svg", mutual: 3 },
  ];

  const journalEntries = [
    {
      date: "2024-01-15",
      title: "Great day at the library!",
      excerpt: "Met some amazing people while studying for my finals. The study group was really helpful...",
      likes: 12,
      comments: 3
    },
    {
      date: "2024-01-10",
      title: "Coffee chat success",
      excerpt: "Had an amazing conversation about books and movies. Found someone who shares my love for sci-fi...",
      likes: 8,
      comments: 5
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="pt-24 pb-16 px-6">
        <div className="max-w-6xl mx-auto">
          {/* Profile Header */}
          <Card className="mb-8">
            <CardContent className="p-8">
              <div className="flex flex-col md:flex-row items-start gap-6">
                <div className="relative">
                  <Avatar className="w-32 h-32">
                    <AvatarImage src="/placeholder.svg" />
                    <AvatarFallback>JD</AvatarFallback>
                  </Avatar>
                  <Button size="sm" className="absolute -bottom-2 -right-2 rounded-full w-8 h-8 p-0">
                    <Camera className="w-4 h-4" />
                  </Button>
                </div>
                
                <div className="flex-1 space-y-4">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <div>
                      <h1 className="text-3xl font-bold">John Doe</h1>
                      <p className="text-lg text-muted-foreground">Computer Science Student</p>
                      <div className="flex items-center gap-2 text-muted-foreground mt-2">
                        <MapPin className="w-4 h-4" />
                        <span>Chitkara University, Punjab</span>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" asChild>
                        <Link to="/settings">
                          <Settings className="w-4 h-4 mr-2" />
                          Settings
                        </Link>
                      </Button>
                      <Button>
                        <Edit className="w-4 h-4 mr-2" />
                        Edit Profile
                      </Button>
                    </div>
                  </div>
                  
                  <p className="text-muted-foreground">
                    Love making new friends and exploring different cultures. Always up for a good book discussion 
                    or a study session. Let's connect and grow together! 📚✨
                  </p>
                  
                  <div className="flex flex-wrap gap-2">
                    <Badge variant="secondary">Book Lover</Badge>
                    <Badge variant="secondary">Study Buddy</Badge>
                    <Badge variant="secondary">Tech Enthusiast</Badge>
                    <Badge variant="secondary">Coffee Addict</Badge>
                  </div>
                </div>
              </div>
              
              {/* Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8 pt-6 border-t">
                {userStats.map((stat, index) => (
                  <div key={index} className="text-center">
                    <div className="flex items-center justify-center mb-2">
                      <stat.icon className="w-5 h-5 text-primary" />
                    </div>
                    <div className="text-2xl font-bold">{stat.value}</div>
                    <div className="text-sm text-muted-foreground">{stat.label}</div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Profile Content Tabs */}
          <Tabs defaultValue="friends" className="space-y-6">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="friends">Friends</TabsTrigger>
              <TabsTrigger value="journal">Journal</TabsTrigger>
              <TabsTrigger value="activity">Activity</TabsTrigger>
            </TabsList>

            <TabsContent value="friends" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Friends ({friends.length})</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {friends.map((friend, index) => (
                      <Card key={index} className="p-4">
                        <div className="flex items-center gap-3">
                          <Avatar>
                            <AvatarImage src={friend.avatar} />
                            <AvatarFallback>{friend.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                          </Avatar>
                          <div className="flex-1">
                            <div className="font-medium">{friend.name}</div>
                            <div className="text-sm text-muted-foreground">{friend.mutual} mutual friends</div>
                          </div>
                          <Button size="sm" variant="outline">Message</Button>
                        </div>
                      </Card>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="journal" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Recent Journal Entries</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {journalEntries.map((entry, index) => (
                    <Card key={index} className="p-4">
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <h3 className="font-semibold">{entry.title}</h3>
                          <span className="text-sm text-muted-foreground">{entry.date}</span>
                        </div>
                        <p className="text-muted-foreground">{entry.excerpt}</p>
                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                          <div className="flex items-center gap-1">
                            <Heart className="w-4 h-4" />
                            <span>{entry.likes} likes</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <MessageCircle className="w-4 h-4" />
                            <span>{entry.comments} comments</span>
                          </div>
                        </div>
                      </div>
                    </Card>
                  ))}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="activity" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Recent Activity</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
                      <Users className="w-5 h-5 text-primary" />
                      <div>
                        <div className="font-medium">Joined a new study group</div>
                        <div className="text-sm text-muted-foreground">2 hours ago</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
                      <Heart className="w-5 h-5 text-primary" />
                      <div>
                        <div className="font-medium">Posted a new journal entry</div>
                        <div className="text-sm text-muted-foreground">1 day ago</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
                      <CalendarDays className="w-5 h-5 text-primary" />
                      <div>
                        <div className="font-medium">Attended "Coffee & Code" event</div>
                        <div className="text-sm text-muted-foreground">3 days ago</div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Profile;
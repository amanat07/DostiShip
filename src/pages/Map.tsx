import React, { useState, useEffect } from 'react';
import Sidebar from '@/components/Sidebar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { 
  MapPin, 
  Users, 
  Search, 
  Filter,
  Navigation,
  Heart,
  MessageCircle,
  Coffee,
  BookOpen
} from 'lucide-react';

const Map = () => {
  const [location, setLocation] = useState<{lat: number, lng: number} | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedUser, setSelectedUser] = useState<number | null>(null);

  // Mock nearby users data
  const nearbyUsers = [
    {
      id: 1,
      name: 'Ananya Gupta',
      distance: '0.2 km',
      interests: ['Music', 'Reading', 'Photography'],
      mood: 'Study Buddy',
      avatar: 'AG',
      lastSeen: '5 min ago',
      mutualFriends: 3,
      location: { lat: 28.6139, lng: 77.2090 }
    },
    {
      id: 2,
      name: 'Rohit Kumar',
      distance: '0.5 km',
      interests: ['Gaming', 'Coding', 'Movies'],
      mood: 'Coffee Chat',
      avatar: 'RK',
      lastSeen: '10 min ago',
      mutualFriends: 1,
      location: { lat: 28.6142, lng: 77.2095 }
    },
    {
      id: 3,
      name: 'Sneha Reddy',
      distance: '0.8 km',
      interests: ['Theater', 'Dance', 'Art'],
      mood: 'Hangout',
      avatar: 'SR',
      lastSeen: '15 min ago',
      mutualFriends: 2,
      location: { lat: 28.6135, lng: 77.2085 }
    },
    {
      id: 4,
      name: 'Aditya Singh',
      distance: '1.2 km',
      interests: ['Photography', 'Travel', 'Music'],
      mood: 'Explore City',
      avatar: 'AS',
      lastSeen: '30 min ago',
      mutualFriends: 0,
      location: { lat: 28.6145, lng: 77.2100 }
    }
  ];

  useEffect(() => {
    // Request user location
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude
          });
        },
        (error) => {
          console.error('Error getting location:', error);
          // Set default location (Delhi)
          setLocation({ lat: 28.6139, lng: 77.2090 });
        }
      );
    }
  }, []);

  const getMoodColor = (mood: string) => {
    switch (mood) {
      case 'Study Buddy': return 'bg-blue-100 text-blue-800';
      case 'Coffee Chat': return 'bg-amber-100 text-amber-800';
      case 'Hangout': return 'bg-green-100 text-green-800';
      case 'Explore City': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getMoodIcon = (mood: string) => {
    switch (mood) {
      case 'Study Buddy': return <BookOpen className="h-3 w-3" />;
      case 'Coffee Chat': return <Coffee className="h-3 w-3" />;
      case 'Hangout': return <Users className="h-3 w-3" />;
      case 'Explore City': return <Navigation className="h-3 w-3" />;
      default: return <Heart className="h-3 w-3" />;
    }
  };

  const filteredUsers = nearbyUsers.filter(user =>
    user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.interests.some(interest => 
      interest.toLowerCase().includes(searchQuery.toLowerCase())
    )
  );

  return (
    <div className="flex h-screen bg-background">
      <Sidebar />
      
      <div className="flex-1 flex">
        {/* Map Sidebar */}
        <div className="w-80 border-r border-border bg-card">
          <div className="p-4 border-b border-border">
            <div className="flex items-center justify-between mb-4">
              <h1 className="text-xl font-semibold text-foreground">Friends Map</h1>
              <Button variant="outline" size="sm">
                <Filter className="h-4 w-4" />
              </Button>
            </div>
            
            <div className="relative mb-4">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input 
                placeholder="Search by name or interests..." 
                className="pl-10"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            <div className="flex items-center space-x-2 text-sm text-muted-foreground">
              <MapPin className="h-4 w-4" />
              <span>
                {location ? 'Location enabled' : 'Enable location to find friends nearby'}
              </span>
            </div>
          </div>
          
          <div className="p-4">
            <h3 className="font-medium text-foreground mb-3 flex items-center">
              <Users className="h-4 w-4 mr-2" />
              Nearby Friends ({filteredUsers.length})
            </h3>
            
            <div className="space-y-3">
              {filteredUsers.map((user) => (
                <Card
                  key={user.id}
                  className={`cursor-pointer transition-all hover:shadow-md ${
                    selectedUser === user.id ? 'ring-2 ring-primary' : ''
                  }`}
                  onClick={() => setSelectedUser(user.id)}
                >
                  <CardContent className="p-3">
                    <div className="flex items-start space-x-3">
                      <Avatar className="h-10 w-10">
                        <AvatarImage src="" />
                        <AvatarFallback>{user.avatar}</AvatarFallback>
                      </Avatar>
                      
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <h4 className="font-medium text-sm text-foreground">
                            {user.name}
                          </h4>
                          <span className="text-xs text-muted-foreground">
                            {user.distance}
                          </span>
                        </div>
                        
                        <div className="flex items-center space-x-1 mt-1">
                          <div className={`inline-flex items-center space-x-1 px-2 py-1 rounded-full text-xs ${getMoodColor(user.mood)}`}>
                            {getMoodIcon(user.mood)}
                            <span>{user.mood}</span>
                          </div>
                        </div>
                        
                        <div className="flex flex-wrap gap-1 mt-2">
                          {user.interests.slice(0, 3).map((interest) => (
                            <Badge key={interest} variant="secondary" className="text-xs">
                              {interest}
                            </Badge>
                          ))}
                        </div>
                        
                        <div className="flex items-center justify-between mt-2">
                          <span className="text-xs text-muted-foreground">
                            {user.mutualFriends > 0 
                              ? `${user.mutualFriends} mutual friends`
                              : 'No mutual friends'
                            }
                          </span>
                          <span className="text-xs text-muted-foreground">
                            {user.lastSeen}
                          </span>
                        </div>
                        
                        <div className="flex items-center space-x-2 mt-3">
                          <Button size="sm" className="flex-1">
                            <MessageCircle className="h-3 w-3 mr-1" />
                            Message
                          </Button>
                          <Button variant="outline" size="sm">
                            <Heart className="h-3 w-3" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>

        {/* Map Area */}
        <div className="flex-1 relative">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-accent/10 flex items-center justify-center">
            <Card className="w-96 text-center">
              <CardHeader>
                <CardTitle className="flex items-center justify-center">
                  <MapPin className="h-6 w-6 mr-2" />
                  Interactive Map
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  Discover friends near you with shared interests and moods. 
                  Click on friends from the sidebar to see their location.
                </p>
                {!location ? (
                  <Button 
                    onClick={() => {
                      if (navigator.geolocation) {
                        navigator.geolocation.getCurrentPosition(
                          (position) => {
                            setLocation({
                              lat: position.coords.latitude,
                              lng: position.coords.longitude
                            });
                          }
                        );
                      }
                    }}
                  >
                    Enable Location Access
                  </Button>
                ) : (
                  <div className="space-y-2">
                    <div className="text-sm text-muted-foreground">
                      📍 Your location: {location.lat.toFixed(4)}, {location.lng.toFixed(4)}
                    </div>
                    <Badge variant="outline" className="bg-green-50 text-green-700">
                      Location Active
                    </Badge>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
          
          {selectedUser && (
            <Card className="absolute top-4 right-4 w-64">
              <CardContent className="p-4">
                <div className="text-center">
                  <Avatar className="h-12 w-12 mx-auto mb-2">
                    <AvatarImage src="" />
                    <AvatarFallback>
                      {nearbyUsers.find(u => u.id === selectedUser)?.avatar}
                    </AvatarFallback>
                  </Avatar>
                  <h4 className="font-medium">
                    {nearbyUsers.find(u => u.id === selectedUser)?.name}
                  </h4>
                  <p className="text-sm text-muted-foreground">
                    {nearbyUsers.find(u => u.id === selectedUser)?.distance} away
                  </p>
                  <div className="mt-2">
                    <Badge className={getMoodColor(nearbyUsers.find(u => u.id === selectedUser)?.mood || '')}>
                      {nearbyUsers.find(u => u.id === selectedUser)?.mood}
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};

export default Map;
import React, { useState } from 'react';
import Sidebar from '@/components/Sidebar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { 
  Users, 
  Plus, 
  Clock, 
  Globe,
  BookOpen,
  Music,
  Gamepad2,
  Coffee,
  Camera,
  Palette,
  Share2,
  Copy,
  Video,
  Mic
} from 'lucide-react';

const Hangout = () => {
  const [showCreateRoom, setShowCreateRoom] = useState(false);
  const [newRoomTitle, setNewRoomTitle] = useState('');
  const [newRoomDescription, setNewRoomDescription] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');

  const roomCategories = [
    { id: 'study', name: 'Study Buddy', icon: BookOpen, color: 'bg-blue-100 text-blue-800', description: 'Join fellow learners for focused study sessions.' },
    { id: 'music', name: 'Music Charms', icon: Music, color: 'bg-purple-100 text-purple-800', description: 'Share and enjoy music with friends.' },
    { id: 'books', name: 'Book Worms', icon: BookOpen, color: 'bg-green-100 text-green-800', description: 'Discuss your favorite books and authors.' },
    { id: 'games', name: 'Game Night', icon: Gamepad2, color: 'bg-red-100 text-red-800', description: 'Hang out for fun virtual games.' },
    { id: 'coffee', name: 'Coffee Chat', icon: Coffee, color: 'bg-amber-100 text-amber-800', description: 'Casual conversations over virtual coffee.' },
    { id: 'photography', name: 'Photo Studio', icon: Camera, color: 'bg-indigo-100 text-indigo-800', description: 'Share and discuss photography tips.' },
    { id: 'art', name: 'Art Corner', icon: Palette, color: 'bg-pink-100 text-pink-800', description: 'Creative space for artists and art lovers.' }
  ];

  const activeRooms = [
    {
      id: 1,
      title: 'Data Structures Study Group',
      category: 'study',
      participants: 8,
      maxParticipants: 12,
      host: 'Priya Sharma',
      timeLeft: '45 min',
      description: 'Working through trees and graphs problems',
      isLive: true,
      meetLink: 'https://meet.google.com/abc-defg-hij'
    },
    {
      id: 2,
      title: 'Indie Music Discovery',
      category: 'music',
      participants: 5,
      maxParticipants: 8,
      host: 'Arjun Patel',
      timeLeft: '1h 20min',
      description: 'Sharing hidden gems in indie music',
      isLive: true,
      meetLink: 'https://zoom.us/j/123456789'
    },
    {
      id: 3,
      title: 'Among Us Tournament',
      category: 'games',
      participants: 10,
      maxParticipants: 10,
      host: 'Sneha Reddy',
      timeLeft: '30 min',
      description: 'Final round of our weekly tournament!',
      isLive: true,
      meetLink: 'https://discord.gg/abcdef'
    },
    {
      id: 4,
      title: 'Book Club: The Alchemist',
      category: 'books',
      participants: 6,
      maxParticipants: 15,
      host: 'Rahul Kumar',
      timeLeft: '2h 10min',
      description: 'Chapter 5-8 discussion',
      isLive: true,
      meetLink: 'https://meet.google.com/xyz-uvwx-yz'
    }
  ];

  const getCategoryInfo = (categoryId: string) => {
    return roomCategories.find(cat => cat.id === categoryId) || roomCategories[0];
  };

  const handleCreateRoom = () => {
    if (newRoomTitle && selectedCategory) {
      // Handle room creation logic here
      setShowCreateRoom(false);
      setNewRoomTitle('');
      setNewRoomDescription('');
      setSelectedCategory('');
    }
  };

  const copyMeetLink = (link: string) => {
    navigator.clipboard.writeText(link);
    // You could show a toast here
  };

  return (
    <div className="flex h-screen bg-background">
      <Sidebar />
      
      <div className="flex-1 p-6">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-2xl font-bold text-foreground">Virtual Hangout Rooms</h1>
              <p className="text-muted-foreground">Join themed spaces for conversations and activities</p>
            </div>
            
            <Dialog open={showCreateRoom} onOpenChange={setShowCreateRoom}>
              <DialogTrigger asChild>
                <Button className="bg-primary hover:bg-primary/90">
                  <Plus className="h-4 w-4 mr-2" />
                  Create Room
                </Button>
              </DialogTrigger>
              
              <DialogContent className="sm:max-w-md">
                <DialogHeader>
                  <DialogTitle>Create a New Hangout Room</DialogTitle>
                </DialogHeader>
                
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium text-foreground mb-2 block">
                      Room Title
                    </label>
                    <Input
                      placeholder="Enter room title..."
                      value={newRoomTitle}
                      onChange={(e) => setNewRoomTitle(e.target.value)}
                    />
                  </div>
                  
                  <div>
                    <label className="text-sm font-medium text-foreground mb-2 block">
                      Category
                    </label>
                    <div className="grid grid-cols-2 gap-2">
                      {roomCategories.map((category) => (
                        <button
                          key={category.id}
                          onClick={() => setSelectedCategory(category.id)}
                          className={`p-3 rounded-lg border-2 transition-all ${
                            selectedCategory === category.id
                              ? 'border-primary bg-primary/10'
                              : 'border-border hover:bg-muted/50'
                          }`}
                        >
                          <category.icon className="h-5 w-5 mx-auto mb-1" />
                          <div className="text-xs font-medium">{category.name}</div>
                        </button>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <label className="text-sm font-medium text-foreground mb-2 block">
                      Description
                    </label>
                    <Textarea
                      placeholder="Describe your room..."
                      value={newRoomDescription}
                      onChange={(e) => setNewRoomDescription(e.target.value)}
                      rows={3}
                    />
                  </div>
                  
                  <div className="flex space-x-2">
                    <Button 
                      onClick={handleCreateRoom} 
                      className="flex-1 bg-primary hover:bg-primary/90"
                      disabled={!newRoomTitle || !selectedCategory}
                    >
                      Create Room
                    </Button>
                    <Button variant="outline" onClick={() => setShowCreateRoom(false)}>
                      Cancel
                    </Button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          </div>

          {/* Room Categories */}
          <div className="mb-8">
            <h2 className="text-lg font-semibold text-foreground mb-4">Popular Categories</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4">
              {roomCategories.map((category) => (
                <Card key={category.id} className="cursor-pointer hover:shadow-md transition-all">
                  <CardContent className="p-4 text-center">
                    <category.icon className="h-8 w-8 mx-auto mb-2 text-primary" />
                    <h3 className="font-medium text-sm text-foreground mb-1">
                      {category.name}
                    </h3>
                    <p className="text-xs text-muted-foreground">
                      {category.description}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Active Rooms */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-foreground">Active Rooms</h2>
              <Badge variant="secondary" className="bg-green-100 text-green-800">
                {activeRooms.length} rooms live
              </Badge>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {activeRooms.map((room) => {
                const categoryInfo = getCategoryInfo(room.category);
                
                return (
                  <Card key={room.id} className="hover:shadow-md transition-all">
                    <CardHeader className="pb-3">
                      <div className="flex items-start justify-between">
                        <div className="flex items-center space-x-2">
                          <categoryInfo.icon className="h-5 w-5 text-primary" />
                          <Badge className={categoryInfo.color}>
                            {categoryInfo.name}
                          </Badge>
                        </div>
                        <div className="flex items-center text-green-600">
                          <div className="h-2 w-2 bg-green-500 rounded-full mr-1 animate-pulse" />
                          <span className="text-xs">Live</span>
                        </div>
                      </div>
                      
                      <CardTitle className="text-lg">{room.title}</CardTitle>
                      <p className="text-sm text-muted-foreground">{room.description}</p>
                    </CardHeader>
                    
                    <CardContent className="pt-0">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                          <div className="flex items-center">
                            <Users className="h-4 w-4 mr-1" />
                            {room.participants}/{room.maxParticipants}
                          </div>
                          <div className="flex items-center">
                            <Clock className="h-4 w-4 mr-1" />
                            {room.timeLeft}
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center space-x-2">
                          <Avatar className="h-6 w-6">
                            <AvatarImage src="" />
                            <AvatarFallback className="text-xs">
                              {room.host.split(' ').map(n => n[0]).join('')}
                            </AvatarFallback>
                          </Avatar>
                          <span className="text-sm text-muted-foreground">
                            Hosted by {room.host}
                          </span>
                        </div>
                      </div>
                      
                      <div className="flex space-x-2">
                        <Button className="flex-1 bg-primary hover:bg-primary/90">
                          <Video className="h-4 w-4 mr-2" />
                          Join Room
                        </Button>
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => copyMeetLink(room.meetLink)}
                        >
                          <Share2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hangout;
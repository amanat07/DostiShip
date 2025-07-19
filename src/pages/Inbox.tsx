import React, { useState } from 'react';
import Sidebar from '@/components/Sidebar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Badge } from '@/components/ui/badge';
import { 
  Send, 
  Paperclip, 
  Image, 
  Phone, 
  Video, 
  Smile,
  MoreHorizontal,
  Search
} from 'lucide-react';

const Inbox = () => {
  const [selectedChat, setSelectedChat] = useState(0);
  const [message, setMessage] = useState('');

  const conversations = [
    {
      id: 1,
      name: 'Priya Sharma',
      lastMessage: 'Hey! Are you free for study session?',
      time: '2 min ago',
      unread: 2,
      avatar: 'PS',
      online: true,
      interests: ['Gaming', 'Coding']
    },
    {
      id: 2,
      name: 'Arjun Patel',
      lastMessage: 'Thanks for the notes!',
      time: '1 hour ago',
      unread: 0,
      avatar: 'AP',
      online: true,
      interests: ['Music', 'Movies']
    },
    {
      id: 3,
      name: 'Study Group - CS101',
      lastMessage: 'Meeting at 3 PM tomorrow',
      time: '3 hours ago',
      unread: 5,
      avatar: 'SG',
      online: false,
      interests: ['Study Group']
    },
    {
      id: 4,
      name: 'Kavya Singh',
      lastMessage: 'Love your photography!',
      time: '1 day ago',
      unread: 0,
      avatar: 'KS',
      online: false,
      interests: ['Photography', 'Art']
    }
  ];

  const messages = [
    { id: 1, text: 'Hey! Are you free for study session?', sender: 'other', time: '2:30 PM' },
    { id: 2, text: 'Yes! What subject?', sender: 'me', time: '2:32 PM' },
    { id: 3, text: 'Data Structures. I\'m struggling with trees', sender: 'other', time: '2:33 PM' },
    { id: 4, text: 'Perfect! I can help with that. Virtual hangout?', sender: 'me', time: '2:35 PM' },
    { id: 5, text: 'That would be amazing! 🙌', sender: 'other', time: '2:36 PM' }
  ];

  const handleSendMessage = () => {
    if (message.trim()) {
      // Handle sending message
      setMessage('');
    }
  };

  return (
    <div className="flex h-screen bg-background">
      <Sidebar />
      
      <div className="flex-1 flex">
        {/* Chat List */}
        <div className="w-80 border-r border-border bg-card">
          <div className="p-4 border-b border-border">
            <h1 className="text-xl font-semibold text-foreground mb-4">Messages</h1>
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input 
                placeholder="Search conversations..." 
                className="pl-10"
              />
            </div>
          </div>
          
          <ScrollArea className="flex-1">
            {conversations.map((conv, index) => (
              <div
                key={conv.id}
                onClick={() => setSelectedChat(index)}
                className={`p-4 border-b border-border cursor-pointer transition-colors hover:bg-muted/50 ${
                  selectedChat === index ? 'bg-muted' : ''
                }`}
              >
                <div className="flex items-start space-x-3">
                  <div className="relative">
                    <Avatar className="h-12 w-12">
                      <AvatarImage src="" />
                      <AvatarFallback>{conv.avatar}</AvatarFallback>
                    </Avatar>
                    {conv.online && (
                      <div className="absolute -bottom-1 -right-1 h-4 w-4 bg-green-500 rounded-full border-2 border-background" />
                    )}
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <h3 className="font-medium text-sm text-foreground truncate">
                        {conv.name}
                      </h3>
                      <span className="text-xs text-muted-foreground">
                        {conv.time}
                      </span>
                    </div>
                    
                    <p className="text-sm text-muted-foreground truncate mt-1">
                      {conv.lastMessage}
                    </p>
                    
                    <div className="flex items-center justify-between mt-2">
                      <div className="flex flex-wrap gap-1">
                        {conv.interests.slice(0, 2).map((interest) => (
                          <Badge key={interest} variant="secondary" className="text-xs">
                            {interest}
                          </Badge>
                        ))}
                      </div>
                      
                      {conv.unread > 0 && (
                        <Badge className="bg-primary text-primary-foreground h-5 w-5 rounded-full text-xs p-0 flex items-center justify-center">
                          {conv.unread}
                        </Badge>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </ScrollArea>
        </div>

        {/* Chat Area */}
        <div className="flex-1 flex flex-col">
          {/* Chat Header */}
          <div className="p-4 border-b border-border bg-card">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="relative">
                  <Avatar className="h-10 w-10">
                    <AvatarImage src="" />
                    <AvatarFallback>{conversations[selectedChat].avatar}</AvatarFallback>
                  </Avatar>
                  {conversations[selectedChat].online && (
                    <div className="absolute -bottom-1 -right-1 h-3 w-3 bg-green-500 rounded-full border-2 border-background" />
                  )}
                </div>
                
                <div>
                  <h3 className="font-medium text-foreground">
                    {conversations[selectedChat].name}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {conversations[selectedChat].online ? 'Online' : 'Last seen 1 hour ago'}
                  </p>
                </div>
              </div>
              
              <div className="flex items-center space-x-2">
                <Button variant="ghost" size="sm">
                  <Phone className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="sm">
                  <Video className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="sm">
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>

          {/* Messages */}
          <ScrollArea className="flex-1 p-4">
            <div className="space-y-4">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex ${msg.sender === 'me' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                      msg.sender === 'me'
                        ? 'bg-primary text-primary-foreground'
                        : 'bg-muted text-foreground'
                    }`}
                  >
                    <p className="text-sm">{msg.text}</p>
                    <p className={`text-xs mt-1 ${
                      msg.sender === 'me' ? 'text-primary-foreground/70' : 'text-muted-foreground'
                    }`}>
                      {msg.time}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>

          {/* Message Input */}
          <div className="p-4 border-t border-border bg-card">
            <div className="flex items-center space-x-2">
              <Button variant="ghost" size="sm">
                <Paperclip className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="sm">
                <Image className="h-4 w-4" />
              </Button>
              
              <div className="flex-1 relative">
                <Input
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Type a message..."
                  onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                  className="pr-10"
                />
                <Button
                  variant="ghost"
                  size="sm"
                  className="absolute right-1 top-1/2 -translate-y-1/2"
                >
                  <Smile className="h-4 w-4" />
                </Button>
              </div>
              
              <Button onClick={handleSendMessage} size="sm" className="bg-primary hover:bg-primary/90">
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Inbox;
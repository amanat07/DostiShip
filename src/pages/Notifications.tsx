import Sidebar from "@/components/Sidebar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { UserPlus, Users, Heart, MessageCircle, Clock } from "lucide-react";

const Notifications = () => {
  const notifications = [
    {
      id: 1,
      type: "follow_request",
      user: { name: "Alex Chen", avatar: "/placeholder.svg", username: "alexc" },
      timestamp: "2 minutes ago",
      message: "wants to follow you"
    },
    {
      id: 2,
      type: "group_request",
      user: { name: "Sarah Wilson", avatar: "/placeholder.svg", username: "sarahw" },
      group: "Study Buddies",
      timestamp: "5 minutes ago",
      message: "invited you to join"
    },
    {
      id: 3,
      type: "like",
      user: { name: "Mike Johnson", avatar: "/placeholder.svg", username: "mikej" },
      timestamp: "10 minutes ago",
      message: "liked your post about weekend study plans"
    },
    {
      id: 4,
      type: "comment",
      user: { name: "Emma Davis", avatar: "/placeholder.svg", username: "emmad" },
      timestamp: "15 minutes ago",
      message: "commented on your post: 'Great study tips!'"
    },
    {
      id: 5,
      type: "follow_request",
      user: { name: "David Lee", avatar: "/placeholder.svg", username: "davidl" },
      timestamp: "1 hour ago",
      message: "wants to follow you"
    },
    {
      id: 6,
      type: "like",
      user: { name: "Lisa Park", avatar: "/placeholder.svg", username: "lisap" },
      timestamp: "2 hours ago",
      message: "liked your post about morning routines"
    }
  ];

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case "follow_request":
        return <UserPlus className="w-5 h-5 text-blue-500" />;
      case "group_request":
        return <Users className="w-5 h-5 text-green-500" />;
      case "like":
        return <Heart className="w-5 h-5 text-red-500" />;
      case "comment":
        return <MessageCircle className="w-5 h-5 text-purple-500" />;
      default:
        return <Clock className="w-5 h-5 text-gray-500" />;
    }
  };

  const getNotificationBadge = (type: string) => {
    switch (type) {
      case "follow_request":
        return <Badge variant="secondary">Follow Request</Badge>;
      case "group_request":
        return <Badge variant="secondary">Group Invitation</Badge>;
      case "like":
        return <Badge variant="outline">Like</Badge>;
      case "comment":
        return <Badge variant="outline">Comment</Badge>;
      default:
        return null;
    }
  };

  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar />
      
      <main className="flex-1 p-6">
        <div className="max-w-4xl mx-auto">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="w-6 h-6" />
                Notifications
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {notifications.map((notification) => (
                <div
                  key={notification.id}
                  className="flex items-start gap-4 p-4 rounded-lg border border-border/50 hover:bg-muted/30 transition-colors"
                >
                  <div className="flex-shrink-0">
                    {getNotificationIcon(notification.type)}
                  </div>
                  
                  <Avatar className="w-10 h-10">
                    <AvatarImage src={notification.user.avatar} />
                    <AvatarFallback>
                      {notification.user.name.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <p className="text-sm">
                        <span className="font-medium">{notification.user.name}</span>
                        {' '}
                        {notification.message}
                        {notification.group && (
                          <span className="font-medium"> "{notification.group}"</span>
                        )}
                      </p>
                      {getNotificationBadge(notification.type)}
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">
                      {notification.timestamp}
                    </p>
                  </div>
                  
                  <div className="flex gap-2">
                    {(notification.type === "follow_request" || notification.type === "group_request") && (
                      <>
                        <Button size="sm" variant="default">
                          Accept
                        </Button>
                        <Button size="sm" variant="outline">
                          Decline
                        </Button>
                      </>
                    )}
                    {(notification.type === "like" || notification.type === "comment") && (
                      <Button size="sm" variant="ghost">
                        View Post
                      </Button>
                    )}
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default Notifications;
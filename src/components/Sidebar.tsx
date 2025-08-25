import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Home, MessageSquare, Video, MapPin, Bell, Users, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const Sidebar = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const location = useLocation();

  const navigation = [
    { name: "Home", href: "/feed", icon: Home },
    { name: "Friend Finder", href: "/friend-finder", icon: Users },
    { name: "Inbox", href: "/inbox", icon: MessageSquare },
    { name: "Virtual Hangout", href: "/hangout", icon: Video },
    { name: "Friends Map", href: "/map", icon: MapPin },
    { name: "Notifications", href: "/notifications", icon: Bell },
  ];

  return (
    <div className={cn(
      "bg-card border-r border-border transition-all duration-300 flex flex-col",
      isCollapsed ? "w-16" : "w-64"
    )}>
      <div className="p-4 border-b border-border">
        <div className="flex items-center justify-between">
          {!isCollapsed && (
            <Link to="/feed" className="text-xl font-bold text-primary">
              Dostiशिप
            </Link>
          )}
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsCollapsed(!isCollapsed)}
          >
            {isCollapsed ? <Menu className="h-4 w-4" /> : <X className="h-4 w-4" />}
          </Button>
        </div>
      </div>

      <nav className="flex-1 p-4 space-y-2">
        {navigation.map((item) => {
          const isActive = location.pathname === item.href;
          return (
            <Link
              key={item.name}
              to={item.href}
              className={cn(
                "flex items-center px-3 py-2 rounded-lg text-sm font-medium transition-colors",
                isActive
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:text-foreground hover:bg-muted",
                isCollapsed && "justify-center"
              )}
            >
              <item.icon className={cn("h-5 w-5", !isCollapsed && "mr-3")} />
              {!isCollapsed && <span>{item.name}</span>}
            </Link>
          );
        })}
      </nav>

      <div className="p-4 border-t border-border">
        <Button
          variant="outline"
          size="sm"
          className={cn("w-full", isCollapsed && "px-2")}
          onClick={() => {
            // TODO: Implement logout functionality
            console.log("Logout");
          }}
        >
          {isCollapsed ? "↩" : "Logout"}
        </Button>
      </div>
    </div>
  );
};

export default Sidebar;
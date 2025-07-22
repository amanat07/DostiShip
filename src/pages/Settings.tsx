import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Bell, Shield, User, Moon, Sun, Smartphone, Globe, Heart, MessageCircle, Eye, Lock } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

const Settings = () => {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  const settingsSections = [
    {
      title: "Account",
      icon: User,
      settings: [
        { label: "Edit Profile", description: "Update your personal information", action: "edit" },
        { label: "Change Password", description: "Update your account password", action: "password" },
        { label: "Email Preferences", description: "Manage email notifications", action: "email" },
      ]
    },
    {
      title: "Privacy & Security",
      icon: Shield,
      settings: [
        { label: "Profile Visibility", description: "Control who can see your profile", action: "toggle", enabled: true },
        { label: "Two-Factor Authentication", description: "Add extra security to your account", action: "toggle", enabled: false },
        { label: "Data Download", description: "Download a copy of your information", action: "download" },
        { label: "Account Deletion", description: "Permanently delete your account", action: "delete" },
      ]
    },
    {
      title: "Notifications",
      icon: Bell,
      settings: [
        { label: "Push Notifications", description: "Receive notifications on your device", action: "toggle", enabled: true },
        { label: "Friend Requests", description: "Get notified about new friend requests", action: "toggle", enabled: true },
        { label: "Messages", description: "Notifications for new messages", action: "toggle", enabled: true },
        { label: "Events & Hangouts", description: "Updates about events you're interested in", action: "toggle", enabled: false },
      ]
    },
    {
      title: "Appearance",
      icon: theme === "dark" ? Moon : Sun,
      settings: [
        { label: "Dark Mode", description: "Switch between light and dark themes", action: "theme" },
        { label: "Language", description: "Choose your preferred language", action: "language" },
      ]
    },
    {
      title: "Support",
      icon: Heart,
      settings: [
        { label: "Help Center", description: "Get help and find answers", action: "help" },
        { label: "Contact Support", description: "Reach out to our support team", action: "contact" },
        { label: "Report a Problem", description: "Report bugs or issues", action: "report" },
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="pt-24 pb-16 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <h1 className="text-4xl font-bold mb-2">Settings</h1>
            <p className="text-muted-foreground">Manage your account settings and preferences</p>
          </div>

          {/* Profile Overview */}
          <Card className="mb-8">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <Avatar className="w-16 h-16">
                  <AvatarImage src="/placeholder.svg" />
                  <AvatarFallback>JD</AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <h3 className="text-xl font-semibold">John Doe</h3>
                  <p className="text-muted-foreground">john.doe@example.com</p>
                  <p className="text-sm text-muted-foreground">Member since January 2024</p>
                </div>
                <Button variant="outline">View Profile</Button>
              </div>
            </CardContent>
          </Card>

          {/* Settings Sections */}
          <div className="space-y-6">
            {settingsSections.map((section, sectionIndex) => (
              <Card key={sectionIndex}>
                <CardHeader>
                  <CardTitle className="flex items-center gap-3">
                    <section.icon className="w-5 h-5" />
                    {section.title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {section.settings.map((setting, settingIndex) => (
                    <div key={settingIndex}>
                      <div className="flex items-center justify-between py-2">
                        <div className="flex-1">
                          <div className="font-medium">{setting.label}</div>
                          <div className="text-sm text-muted-foreground">{setting.description}</div>
                        </div>
                        <div className="flex items-center gap-2">
                          {setting.action === "toggle" && (
                            <Switch defaultChecked={setting.enabled} />
                          )}
                          {setting.action === "theme" && (
                            <div className="flex items-center gap-2">
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => setTheme("light")}
                                className={theme === "light" ? "bg-primary text-primary-foreground" : ""}
                              >
                                <Sun className="w-4 h-4" />
                              </Button>
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => setTheme("dark")}
                                className={theme === "dark" ? "bg-primary text-primary-foreground" : ""}
                              >
                                <Moon className="w-4 h-4" />
                              </Button>
                            </div>
                          )}
                          {(setting.action === "edit" || setting.action === "password" || setting.action === "email" || setting.action === "download" || setting.action === "help" || setting.action === "contact" || setting.action === "report" || setting.action === "language") && (
                            <Button variant="ghost" size="sm">
                              Configure
                            </Button>
                          )}
                          {setting.action === "delete" && (
                            <Button variant="destructive" size="sm">
                              Delete
                            </Button>
                          )}
                        </div>
                      </div>
                      {settingIndex < section.settings.length - 1 && <Separator />}
                    </div>
                  ))}
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Danger Zone */}
          <Card className="border-destructive/50 mt-8">
            <CardHeader>
              <CardTitle className="text-destructive">Danger Zone</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-medium">Deactivate Account</div>
                    <div className="text-sm text-muted-foreground">Temporarily disable your account</div>
                  </div>
                  <Button variant="outline" className="border-destructive text-destructive hover:bg-destructive hover:text-destructive-foreground">
                    Deactivate
                  </Button>
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-medium">Delete Account</div>
                    <div className="text-sm text-muted-foreground">Permanently delete your account and all data</div>
                  </div>
                  <Button variant="destructive">
                    Delete Account
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Settings;
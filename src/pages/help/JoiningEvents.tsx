import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Calendar, MapPin, Bell, Ticket } from "lucide-react";
import { Link } from "react-router-dom";

const JoiningEvents = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="pt-24 pb-16 px-6">
        <div className="max-w-4xl mx-auto">
          <Button variant="ghost" asChild className="mb-6">
            <Link to="/help-center">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Help Center
            </Link>
          </Button>

          <Card>
            <CardHeader>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                  <Calendar className="w-6 h-6 text-primary" />
                </div>
                <CardTitle className="text-3xl">Joining Events</CardTitle>
              </div>
              <p className="text-muted-foreground text-lg">
                Discover and participate in exciting campus and virtual events
              </p>
            </CardHeader>
            <CardContent className="space-y-8">
              <section>
                <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
                  <Calendar className="w-5 h-5" />
                  Finding Events
                </h2>
                <div className="space-y-3 text-muted-foreground">
                  <p>Discover events that match your interests:</p>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li>Browse the Events section in your dashboard</li>
                    <li>Filter by category, date, and location</li>
                    <li>Search for specific types of events</li>
                    <li>Check events your friends are attending</li>
                    <li>Explore featured and trending events</li>
                  </ul>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
                  <Ticket className="w-5 h-5" />
                  Joining Events
                </h2>
                <div className="space-y-3 text-muted-foreground">
                  <p>How to register and participate:</p>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li>Click on any event to see details</li>
                    <li>Read the description and requirements</li>
                    <li>Click "Join Event" or "Register"</li>
                    <li>Fill out any required information</li>
                    <li>Confirm your attendance</li>
                    <li>Add the event to your calendar</li>
                  </ul>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
                  <MapPin className="w-5 h-5" />
                  Event Types
                </h2>
                <div className="space-y-3 text-muted-foreground">
                  <p>Various types of events available:</p>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li><strong>Study Groups:</strong> Academic focused sessions</li>
                    <li><strong>Social Meetups:</strong> Casual gatherings and hangouts</li>
                    <li><strong>Workshops:</strong> Skill-building and learning events</li>
                    <li><strong>Sports Activities:</strong> Physical activities and games</li>
                    <li><strong>Cultural Events:</strong> Festivals and celebrations</li>
                    <li><strong>Virtual Events:</strong> Online activities and webinars</li>
                  </ul>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
                  <Bell className="w-5 h-5" />
                  Event Notifications
                </h2>
                <div className="space-y-3 text-muted-foreground">
                  <p>Stay updated about your events:</p>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li>Receive reminders before events start</li>
                    <li>Get notified about event updates or changes</li>
                    <li>Connect with other attendees beforehand</li>
                    <li>Access event materials and resources</li>
                    <li>Share photos and feedback after events</li>
                  </ul>
                </div>
              </section>

              <div className="bg-muted/30 p-6 rounded-lg">
                <h3 className="font-semibold mb-2">🎯 Event Tips</h3>
                <ul className="space-y-2 text-muted-foreground">
                  <li>• Arrive early to network and find good seats</li>
                  <li>• Bring business cards or contact info to share</li>
                  <li>• Participate actively in discussions</li>
                  <li>• Follow up with new connections after events</li>
                  <li>• Leave honest reviews to help other students</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default JoiningEvents;
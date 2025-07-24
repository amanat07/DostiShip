import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, MessageCircle, Send, Image, Smile } from "lucide-react";
import { Link } from "react-router-dom";

const SendingMessages = () => {
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
                  <MessageCircle className="w-6 h-6 text-primary" />
                </div>
                <CardTitle className="text-3xl">Sending Messages</CardTitle>
              </div>
              <p className="text-muted-foreground text-lg">
                Learn how to communicate with your friends through messaging
              </p>
            </CardHeader>
            <CardContent className="space-y-8">
              <section>
                <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
                  <Send className="w-5 h-5" />
                  Starting Conversations
                </h2>
                <div className="space-y-3 text-muted-foreground">
                  <p>Begin meaningful conversations with your friends:</p>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li>Click on a friend's profile to start a conversation</li>
                    <li>Use the message button in the feed or friend list</li>
                    <li>Start with a friendly greeting and common interests</li>
                    <li>Ask open-ended questions to keep conversations flowing</li>
                    <li>Be respectful and considerate in your messages</li>
                  </ul>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
                  <Image className="w-5 h-5" />
                  Rich Messaging Features
                </h2>
                <div className="space-y-3 text-muted-foreground">
                  <p>Make your messages more engaging:</p>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li><strong>Text formatting:</strong> Use bold, italic, and other formatting</li>
                    <li><strong>Emojis:</strong> Express emotions with a wide range of emojis</li>
                    <li><strong>Images:</strong> Share photos and pictures</li>
                    <li><strong>Voice messages:</strong> Send audio messages for personal touch</li>
                    <li><strong>Study materials:</strong> Share documents and files</li>
                  </ul>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
                  <Smile className="w-5 h-5" />
                  Message Etiquette
                </h2>
                <div className="space-y-3 text-muted-foreground">
                  <p>Best practices for messaging:</p>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li>Be clear and concise in your messages</li>
                    <li>Respect response times - not everyone is always online</li>
                    <li>Use appropriate language and tone</li>
                    <li>Don't spam or send excessive messages</li>
                    <li>Respect privacy and don't share personal information</li>
                  </ul>
                </div>
              </section>

              <div className="bg-muted/30 p-6 rounded-lg">
                <h3 className="font-semibold mb-2">💬 Conversation Tips</h3>
                <ul className="space-y-2 text-muted-foreground">
                  <li>• Share interesting articles or resources related to studies</li>
                  <li>• Plan study sessions or hangouts through messages</li>
                  <li>• Celebrate achievements and support each other</li>
                  <li>• Use group messages for coordinating activities</li>
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

export default SendingMessages;
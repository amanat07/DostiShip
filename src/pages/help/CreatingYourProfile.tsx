import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, User, Camera, Edit3, Shield } from "lucide-react";
import { Link } from "react-router-dom";

const CreatingYourProfile = () => {
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
                  <User className="w-6 h-6 text-primary" />
                </div>
                <CardTitle className="text-3xl">Creating Your Profile</CardTitle>
              </div>
              <p className="text-muted-foreground text-lg">
                Learn how to set up your Dostiशिप profile to make meaningful connections
              </p>
            </CardHeader>
            <CardContent className="space-y-8">
              <section>
                <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
                  <Camera className="w-5 h-5" />
                  Profile Photo
                </h2>
                <div className="space-y-3 text-muted-foreground">
                  <p>Your profile photo is the first thing people see. Here's how to add one:</p>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li>Click on the camera icon when viewing your profile</li>
                    <li>Choose a clear, recent photo that shows your face</li>
                    <li>Make sure the image is well-lit and appropriate</li>
                    <li>Avoid group photos or images with text overlay</li>
                  </ul>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
                  <Edit3 className="w-5 h-5" />
                  Personal Information
                </h2>
                <div className="space-y-3 text-muted-foreground">
                  <p>Fill out your basic information to help others get to know you:</p>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li><strong>Name:</strong> Use your real name to build trust</li>
                    <li><strong>Bio:</strong> Write a brief description about yourself and your interests</li>
                    <li><strong>Location:</strong> Add your university or city</li>
                    <li><strong>Interests:</strong> Tag your hobbies and interests</li>
                    <li><strong>Study Field:</strong> Mention what you're studying</li>
                  </ul>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
                  <Shield className="w-5 h-5" />
                  Privacy Settings
                </h2>
                <div className="space-y-3 text-muted-foreground">
                  <p>Control who can see your information:</p>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li>Set your profile visibility (public, friends only, or private)</li>
                    <li>Choose who can send you friend requests</li>
                    <li>Control who can see your posts and activities</li>
                    <li>Manage who can contact you directly</li>
                  </ul>
                </div>
              </section>

              <div className="bg-muted/30 p-6 rounded-lg">
                <h3 className="font-semibold mb-2">💡 Pro Tips</h3>
                <ul className="space-y-2 text-muted-foreground">
                  <li>• Complete profiles get 5x more friend requests</li>
                  <li>• Add interests to find like-minded people</li>
                  <li>• Keep your bio friendly and approachable</li>
                  <li>• Update your profile regularly</li>
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

export default CreatingYourProfile;
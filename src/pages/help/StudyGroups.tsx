import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, BookOpen, Users, Clock, Target } from "lucide-react";
import { Link } from "react-router-dom";

const StudyGroups = () => {
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
                  <BookOpen className="w-6 h-6 text-primary" />
                </div>
                <CardTitle className="text-3xl">Study Groups</CardTitle>
              </div>
              <p className="text-muted-foreground text-lg">
                Form and join study groups to enhance your academic performance
              </p>
            </CardHeader>
            <CardContent className="space-y-8">
              <section>
                <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
                  <Users className="w-5 h-5" />
                  Creating Study Groups
                </h2>
                <div className="space-y-3 text-muted-foreground">
                  <p>Start your own study group:</p>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li>Go to the Study Groups section</li>
                    <li>Click "Create New Study Group"</li>
                    <li>Select your subject and course</li>
                    <li>Set meeting times and frequency</li>
                    <li>Choose between in-person or virtual meetings</li>
                    <li>Invite classmates or make it open to join</li>
                  </ul>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
                  <BookOpen className="w-5 h-5" />
                  Finding Study Groups
                </h2>
                <div className="space-y-3 text-muted-foreground">
                  <p>Join existing study groups:</p>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li>Search by subject, course code, or university</li>
                    <li>Filter by study style and meeting preferences</li>
                    <li>Check group member profiles and reviews</li>
                    <li>Request to join or get invited by friends</li>
                    <li>Read group descriptions and goals</li>
                  </ul>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
                  <Clock className="w-5 h-5" />
                  Study Session Features
                </h2>
                <div className="space-y-3 text-muted-foreground">
                  <p>Make the most of your study sessions:</p>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li>Shared note-taking and document collaboration</li>
                    <li>Pomodoro timer for focused study periods</li>
                    <li>Screen sharing for presentations</li>
                    <li>Digital whiteboard for problem solving</li>
                    <li>Quiz creation and practice tests</li>
                    <li>Resource sharing and file uploads</li>
                  </ul>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
                  <Target className="w-5 h-5" />
                  Study Group Types
                </h2>
                <div className="space-y-3 text-muted-foreground">
                  <p>Different types of study groups available:</p>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li><strong>Exam Prep:</strong> Focused on upcoming tests and finals</li>
                    <li><strong>Assignment Help:</strong> Collaborative homework assistance</li>
                    <li><strong>Concept Review:</strong> Deep dives into difficult topics</li>
                    <li><strong>Project Teams:</strong> Group assignments and presentations</li>
                    <li><strong>Language Practice:</strong> Conversation and language learning</li>
                    <li><strong>Peer Teaching:</strong> Students teaching each other</li>
                  </ul>
                </div>
              </section>

              <div className="bg-muted/30 p-6 rounded-lg">
                <h3 className="font-semibold mb-2">📚 Study Group Best Practices</h3>
                <ul className="space-y-2 text-muted-foreground">
                  <li>• Set clear goals and expectations</li>
                  <li>• Assign roles and responsibilities</li>
                  <li>• Stay focused and minimize distractions</li>
                  <li>• Respect different learning styles</li>
                  <li>• Share resources and notes regularly</li>
                  <li>• Celebrate achievements together</li>
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

export default StudyGroups;
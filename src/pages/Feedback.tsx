import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { Star, MessageSquare, Lightbulb, Bug } from "lucide-react";
import { useState } from "react";

const Feedback = () => {
  const [selectedFeedbackType, setSelectedFeedbackType] = useState("general");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Feedback submitted");
  };

  const feedbackTypes = [
    { id: "general", label: "General Feedback", icon: MessageSquare },
    { id: "feature", label: "Feature Request", icon: Lightbulb },
    { id: "bug", label: "Bug Report", icon: Bug },
    { id: "review", label: "Review/Rating", icon: Star }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Section */}
      <section className="bg-gradient-primary text-white py-24 pt-32">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Share Your Feedback</h1>
          <p className="text-xl opacity-90">Help us make Dostiशिप better for everyone</p>
        </div>
      </section>

      {/* Feedback Form */}
      <section className="py-16 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8">
            {/* Feedback Types */}
            <div className="space-y-4">
              <h2 className="text-2xl font-bold mb-6">How can we help?</h2>
              {feedbackTypes.map((type) => (
                <Card 
                  key={type.id} 
                  className={`hover:shadow-md transition-shadow cursor-pointer ${
                    selectedFeedbackType === type.id ? 'ring-2 ring-primary' : ''
                  }`}
                  onClick={() => setSelectedFeedbackType(type.id)}
                >
                  <CardContent className="p-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                        <type.icon className="w-5 h-5 text-primary" />
                      </div>
                      <span className="font-medium">{type.label}</span>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Feedback Form */}
            <div className="md:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle>Tell us what you think</CardTitle>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Dynamic Form Content Based on Selection */}
                    {selectedFeedbackType === "feature" && (
                      <>
                        <div>
                          <Label htmlFor="feature-title">Feature Title</Label>
                          <Input 
                            id="feature-title" 
                            placeholder="What feature would you like to see?"
                            className="mt-2"
                          />
                        </div>
                        <div>
                          <Label htmlFor="feature-description">Feature Description</Label>
                          <Textarea 
                            id="feature-description"
                            placeholder="Describe how this feature would work and why it would be useful..."
                            className="mt-2 min-h-[150px]"
                          />
                        </div>
                        <div>
                          <Label htmlFor="use-case">Use Case</Label>
                          <Textarea 
                            id="use-case"
                            placeholder="When and how would you use this feature?"
                            className="mt-2"
                          />
                        </div>
                      </>
                    )}

                    {selectedFeedbackType === "bug" && (
                      <>
                        <div>
                          <Label htmlFor="bug-title">Bug Title</Label>
                          <Input 
                            id="bug-title" 
                            placeholder="Brief description of the bug"
                            className="mt-2"
                          />
                        </div>
                        <div>
                          <Label htmlFor="steps-to-reproduce">Steps to Reproduce</Label>
                          <Textarea 
                            id="steps-to-reproduce"
                            placeholder="1. First step&#10;2. Second step&#10;3. Third step..."
                            className="mt-2 min-h-[120px]"
                          />
                        </div>
                        <div>
                          <Label htmlFor="expected-behavior">Expected Behavior</Label>
                          <Textarea 
                            id="expected-behavior"
                            placeholder="What should have happened?"
                            className="mt-2"
                          />
                        </div>
                        <div>
                          <Label htmlFor="actual-behavior">Actual Behavior</Label>
                          <Textarea 
                            id="actual-behavior"
                            placeholder="What actually happened?"
                            className="mt-2"
                          />
                        </div>
                      </>
                    )}

                    {selectedFeedbackType === "review" && (
                      <>
                        <div>
                          <Label className="text-base font-medium">Overall Rating</Label>
                          <div className="flex gap-1 mt-3">
                            {[1, 2, 3, 4, 5].map((star) => (
                              <button
                                key={star}
                                type="button"
                                className="w-8 h-8 text-yellow-400 hover:text-yellow-500 transition-colors"
                              >
                                <Star className="w-full h-full fill-current" />
                              </button>
                            ))}
                          </div>
                        </div>
                        <div>
                          <Label htmlFor="review-title">Review Title</Label>
                          <Input 
                            id="review-title" 
                            placeholder="Sum up your experience"
                            className="mt-2"
                          />
                        </div>
                        <div>
                          <Label htmlFor="review-details">Detailed Review</Label>
                          <Textarea 
                            id="review-details"
                            placeholder="Share your detailed experience with Dostiशिप..."
                            className="mt-2 min-h-[150px]"
                          />
                        </div>
                        <div>
                          <Label htmlFor="recommendation">Would you recommend us?</Label>
                          <RadioGroup className="mt-3">
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="yes" id="recommend-yes" />
                              <Label htmlFor="recommend-yes">Yes, definitely</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="maybe" id="recommend-maybe" />
                              <Label htmlFor="recommend-maybe">Maybe</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="no" id="recommend-no" />
                              <Label htmlFor="recommend-no">No</Label>
                            </div>
                          </RadioGroup>
                        </div>
                      </>
                    )}

                    {selectedFeedbackType === "general" && (
                      <>
                        <div>
                          <Label htmlFor="subject">Subject</Label>
                          <Input 
                            id="subject" 
                            placeholder="Brief description of your feedback"
                            className="mt-2"
                          />
                        </div>
                        <div>
                          <Label htmlFor="feedback">Your Feedback</Label>
                          <Textarea 
                            id="feedback"
                            placeholder="Tell us more about your experience, suggestions, or issues..."
                            className="mt-2 min-h-[150px]"
                          />
                        </div>
                      </>
                    )}

                    {/* Contact Information */}
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="name">Your Name</Label>
                        <Input id="name" className="mt-2" />
                      </div>
                      <div>
                        <Label htmlFor="email">Email Address</Label>
                        <Input id="email" type="email" className="mt-2" />
                      </div>
                    </div>

                    {/* Follow-up Consent */}
                    <div className="flex items-center space-x-2">
                      <Checkbox id="followup" />
                      <Label htmlFor="followup" className="text-sm">
                        I agree to be contacted for follow-up questions about this feedback
                      </Label>
                    </div>

                    <Button type="submit" size="lg" className="w-full">
                      Submit Feedback
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Thank You Message */}
      <section className="py-16 px-6 bg-muted/30">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6">Thank You!</h2>
          <p className="text-muted-foreground mb-8">
            Your feedback helps us build a better platform for all students. 
            We read every submission and use your insights to improve Dostiशिप.
          </p>
          <div className="grid md:grid-cols-3 gap-6 mt-12">
            <div className="text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <MessageSquare className="w-8 h-8 text-primary" />
              </div>
              <h3 className="font-semibold mb-2">We Listen</h3>
              <p className="text-sm text-muted-foreground">Every piece of feedback is reviewed by our team</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Lightbulb className="w-8 h-8 text-primary" />
              </div>
              <h3 className="font-semibold mb-2">We Improve</h3>
              <p className="text-sm text-muted-foreground">Your suggestions drive our product development</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Star className="w-8 h-8 text-primary" />
              </div>
              <h3 className="font-semibold mb-2">We Grow</h3>
              <p className="text-sm text-muted-foreground">Together we build a better community</p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Feedback;
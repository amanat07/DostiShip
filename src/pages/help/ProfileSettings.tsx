import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, User, Camera, Edit, Globe, Eye, Heart } from "lucide-react";

const ProfileSettings = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="max-w-4xl mx-auto px-6 py-24 pt-32">
        <Button 
          variant="ghost" 
          onClick={() => window.history.back()}
          className="mb-6"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Help Center
        </Button>

        <Card>
          <CardHeader>
            <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
              <User className="w-6 h-6 text-primary" />
            </div>
            <CardTitle className="text-3xl">Profile Settings</CardTitle>
          </CardHeader>
          <CardContent className="space-y-8">
            <div>
              <h3 className="text-xl font-semibold mb-4 flex items-center">
                <Camera className="w-5 h-5 mr-2 text-primary" />
                Profile Photo & Cover Image
              </h3>
              <div className="space-y-4 ml-7">
                <div>
                  <h4 className="font-medium mb-2">Uploading Your Profile Photo:</h4>
                  <ol className="list-decimal list-inside text-sm text-muted-foreground space-y-1">
                    <li>Go to your profile page</li>
                    <li>Click on your current profile photo or the camera icon</li>
                    <li>Select "Upload New Photo" from the menu</li>
                    <li>Choose an image from your device</li>
                    <li>Crop and adjust the image as needed</li>
                    <li>Save your new profile photo</li>
                  </ol>
                </div>
                <div>
                  <h4 className="font-medium mb-2">Photo Guidelines:</h4>
                  <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1">
                    <li>Use a clear, recent photo of yourself</li>
                    <li>Ensure good lighting and image quality</li>
                    <li>Avoid group photos where you're hard to identify</li>
                    <li>Keep content appropriate and respectful</li>
                    <li>Maximum file size: 10MB</li>
                    <li>Supported formats: JPG, PNG, GIF</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-medium mb-2">Cover Image Options:</h4>
                  <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1">
                    <li>Upload a personal cover photo</li>
                    <li>Choose from our collection of backgrounds</li>
                    <li>Use solid colors or gradients</li>
                    <li>Recommended size: 1200x400 pixels</li>
                  </ul>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-4 flex items-center">
                <Edit className="w-5 h-5 mr-2 text-primary" />
                Basic Information
              </h3>
              <div className="space-y-4 ml-7">
                <div>
                  <h4 className="font-medium mb-2">Editable Profile Fields:</h4>
                  <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1">
                    <li><strong>Display Name:</strong> How others see you on Dostiशिप</li>
                    <li><strong>Username:</strong> Your unique identifier (can be changed once per month)</li>
                    <li><strong>Bio:</strong> Short description about yourself (150 characters)</li>
                    <li><strong>Birthday:</strong> Used for age verification and friend notifications</li>
                    <li><strong>Location:</strong> City/region for local friend suggestions</li>
                    <li><strong>Contact Information:</strong> Email and phone (privacy controlled)</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-medium mb-2">How to Edit Your Info:</h4>
                  <ol className="list-decimal list-inside text-sm text-muted-foreground space-y-1">
                    <li>Go to your profile page</li>
                    <li>Click "Edit Profile" button</li>
                    <li>Update the fields you want to change</li>
                    <li>Review your changes</li>
                    <li>Click "Save Changes"</li>
                  </ol>
                </div>
                <div>
                  <h4 className="font-medium mb-2">Username Guidelines:</h4>
                  <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1">
                    <li>3-20 characters long</li>
                    <li>Letters, numbers, underscores, and periods only</li>
                    <li>Must be unique across all Dostiशिप users</li>
                    <li>Cannot contain offensive or inappropriate content</li>
                    <li>Cannot impersonate others or brands</li>
                  </ul>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-4 flex items-center">
                <Heart className="w-5 h-5 mr-2 text-primary" />
                Interests & Preferences
              </h3>
              <div className="space-y-4 ml-7">
                <div>
                  <h4 className="font-medium mb-2">Adding Your Interests:</h4>
                  <ol className="list-decimal list-inside text-sm text-muted-foreground space-y-1">
                    <li>Navigate to Edit Profile</li>
                    <li>Find the "Interests" section</li>
                    <li>Search for or browse interest categories</li>
                    <li>Select interests that represent you</li>
                    <li>Add up to 10 interests to your profile</li>
                  </ol>
                </div>
                <div>
                  <h4 className="font-medium mb-2">Interest Categories:</h4>
                  <div className="grid md:grid-cols-2 gap-2">
                    <ul className="list-disc list-inside text-xs text-muted-foreground space-y-1">
                      <li>Sports & Fitness</li>
                      <li>Music & Entertainment</li>
                      <li>Books & Literature</li>
                      <li>Movies & TV Shows</li>
                      <li>Travel & Adventure</li>
                    </ul>
                    <ul className="list-disc list-inside text-xs text-muted-foreground space-y-1">
                      <li>Food & Cooking</li>
                      <li>Technology & Gaming</li>
                      <li>Art & Creativity</li>
                      <li>Education & Learning</li>
                      <li>Social Causes</li>
                    </ul>
                  </div>
                </div>
                <div>
                  <h4 className="font-medium mb-2">How Interests Help:</h4>
                  <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1">
                    <li>Connect with like-minded people</li>
                    <li>Get better friend recommendations</li>
                    <li>Discover relevant groups and events</li>
                    <li>Personalize your content feed</li>
                  </ul>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-4 flex items-center">
                <Eye className="w-5 h-5 mr-2 text-primary" />
                Profile Visibility & Privacy
              </h3>
              <div className="space-y-4 ml-7">
                <div>
                  <h4 className="font-medium mb-2">Visibility Options:</h4>
                  <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1">
                    <li><strong>Public:</strong> Anyone can find and view your profile</li>
                    <li><strong>Friends Only:</strong> Only confirmed friends can see your full profile</li>
                    <li><strong>Private:</strong> Hidden from search results and recommendations</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-medium mb-2">Individual Field Privacy:</h4>
                  <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1">
                    <li>Email address visibility</li>
                    <li>Phone number sharing</li>
                    <li>Birthday display options</li>
                    <li>Location information sharing</li>
                    <li>Online status visibility</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-medium mb-2">Controlling Profile Access:</h4>
                  <ol className="list-decimal list-inside text-sm text-muted-foreground space-y-1">
                    <li>Go to Settings → Privacy & Security</li>
                    <li>Find "Profile Visibility" section</li>
                    <li>Adjust overall profile visibility</li>
                    <li>Set individual field privacy levels</li>
                    <li>Save your privacy preferences</li>
                  </ol>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-4 flex items-center">
                <Globe className="w-5 h-5 mr-2 text-primary" />
                Profile URL & Sharing
              </h3>
              <div className="space-y-4 ml-7">
                <div>
                  <h4 className="font-medium mb-2">Custom Profile URL:</h4>
                  <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1">
                    <li>Create a memorable link to your profile</li>
                    <li>Format: dostiship.com/username</li>
                    <li>Makes it easy to share your profile</li>
                    <li>Updates automatically when you change username</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-medium mb-2">Sharing Your Profile:</h4>
                  <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1">
                    <li>Copy profile link to share on other platforms</li>
                    <li>Generate QR code for easy mobile sharing</li>
                    <li>Share via email or text message</li>
                    <li>Add to business cards or social media bios</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="bg-blue-50 dark:bg-blue-950/30 p-4 rounded-lg border border-blue-200 dark:border-blue-800">
              <h4 className="font-medium mb-2 text-blue-900 dark:text-blue-100">Profile Tips for Better Connections</h4>
              <ul className="list-disc list-inside text-sm text-blue-800 dark:text-blue-200 space-y-1">
                <li>Use a clear, friendly profile photo</li>
                <li>Write a genuine bio that reflects your personality</li>
                <li>Add diverse interests to connect with more people</li>
                <li>Keep your information current and accurate</li>
                <li>Balance privacy with discoverability</li>
                <li>Regularly review and update your profile</li>
              </ul>
            </div>

            <div className="bg-muted/30 p-4 rounded-lg">
              <h4 className="font-medium mb-2">Need Profile Help?</h4>
              <p className="text-sm text-muted-foreground mb-3">
                Having trouble updating your profile or need advice on privacy settings?
              </p>
              <Button variant="outline" onClick={() => window.open('/contact', '_blank')}>
                Contact Support
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      <Footer />
    </div>
  );
};

export default ProfileSettings;
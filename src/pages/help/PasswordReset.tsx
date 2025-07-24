import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Key, Mail, Shield, Clock } from "lucide-react";
import { Link } from "react-router-dom";

const PasswordReset = () => {
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
                  <Key className="w-6 h-6 text-primary" />
                </div>
                <CardTitle className="text-3xl">Password Reset</CardTitle>
              </div>
              <p className="text-muted-foreground text-lg">
                Learn how to reset your password and secure your account
              </p>
            </CardHeader>
            <CardContent className="space-y-8">
              <section>
                <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
                  <Mail className="w-5 h-5" />
                  Reset via Email
                </h2>
                <div className="space-y-3 text-muted-foreground">
                  <p>To reset your password using your email:</p>
                  <ol className="list-decimal list-inside space-y-2 ml-4">
                    <li>Go to the login page and click "Forgot Password"</li>
                    <li>Enter the email address associated with your account</li>
                    <li>Check your email for a password reset link</li>
                    <li>Click the link in the email (valid for 24 hours)</li>
                    <li>Create a new strong password</li>
                    <li>Confirm your new password</li>
                    <li>Log in with your new password</li>
                  </ol>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
                  <Shield className="w-5 h-5" />
                  Password Requirements
                </h2>
                <div className="space-y-3 text-muted-foreground">
                  <p>Your new password must include:</p>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li>At least 8 characters long</li>
                    <li>At least one uppercase letter (A-Z)</li>
                    <li>At least one lowercase letter (a-z)</li>
                    <li>At least one number (0-9)</li>
                    <li>At least one special character (!@#$%^&*)</li>
                    <li>Different from your last 3 passwords</li>
                  </ul>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
                  <Clock className="w-5 h-5" />
                  Troubleshooting
                </h2>
                <div className="space-y-3 text-muted-foreground">
                  <p>If you're having trouble resetting your password:</p>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li><strong>Email not received:</strong> Check spam/junk folders</li>
                    <li><strong>Link expired:</strong> Request a new reset link</li>
                    <li><strong>Wrong email:</strong> Try all email addresses you might have used</li>
                    <li><strong>Account locked:</strong> Wait 24 hours or contact support</li>
                    <li><strong>Technical issues:</strong> Clear browser cache and try again</li>
                  </ul>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4">From Settings</h2>
                <div className="space-y-3 text-muted-foreground">
                  <p>If you're already logged in, you can change your password from:</p>
                  <ol className="list-decimal list-inside space-y-2 ml-4">
                    <li>Go to Settings → Account → Change Password</li>
                    <li>Enter your current password</li>
                    <li>Enter your new password</li>
                    <li>Confirm your new password</li>
                    <li>Save changes</li>
                  </ol>
                </div>
              </section>

              <div className="bg-muted/30 p-6 rounded-lg">
                <h3 className="font-semibold mb-2">🔒 Security Tips</h3>
                <ul className="space-y-2 text-muted-foreground">
                  <li>• Use a unique password for your Dostiशिप account</li>
                  <li>• Consider using a password manager</li>
                  <li>• Enable two-factor authentication for extra security</li>
                  <li>• Change passwords regularly</li>
                  <li>• Never share your password with others</li>
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

export default PasswordReset;
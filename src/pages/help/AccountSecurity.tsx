import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Shield, Lock, Smartphone, AlertTriangle, Key } from "lucide-react";

const AccountSecurity = () => {
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
              <Shield className="w-6 h-6 text-primary" />
            </div>
            <CardTitle className="text-3xl">Account Security</CardTitle>
          </CardHeader>
          <CardContent className="space-y-8">
            <div>
              <h3 className="text-xl font-semibold mb-4 flex items-center">
                <Lock className="w-5 h-5 mr-2 text-primary" />
                Password Security
              </h3>
              <div className="space-y-4 ml-7">
                <div>
                  <h4 className="font-medium mb-2">Creating a Strong Password:</h4>
                  <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1">
                    <li>Use at least 12 characters</li>
                    <li>Include uppercase and lowercase letters</li>
                    <li>Add numbers and special characters</li>
                    <li>Avoid common words or personal information</li>
                    <li>Don't reuse passwords from other accounts</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-medium mb-2">Password Best Practices:</h4>
                  <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1">
                    <li>Change your password every 6 months</li>
                    <li>Use a password manager to generate and store passwords</li>
                    <li>Never share your password with anyone</li>
                    <li>Update immediately if you suspect it's been compromised</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-medium mb-2">How to Change Your Password:</h4>
                  <ol className="list-decimal list-inside text-sm text-muted-foreground space-y-1">
                    <li>Go to Settings → Security & Privacy</li>
                    <li>Click "Change Password"</li>
                    <li>Enter your current password</li>
                    <li>Enter and confirm your new password</li>
                    <li>Save changes</li>
                  </ol>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-4 flex items-center">
                <Smartphone className="w-5 h-5 mr-2 text-primary" />
                Two-Factor Authentication (2FA)
              </h3>
              <div className="space-y-4 ml-7">
                <p className="text-muted-foreground mb-4">
                  Add an extra layer of security to your account by enabling two-factor authentication.
                </p>
                <div>
                  <h4 className="font-medium mb-2">How 2FA Works:</h4>
                  <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1">
                    <li>Enter your username and password as usual</li>
                    <li>Receive a verification code on your phone</li>
                    <li>Enter the code to complete login</li>
                    <li>Prevents access even if password is compromised</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-medium mb-2">Setting Up 2FA:</h4>
                  <ol className="list-decimal list-inside text-sm text-muted-foreground space-y-1">
                    <li>Go to Settings → Security & Privacy</li>
                    <li>Find "Two-Factor Authentication" section</li>
                    <li>Click "Enable 2FA"</li>
                    <li>Add your phone number for SMS codes</li>
                    <li>Verify your phone number with a test code</li>
                    <li>Save backup codes in a secure location</li>
                  </ol>
                </div>
                <div>
                  <h4 className="font-medium mb-2">2FA Methods Available:</h4>
                  <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1">
                    <li><strong>SMS Codes:</strong> Receive codes via text message</li>
                    <li><strong>Authenticator Apps:</strong> Use Google Authenticator or similar apps</li>
                    <li><strong>Email Codes:</strong> Get codes sent to your email</li>
                    <li><strong>Backup Codes:</strong> One-time use codes for emergencies</li>
                  </ul>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-4 flex items-center">
                <Key className="w-5 h-5 mr-2 text-primary" />
                Login Activity & Sessions
              </h3>
              <div className="space-y-4 ml-7">
                <div>
                  <h4 className="font-medium mb-2">Monitoring Your Account:</h4>
                  <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1">
                    <li>Check recent login activity regularly</li>
                    <li>Review active sessions and devices</li>
                    <li>Look for unfamiliar locations or devices</li>
                    <li>Sign out from devices you no longer use</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-medium mb-2">Managing Active Sessions:</h4>
                  <ol className="list-decimal list-inside text-sm text-muted-foreground space-y-1">
                    <li>Go to Settings → Security & Privacy</li>
                    <li>Find "Active Sessions" section</li>
                    <li>Review all logged-in devices and locations</li>
                    <li>Sign out from any unrecognized sessions</li>
                    <li>Use "Sign out from all devices" if concerned</li>
                  </ol>
                </div>
                <div>
                  <h4 className="font-medium mb-2">Login Notifications:</h4>
                  <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1">
                    <li>Get alerts for new device logins</li>
                    <li>Receive notifications for password changes</li>
                    <li>Email alerts for security setting modifications</li>
                    <li>Immediate notifications for suspicious activity</li>
                  </ul>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-4 flex items-center">
                <AlertTriangle className="w-5 h-5 mr-2 text-primary" />
                Recognizing Security Threats
              </h3>
              <div className="space-y-4 ml-7">
                <div>
                  <h4 className="font-medium mb-2">Phishing Attempts:</h4>
                  <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1">
                    <li>Fake emails asking for password or personal info</li>
                    <li>Suspicious links claiming to be from Dostiशिप</li>
                    <li>Requests to verify account through external sites</li>
                    <li>Urgent messages demanding immediate action</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-medium mb-2">Social Engineering:</h4>
                  <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1">
                    <li>Someone impersonating Dostiशिप support</li>
                    <li>Requests for login credentials "for verification"</li>
                    <li>Fake emergency situations requiring password sharing</li>
                    <li>Offers that seem too good to be true</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-medium mb-2">What Dostiशिप Will Never Do:</h4>
                  <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1">
                    <li>Ask for your password via email or phone</li>
                    <li>Request sensitive information through direct messages</li>
                    <li>Ask you to verify your account on external websites</li>
                    <li>Demand immediate payment to keep your account active</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="bg-red-50 dark:bg-red-950/30 p-4 rounded-lg border border-red-200 dark:border-red-800">
              <h4 className="font-medium mb-2 text-red-900 dark:text-red-100">If Your Account is Compromised</h4>
              <div className="text-sm text-red-800 dark:text-red-200 space-y-2">
                <p><strong>Immediate Actions:</strong></p>
                <ol className="list-decimal list-inside space-y-1">
                  <li>Change your password immediately</li>
                  <li>Sign out from all devices</li>
                  <li>Enable two-factor authentication</li>
                  <li>Review and update security settings</li>
                  <li>Check for unauthorized posts or messages</li>
                  <li>Contact our support team immediately</li>
                </ol>
              </div>
            </div>

            <div className="bg-green-50 dark:bg-green-950/30 p-4 rounded-lg border border-green-200 dark:border-green-800">
              <h4 className="font-medium mb-2 text-green-900 dark:text-green-100">Security Checklist</h4>
              <div className="text-sm text-green-800 dark:text-green-200">
                <ul className="list-disc list-inside space-y-1">
                  <li>✓ Strong, unique password</li>
                  <li>✓ Two-factor authentication enabled</li>
                  <li>✓ Regular login activity reviews</li>
                  <li>✓ Privacy settings configured</li>
                  <li>✓ Email notifications enabled</li>
                  <li>✓ Software and apps kept updated</li>
                </ul>
              </div>
            </div>

            <div className="bg-muted/30 p-4 rounded-lg">
              <h4 className="font-medium mb-2">Need Security Help?</h4>
              <p className="text-sm text-muted-foreground mb-3">
                If you have security concerns or need help with your account, our support team is available 24/7.
              </p>
              <div className="flex gap-2">
                <Button variant="outline" onClick={() => window.open('/contact', '_blank')}>
                  Contact Support
                </Button>
                <Button variant="outline" onClick={() => window.open('mailto:atharavtarika@dostiship.com')}>
                  Email Security Team
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Footer />
    </div>
  );
};

export default AccountSecurity;
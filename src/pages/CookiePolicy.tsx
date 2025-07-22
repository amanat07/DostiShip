import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const CookiePolicy = () => {
  return (
    <div className="min-h-screen">
      <Header />
      
      <main className="pt-20">
        <div className="max-w-4xl mx-auto px-6 py-12">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-8 text-center">
            Cookie Policy
          </h1>
          
          <div className="space-y-8">
            <Card>
              <CardHeader>
                <CardTitle>1. Introduction</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-muted-foreground">
                  This Cookie Policy explains how Dostiशिप uses cookies and similar technologies to recognize you when you visit our platform. 
                  It explains what these technologies are and why we use them, as well as your rights to control our use of them.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>2. What are Cookies?</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-muted-foreground">
                  Cookies are small data files that are placed on your computer or mobile device when you visit a website. 
                  Cookies are widely used by website owners to make their websites work, or to work more efficiently, 
                  as well as to provide reporting information.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>3. Types of Cookies We Use</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-semibold text-foreground mb-2">Essential Cookies</h4>
                  <p className="text-muted-foreground">
                    These cookies are necessary for the website to function and cannot be switched off. 
                    They are usually only set in response to actions made by you such as setting your privacy preferences, 
                    logging in, or filling in forms.
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold text-foreground mb-2">Performance Cookies</h4>
                  <p className="text-muted-foreground">
                    These cookies allow us to count visits and traffic sources so we can measure and improve the performance of our site. 
                    They help us to know which pages are the most and least popular and see how visitors move around the site.
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold text-foreground mb-2">Functional Cookies</h4>
                  <p className="text-muted-foreground">
                    These cookies enable the website to provide enhanced functionality and personalization. 
                    They may be set by us or by third-party providers whose services we have added to our pages.
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>4. How We Use Cookies</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-muted-foreground">We use cookies to:</p>
                <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4">
                  <li>Keep you signed in to your account</li>
                  <li>Remember your preferences and settings</li>
                  <li>Analyze how our website is used and improve its performance</li>
                  <li>Provide personalized content and recommendations</li>
                  <li>Ensure the security of your account and data</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>5. Third-Party Cookies</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-muted-foreground">
                  We may also use third-party cookies for analytics and advertising purposes. 
                  These cookies are placed by external services we use to enhance your experience on our platform.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>6. Managing Cookies</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-muted-foreground">
                  You can control and/or delete cookies as you wish. You can delete all cookies that are already on your computer 
                  and you can set most browsers to prevent them from being placed. However, if you do this, 
                  you may have to manually adjust some preferences every time you visit our site.
                </p>
                <p className="text-muted-foreground">
                  To manage cookies in your browser:
                </p>
                <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4">
                  <li>Chrome: Settings → Privacy and security → Cookies and other site data</li>
                  <li>Firefox: Settings → Privacy & Security → Cookies and Site Data</li>
                  <li>Safari: Preferences → Privacy → Cookies and website data</li>
                  <li>Edge: Settings → Cookies and site permissions → Cookies and site data</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>7. Updates to This Policy</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-muted-foreground">
                  We may update this Cookie Policy from time to time to reflect changes in our practices or for other operational, 
                  legal, or regulatory reasons. We will notify you of any material changes by posting the updated policy on our website.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>8. Contact Us</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-muted-foreground">
                  If you have any questions about this Cookie Policy, please contact us at:
                </p>
                <div className="text-muted-foreground">
                  <p>Email: atharavtarika@dostiship.com</p>
                  <p>Phone: +91 9466903617</p>
                  <p>Address: Chitkara University, Rajpura, Punjab, India</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default CookiePolicy;
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Shield, Heart, Users, AlertTriangle, CheckCircle, XCircle } from "lucide-react";

const Guidelines = () => {
  const guidelines = [
    {
      icon: Heart,
      title: "Be Respectful and Kind",
      description: "Treat everyone with respect, regardless of their background, beliefs, or opinions.",
      dos: ["Use polite and friendly language", "Be patient with others", "Celebrate differences"],
      donts: ["Use offensive or discriminatory language", "Bully or harass others", "Make personal attacks"]
    },
    {
      icon: Users,
      title: "Foster Inclusive Environment",
      description: "Help create a welcoming space where everyone feels valued and included.",
      dos: ["Welcome new members", "Support others' ideas", "Be open to different perspectives"],
      donts: ["Exclude others from conversations", "Form exclusive cliques", "Judge others based on appearance"]
    },
    {
      icon: Shield,
      title: "Maintain Safety",
      description: "Prioritize your safety and the safety of others in all interactions.",
      dos: ["Meet in public places initially", "Trust your instincts", "Report concerning behavior"],
      donts: ["Share personal information too quickly", "Meet strangers in private", "Ignore red flags"]
    }
  ];

  const prohibited = [
    "Harassment, bullying, or intimidation of any kind",
    "Discriminatory language or behavior based on race, gender, religion, etc.",
    "Sharing inappropriate or explicit content",
    "Spam, promotional content, or commercial activities",
    "Impersonation or creating fake profiles",
    "Sharing personal information without consent",
    "Illegal activities or content",
    "Threats or violence"
  ];

  return (
    <div className="min-h-screen">
      <Header />
      
      <main className="pt-20">
        <div className="max-w-6xl mx-auto px-6 py-12">
          {/* Hero Section */}
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
              Community Guidelines
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Our guidelines help ensure Dostiशिप remains a safe, welcoming, and positive space for everyone to make meaningful friendships.
            </p>
          </div>

          {/* Core Guidelines */}
          <section className="mb-16">
            <h2 className="text-3xl font-bold text-foreground mb-8 text-center">
              Core Community Values
            </h2>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {guidelines.map((guideline, index) => (
                <Card key={index} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                      <guideline.icon className="w-6 h-6 text-primary" />
                    </div>
                    <CardTitle className="text-xl">{guideline.title}</CardTitle>
                    <CardDescription>{guideline.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <CheckCircle className="w-4 h-4 text-green-500" />
                        <span className="font-semibold text-green-700 dark:text-green-400">Do:</span>
                      </div>
                      <ul className="space-y-1 ml-6">
                        {guideline.dos.map((item, i) => (
                          <li key={i} className="text-sm text-muted-foreground">• {item}</li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <XCircle className="w-4 h-4 text-red-500" />
                        <span className="font-semibold text-red-700 dark:text-red-400">Don't:</span>
                      </div>
                      <ul className="space-y-1 ml-6">
                        {guideline.donts.map((item, i) => (
                          <li key={i} className="text-sm text-muted-foreground">• {item}</li>
                        ))}
                      </ul>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          {/* Prohibited Content */}
          <section className="mb-16">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-2xl">
                  <AlertTriangle className="w-6 h-6 text-orange-500" />
                  Prohibited Content and Behavior
                </CardTitle>
                <CardDescription>
                  The following behaviors and content are strictly prohibited on our platform:
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {prohibited.map((item, index) => (
                    <div key={index} className="flex items-start gap-3 p-3 bg-muted/50 rounded-lg">
                      <XCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
                      <span className="text-sm text-foreground">{item}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </section>

          {/* Reporting */}
          <section className="mb-16">
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl">Reporting Violations</CardTitle>
                <CardDescription>
                  Help us maintain a safe community by reporting any violations of these guidelines.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-muted-foreground">
                  If you encounter behavior that violates our community guidelines, please report it immediately. 
                  Our moderation team reviews all reports and takes appropriate action.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold text-foreground mb-2">How to Report:</h4>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      <li>• Use the report button on any post or profile</li>
                      <li>• Contact our support team directly</li>
                      <li>• Use the emergency report feature for urgent issues</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground mb-2">What Happens Next:</h4>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      <li>• We review the report within 24 hours</li>
                      <li>• Appropriate action is taken if guidelines are violated</li>
                      <li>• You'll receive an update on the resolution</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </section>

          {/* Consequences */}
          <section>
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl">Consequences of Violations</CardTitle>
                <CardDescription>
                  Violations of our community guidelines may result in the following actions:
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <div className="text-center p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
                      <div className="text-2xl font-bold text-yellow-600 dark:text-yellow-400 mb-2">1</div>
                      <div className="text-sm font-semibold text-yellow-800 dark:text-yellow-200 mb-1">Warning</div>
                      <div className="text-xs text-yellow-700 dark:text-yellow-300">First offense notification</div>
                    </div>
                    <div className="text-center p-4 bg-orange-50 dark:bg-orange-900/20 rounded-lg">
                      <div className="text-2xl font-bold text-orange-600 dark:text-orange-400 mb-2">2</div>
                      <div className="text-sm font-semibold text-orange-800 dark:text-orange-200 mb-1">Restriction</div>
                      <div className="text-xs text-orange-700 dark:text-orange-300">Limited platform access</div>
                    </div>
                    <div className="text-center p-4 bg-red-50 dark:bg-red-900/20 rounded-lg">
                      <div className="text-2xl font-bold text-red-600 dark:text-red-400 mb-2">3</div>
                      <div className="text-sm font-semibold text-red-800 dark:text-red-200 mb-1">Suspension</div>
                      <div className="text-xs text-red-700 dark:text-red-300">Temporary account suspension</div>
                    </div>
                    <div className="text-center p-4 bg-gray-50 dark:bg-gray-900/20 rounded-lg">
                      <div className="text-2xl font-bold text-gray-600 dark:text-gray-400 mb-2">4</div>
                      <div className="text-sm font-semibold text-gray-800 dark:text-gray-200 mb-1">Permanent Ban</div>
                      <div className="text-xs text-gray-700 dark:text-gray-300">Account permanently removed</div>
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground text-center mt-6">
                    The severity of consequences depends on the nature and frequency of violations. 
                    Serious violations may result in immediate suspension or permanent ban.
                  </p>
                </div>
              </CardContent>
            </Card>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Guidelines;
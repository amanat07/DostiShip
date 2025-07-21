import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";

const TermsOfService = () => {
  const sections = [
    {
      title: "1. Acceptance of Terms",
      content: "Welcome to Dostiशिप, a platform designed to foster meaningful friendships among college students. By accessing or using our website, mobile applications, or services (collectively, the \"Platform\"), you agree to be bound by these Terms of Use (\"Terms\"). If you do not agree with any part of these Terms, you must not use the Platform."
    },
    {
      title: "2. Eligibility",
      content: "You must be at least 17 years old to use the Platform. By creating an account, you represent that you meet this age requirement and that all information you provide is accurate and complete."
    },
    {
      title: "3. Account Responsibilities",
      content: "When you register for an account, you are responsible for:",
      bullets: [
        "Maintaining the confidentiality of your account credentials (username and password).",
        "All activities that occur under your account.",
        "Providing accurate and up-to-date information during registration.",
        "Notifying us immediately of any unauthorized use of your account."
      ],
      footer: "Dostiशिप is not liable for any loss or damage arising from your failure to comply with these responsibilities."
    },
    {
      title: "4. User Conduct",
      content: "You agree to use the Platform in a manner that is respectful, lawful, and consistent with our community values. You must not:",
      bullets: [
        "Post or share content that is offensive, harassing, discriminatory, or violates any laws.",
        "Impersonate another person or misrepresent your identity.",
        "Engage in spamming, phishing, or other malicious activities.",
        "Use the Platform to promote or engage in illegal activities.",
        "Attempt to access or interfere with the Platform's systems or other users' accounts."
      ]
    },
    {
      title: "5. Content Usage",
      content: "By posting content on the Platform (e.g., journal entries, messages, event postings), you grant Dostiशिप a non-exclusive, worldwide, royalty-free license to use, display, and distribute that content solely for the purpose of operating and improving the Platform. You represent that you have the right to share such content and that it does not infringe on any third-party rights."
    },
    {
      title: "6. Termination",
      content: "We reserve the right to suspend or terminate your account at our discretion, including for violations of these Terms, inappropriate conduct, or any other reason we deem necessary. You may also terminate your account at any time by contacting us."
    },
    {
      title: "7. Limitation of Liability",
      content: "Dostiशिप is provided \"as is\" without warranties of any kind. We are not liable for any direct, indirect, incidental, or consequential damages arising from your use of the Platform, including but not limited to loss of data, friendships, or opportunities."
    },
    {
      title: "8. Changes to Terms",
      content: "We may update these Terms from time to time to reflect changes in our services or legal requirements. We will notify you of significant changes via email or through the Platform. Your continued use of the Platform after such changes constitutes acceptance of the updated Terms."
    },
    {
      title: "9. Contact Information",
      content: "If you have questions or concerns about these Terms, please contact us at:",
      bullets: [
        "Email: atharavtarika@dostiship.com",
        "Phone: +91 9466903617",
        "Address: Chitkara University, Rajpura, Punjab, India"
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Section */}
      <section className="bg-gradient-primary text-white py-24 pt-32">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Terms of Service</h1>
          <p className="text-xl opacity-90">Our terms and conditions for using Dostiशिप</p>
        </div>
      </section>

      {/* Terms Content */}
      <section className="py-16 px-6">
        <div className="max-w-4xl mx-auto">
          <Card className="mb-8">
            <CardContent className="p-8">
              <div className="mb-8">
                <p className="text-lg text-muted-foreground leading-relaxed">
                  By using Dostiशिप, you agree to the following terms and conditions. Please read them carefully.
                </p>
              </div>
              
              <div className="space-y-8">
                {sections.map((section, index) => (
                  <div key={index}>
                    <h2 className="text-2xl font-bold text-foreground mb-4">{section.title}</h2>
                    <p className="text-muted-foreground leading-relaxed mb-4">{section.content}</p>
                    
                    {section.bullets && (
                      <ul className="space-y-2 mb-4">
                        {section.bullets.map((bullet, bulletIndex) => (
                          <li key={bulletIndex} className="text-muted-foreground flex">
                            <span className="mr-2">•</span>
                            <span>{bullet}</span>
                          </li>
                        ))}
                      </ul>
                    )}
                    
                    {section.footer && (
                      <p className="text-muted-foreground leading-relaxed font-medium">{section.footer}</p>
                    )}
                  </div>
                ))}
              </div>
              
              <div className="mt-12 pt-8 border-t border-border">
                <p className="text-sm text-muted-foreground">
                  Last updated: {new Date().toLocaleDateString('en-US', { 
                    year: 'numeric', 
                    month: 'long', 
                    day: 'numeric' 
                  })}
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default TermsOfService;
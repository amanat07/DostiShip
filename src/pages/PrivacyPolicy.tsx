import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";

const PrivacyPolicy = () => {
  const sections = [
    {
      title: "1. Introduction",
      content: "Dostiशिप is a platform dedicated to fostering meaningful friendships among college students. This Privacy Policy outlines our practices regarding the collection, use, and sharing of your personal information when you use our website, mobile applications, or services (collectively, the \"Platform\"). By using the Platform, you consent to the practices described in this policy."
    },
    {
      title: "2. Information We Collect",
      content: "We collect the following types of information:",
      bullets: [
        "Personal Information: When you register or interact with the Platform, we may collect your name, email address, username, gender, phone number, and other details you provide.",
        "Content You Share: Information you post, such as journal entries, messages, event postings, or profile details.",
        "Usage Data: Information about how you use the Platform, including pages visited, features used, and time spent on the Platform.",
        "Device Information: Details about your device, such as IP address, browser type, operating system, and device identifiers.",
        "Cookies and Tracking: We use cookies and similar technologies to enhance your experience and analyze usage (see Section 7)."
      ]
    },
    {
      title: "3. How We Use Your Information",
      content: "We use your information to:",
      bullets: [
        "Provide and improve the Platform's features, such as connecting you with friends and organizing events.",
        "Personalize your experience, such as recommending connections or content.",
        "Communicate with you, including sending updates, notifications, and support responses.",
        "Analyze usage to enhance performance and develop new features.",
        "Ensure the safety and security of the Platform, including detecting and preventing fraud or abuse."
      ]
    },
    {
      title: "4. Data Sharing",
      content: "We may share your information in the following cases:",
      bullets: [
        "With Your Consent: When you explicitly agree to share your information, such as making your profile visible to other users.",
        "Service Providers: With trusted third-party providers who assist us in operating the Platform (e.g., hosting, analytics), under strict confidentiality agreements.",
        "Legal Requirements: When required by law, such as to comply with a court order or protect our rights and safety.",
        "Business Transfers: In the event of a merger, acquisition, or sale of assets, your information may be transferred as part of the transaction."
      ],
      footer: "We do not sell your personal information to third parties."
    },
    {
      title: "5. Data Security",
      content: "We implement reasonable technical and organizational measures to protect your information from unauthorized access, loss, or misuse. However, no system is completely secure, and we cannot guarantee absolute security."
    },
    {
      title: "6. User Rights",
      content: "You have the following rights regarding your personal information:",
      bullets: [
        "Access: Request a copy of the information we hold about you.",
        "Correction: Update or correct inaccurate information.",
        "Deletion: Request deletion of your account and associated data, subject to legal obligations.",
        "Opt-Out: Opt out of non-essential communications, such as promotional emails."
      ],
      footer: "To exercise these rights, contact us at the details provided in Section 11."
    },
    {
      title: "7. Cookies and Tracking",
      content: "We use cookies and similar technologies to:",
      bullets: [
        "Remember your preferences and login status.",
        "Analyze Platform usage and performance.",
        "Deliver personalized content and advertisements."
      ],
      footer: "You can manage cookie preferences through your browser settings, but disabling cookies may affect Platform functionality."
    },
    {
      title: "8. Third-Party Links",
      content: "The Platform may contain links to third-party websites or services. We are not responsible for the privacy practices of these third parties. We encourage you to review their privacy policies."
    },
    {
      title: "9. Children's Privacy",
      content: "The Platform is not intended for users under 17 years old. We do not knowingly collect personal information from children. If we learn that a child under 17 has provided information, we will delete it promptly."
    },
    {
      title: "10. Changes to the Policy",
      content: "We may update this Privacy Policy to reflect changes in our practices or legal requirements. We will notify you of significant changes via email or through the Platform. Your continued use of the Platform after such changes constitutes acceptance of the updated policy."
    },
    {
      title: "11. Contact Information",
      content: "If you have questions or concerns about this Privacy Policy, please contact us at:",
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
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Privacy Policy</h1>
          <p className="text-xl opacity-90">Your privacy and data protection matter to us</p>
        </div>
      </section>

      {/* Privacy Policy Content */}
      <section className="py-16 px-6">
        <div className="max-w-4xl mx-auto">
          <Card className="mb-8">
            <CardContent className="p-8">
              <div className="mb-8">
                <p className="text-lg text-muted-foreground leading-relaxed">
                  At Dostiशिप, we value your privacy and are committed to protecting your personal information. 
                  This Privacy Policy explains how we collect, use, and safeguard your data.
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

export default PrivacyPolicy;
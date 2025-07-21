import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { 
  Accordion, 
  AccordionContent, 
  AccordionItem, 
  AccordionTrigger 
} from "@/components/ui/accordion";
import { Card, CardContent } from "@/components/ui/card";

const FAQ = () => {
  const faqs = [
    {
      category: "Getting Started",
      questions: [
        {
          question: "What is Dostiशिप?",
          answer: "Dostiशिप is a social platform designed specifically for college students to build meaningful friendships. We help students connect with like-minded peers, join study groups, and participate in virtual hangouts."
        },
        {
          question: "How do I create an account?",
          answer: "Click on the 'Register' button on our homepage, fill in your details including your college information, interests, and create a profile. You'll need to verify your email to complete the registration."
        },
        {
          question: "Is Dostiशिप free to use?",
          answer: "Yes! Dostiशिप is completely free for all college students. Our mission is to help students build friendships without any financial barriers."
        }
      ]
    },
    {
      category: "Finding Friends",
      questions: [
        {
          question: "How does the friend matching work?",
          answer: "Our algorithm matches you with other students based on shared interests, academic subjects, location, and personality compatibility. You can also use the map feature to find students near you."
        },
        {
          question: "Can I find study partners?",
          answer: "Absolutely! Use our study buddy feature to find classmates for group study sessions. You can filter by subject, study preferences, and availability."
        },
        {
          question: "How do I know if someone wants to be friends?",
          answer: "When someone is interested in connecting, they'll send you a friend request. You'll receive a notification and can accept or decline the request."
        }
      ]
    },
    {
      category: "Safety & Privacy",
      questions: [
        {
          question: "How do you ensure user safety?",
          answer: "We verify all users are college students, have reporting mechanisms for inappropriate behavior, and provide privacy controls. You can block users and control who can see your information."
        },
        {
          question: "What information is shared with other users?",
          answer: "Only the information you choose to share in your profile is visible to others. This includes your name, interests, college, and any optional details you add."
        },
        {
          question: "Can I report inappropriate behavior?",
          answer: "Yes, we have a robust reporting system. You can report any user who violates our community guidelines, and our team will investigate promptly."
        }
      ]
    },
    {
      category: "Features",
      questions: [
        {
          question: "What are hangout rooms?",
          answer: "Hangout rooms are virtual spaces where students can gather for activities like study sessions, music sharing, book discussions, or casual conversations. You can join existing rooms or create your own."
        },
        {
          question: "Can I video call friends?",
          answer: "Yes! Our messaging system supports text, voice calls, video calls, and file sharing. You can have one-on-one conversations or group chats."
        },
        {
          question: "How does the map feature work?",
          answer: "The map shows you other Dostiशिप users in your area (with their permission). You can see their interests and send connection requests to people nearby."
        }
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Section */}
      <section className="bg-gradient-primary text-white py-24 pt-32">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Frequently Asked Questions</h1>
          <p className="text-xl opacity-90">Find quick answers to common questions about Dostiशिप</p>
        </div>
      </section>

      {/* FAQ Content */}
      <section className="py-16 px-6">
        <div className="max-w-4xl mx-auto">
          {faqs.map((category, categoryIndex) => (
            <div key={categoryIndex} className="mb-12">
              <h2 className="text-2xl font-bold mb-6 text-primary">{category.category}</h2>
              <Card>
                <CardContent className="p-0">
                  <Accordion type="single" collapsible className="w-full">
                    {category.questions.map((faq, faqIndex) => (
                      <AccordionItem 
                        key={faqIndex} 
                        value={`${categoryIndex}-${faqIndex}`}
                        className="border-b last:border-b-0"
                      >
                        <AccordionTrigger className="px-6 py-4 text-left hover:no-underline">
                          <span className="font-medium">{faq.question}</span>
                        </AccordionTrigger>
                        <AccordionContent className="px-6 pb-4">
                          <p className="text-muted-foreground leading-relaxed">{faq.answer}</p>
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                </CardContent>
              </Card>
            </div>
          ))}
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-16 px-6 bg-muted/30">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6">Still Have Questions?</h2>
          <p className="text-muted-foreground mb-8">
            Can't find the answer you're looking for? We're here to help!
          </p>
          <div className="flex gap-4 justify-center">
            <a href="/contact" className="bg-primary text-primary-foreground px-6 py-3 rounded-lg font-medium hover:bg-primary/90 transition-colors">
              Contact Support
            </a>
            <a href="/help-center" className="border border-border px-6 py-3 rounded-lg font-medium hover:bg-muted transition-colors">
              Help Center
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default FAQ;
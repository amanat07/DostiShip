import { Button } from "@/components/ui/button";

const AboutSection = () => {
  return (
    <section className="py-24 px-6 bg-muted/20">
      <div className="max-w-4xl mx-auto text-center">
        <div className="space-y-6 animate-fade-in-up">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground">
            About{" "}
            <span className="bg-gradient-primary bg-clip-text text-transparent">
              Dostiशिप
            </span>
          </h2>
          <p className="text-xl text-muted-foreground leading-relaxed max-w-3xl mx-auto">
            We believe that friendship is the foundation of happiness and success. Whether you're looking for a study partner, a mentor, or just someone to share your thoughts with, we make it easy to meet people who truly understand you. Our platform is designed to foster meaningful connections in a safe, inclusive environment.
          </p>
          <div className="pt-4">
            <Button variant="accent" size="lg" className="text-lg px-8 py-6 h-auto">
              Learn More
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
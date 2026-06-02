import { Navbar } from "@/components/Navbar";
import { HeroSection } from "@/components/sections/HeroSection";
import { AboutSection } from "@/components/sections/AboutSection";
import { EducationSection } from "@/components/sections/EducationSection";
import { ProjectsSection } from "@/components/sections/ProjectsSection";
import { SkillsSection } from "@/components/sections/SkillsSection";
import { TrainingSection } from "@/components/sections/TrainingSection";
import { CertificationsSection } from "@/components/sections/CertificationsSection";
import { AchievementsSection } from "@/components/sections/AchievementsSection";
import { ContactSection } from "@/components/sections/ContactSection";
import { Footer } from "@/components/Footer";
import { Chatbot } from "@/components/Chatbot";

const Index = () => {
  // Force re-render
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main>
        <HeroSection />
        <AboutSection />
        <EducationSection />
        <ProjectsSection />
        <TrainingSection />
        <SkillsSection />
        <CertificationsSection />
        <AchievementsSection />
        <ContactSection />
      </main>
      <Footer />
      <Chatbot />
    </div>
  );
};

export default Index;

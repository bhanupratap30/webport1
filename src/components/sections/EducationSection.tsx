import { GraduationCap, MapPin, CalendarDays } from "lucide-react";
import { FadeInLeft, FadeInUp } from "@/components/animations/MotionWrapper";
import { AnimatedCard } from "@/components/animations/AnimatedCard";

const educationItems = [
  {
    institute: "Lovely Professional University,Punjab",
    degree: "Student",
    detail: "CGPA: 6.2",
    duration: "Present",
    icon: GraduationCap,
    logo: '/lpu.png',
  },
  {
    institute: "Vidya Vahini School, Prayagraj, UP",
    degree: "Matriculation",
    detail: "Percentage: 60%",
    duration: "2022-2023",
    icon: GraduationCap,
    logo: '/vvs.png',
  },
  {
    institute: "Vidya Vahini School, Prayagraj, UP",
    degree: "Intermediate",
    detail: "Percentage: 85.8%",
    duration: "2020-2021",
    icon: GraduationCap,
    logo: '/vvs.png',
  }
];

export const EducationSection = () => {
  return (
    <section id="education" className="py-24 relative">
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "linear-gradient(180deg, transparent 0%, hsl(0 0% 10% / 0.3) 100%)",
        }}
      />

      <div className="container mx-auto px-4 md:px-8 relative z-10">
        <FadeInLeft>
          <h2 className="text-3xl md:text-4xl font-bold mb-12 flex items-center gap-4">
            <span className="section-number">02.</span>
            Education
          </h2>
        </FadeInLeft>

        <div className="relative">
          <div className="hidden lg:block absolute left-1/2 top-8 h-[calc(100%-4rem)] w-1 bg-primary/20" />
          <div className="hidden lg:block absolute left-1/2 top-8 h-[calc(100%-4rem)] w-1 border-l border-primary/40 bg-[linear-gradient(to_bottom,transparent_0%,transparent_20%,rgba(34,197,94,0.5)_20%,rgba(34,197,94,0.5)_22%,transparent_22%,transparent_42%,rgba(34,197,94,0.5)_42%,rgba(34,197,94,0.5)_44%,transparent_44%,transparent_64%,rgba(34,197,94,0.5)_64%,rgba(34,197,94,0.5)_66%,transparent_66%,transparent_86%,rgba(34,197,94,0.5)_86%,rgba(34,197,94,0.5)_88%,transparent_88%,transparent_100%)]" />
          <div className="absolute left-1/2 top-8 h-10 w-10 -translate-x-1/2 rounded-full bg-primary shadow-[0_0_0_5px_rgba(15,23,42,0.8)]" />

          <div className="space-y-10">
            {educationItems.map((item, idx) => {
              const Icon = item.icon;
              const sideClass = idx % 2 === 0 ? "lg:pr-8 lg:pl-0" : "lg:pl-8 lg:pr-0";
              const align = idx % 2 === 0 ? "lg:justify-end" : "lg:justify-start";

              return (
                <div key={`${item.institute}-${idx}`} className={`relative lg:flex lg:items-center ${align}`}>
                  <div className="lg:w-1/2 lg:relative max-w-xl">
                    <div className={`absolute hidden lg:block top-1/2 -translate-y-1/2 ${idx % 2 === 0 ? "right-[-13px]" : "left-[-13px]"}`}>
                      <div className="w-6 h-6 rounded-full bg-primary border-2 border-background" />
                    </div>
                    <AnimatedCard
                      index={idx}
                      hoverEffect="lift"
                      className={`glass rounded-2xl overflow-hidden border border-primary/30 shadow-[0_0_20px_rgba(34,197,94,0.15)] hover:shadow-[0_0_45px_rgba(34,197,94,0.45)] hover:border-primary transition-all duration-500 ${sideClass} relative`}
                    >
                      <div className={`hidden lg:block absolute top-1/2 -translate-y-1/2 h-0 border-t border-primary/40 border-dashed ${idx % 2 === 0 ? 'left-0 w-8' : 'right-0 w-8'}`} />
                      <div className="flex flex-col lg:flex-row items-center gap-4 p-4">
                        <div className="flex-shrink-0 w-24 h-24 rounded-lg bg-background/40 flex items-center justify-center">
                          <img src={item.logo} alt={`${item.institute} logo`} className="w-20 h-20 object-contain" />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-3">
                            <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                              <Icon className="text-primary" size={20} />
                            </div>
                            <h3 className="text-lg font-bold text-foreground">{item.institute}</h3>
                          </div>
                          <p className="text-muted-foreground text-sm font-medium">{item.degree}</p>
                          <p className="text-muted-foreground/90 text-sm mt-1">{item.detail}</p>
                          <p className="text-xs text-muted-foreground/80 mt-2 font-medium">{item.duration}</p>
                        </div>
                      </div>
                    </AnimatedCard>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

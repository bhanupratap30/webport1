import { Briefcase } from "lucide-react";
import { FadeInLeft } from "@/components/animations/MotionWrapper";
import { AnimatedCard } from "@/components/animations/AnimatedCard";

const trainingItems = [
  {
    title: "C++ with DSA",
    organization: "CSE PATHSHALA",
    duration: "May 2025 – Jul 2025",
    certificate: "https://drive.google.com/file/d/1TNeIWPRD2cSlq4Sy3JXiLzdaBmCDpLd1/view?usp=drive_link",
    points: [
      "Learned Data Structures and Algorithms using C++.",
      "Learned Object Oriented Programming using C++.",
      "Learned Database Management System using SQL.",
      "Learned Operating System using C++.",
    ],
  },
  {
    title: "Field Data Collection Volunteer",
    organization: "CFCA (NGO)",
    duration: "May 2024 – Jul 2024",
    certificate: "https://drive.google.com/file/d/1n-O5JDtJkz9oeii-TiRGK1JOCWeRkMtiew?usp=sharing",
    points: [
      "Conducted field surveys in villages across Prayagraj,Uttar Pradesh to identify households lacking access to clean water.",
      "Collected data on availability of hand pumps, tap water, and tube wells.",
      "Documented water accessibility issues faced by rural communities.",
      "Contributed data to support the Uttar Pradesh Government Tap Water Scheme planning and implementation.",
      "Collaborated with local residents and NGO teams to ensure accurate data collection.",
    ],
  },
];

export const TrainingSection = () => {
  return (
    <section id="training" className="py-24 relative">
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "linear-gradient(180deg, transparent 0%, hsl(0 0% 10% / 0.3) 100%)",
        }}
      />

      <div className="container mx-auto px-4 md:px-8 relative z-10">
        <FadeInLeft>
          <h2 className="text-3xl md:text-4xl font-bold mb-12 flex items-center gap-4">
            <span className="section-number">04.</span>
            Training / Experience
          </h2>
        </FadeInLeft>

        <div className="max-w-4xl">
          {trainingItems.map((item, index) => (
            <AnimatedCard
              key={item.title}
              index={index}
              hoverEffect="lift"
              className="glass rounded-2xl p-6 border border-primary/30 shadow-[0_0_20px_rgba(34,197,94,0.15)] hover:shadow-[0_0_45px_rgba(34,197,94,0.45)] hover:border-primary transition-all duration-500"

            >
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <Briefcase className="text-primary" size={24} />
                </div>

                <div className="flex-1">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-3">
                    <h3 className="text-lg font-bold text-foreground">{item.title}</h3>
                    <span className="text-muted-foreground/80 text-xs">{item.duration}</span>
                  </div>

                  <p className="text-muted-foreground text-sm mb-4">{item.organization}</p>

                  <ul className="text-muted-foreground text-sm leading-relaxed space-y-2">
                    {item.points.map((point) => (
                      <li key={point} className="flex gap-2">
                        <span className="text-primary mt-1">•</span>
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>

                  {item.certificate && (
                    <div className="mt-4">
                      <a
                        href={item.certificate}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 text-primary hover:text-primary/80 transition-colors duration-300 text-sm font-medium"
                      >
                        View Certificate
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                        </svg>
                      </a>
                    </div>
                  )}
                </div>
              </div>
            </AnimatedCard>
          ))}
        </div>
      </div>
    </section>
  );
};

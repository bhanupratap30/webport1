import { useEffect, useMemo, useRef, useState, type KeyboardEvent } from "react";
import { MessageSquare, X, Loader2 } from "lucide-react";

type ChatMessage = {
  id: string;
  sender: "user" | "bot";
  text: string;
};

const SYSTEM_PROMPT = `You are Bhanu Pratap Singh's portfolio assistant. You help visitors learn about Bhanu's background, skills, projects, and experience.

About Bhanu:
- Student at Lovely Professional University, Punjab (CGPA: 6.2, Present)
- Specializes in Cloud Computing, AI, and Full-Stack Development
- Focuses on end-to-end systems—from data preprocessing to deployment.
- Technologies: Python, C, C++, Java, JavaScript, SQL, HTML, CSS, React, NodeJS, ExpressJS, SpringBoot, MongoDB
- Tools & Platforms: Docker, AWS, Azure, Kubernetes, VMware, Ubuntu, GitHub
- Soft skills: Creativity, Consistency, Time Management, Adaptability, Problem Solving
- GitHub: github.com/bhanupratap30
- Email: manzansh3008@gmail.com

Education:
- Lovely Professional University, Punjab: B.Tech Student (CGPA: 6.2, Present)
- Vidya Vahini School, Prayagraj, UP: Matriculation (Percentage: 60%, 2022-2023)
- Vidya Vahini School, Prayagraj, UP: Intermediate (Percentage: 85.8%, 2020-2021)

Projects:
- Your Sarthi: A Stress Management System (2026) - AI Chatbot platform built using React, NodeJs, and Google Gemini API, providing stress management resources.
- Smart Spend AI (2026) - AI-powered personal finance tracker built using React, SpringBoot, Docker, Maven, Framer Motion, JWT, Redux Toolkit, and MongoDB.
- Cloud Wise Chatbot (2024) - Weather forecasting assistant built using Node.js, Express.js, React, Python, and OpenWeatherMap API.

Certifications:
- Oracle Cloud Infrastructure Fundamentals
- Industrial Internet Of Things (IIT Kharagpur)
- Bytes in Networking (Google)
- Data Structures and Algorithms Certification (CSE Pathshala)

Training/Experience:
- C++ with DSA Training at CSE PATHSHALA (May 2025 – Jul 2025)
- Field Data Collection Volunteer at CFCA NGO (May 2024 – Jul 2024) - Supported UP Government Tap Water Scheme, Prayagraj.

Achievements:
- Inter-School Volleyball Competition Winner (represented Vidya Vahini School, Prayagraj)
- Solved 100+ DSA Problems on LeetCode, GeeksforGeeks, and Upwork (using C++)
- Solved 50+ SQL Problems on LeetCode
- Freelance Video Editor at The Social Smiths Media Agency

Be helpful, professional, and engaging. Keep responses concise but informative. If asked about contact, encourage using the portfolio contact form.`;

const suggestionPrompts = [
  "Tell me about his projects",
  "What technologies does he use?",
  "His education background",
  "Show me his certifications",
  "His achievements",
];

/** Local answers when API is unavailable or fails — order matters (first match wins). */
const LOCAL_FAQ: { keywords: string[]; answer: string }[] = [
  {
    keywords: ["project", "sarthi", "spend", "cloud", "wise", "stress", "finance"],
    answer:
      "Bhanu Pratap Singh has built key projects including: 1) 'Your Sarthi: A Stress Management System' (React, Gemini API, AI chatbot), 2) 'Smart Spend AI' (React, SpringBoot, Docker, MongoDB personal finance tracker), and 3) 'Cloud Wise Chatbot' (Node.js, Express, OpenWeatherMap weather chatbot). See the Projects section for details!",
  },
  {
    keywords: ["skill", "technolog", "stack", "python", "react", "docker", "kubernetes", "aws", "azure", "cpp", "java", "sql"],
    answer:
      "His technical arsenal includes: Languages (Python, C, C++, Java, JavaScript, SQL); Web (HTML, CSS, React, NodeJS, ExpressJS); Tools & Cloud (Docker, AWS, Azure, Kubernetes, VMware, Ubuntu, GitHub); Soft Skills (Creativity, Consistency, Time Management, Adaptability, Problem Solving).",
  },
  {
    keywords: ["education", "cgpa", "lpu", "degree", "school", "intermediate", "matric", "prayagraj"],
    answer:
      "Bhanu is currently a student at Lovely Professional University, Punjab (CGPA 6.2, Present). He completed his Intermediate (85.8% marks, 2020-2021) and Matriculation (60% marks, 2022-2023) at Vidya Vahini School, Prayagraj, Uttar Pradesh.",
  },
  {
    keywords: ["certif", "oracle", "iit", "google", "networking", "iot"],
    answer:
      "His key certifications are: 1) Oracle Cloud Infrastructure Fundamentals, 2) Industrial Internet Of Things (IIT Kharagpur), 3) Bytes in Networking (Google), and 4) Data Structures and Algorithms (CSE Pathshala).",
  },
  {
    keywords: ["achiev", "volleyball", "dsa problem", "sql problem", "video", "editor"],
    answer:
      "His main achievements are: 1) Winner of the Inter-School Volleyball Competition representing Vidya Vahini School, 2) Solved 100+ DSA Problems on LeetCode/GFG/Upwork, 3) Solved 50+ SQL Challenges on LeetCode, and 4) Freelancing as a Video Editor at The Social Smiths Media Agency.",
  },
  {
    keywords: ["experience", "training", "pathshala", "volunteer", "ngo", "cfca"],
    answer:
      "Bhanu completed 'C++ with DSA' training at CSE PATHSHALA (May - July 2025) covering OOP, DSA, DBMS, and OS. He was also a Field Data Collection Volunteer for CFCA (NGO, May - July 2024), where he surveyed villages in Prayagraj for the UP Government Tap Water Scheme.",
  },
  {
    keywords: ["contact", "email", "reach", "message", "hire"],
    answer:
      "You can contact Bhanu via email at manzansh3008@gmail.com, or directly use the sleek Contact form at the bottom of the portfolio webpage.",
  },
  {
    keywords: ["github", "git ", "repo"],
    answer: "You can explore his active projects and repositories on GitHub at: github.com/bhanupratap30",
  },
  {
    keywords: ["who", "about", "introduce", "background", "yourself"],
    answer:
      "Bhanu Pratap Singh is an LPU B.Tech student focused on Cloud Computing, AI, and Full-Stack Web Development, building end-to-end data-driven systems from scratch.",
  },
];

const DEFAULT_LOCAL =
  "I can help with Bhanu Pratap's projects, skills, education, certifications, achievements, experience, GitHub, or contact. Try one of the quick prompts above or ask in your own words.";

function getLocalResponse(question: string): string {
  const lower = question.toLowerCase();
  for (const entry of LOCAL_FAQ) {
    if (entry.keywords.some((k) => lower.includes(k))) {
      return entry.answer;
    }
  }
  return DEFAULT_LOCAL;
}

function newMessageId(): string {
  return typeof crypto !== "undefined" && crypto.randomUUID
    ? crypto.randomUUID()
    : `msg-${Date.now()}-${Math.random().toString(36).slice(2)}`;
}

const RATE_MS = 2000;

export const Chatbot = () => {
  /** True only if Vite embedded this at dev/build time — must be named VITE_OPENAI_API_KEY */
  const openAiKeyLoaded = Boolean(
    String(import.meta.env.VITE_OPENAI_API_KEY ?? "").trim(),
  );

  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: newMessageId(),
      sender: "bot",
      text: "Hi! I’m Bhanu Pratap's portfolio assistant. Ask about skills, projects, education, certifications, or contact — or tap a suggestion below.",
    },
  ]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const lastSendRef = useRef<number>(0);
  const chatRef = useRef<HTMLDivElement | null>(null);

  const toggleOpen = () => setOpen((prev) => !prev);

  const appendMessage = (message: Omit<ChatMessage, "id">) => {
    setMessages((prev) => [...prev, { ...message, id: newMessageId() }]);
  };

  const tryOpenAI = async (userText: string): Promise<string | null> => {
    const apiKey = import.meta.env.VITE_OPENAI_API_KEY;
    if (!apiKey || String(apiKey).trim() === "") {
      return null;
    }

    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        messages: [
          { role: "system", content: SYSTEM_PROMPT },
          { role: "user", content: userText },
        ],
        max_tokens: 300,
        temperature: 0.7,
      }),
    });

    if (!response.ok) {
      return null;
    }

    const data = (await response.json()) as {
      choices?: { message?: { content?: string } }[];
    };
    const text = data.choices?.[0]?.message?.content?.trim();
    return text && text.length > 0 ? text : null;
  };

  const handleSend = async (textOverride?: string) => {
    const text = (textOverride ?? input).trim();
    if (!text || loading) return;

    const now = Date.now();
    if (now - lastSendRef.current < RATE_MS) {
      setError("Please wait a moment before sending another message.");
      return;
    }
    lastSendRef.current = now;

    setError(null);
    appendMessage({ sender: "user", text });
    setInput("");
    setLoading(true);

    try {
      const fromApi = await tryOpenAI(text);
      if (fromApi) {
        appendMessage({ sender: "bot", text: fromApi });
        return;
      }

      // No key, quota, or any API failure — answer from portfolio data
      await new Promise((r) => setTimeout(r, 200));
      appendMessage({ sender: "bot", text: getLocalResponse(text) });
    } catch {
      appendMessage({ sender: "bot", text: getLocalResponse(text) });
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      event.preventDefault();
      void handleSend();
    }
  };

  const displayMessages = useMemo(() => messages.slice(-16), [messages]);

  useEffect(() => {
    const el = chatRef.current;
    if (el) {
      el.scrollTop = el.scrollHeight;
    }
  }, [displayMessages]);

  const handleQuickPrompt = (prompt: string) => {
    void handleSend(prompt);
  };

  return (
    <div className="fixed bottom-4 right-4 z-50 font-sans">
      <button
        type="button"
        aria-label={open ? "Close chat" : "Open chat"}
        onClick={toggleOpen}
        className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-primary p-0 text-primary-foreground shadow-xl transition-all hover:scale-105 hover:shadow-2xl [&_svg]:block [&_svg]:shrink-0"
      >
        {open ? <X size={24} strokeWidth={2} aria-hidden /> : <MessageSquare size={24} strokeWidth={2} aria-hidden />}
      </button>

      {open && (
        <div className="absolute bottom-16 right-0 w-96 max-w-[calc(100vw-2rem)]">
          <section className="rounded-2xl border border-border bg-background shadow-2xl transition-all duration-300 ease-out backdrop-blur-sm">
            <header className="flex items-center justify-between border-b border-border p-4">
              <div>
                <h3 className="text-sm font-semibold text-foreground">Bhanu Pratap&rsquo;s assistant</h3>
                <p className="text-xs text-muted-foreground">Portfolio Q&amp;A</p>
                {import.meta.env.DEV && (
                  <p
                    className="mt-1 max-w-[220px] text-[10px] leading-snug text-muted-foreground/90"
                    title="Vite only exposes variables that start with VITE_. Restart npm run dev after editing .env."
                  >
                    {openAiKeyLoaded
                      ? "Dev: API key is loaded — if replies still look canned, OpenAI returned an error (e.g. quota)."
                      : "Dev: no VITE_OPENAI_API_KEY — add it to .env in project root and restart the dev server."}
                  </p>
                )}
              </div>
              <button
                type="button"
                className="rounded-xl bg-muted px-3 py-1 text-xs text-muted-foreground transition-colors hover:bg-muted/80"
                onClick={() => setOpen(false)}
              >
                Close
              </button>
            </header>

            <div className="flex flex-wrap gap-2 border-b border-border px-3 py-3">
              {suggestionPrompts.map((prompt) => (
                <button
                  key={prompt}
                  type="button"
                  onClick={() => handleQuickPrompt(prompt)}
                  disabled={loading}
                  className="rounded-full border border-border bg-muted/50 px-3 py-1 text-xs text-muted-foreground transition hover:bg-primary hover:text-primary-foreground disabled:opacity-50"
                >
                  {prompt}
                </button>
              ))}
            </div>

            <div ref={chatRef} className="max-h-80 space-y-3 overflow-y-auto px-4 py-3">
              {displayMessages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-[85%] rounded-xl px-3 py-2 text-sm leading-relaxed ${
                      msg.sender === "user"
                        ? "bg-primary text-primary-foreground"
                        : "bg-muted text-muted-foreground"
                    }`}
                  >
                    {msg.text}
                  </div>
                </div>
              ))}
            </div>

            <div className="flex gap-2 border-t border-border p-3">
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Type your question..."
                className="flex-1 rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground outline-none focus:border-primary"
                disabled={loading}
                aria-label="Chat message"
              />
              <button
                type="button"
                onClick={() => void handleSend()}
                disabled={!input.trim() || loading}
                className="rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition hover:bg-primary/90 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {loading ? <Loader2 size={16} className="animate-spin" /> : "Send"}
              </button>
            </div>

            {error && (
              <p className="border-t border-border px-3 py-2 text-xs text-destructive" role="alert">
                {error}
              </p>
            )}
          </section>
        </div>
      )}
    </div>
  );
};

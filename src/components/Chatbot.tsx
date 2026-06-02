import { useEffect, useMemo, useRef, useState, type KeyboardEvent } from "react";
import { MessageSquare, X, Loader2 } from "lucide-react";

type ChatMessage = {
  id: string;
  sender: "user" | "bot";
  text: string;
};

const SYSTEM_PROMPT = `You are Bhanu Pratap's portfolio assistant. You help visitors learn about Bhanu's background, skills, projects, and experience.

About Bhanu:
- Student at vidya vahini school,prayagraj (CGPA: 6.2)
- Specializes in Data Science, AI, and Full-Stack Development
- Builds end-to-end solutions from data preprocessing to ML deployment
- Technologies: Python, Flask, React, Node.js, SQL/NoSQL, Power BI, ML/AI
- Tools: Linux (Ubuntu, Kali), VMware, Git/GitHub
- Soft skills: Teamwork, Time Management, Problem Solving, Communication
- GitHub: github.com/bhanupratap30
- Email: manzansh3008@gmail.com

Education:
- vidya vahini school,prayagraj (CGPA: 6.2)

Projects:
- SiteShield URL Risk Analyzer (ML security pipeline)
- Nexus URL Shortener (Node.js, MySQL, security features)
- Git Workflow Assistant (VS Code extension)
- Smart Parking Prediction (ML regression model)
- Weather Forecast App (React + APIs)

Certifications:
- Algo University: Graphs Camp
- IIT Kanpur: Cloud Computing
- IIT Kharagpur: Modern C++
- PW Skills: Backend Development
- LPU: Data Structures & Algorithms

Training/Experience:
- Full Stack MERN Training (CipherSchools)
- Field Data Collection Volunteer (NGO)

Achievements:
- Inter-School Chess Winner
- 200+ DSA problems solved
- 100+ SQL problems solved
- 288+ hours coding practice

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
    keywords: ["project", "site", "nexus", "siteshield", "parking", "weather", "workflow"],
    answer:
      "Bhanu Pratap Singh has built projects including SiteShield URL Risk Analyzer (ML security), Nexus URL Shortener (Node.js, MySQL), Git Workflow Assistant (VS Code extension), Smart Parking Prediction (ML), and a Weather Forecast App (React + APIs). See the Projects section for more detail.",
  },
  {
    keywords: ["skill", "technolog", "stack", "python", "react", "flask", "node"],
    answer:
      "He focuses on Data Science, AI, and Full-Stack development. Tech: Python, Flask, React, Node.js, SQL/NoSQL, Power BI, ML/AI; tools: Linux (Ubuntu, Kali), VMware, Git/GitHub.",
  },
  {
    keywords: ["education", "cgpa", "lpu", "degree", "school", "intermediate", "matric"],
    answer:
      "Student at vidya vahini school,prayagraj (CGPA 6.2).",
  },
  {
    keywords: ["certif", "iit", "algo", "pw skills"],
    answer:
      "Certifications include Algo University (Graphs Camp), IIT Kanpur (Cloud Computing), IIT Kharagpur (Modern C++), PW Skills (Backend Development), and LPU (DSA).",
  },
  {
    keywords: ["achiev", "chess", "dsa problem", "sql problem", "coding hour"],
    answer:
      "Achievements include inter-school chess winner, 400+ DSA problems, 100+ SQL problems, and 288+ hours of coding practice.",
  },
  {
    keywords: ["experience", "training", "cipher", "mern", "ngo", "volunteer"],
    answer:
      "Training: Full Stack MERN at CipherSchools. Experience: Field Data Collection Volunteer (NGO). Strong problem-solving practice (400+ DSA, 100+ SQL).",
  },
  {
    keywords: ["contact", "email", "reach", "message", "hire"],
    answer:
      "You can reach him via manzansh3008@gmail.com or use the Contact section on this portfolio.",
  },
  {
    keywords: ["github", "git ", "repo"],
    answer: "Code and projects: github.com/bhanupratap30",
  },
  {
    keywords: ["who", "about", "introduce", "background", "yourself"],
    answer:
      "Bhanu Pratap Singh is a student at vidya vahini school,prayagraj (CGPA 6.2), focused on Data Science, AI, and full-stack work—from data prep to ML deployment.",
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

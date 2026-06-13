"use client";

import { useChat } from "@ai-sdk/react";
import { DefaultChatTransport, type UIMessage } from "ai";
import { useEffect, useRef, useState } from "react";

const SUGGESTED_CHIPS = [
  "Do you build React Native?",
  "What's your typical timeline?",
  "Show me your AI work",
];

function messageText(message: UIMessage): string {
  return message.parts
    .filter((part) => part.type === "text")
    .map((part) => part.text)
    .join("");
}

export default function AskMyPortfolio() {
  const { messages, sendMessage, status, error, regenerate } = useChat({
    transport: new DefaultChatTransport({ api: "/api/chat" }),
  });
  const [input, setInput] = useState("");
  const scrollRef = useRef<HTMLDivElement>(null);

  const busy = status === "submitted" || status === "streaming";
  const lastMessage = messages[messages.length - 1];
  const awaitingFirstToken =
    busy &&
    (lastMessage?.role !== "assistant" ||
      messageText(lastMessage).length === 0);

  useEffect(() => {
    const el = scrollRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [messages]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const text = input.trim();
    if (!text || busy) return;
    sendMessage({ text });
    setInput("");
  };

  const inputField = (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Ask me anything about Imran's work..."
        aria-label="Ask a question about Imran's work"
        className="h-12 w-full rounded-lg border border-border bg-bg-subtle px-3 font-sans text-small text-text outline-none transition-[border-color,box-shadow] duration-150 placeholder:text-text-subtle focus:border-accent focus:shadow-[0_0_0_4px_rgba(233,119,87,0.1)]"
      />
    </form>
  );

  return (
    <div className="w-full rounded-2xl border border-border bg-bg-elevated p-6">
      <div className="mb-4 flex items-center justify-between">
        <p className="font-mono text-mono-sm uppercase text-text-subtle">
          Ask my portfolio
        </p>
        <span className="h-1.5 w-1.5 rounded-full bg-accent" />
      </div>

      {messages.length === 0 ? (
        <>
          <div className="mb-4">{inputField}</div>

          <p className="mb-3 font-mono text-mono-xs uppercase text-text-subtle">
            Suggested
          </p>

          <div className="mb-6 flex flex-wrap gap-2">
            {SUGGESTED_CHIPS.map((chip) => (
              <button
                key={chip}
                type="button"
                onClick={() => {
                  if (!busy) sendMessage({ text: chip });
                }}
                className="cursor-pointer rounded-xl border border-border bg-bg-subtle px-3 py-1.5 font-sans text-xs text-text-muted transition-colors duration-150 hover:border-accent hover:text-text"
              >
                {chip}
              </button>
            ))}
          </div>
        </>
      ) : (
        <>
          <div
            ref={scrollRef}
            className="chat-scroll mb-4 max-h-[400px] overflow-y-auto pr-2"
          >
            {messages.map((message) =>
              message.role === "user" ? (
                <div key={message.id} className="mb-4">
                  <p className="mb-1 font-mono text-[11px] uppercase tracking-wider text-text-subtle">
                    You →
                  </p>
                  <p className="font-sans text-[13px] text-text-muted">
                    {messageText(message)}
                  </p>
                </div>
              ) : (
                <p
                  key={message.id}
                  className="mb-5 font-sans text-small leading-[1.6] text-text"
                >
                  {messageText(message)}
                </p>
              )
            )}
            {awaitingFirstToken && (
              <span className="mb-5 inline-block h-1.5 w-1.5 animate-pulse-soft rounded-full bg-accent" />
            )}
          </div>

          {error && (
            <div className="mb-3 flex items-center gap-3">
              <p className="font-sans text-xs text-accent">
                Something went wrong. Try asking again.
              </p>
              <button
                type="button"
                onClick={() => regenerate()}
                className="cursor-pointer font-sans text-xs text-text-muted underline transition-colors duration-150 hover:text-text"
              >
                Retry
              </button>
            </div>
          )}

          <div className="mb-6">{inputField}</div>
        </>
      )}

      <div className="mt-2 border-t border-border pt-4">
        <p className="font-mono text-[10px] uppercase tracking-wider text-text-subtle">
          Powered by AI
        </p>
      </div>
    </div>
  );
}

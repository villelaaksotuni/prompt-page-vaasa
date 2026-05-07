import React, { useState } from "react";

const promptText = [
  "Build an AI-powered customer service email agent workflow with these exact requirements:",
  "",
  "### Trigger",
  "",
  "- Gmail Trigger node that polls every minute for unread emails",
  "- `simple: false`, no extra filters except `readStatus: unread`",
  "- Uses Gmail OAuth2 credential",
  "",
  "### Flow Logic",
  "",
  "1. Gmail Trigger \u2192 Loop Over Items (SplitInBatches node) \u2192 AI Agent",
  "2. After AI Agent finishes \u2192 loop back to Loop Over Items",
  "",
  "### AI Agent Node",
  "",
  "- Type: `@n8n/n8n-nodes-langchain.agent`, typeVersion `2.2`",
  '- promptType: `"define"`',
  "- Text prompt reads `subject`, `from`, and `body` from `$json` and asks the agent to draft a response",
  "- System message:",
  '> *"You are an AI-powered email assistant. Your job is to read the full content of an incoming email, understand the sender\'s intent, and draft a helpful, professional response, based on the google docs tool that has the FAQ. Use a polite, clear, and concise tone. If the email contains a question, answer it directly. If the email contains multiple requests, address them all. If the email doesn\'t require a reply, respond with: no_reply_needed. If unsure, respond with: needs_human_review."*',
  "",
  "### Sub-nodes Connected to the AI Agent",
  "",
  "| Node | Type | Version | Connection Type | Key Settings |",
  "|------|------|---------|----------------|--------------|",
  "| OpenAI Chat Model | `@n8n/n8n-nodes-langchain.lmChatOpenAi` | 1.2 | `ai_languageModel` | Model: `gpt-4o-mini` |",
  "| Simple Memory | `@n8n/n8n-nodes-langchain.memoryBufferWindow` | 1.3 | `ai_memory` | sessionIdType: `customKey`, sessionKey: `={{ $json.id }}` |",
  "| Google Docs Tool | `n8n-nodes-base.googleDocsTool` | 2 | `ai_tool` | operation: `get`, documentURL: `https://docs.google.com/document/d/199i7VHTfVv1vaLtXhXv6EKxgG4wwbnKX13e93nGXUe8/edit?tab=t.0` |",
  "| Gmail Tool \u2013 Create Draft | `n8n-nodes-base.gmailTool` | 2.1 | `ai_tool` | resource: `draft`, subject & message via `$fromAI()`, sendTo from Gmail Trigger |",
  "",
  "### Gmail Draft Tool Details",
  "",
  "- Subject and Message fields use `$fromAI()` expressions",
  "- threadId from `$json.threadId`",
  "- sendTo: `={{ $('Gmail Trigger').item.json.from.value[0].address }}`",
].join("\n");

const feedbackDurationMs = 2400;

function App() {
  const [feedback, setFeedback] = useState(null);

  const handleCopy = async () => {
    try {
      if (!navigator.clipboard || typeof navigator.clipboard.writeText !== "function") {
        throw new Error("Clipboard API not available");
      }

      await navigator.clipboard.writeText(promptText);
      setFeedback({ type: "success", message: "Prompt copied." });
    } catch (error) {
      setFeedback({
        type: "error",
        message: "Copy failed. Copy the prompt manually.",
      });
    } finally {
      window.setTimeout(() => {
        setFeedback(null);
      }, feedbackDurationMs);
    }
  };

  return (
    <div className="page-shell">
      <main className="page">
        <header className="hero">
          <span className="badge">Prompt Page</span>
          <h1>n8n Customer Service Email Agent</h1>
          <p className="intro">
            One ready-to-use prompt for generating the requested n8n workflow JSON.
          </p>
        </header>

        <section className="cards" aria-live="polite">
          <article className="prompt-card">
            <div className="card-top">
              <span className="step-label">Single Prompt</span>
              <h2>AI-powered customer service email agent</h2>
              <p className="hint">Copy this prompt and paste it into your AI tool.</p>
            </div>

            <pre className="prompt-block">{promptText}</pre>

            <div className="card-actions">
              <button type="button" className="copy-button" onClick={handleCopy}>
                Copy prompt
              </button>
              {feedback ? (
                <p
                  className={feedback.type === "success" ? "feedback success" : "feedback error"}
                  role="status"
                >
                  {feedback.message}
                </p>
              ) : null}
            </div>
          </article>
        </section>

        <footer className="footer-note">No pixels were harmed in the making of this page. Vibecoded by Ville</footer>
      </main>
    </div>
  );
}

export default App;

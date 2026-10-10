import Link from "next/link";
import { notFound } from "next/navigation";
import ProsePage, { Prose, ProseSection } from "@/components/ProsePage";

export const TOPICS = {
  "getting-started": {
    title: "Getting started with Frox",
    intro: "From a new account to your first useful output in a few minutes.",
    sections: [
      ["Create an account", "Sign up with an email address or a Google or GitHub account. You'll get a free allowance of generations across every product, no card required."],
      ["Choose a product", "The left navigation switches between Chat, Image, Voice, Code, and 3D. Each one keeps its own history so experiments don't mix."],
      ["Start your first chat", "Type a question in the chat app and press enter. Responses stream in and render code, lists, and tables as they arrive."],
      ["Save and revisit", "Conversations are saved automatically. Pin the ones you return to and export any of them as markdown."],
    ],
  },
  chat: {
    title: "Using Frox Chat",
    intro: "Models, context windows, and getting more out of a conversation.",
    sections: [
      ["Switching models", "Use the model selector in the header to move between Frox Flex for reasoning and Frox Code for technical work. The switch applies to your next message."],
      ["Context and long threads", "Frox Flex holds a 256K context window. Very long threads may be summarized automatically, and the app tells you when it does."],
      ["Exports and sharing", "Any conversation can be exported as markdown. Shared links are read-only snapshots you can revoke at any time."],
      ["When a reply goes wrong", "You can regenerate an answer or edit your prompt and resend. Feedback on a reply is attached to that message, not the whole thread."],
    ],
  },
  image: {
    title: "Using Frox Image",
    intro: "Prompts, styles, and the tools around the generator.",
    sections: [
      ["Writing a prompt", "Describe the subject, the composition, and the mood. Short prompts work, but naming a style and a lighting direction reliably improves results."],
      ["Style presets", "Presets apply a consistent look across a set. Use them for character sheets and campaign shots where you need visual continuity."],
      ["Upscaling and variations", "After generating, upscale for a larger file or request variations to explore nearby results without rewriting your prompt."],
      ["History and library", "Every generation is kept in your library with its prompt attached, so a good result stays reproducible."],
    ],
  },
  audio: {
    title: "Using Frox Voice",
    intro: "Text-to-speech, sound effects, and cloning that stays ethical.",
    sections: [
      ["Choosing a voice", "The voice library has ready-made voices for narration, dialogue, and ads. Preview any voice before you use it."],
      ["Designing a voice", "If nothing fits, adjust pitch, pace, and timbre to build a voice from scratch, then save it to your library."],
      ["Cloning and consent", "Cloning requires a short sample and a consent statement. You may only clone a voice you own or have explicit permission to use."],
      ["SFX and transcription", "The same workspace handles sound-effects generation and speech-to-text, so one clip can be transcribed and re-voiced in one place."],
    ],
  },
  coding: {
    title: "Using Frox Code",
    intro: "A real editing workflow, not a chat box with code in it.",
    sections: [
      ["Explain and review", "Paste or open code and ask for an explanation or a review. Reviews call out correctness first, style second."],
      ["Debug and refactor", "Describe the symptom and Frox Code narrows down the cause. Refactoring preserves behavior and shows what changed."],
      ["Tests and docs", "Generate unit tests or documentation for a function and edit the output before you commit it."],
      ["Languages", "Over 40 languages are supported for syntax awareness, including Python, TypeScript, Go, Rust, Java, C++, and Swift."],
    ],
  },
  "3d": {
    title: "Using Frox 3D",
    intro: "Turning prompts and images into meshes, and knowing the limits.",
    sections: [
      ["Image-to-3D", "A clean reference image with a clear subject produces the best first pass. Busy backgrounds tend to confuse the reconstruction."],
      ["Text-to-3D", "Text prompts work for simple objects. Complex scenes are better built from a reference image."],
      ["Repair and export", "Use the repair tools to fill holes and reduce noise, then export to GLB or glTF. OBJ and FBX are available for the conversion pipeline."],
      ["Beta honesty", "Frox 3D is in beta. Topology is not production-grade yet, and we say so on the model card rather than overselling it."],
    ],
  },
  billing: {
    title: "Billing, credits, and refunds",
    intro: "How charges work and how to fix billing problems.",
    sections: [
      ["How usage is counted", "Each generation consumes credits based on the model and the size of the request. Your dashboard shows the breakdown per product."],
      ["Changing plans", "Upgrades take effect immediately and are prorated. Downgrades apply at the end of the current billing cycle."],
      ["Refunds", "First charges are refundable within 14 days. See the refund policy for the full details and how to ask."],
      ["Failed payments", "We retry a failed card for a few days and email you. Access pauses if the payment still can't be collected."],
    ],
  },
  account: {
    title: "Account and security",
    intro: "Passwords, sessions, and keeping your account safe.",
    sections: [
      ["Email verification", "Verify your email to unlock generation limits and password recovery. You can resend the link from the sign-in screen."],
      ["Two-factor authentication", "Enable 2FA with an authenticator app. Save your recovery codes somewhere offline."],
      ["Active sessions", "Review devices signed in to your account and sign out any you don't recognize."],
      ["Deleting your account", "Account deletion is permanent and removes your history. Export anything you want to keep first."],
    ],
  },
  troubleshooting: {
    title: "Troubleshooting",
    intro: "What to check when something doesn't work.",
    sections: [
      ["Requests failing or timing out", "Check the status page first. If service is healthy, retry once — transient upstream errors are usually resolved on a second attempt."],
      ["Slow responses", "Long prompts and large image or mesh jobs take longer by nature. Streaming text arrives progressively; image and 3D jobs run in the background."],
      ["Results that ignore the prompt", "Be more specific and put the most important constraints first. Very long prompts can dilute the signal."],
      ["Still stuck", "Collect the request ID from your history and open a ticket. It lets support find the exact job."],
    ],
  },
  faq: {
    title: "Frequently asked questions",
    intro: "The questions we get most often, answered plainly.",
    sections: [
      ["Are the models really open?", "Core chat and code weights are published on Hugging Face under their model cards. You can self-host them with the same weights we serve."],
      ["Do you train on my data?", "No. Your prompts and generations are not used to train our models, and you can delete them at any time."],
      ["Is there a free plan?", "Yes. Every new account gets a free allowance across all products, and the chat app has a generous daily limit."],
      ["Can I use outputs commercially?", "Generally yes, subject to our terms and any rights attached to the inputs you provide."],
      ["Where is data stored?", "In the region you choose where available. See the data processing page for details."],
    ],
  },
};

export function generateStaticParams() {
  return Object.keys(TOPICS).map((topic) => ({ topic }));
}

export function generateMetadata({ params }) {
  const t = TOPICS[params.topic];
  return { title: t ? t.title : "Help" };
}

export default function HelpTopicPage({ params }) {
  const topic = TOPICS[params.topic];
  if (!topic) notFound();

  return (
    <ProsePage
      eyebrow="Help"
      title={topic.title}
      intro={topic.intro}
      back={{ href: "/help", label: "All help topics" }}
    >
      <Prose>
        {topic.sections.map(([title, body]) => (
          <ProseSection key={title} title={title}>
            <p>{body}</p>
          </ProseSection>
        ))}
        <div className="card p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <p className="text-sm text-textDim">Did this answer your question?</p>
          <div className="flex gap-3">
            <Link href="/support/new" className="btn-primary !py-2 !px-4 text-sm">Open a ticket</Link>
            <Link href="/docs" className="btn-secondary !py-2 !px-4 text-sm">Read the docs</Link>
          </div>
        </div>
      </Prose>
    </ProsePage>
  );
}
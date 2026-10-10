"use client";
import { useState } from "react";

const K = ({ c = "" }) => <span className="k">{c}</span>;
const S = ({ c = "" }) => <span className="s">{c}</span>;
const F = ({ c = "" }) => <span className="f">{c}</span>;
const C = ({ c = "" }) => <span className="c">{c}</span>;
const N = ({ c = "" }) => <span className="n">{c}</span>;

const P = ({ ind = "", children }) => (
  <>
    <span className="pl">{ind}</span>
    {children}
    {"\n"}
  </>
);

const SNIPPETS = {
  Python: (
    <>
      <P><C c="# pip install frox-sdk" /></P>
      <P><K c="from" /> frox <K c="import" /> Frox</P>
      <P />
      <P ind="  ">client = Frox({""}api_key=<S c="fx-…" />{""})</P>
      <P />
      <P ind="  ">stream = client.chat.stream({""}{`{`}</P>
      <P ind="    ">model=<S c="frox-flex" />,</P>
      <P ind="    ">messages=[{`{`}<S c="role" />: <S c="user" />, <S c="content" />: <S c="Design a REST API" />{`}`}],</P>
      <P ind="  ">{`}`})</P>
      <P />
      <P ind="  "><K c="for" /> chunk <K c="in" /> stream:</P>
      <P ind="    "><F c="print" />({""}chunk.text, end=<S c="&quot;&quot;" />{""})</P>
    </>
  ),
  JavaScript: (
    <>
      <P><C c="// npm install @froxstudio/sdk" /></P>
      <P><K c="import" /> Frox <K c="from" /> <S c="@froxstudio/sdk" />;</P>
      <P />
      <P ind="  "><K c="const" /> client = <K c="new" /> Frox({}{`{ apiKey: process.env.`}<N c="FROX_KEY" />{` }`});</P>
      <P />
      <P ind="  "><K c="const" /> stream = <K c="await" /> client.chat.stream({}{`{`}</P>
      <P ind="    ">model: <S c="frox-flex" />,</P>
      <P ind="    ">messages: [{`{`} role: <S c="user" />, content: <S c="Hi!" /> {`}`}],</P>
      <P ind="  ">{`}`});</P>
    </>
  ),
  cURL: (
    <>
      <P>curl https://api.froxstudio.ai/v1/chat/completions \</P>
      <P ind="  ">-H <S c="Authorization: Bearer $FROX_KEY" /> \</P>
      <P ind="  ">-H <S c="Content-Type: application/json" /> \</P>
      <P ind="  ">-d <S c='{"model": "frox-flex", "messages": [{"role": "user", "content": "Hi"}]}' /></P>
    </>
  ),
};

export default function CodeTabs() {
  const [tab, setTab] = useState("Python");
  return (
    <div className="code-block shadow-card">
      <div className="flex items-center justify-between border-b border-ink/[0.07] px-4 h-12">
        <div className="flex gap-1">
          {Object.keys(SNIPPETS).map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`px-3 py-1.5 rounded-lg text-[13px] font-medium transition-colors ${tab === t ? "bg-ink/[0.08] text-text" : "text-textFaint hover:text-textDim"}`}
            >
              {t}
            </button>
          ))}
        </div>
        <div className="flex gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-ink/10" />
          <span className="w-2.5 h-2.5 rounded-full bg-ink/10" />
          <span className="w-2.5 h-2.5 rounded-full bg-ink/10" />
        </div>
      </div>
      <pre className="code-body !m-0"><code>{SNIPPETS[tab]}</code></pre>
    </div>
  );
}
import Link from "next/link";

export default function AuthLayout({ children, title, subtitle }) {
  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-bg">
      {/* Left branding panel */}
      <div className="hidden md:flex md:w-1/2 lg:w-[55%] flex-col justify-between p-12 relative overflow-hidden bg-bgCard border-r border-borderSoft">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-accent/20 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-accent2/10 rounded-full blur-[150px] pointer-events-none" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff08_1px,transparent_1px),linear-gradient(to_bottom,#ffffff08_1px,transparent_1px)] bg-[size:64px_64px] pointer-events-none" />

        <Link href="/" className="relative z-10 flex items-center gap-2.5 text-text hover:opacity-80 transition-opacity w-fit">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/logo.webp" alt="Frox AI" className="w-9 h-9 rounded-lg" />
          <span className="font-bold tracking-tight text-2xl text-text">
            Frox<span className="text-accent">AI</span>
          </span>
        </Link>

        <div className="relative z-10 max-w-lg mb-12">
          <h1 className="text-4xl lg:text-5xl font-bold tracking-tight mb-6 text-text">
            Identity verification for <span className="grad-text">high-security</span> infrastructure.
          </h1>
          <p className="text-textDim text-lg leading-relaxed">
            Eliminate disposable emails, block automated bot signups, and ensure every account belongs to a real human. The precision security platform trusted by leading fintechs.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            {["SOC 2 Type II", "GDPR", "99.9% Uptime", "AES-256"].map((badge) => (
              <span key={badge} className="px-3.5 py-1.5 rounded-full border border-borderSoft bg-bgElev/60 text-xs text-textDim font-mono">
                {badge}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Right form panel */}
      <div className="flex-1 flex flex-col justify-center items-center p-6 sm:p-12 relative">
        <div className="w-full max-w-[420px] space-y-8">
          <div className="md:hidden mb-8 flex justify-center">
            <Link href="/" className="flex items-center gap-2.5 text-text">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/logo.webp" alt="Frox AI" className="w-7 h-7 rounded-lg" />
              <span className="font-bold tracking-tight text-xl">Frox<span className="text-accent">AI</span></span>
            </Link>
          </div>

          <div className="space-y-2 text-center md:text-left">
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">{title}</h2>
            {subtitle && <p className="text-textDim">{subtitle}</p>}
          </div>

          <div className="bg-bgCard/50 backdrop-blur-sm border border-borderSoft p-6 sm:p-8 rounded-xl shadow-2xl">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}

import { Code2, Database, Terminal, Cloud, Cpu, Layers } from "lucide-react";

const technologies = [
  { name: "Next.js", icon: Code2, color: "#ffffff" },
  { name: "React", icon: Code2, color: "#61dafb" },
  { name: "Node.js", icon: Terminal, color: "#68a063" },
  { name: "Python", icon: Terminal, color: "#3776ab" },
  { name: "Java", icon: Cpu, color: "#f89820" },
  { name: "PostgreSQL", icon: Database, color: "#4169e1" },
  { name: "Supabase", icon: Database, color: "#3ecf8e" },
  { name: "AWS", icon: Cloud, color: "#ff9900" },
  { name: "TypeScript", icon: Code2, color: "#3178c6" },
  { name: "TailwindCSS", icon: Layers, color: "#38bdf8" },
];

export default function TechMarqueeSection() {
  return (
    <section className="pt-6 pb-12 bg-gradient-to-b from-[#050505] via-[#0f0720] to-[#1a0b2e] overflow-hidden relative">
      
      {/* Glow Ambient Blur behind */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[250px] bg-purple-600/10 blur-[100px] pointer-events-none rounded-full" />

      {/* Header */}
      <div className="text-center mb-8 px-6 relative z-10">

        <h2 className="text-3xl md:text-4xl font-sora font-extrabold mb-3 text-white tracking-tight">
          Nos adaptamos a tus tecnologías
        </h2>
        <p className="text-slate-400 font-manrope max-w-xl mx-auto text-sm md:text-base leading-relaxed">
          Dominamos el stack tecnológico moderno para construir soluciones rápidas, seguras y altamente escalables.
        </p>
      </div>

      {/* Marquee with Left & Right Gradient Fades */}
      <div className="relative w-full overflow-hidden flex z-10">
        
        {/* Left Fade Overlay */}
        <div className="pointer-events-none absolute top-0 bottom-0 left-0 w-28 bg-gradient-to-r from-[#090514] to-transparent z-20" />
        
        {/* Right Fade Overlay */}
        <div className="pointer-events-none absolute top-0 bottom-0 right-0 w-28 bg-gradient-to-l from-[#1a0b2e] to-transparent z-20" />

        <div className="flex gap-6 items-center whitespace-nowrap animate-marquee">
          {/* Loop 1 */}
          {technologies.map((tech, idx) => (
            <div 
              key={`tech1-${idx}`} 
              className="inline-flex items-center gap-3 px-6 py-3.5 rounded-2xl bg-white/[0.04] backdrop-blur-xl border border-white/10 hover:border-[#4F8EF7]/50 hover:bg-white/[0.08] transition-all duration-300 shadow-xl shadow-black/40 group cursor-default"
            >
              <tech.icon className="w-5 h-5 transition-transform duration-300 group-hover:scale-110" style={{ color: tech.color }} />
              <span className="font-sora font-bold text-white/90 text-sm tracking-wide">{tech.name}</span>
            </div>
          ))}
          {/* Loop 2 */}
          {technologies.map((tech, idx) => (
            <div 
              key={`tech2-${idx}`} 
              className="inline-flex items-center gap-3 px-6 py-3.5 rounded-2xl bg-white/[0.04] backdrop-blur-xl border border-white/10 hover:border-[#4F8EF7]/50 hover:bg-white/[0.08] transition-all duration-300 shadow-xl shadow-black/40 group cursor-default"
            >
              <tech.icon className="w-5 h-5 transition-transform duration-300 group-hover:scale-110" style={{ color: tech.color }} />
              <span className="font-sora font-bold text-white/90 text-sm tracking-wide">{tech.name}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}


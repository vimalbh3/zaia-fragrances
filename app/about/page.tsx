import { StoreProvider } from "@/lib/store";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

export default function AboutPage() {
  return (
    <StoreProvider>
      <Navigation />
      <main className="min-h-screen bg-[#0d0d0d] pt-24">
        {/* Hero */}
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12 py-20 border-b border-white/5">
          <p className="text-[9px] tracking-[0.4em] uppercase text-[#c9a96e] mb-6">Our Philosophy</p>
          <h1
            className="font-serif text-6xl lg:text-8xl font-light leading-tight"
            style={{ fontFamily: "Cormorant Garamond, serif" }}
          >
            Less.<br />But Better.
          </h1>
        </div>

        <div className="max-w-[1400px] mx-auto px-6 lg:px-12 py-20">
          <div className="grid lg:grid-cols-2 gap-20">
            <div>
              <p className="text-sm text-[#f5f0e8]/60 leading-relaxed mb-6">
                ZAIA was founded on a single belief: that fragrance is one of the most powerful and intimate forms of self-expression. In a world saturated with mass-produced scents, we chose to do things differently.
              </p>
              <p className="text-sm text-[#f5f0e8]/40 leading-relaxed mb-6">
                Every ZAIA fragrance is crafted in small batches, using ingredients selected for quality and provenance. We work with master perfumers who share our commitment to craft and restraint.
              </p>
              <p className="text-sm text-[#f5f0e8]/40 leading-relaxed">
                We don&apos;t make fragrances for men or women. We make fragrances for people — for moments, memories, and moods. Scent has no gender.
              </p>
            </div>
            <div>
              <div className="aspect-square bg-[#0a0a0a] border border-white/5 flex items-center justify-center">
                <p
                  className="font-serif text-5xl font-light text-[#f5f0e8]/[0.06] tracking-[0.3em]"
                  style={{ fontFamily: "Cormorant Garamond, serif" }}
                >
                  ZAIA
                </p>
              </div>
            </div>
          </div>

          {/* Values */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-white/5 mt-24">
            {[
              { title: "Quality", body: "Only the finest raw materials. No shortcuts." },
              { title: "Transparency", body: "We publish our full ingredient lists. No hidden chemicals." },
              { title: "Integrity", body: "Cruelty-free. Ethically sourced. Thoughtfully made." },
            ].map((v) => (
              <div key={v.title} className="bg-[#0a0a0a] p-10">
                <p className="text-[9px] tracking-[0.3em] uppercase text-[#c9a96e] mb-4">—</p>
                <h3
                  className="font-serif text-2xl font-light mb-4"
                  style={{ fontFamily: "Cormorant Garamond, serif" }}
                >
                  {v.title}
                </h3>
                <p className="text-xs text-[#f5f0e8]/40 leading-relaxed">{v.body}</p>
              </div>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </StoreProvider>
  );
}

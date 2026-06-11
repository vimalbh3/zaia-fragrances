import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

export default function AboutPage() {
  return (
    <>
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
                ZAIA was founded on a simple belief: fragrance should feel personal.
              </p>
              <p className="text-sm text-[#f5f0e8]/40 leading-relaxed mb-6">
                In a world of trends, celebrity endorsements and fragrances designed to appeal to everyone, we found ourselves searching for something quieter. Something more considered. Something that felt like an extension of identity rather than an accessory.
              </p>
              <p className="text-sm text-[#f5f0e8]/40 leading-relaxed mb-6">
                Fragrance has the power to transport us. A single note can bring back a place, a person, a moment in time. It can evoke confidence before a meeting, comfort on a difficult day, or nostalgia for a memory long forgotten. Few things connect so deeply to emotion.
              </p>
              <p className="text-sm text-[#f5f0e8]/40 leading-relaxed mb-6">
                That connection sits at the heart of everything we create.
              </p>
              <p className="text-sm text-[#f5f0e8]/40 leading-relaxed mb-6">
                Every ZAIA fragrance is crafted in small batches using carefully sourced ingredients selected for their quality, character and provenance. We collaborate with master perfumers who share our belief that true luxury lies in restraint, not excess.
              </p>
              <p className="text-sm text-[#f5f0e8]/40 leading-relaxed mb-6">
                We are not interested in creating hundreds of fragrances. We focus on creating a collection that feels intentional, refined and timeless.
              </p>
              <p className="text-sm text-[#f5f0e8]/40 leading-relaxed mb-6">
                We don&apos;t create fragrances for men or women. We create fragrances for people. For moments, memories and moods. Because scent is deeply personal, and personal expression should never be limited by labels.
              </p>
              <p className="text-sm text-[#f5f0e8]/60 leading-relaxed">
                ZAIA is an exploration of emotion through fragrance. A collection of scents designed to become part of your story.
              </p>
            </div>
            <div>
              <div className="relative aspect-square overflow-hidden">
                <img
                  src="/About_page_header.png"
                  alt="ZAIA — About"
                  className="w-full h-full object-cover object-center"
                />
              </div>
            </div>
          </div>

          {/* Values */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-white/5 mt-24">
            {[
              { title: "Quality", body: "Only the finest raw materials. No shortcuts.", icon: "/ZAIA_Jasmine_Stem_Quality.svg" },
              { title: "Transparency", body: "We publish our full ingredient lists. No hidden chemicals.", icon: "/ZAIA_Crystal_Perfume_Droplet_Transparency.svg" },
              { title: "Integrity", body: "Cruelty-free. Ethically sourced. Thoughtfully made.", icon: "/ZAIA_Gold_Scales_Integrity.svg" },
            ].map((v) => (
              <div key={v.title} className="bg-[#0a0a0a] p-10">
                <img src={v.icon} alt={v.title} className="w-10 h-10 mb-6 opacity-80" />
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
    </>
  );
}

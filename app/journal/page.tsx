import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import Link from "next/link";

const posts = [
  {
    slug: "the-art-of-scent-memory",
    category: "Essay",
    title: "The Art of Scent Memory",
    excerpt: "Why smell is the sense most tightly bound to emotion and recall — and how we harness that in every ZAIA fragrance.",
    date: "March 2025",
  },
  {
    slug: "notes-on-oud",
    category: "Ingredients",
    title: "Notes on Oud: The World's Most Coveted Wood",
    excerpt: "A deep dive into the history, harvest and alchemy of oud — the beating heart of Oud Silhouette.",
    date: "February 2025",
  },
  {
    slug: "unisex-fragrance",
    category: "Perspective",
    title: "Why All Fragrance Should Be Unisex",
    excerpt: "The artificial divide between men's and women's perfume is a marketing invention. It's time to move past it.",
    date: "January 2025",
  },
  {
    slug: "the-nose",
    category: "Craft",
    title: "The Nose: A Conversation with Our Perfumer",
    excerpt: "We sit down with ZAIA's lead perfumer to discuss obsession, restraint, and what makes a fragrance last.",
    date: "December 2024",
  },
];

export default function JournalPage() {
  return (
    <>
      <Navigation />
      <main className="min-h-screen bg-[#0d0d0d] pt-24">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12 py-16 border-b border-white/5">
          <p className="text-[9px] tracking-[0.4em] uppercase text-[#c9a96e] mb-4">Reading</p>
          <h1
            className="font-serif text-5xl lg:text-7xl font-light"
            style={{ fontFamily: "Cormorant Garamond, serif" }}
          >
            Journal
          </h1>
        </div>

        <div className="max-w-[1400px] mx-auto px-6 lg:px-12 py-16">
          <div className="space-y-0 divide-y divide-white/5">
            {posts.map((post, i) => (
              <article key={post.slug} className="py-10 group cursor-pointer">
                <div className="grid lg:grid-cols-4 gap-6 items-start">
                  <div>
                    <p className="text-[9px] tracking-[0.3em] uppercase text-[#c9a96e]/70">{post.category}</p>
                    <p className="text-[9px] text-[#f5f0e8]/25 tracking-wider mt-1">{post.date}</p>
                  </div>
                  <div className="lg:col-span-3">
                    <h2
                      className="font-serif text-2xl lg:text-3xl font-light group-hover:text-[#c9a96e] transition-colors duration-300 mb-3"
                      style={{ fontFamily: "Cormorant Garamond, serif" }}
                    >
                      {post.title}
                    </h2>
                    <p className="text-sm text-[#f5f0e8]/40 leading-relaxed max-w-xl">{post.excerpt}</p>
                    <p className="gold-link text-[#f5f0e8]/30 hover:text-[#c9a96e] mt-4 inline-block">
                      Read more →
                    </p>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}

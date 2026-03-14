import { getAllPosts } from "@/lib/posts";
import PostCard from "@/components/PostCard";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Link } from "react-router-dom";

const Index = () => {
  const posts = getAllPosts().slice(0, 3);

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      <main className="flex-1 max-w-4xl mx-auto px-6 w-full">
        <section className="py-24">
          <h1 className="text-4xl sm:text-5xl font-semibold tracking-tighter leading-tight mb-4">
            Building robust data primitives.
          </h1>
          <p className="text-muted-foreground text-lg leading-relaxed max-w-[55ch]">
            Data Engineer writing about pipelines, infrastructure, and the craft of moving data reliably at scale.
          </p>
        </section>

        <section className="pb-24">
          <div className="flex items-baseline justify-between mb-8">
            <h2 className="text-xs uppercase tracking-widest text-muted-foreground font-medium">
              Latest Posts
            </h2>
            <Link
              to="/blog"
              className="text-sm text-accent hover:text-foreground transition-colors duration-150"
            >
              View all →
            </Link>
          </div>
          <div className="flex flex-col gap-3">
            {posts.map((post) => (
              <PostCard key={post.slug} post={post} />
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Index;

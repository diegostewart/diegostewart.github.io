import { useState, useMemo } from "react";
import { getAllPosts } from "@/lib/posts";
import PostCard from "@/components/PostCard";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const Blog = () => {
  const [search, setSearch] = useState("");
  const allPosts = getAllPosts();

  const filtered = useMemo(() => {
    if (!search.trim()) return allPosts;
    const q = search.toLowerCase();
    return allPosts.filter(
      (p) =>
        p.title.toLowerCase().includes(q) ||
        p.excerpt.toLowerCase().includes(q) ||
        p.tags.some((t) => t.toLowerCase().includes(q))
    );
  }, [search, allPosts]);

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      <main className="flex-1 max-w-4xl mx-auto px-6 w-full">
        <section className="py-24">
          <h1 className="text-3xl font-semibold tracking-tighter mb-2">Blog</h1>
          <p className="text-muted-foreground text-sm mb-8">
            {allPosts.length} posts on data engineering, pipelines, and infrastructure.
          </p>

          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search posts..."
            className="w-full border border-border bg-background text-foreground px-4 py-2.5 text-sm rounded placeholder:text-muted-foreground focus:outline-none focus:border-foreground transition-colors duration-150 mb-10"
          />

          <div className="flex flex-col gap-3">
            {filtered.length > 0 ? (
              filtered.map((post) => (
                <PostCard key={post.slug} post={post} />
              ))
            ) : (
              <p className="text-sm text-muted-foreground py-8 text-center">
                No posts matching "{search}"
              </p>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Blog;

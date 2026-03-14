import { useParams, Link } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { getPostBySlug } from "@/lib/posts";
import SchemaHeader from "@/components/SchemaHeader";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const PostPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const post = slug ? getPostBySlug(slug) : undefined;

  if (!post) {
    return (
      <div className="min-h-screen flex flex-col bg-background">
        <Header />
        <main className="flex-1 max-w-4xl mx-auto px-6 w-full py-24">
          <p className="text-sm text-muted-foreground">Post not found.</p>
          <Link to="/blog" className="text-sm text-accent hover:text-foreground transition-colors duration-150 mt-4 inline-block">
            ← Back to blog
          </Link>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      <main className="flex-1 max-w-4xl mx-auto px-6 w-full py-24">
        {/* Breadcrumb */}
        <nav className="text-sm text-muted-foreground mb-8">
          <Link to="/" className="hover:text-foreground transition-colors duration-150">Home</Link>
          <span className="mx-2">/</span>
          <Link to="/blog" className="hover:text-foreground transition-colors duration-150">Blog</Link>
          <span className="mx-2">/</span>
          <span className="text-foreground">{post.title}</span>
        </nav>

        {post.cover_image && (
          <div className="aspect-[2/1] overflow-hidden rounded mb-8">
            <img
              src={post.cover_image}
              alt={post.title}
              className="w-full h-full object-cover"
            />
          </div>
        )}

        <h1 className="text-3xl sm:text-4xl font-semibold tracking-tighter leading-tight mb-2">
          {post.title}
        </h1>
        <p className="text-muted-foreground text-sm mb-6">
          {new Date(post.date).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </p>

        <SchemaHeader post={post} />

        <article className="prose">
          <ReactMarkdown remarkPlugins={[remarkGfm]}>
            {post.content}
          </ReactMarkdown>
        </article>

        <div className="border-t border-border mt-16 pt-8">
          <Link
            to="/blog"
            className="text-sm text-accent hover:text-foreground transition-colors duration-150"
          >
            ← All posts
          </Link>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default PostPage;

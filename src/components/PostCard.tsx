import { Link } from "react-router-dom";
import type { PostMeta } from "@/lib/posts";
import { getReadingTime } from "@/lib/posts";

interface PostCardProps {
  post: PostMeta & { content?: string };
}

const PostCard = ({ post }: PostCardProps) => {
  const readingTime = post.content ? getReadingTime(post.content) : undefined;

  return (
    <Link
      to={`/blog/${post.slug}`}
      className="block border border-border hover:border-foreground transition-colors duration-150 rounded overflow-hidden"
    >
      {post.cover_image && (
        <div className="aspect-[3/1] overflow-hidden">
          <img
            src={post.cover_image}
            alt={post.title}
            className="w-full h-full object-cover"
            loading="lazy"
          />
        </div>
      )}
      <div className="py-5 px-6">
        <div className="flex items-baseline justify-between gap-4 mb-2">
          <h3 className="text-lg font-semibold tracking-tight text-foreground leading-tight">
            {post.title}
          </h3>
          <span className="text-xs text-muted-foreground whitespace-nowrap">
            {new Date(post.date).toLocaleDateString("en-US", {
              year: "numeric",
              month: "short",
              day: "numeric",
            })}
          </span>
        </div>

        <p className="text-muted-foreground text-sm leading-relaxed mb-3">
          {post.excerpt}
        </p>

        <div className="flex items-center gap-2 flex-wrap">
          {post.tags.map((tag) => (
            <span
              key={tag}
              className="text-xs text-muted-foreground bg-muted px-2 py-0.5 rounded-sm"
            >
              {tag}
            </span>
          ))}
          {readingTime && (
            <span className="text-xs text-muted-foreground ml-auto">
              {readingTime} min read
            </span>
          )}
        </div>
      </div>
    </Link>
  );
};

export default PostCard;

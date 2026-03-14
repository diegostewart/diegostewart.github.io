import type { Post } from "@/lib/posts";
import { getReadingTime } from "@/lib/posts";

const SchemaHeader = ({ post }: { post: Post }) => {
  const readingTime = getReadingTime(post.content);

  return (
    <div className="border-b border-border py-4 mb-8 text-sm text-muted-foreground">
      <div className="flex flex-wrap gap-x-6 gap-y-2">
        <div>
          <span className="font-medium text-foreground">Tools: </span>
          {post.tools.join(", ")}
        </div>
        <div>
          <span className="font-medium text-foreground">Read time: </span>
          {readingTime} min
        </div>
        <div>
          <span className="font-medium text-foreground">Status: </span>
          {post.status}
        </div>
      </div>
    </div>
  );
};

export default SchemaHeader;

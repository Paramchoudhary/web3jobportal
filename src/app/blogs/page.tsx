import fs from "fs";
import path from "path";
import matter from "gray-matter";
import Link from "next/link";

interface BlogPost {
  meta: {
    title: string;
    description: string;
    date: string;
    [key: string]: any; // For any additional frontmatter fields
  };
  slug: string;
}

export default function Home() {
  const blogDir = "src/blogs";
  let blogs: BlogPost[] = [];

  try {
    // Find all files in the blog directory
    const files = fs.readdirSync(path.join(process.cwd(), blogDir));

    // Process each blog file
    blogs = files
      .filter((filename) => filename.endsWith(".mdx"))
      .map((filename): BlogPost => {
        const filePath = path.join(process.cwd(), blogDir, filename);
        const fileContent = fs.readFileSync(filePath, "utf-8");
        const { data: frontMatter } = matter(fileContent);

        return {
          meta: {
            title: frontMatter.title as string,
            description: frontMatter.description as string,
            date: frontMatter.date as string,
            ...frontMatter,
          },
          slug: filename.replace(".mdx", ""),
        };
      })
      .sort(
        (a, b) =>
          new Date(b.meta.date).getTime() - new Date(a.meta.date).getTime()
      );
  } catch (error) {
    console.error("Error reading blog files:", error);
  }

  return (
    <main className="flex flex-col p-4 max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold mb-8">My Blogging Site</h1>

      <section>
        <h2 className="text-2xl font-bold mb-4">Latest Blogs</h2>

        {blogs.length > 0 ? (
          <div className="space-y-4">
            {blogs.map((blog) => (
              <Link
                href={`/blogs/${blog.slug}`}
                key={blog.slug}
                className="block"
              >
                <div className="border border-gray-200 rounded-lg p-4 transition-shadow hover:shadow-md">
                  <h3 className="text-xl font-semibold mb-2">
                    {blog.meta.title}
                  </h3>
                  <p className="text-gray-600 mb-2">{blog.meta.description}</p>
                  <p className="text-sm text-gray-400">{blog.meta.date}</p>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <p className="text-gray-600">No blog posts found.</p>
        )}
      </section>
    </main>
  );
}

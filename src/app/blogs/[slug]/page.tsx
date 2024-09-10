import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { MDXRemote } from "next-mdx-remote/rsc";
import Button from "@/components/mdx/Button";
import remarkGfm from "remark-gfm";

const options = {
  mdxOptions: {
    remarkPlugins: [remarkGfm],
    rehypePlugins: [],
  },
};

export async function generateStaticParams() {
  const files = fs.readdirSync(path.join(process.cwd(), "src", "blogs"));

  const paths = files.map((filename) => ({
    slug: filename.replace(".mdx", ""),
  }));

  return paths;
}

function getPost({ slug }: { slug: string }) {
  const markdownFile = fs.readFileSync(
    path.join(process.cwd(), "src", "blogs", `${slug}.mdx`),
    "utf-8"
  );

  const { data: frontMatter, content } = matter(markdownFile);

  return {
    frontMatter,
    slug,
    content,
  };
}

export default function Post({ params }: { params: { slug: string } }) {
  try {
    const props = getPost(params);

    return (
      <article className="prose prose-sm md:prose-base lg:prose-lg prose-slate !prose-invert mx-auto">
        <h1>{props.frontMatter.title}</h1>

        <MDXRemote
          source={props.content}
          components={{ Button }}
          options={options}
        />
      </article>
    );
  } catch (error) {
    console.error("Error rendering blog post:", error);
    return <div>Error loading blog post. Please try again later.</div>;
  }
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}) {
  try {
    const blog = getPost(params);

    return {
      title: blog.frontMatter.title,
      description: blog.frontMatter.description,
    };
  } catch (error) {
    console.error("Error generating metadata:", error);
    return {
      title: "Blog Post",
      description: "Unable to load blog post metadata",
    };
  }
}

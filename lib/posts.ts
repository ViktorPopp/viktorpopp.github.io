import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { remark } from "remark";
import html from "remark-html";

const postsDirectory = path.join(process.cwd(), "posts");

export interface PostMeta {
  title: string;
  tags: string[];
  author: string;
  date: string;
  slug: string;
}

export interface Post extends PostMeta {
  contentHtml: string;
}

// Get all post metadata
export function getAllPosts(): PostMeta[] {
  const filenames = fs.readdirSync(postsDirectory);
  const posts = filenames.map((filename) => {
    const slug = filename.replace(/\.md$/, "");
    const fullPath = path.join(postsDirectory, filename);
    const fileContents = fs.readFileSync(fullPath, "utf8");
    const { data } = matter(fileContents);

    return {
      slug,
      ...(data as Omit<PostMeta, "slug">),
    };
  });

  return posts.sort((a, b) => (a.date < b.date ? 1 : -1));
}

// Get post by slug
export async function getPost(slug: string): Promise<Post> {
  const fullPath = path.join(postsDirectory, `${slug}.md`);
  const fileContents = fs.readFileSync(fullPath, "utf8");
  const { data, content } = matter(fileContents);

  const processedcontent = await remark.use(html).process(content);
  const contentHtml = processedcontent.toString();

  return {
    slug,
    contentHtml,
    ...(data as Omit<PostMeta, "slug">),
  };
}

import React, { useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Helmet } from "react-helmet-async";
import { Blog, blogs } from "../data/blogData/blogs";

const additionalContent = `
---

### About TenaHub Solutions

TenaHub Solutions is a pioneering platform dedicated to transforming real estate management in Kenya. Our mission is to empower landlords, tenants, caretakers, and service providers with intuitive digital tools designed to streamline operations and improve communication.

With a comprehensive suite of features, TenaHub enables timely rent payments, transparent maintenance request handling, and easy property advertising — all under one roof. Our platform embraces both the latest technology and local needs, ensuring users experience unmatched convenience and reliability.

Join over 40 property owners and hundreds of tenants who have embraced TenaHub Solutions to simplify their property management and foster stronger community relationships.

---

We continuously evolve our platform based on user feedback, aiming to provide the most effective and secure real estate management experience in Nairobi, Kiambu, and beyond.
`;

const getPreview = (content: string) => {
  // Strip markdown syntax roughly and limit to 150 chars
  const plain = content.replace(/[#_*>\-\[\]\(\)!]/g, "").slice(0, 150);
  return plain.length < content.length ? plain + "..." : plain;
};

const Blogs: React.FC = () => {
  const [selectedBlog, setSelectedBlog] = useState<Blog | null>(null);

  const seoTitle = selectedBlog
    ? `${selectedBlog.title} | TenaHub Solutions`
    : "TenaHub Solutions | Blogs";

  const seoDescription = selectedBlog
    ? getPreview(selectedBlog.content)
    : "Explore expert insights and articles on real estate management by TenaHub Solutions.";

  const seoImage = selectedBlog ? selectedBlog.image : undefined;

  return (
    <>
      <Helmet>
        <title>{seoTitle}</title>
        <meta name="description" content={seoDescription} />

        {/* Open Graph */}
        <meta property="og:title" content={seoTitle} />
        <meta property="og:description" content={seoDescription} />
        {seoImage && <meta property="og:image" content={seoImage} />}
        <meta property="og:type" content={selectedBlog ? "article" : "website"} />

        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={seoTitle} />
        <meta name="twitter:description" content={seoDescription} />
        {seoImage && <meta name="twitter:image" content={seoImage} />}
      </Helmet>

      <main className="max-w-5xl mx-auto px-4 py-8">
        {!selectedBlog ? (
          <>
            <h1 className="text-4xl font-extrabold mb-8">Latest Blogs</h1>
            <div className="grid gap-8 md:grid-cols-2">
              {blogs.map((blog) => (
                <div
                  key={blog.id}
                  className="cursor-pointer rounded-lg border border-gray-300 dark:border-gray-700 p-6 shadow-sm hover:shadow-md transition-shadow duration-300 flex flex-col"
                  onClick={() => setSelectedBlog(blog)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") setSelectedBlog(blog);
                  }}
                >
                  <img
                    src={blog.image}
                    alt={blog.title}
                    className="w-full h-48 object-cover rounded-md mb-4"
                    loading="lazy"
                  />
                  <h2 className="text-2xl font-semibold mb-2 text-primary">{blog.title}</h2>
                  <p className="text-sm text-muted-foreground mb-4">{blog.published}</p>
                  <p className="text-gray-700 dark:text-gray-300 flex-grow">
                    {getPreview(blog.content)}
                  </p>
                  <button
                    className="mt-4 inline-block bg-primary-600 text-white px-4 py-2 rounded-lg shadow-lg hover:bg-primary-dark focus:outline-none focus:ring-4 focus:ring-primary-light animate-pulse self-start"
                    onClick={() => setSelectedBlog(blog)}
                    aria-label={`Read more about ${blog.title}`}
                    type="button"
                  >
                    Read More
                  </button>
                </div>
              ))}
            </div>
          </>
        ) : (
          <article>
            <button
              onClick={() => setSelectedBlog(null)}
              className="mb-6 text-primary-600 hover:underline focus:outline-none font-semibold"
              type="button"
              aria-label="Back to blog list"
            >
              &larr; Back to Blogs
            </button>

            <h1 className="text-4xl font-extrabold mb-6">{selectedBlog.title}</h1>
            <img
              src={selectedBlog.image}
              alt={selectedBlog.title}
              className="w-full max-h-96 object-cover rounded-lg mb-8"
              loading="lazy"
            />

            <article className="prose prose-lg dark:prose-invert max-w-none mb-12">
              <ReactMarkdown remarkPlugins={[remarkGfm]}>
                {selectedBlog.content}
              </ReactMarkdown>
            </article>

            <section className="prose prose-lg dark:prose-invert max-w-none border-t pt-8 mt-8">
              <ReactMarkdown remarkPlugins={[remarkGfm]}>
                {additionalContent}
              </ReactMarkdown>

              <div className="mt-10 text-center">
                <a
                  href="/contact"
                  className="inline-block bg-primary-600 text-white px-6 py-3 rounded-lg text-lg font-semibold shadow-lg hover:bg-primary-dark focus:outline-none focus:ring-4 focus:ring-primary-light animate-bounce"
                  aria-label="Contact TenaHub Solutions"
                >
                  Contact TenaHub Solutions
                </a>
              </div>
            </section>
          </article>
        )}
      </main>
    </>
  );
};

export default Blogs;

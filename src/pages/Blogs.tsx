import React, { useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Helmet } from "react-helmet";
import { Blog, blogs } from "../data/blogData/blogs";
import BlogSeo from "../SEO/BlogSeo";

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
  const plain = content.replace(/[#_*>[\]()!-]/g, "").slice(0, 150);
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
        <meta property="og:title" content={seoTitle} />
        <meta property="og:description" content={seoDescription} />
        {seoImage && <meta property="og:image" content={seoImage} />}
        <meta property="og:type" content={selectedBlog ? "article" : "website"} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={seoTitle} />
        <meta name="twitter:description" content={seoDescription} />
        {seoImage && <meta name="twitter:image" content={seoImage} />}
      </Helmet>
       <BlogSeo/>
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {!selectedBlog ? (
          <>
            <div className="text-center mb-16">
              <h1 className="text-5xl font-bold text-gray-900 dark:text-white mb-4">
                Latest Insights
              </h1>
              <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
                Expert articles on real estate management in Kenya
              </p>
            </div>

            <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-3">
              {blogs.map((blog) => (
                <article
                  key={blog.id}
                  className="group relative bg-white dark:bg-gray-950/50 rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 ease-in-out transform hover:scale-105 flex flex-col h-full"
                  onClick={() => setSelectedBlog(blog)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") setSelectedBlog(blog);
                  }}
                >
                  <div className="relative h-60 overflow-hidden">
                    <img
                      src={blog.image}
                      alt={blog.title}
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  </div>

                  <div className="p-6 flex flex-col flex-grow">
                    <div className="flex items-center text-sm text-gray-500 dark:text-gray-400 mb-3">
                      <span>{blog.published}</span>
                    </div>

                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-3 line-clamp-2">
                      {blog.title}
                    </h2>

                    <p className="text-gray-600 dark:text-gray-300 mb-6 line-clamp-3 flex-grow">
                      {getPreview(blog.content)}
                    </p>

                    <button
                      className="mt-auto w-full py-3 px-6 bg-primary-600 hover:bg-primary-700 text-white font-medium rounded-lg transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
                      onClick={() => setSelectedBlog(blog)}
                      aria-label={`Read more about ${blog.title}`}
                      type="button"
                    >
                      Read Article
                    </button>
                  </div>
                </article>
              ))}
            </div>
          </>
        ) : (
          <article className="max-w-4xl mx-auto">
            <button
              onClick={() => setSelectedBlog(null)}
              className="flex items-center text-primary-600 dark:text-primary-400 hover:text-primary-800 dark:hover:text-primary-300 mb-8 transition-colors duration-200"
              type="button"
              aria-label="Back to blog list"
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Back to all articles
            </button>

            <header className="mb-12">
              <div className="flex items-center text-sm text-gray-500 dark:text-gray-400 mb-4">
                <span>{selectedBlog.published}</span>
              </div>

              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6 leading-tight">
                {selectedBlog.title}
              </h1>

              <div className="flex items-center">
                <div className="flex-shrink-0 mr-4">
                  <img
                    className="h-12 w-12 rounded-full object-cover"
                    src={selectedBlog.image}
                    alt={selectedBlog.title}
                  />
                </div>
              </div>
            </header>

            <figure className="mb-12 rounded-xl overflow-hidden shadow-xl">
              <img
                src={selectedBlog.image}
                alt={selectedBlog.title}
                className="w-full h-auto max-h-[32rem] object-cover"
                loading="lazy"
              />
            </figure>

            <article className="prose prose-lg dark:prose-dark max-w-none mb-16">
              <ReactMarkdown remarkPlugins={[remarkGfm]}>
                {selectedBlog.content}
              </ReactMarkdown>
            </article>

            <section className="bg-gray-50 dark:bg-gray-800/50 rounded-2xl p-8 md:p-10 mb-16">
              <ReactMarkdown remarkPlugins={[remarkGfm]}>
                {additionalContent}
              </ReactMarkdown>

              <div className="mt-10 text-center">
                <a
                  href="/contact"
                  className="inline-flex items-center px-8 py-4 border border-transparent text-lg font-bold rounded-xl shadow-lg text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 transition-all duration-200 transform hover:scale-105"
                  aria-label="Contact TenaHub Solutions"
                >
                  Get in Touch
                  <svg className="w-5 h-5 ml-2 -mr-1" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </a>
              </div>
            </section>

            <div className="border-t border-gray-200 dark:border-gray-700 pt-12">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-8">
                More from our blog
              </h2>
              <div className="grid gap-8 md:grid-cols-2">
                {blogs
                  .filter(blog => blog.id !== selectedBlog.id)
                  .slice(0, 2)
                  .map(blog => (
                    <article
                      key={blog.id}
                      className="flex flex-col sm:flex-row gap-6 group cursor-pointer"
                      onClick={() => setSelectedBlog(blog)}
                      role="button"
                      tabIndex={0}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") setSelectedBlog(blog);
                      }}
                    >
                      <div className="flex-shrink-0 w-full sm:w-40 h-40 overflow-hidden rounded-lg">
                        <img
                          src={blog.image}
                          alt={blog.title}
                          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                          loading="lazy"
                        />
                      </div>
                      <div>
                        <h3 className="text-xl font-semibold text-gray-900 dark:text-white group-hover:text-primary-600 dark:group-hover:text-primary-400 mb-2">
                          {blog.title}
                        </h3>
                        <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">
                          {blog.published}
                        </p>
                        <p className="text-gray-600 dark:text-gray-300 line-clamp-2">
                          {getPreview(blog.content)}
                        </p>
                      </div>
                    </article>
                  ))}
              </div>
            </div>
          </article>
        )}
      </main>
    </>
  );
};

export default Blogs;

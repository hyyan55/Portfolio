import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, Calendar, Clock, Search, ArrowRight, ArrowUpRight, Tag } from 'lucide-react';
import { Navbar } from '../components/layout/Navbar';
import { ScrollProgress } from '../components/layout/ScrollProgress';
import { Footer } from '../components/layout/Footer';
import { BackToTop } from '../components/layout/BackToTop';
import { FloatingWhatsApp } from '../components/layout/FloatingWhatsApp';
import { useData } from '../context/DataContext';
import { usePageSeo } from '../utils/seo';

export const BlogListPage: React.FC = () => {
  const { blog } = useData();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTag, setSelectedTag] = useState<string>('All');

  usePageSeo({
    title: "Blog & Notes | Hayyan Mohamed (حيان محمد) - Articles & Thoughts",
    description: "Articles, technical breakdowns, and reflections by Hayyan Mohamed on software development, medicine, and photography in Kassala, Sudan.",
    canonicalPath: "/blog",
    schema: {
      "@context": "https://schema.org",
      "@type": "Blog",
      "name": "Hayyan Mohamed Blog",
      "description": "Articles on software engineering, clinical thinking, and visual storytelling.",
      "url": "https://hayyanmohamed.com/blog",
      "author": {
        "@type": "Person",
        "name": "Hayyan Mohamed"
      }
    }
  });

  const publishedPosts = blog.filter(p => p.published);

  // Extract unique tags
  const allTags = ['All', ...Array.from(new Set(publishedPosts.flatMap(p => p.tags || [])))];

  const filteredPosts = publishedPosts.filter(p => {
    const matchesSearch = p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.content.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesTag = selectedTag === 'All' || (p.tags && p.tags.includes(selectedTag));
    return matchesSearch && matchesTag;
  });

  return (
    <div className="min-h-screen bg-white dark:bg-[#0A0A0A] text-zinc-900 dark:text-white selection:bg-sky-500 selection:text-white transition-colors">
      <ScrollProgress />
      <Navbar activeSection="blog" />

      <main className="pt-28 pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Breadcrumbs */}
          <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs font-medium text-zinc-500 dark:text-zinc-400 mb-8">
            <Link to="/" className="hover:text-sky-500 transition-colors">Home</Link>
            <span>/</span>
            <span className="text-zinc-900 dark:text-white">Blog</span>
          </nav>

          {/* Header */}
          <div className="max-w-3xl mb-12 text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-500/10 text-sky-600 dark:text-sky-400 text-xs font-bold mb-3 uppercase tracking-wider">
              <BookOpen className="w-3.5 h-3.5" />
              <span>Articles & Reflections</span>
            </div>
            <h1 className="text-3xl sm:text-5xl font-extrabold text-zinc-900 dark:text-white tracking-tight mb-4 font-heading">
              Blog & Writing
            </h1>
            <p className="text-base sm:text-lg text-zinc-600 dark:text-zinc-400 leading-relaxed">
              Perspectives by Hayyan Mohamed at the intersections of software engineering, clinical medicine, and photographic composition.
            </p>
          </div>

          {/* Search & Tag Filter Bar */}
          <div className="flex flex-col sm:flex-row gap-4 justify-between items-stretch sm:items-center mb-10 p-4 rounded-2xl bg-zinc-50 dark:bg-[#111111] border border-zinc-200/80 dark:border-zinc-800/80">
            {/* Search Input */}
            <div className="relative flex-1 max-w-md">
              <Search className="w-4 h-4 text-zinc-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search articles by title or keyword..."
                className="w-full pl-10 pr-4 py-2 text-sm rounded-xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-700/80 text-zinc-900 dark:text-white placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-sky-500"
              />
            </div>

            {/* Tag Pills */}
            <div className="flex flex-wrap gap-1.5 overflow-x-auto pb-1 sm:pb-0">
              {allTags.slice(0, 7).map((tag) => (
                <button
                  key={tag}
                  onClick={() => setSelectedTag(tag)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                    selectedTag === tag
                      ? 'bg-sky-500 text-white shadow-xs'
                      : 'bg-white dark:bg-zinc-900 text-zinc-600 dark:text-zinc-300 border border-zinc-200 dark:border-zinc-800 hover:bg-zinc-100 dark:hover:bg-zinc-800'
                  }`}
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>

          {/* Articles Grid */}
          {filteredPosts.length === 0 ? (
            <div className="text-center py-20 bg-zinc-50 dark:bg-[#111111] rounded-2xl border border-zinc-200 dark:border-zinc-800">
              <p className="text-zinc-500 dark:text-zinc-400 text-sm">No articles found matching your criteria.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredPosts.map((post) => (
                <article
                  key={post.id}
                  className="group flex flex-col justify-between p-6 rounded-2xl bg-white dark:bg-[#111111] border border-zinc-200/80 dark:border-zinc-800/80 hover:border-sky-500/50 dark:hover:border-sky-500/50 shadow-sm hover:shadow-md transition-all duration-300 text-left"
                >
                  <div>
                    {/* Meta: Date & Reading time */}
                    <div className="flex items-center gap-3 text-xs text-zinc-500 dark:text-zinc-400 mb-3">
                      <span className="inline-flex items-center gap-1">
                        <Calendar className="w-3.5 h-3.5 text-zinc-400" />
                        {new Date(post.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                      </span>
                      {post.readingTime && (
                        <>
                          <span>•</span>
                          <span className="inline-flex items-center gap-1">
                            <Clock className="w-3.5 h-3.5 text-zinc-400" />
                            {post.readingTime}
                          </span>
                        </>
                      )}
                    </div>

                    {/* Tags */}
                    {post.tags && post.tags.length > 0 && (
                      <div className="flex flex-wrap gap-1.5 mb-3">
                        {post.tags.map((tag, idx) => (
                          <span
                            key={idx}
                            className="px-2 py-0.5 rounded text-[11px] font-medium bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-300"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}

                    {/* Title */}
                    <h2 className="text-lg font-bold text-zinc-900 dark:text-white group-hover:text-sky-500 dark:group-hover:text-sky-400 transition-colors mb-2.5 font-heading">
                      <Link to={`/blog/${post.slug}`}>
                        {post.title}
                      </Link>
                    </h2>

                    {/* Description */}
                    <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed line-clamp-3 mb-6">
                      {post.description}
                    </p>
                  </div>

                  {/* Read Article Link */}
                  <div className="pt-4 border-t border-zinc-100 dark:border-zinc-800/60 flex items-center justify-between">
                    <span className="text-xs text-zinc-400">By {post.author || 'Hayyan Mohamed'}</span>
                    <Link
                      to={`/blog/${post.slug}`}
                      className="inline-flex items-center gap-1.5 text-xs font-semibold text-zinc-800 dark:text-zinc-200 group-hover:text-sky-500 dark:group-hover:text-sky-400 transition-colors"
                    >
                      <span>Read</span>
                      <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          )}

        </div>
      </main>

      <Footer />
      <BackToTop />
      <FloatingWhatsApp />
    </div>
  );
};

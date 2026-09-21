import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, Calendar, Clock, User, Share2, Check, Tag, BookOpen, MapPin, Sparkles } from 'lucide-react';
import { Navbar } from '../components/layout/Navbar';
import { ScrollProgress } from '../components/layout/ScrollProgress';
import { Footer } from '../components/layout/Footer';
import { BackToTop } from '../components/layout/BackToTop';
import { FloatingWhatsApp } from '../components/layout/FloatingWhatsApp';
import { useData } from '../context/DataContext';
import { usePageSeo } from '../utils/seo';

export const BlogPostPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const { blog, profile } = useData();
  const [copied, setCopied] = useState(false);

  const post = blog.find(p => p.slug === slug);
  const otherPosts = blog.filter(p => p.published && p.slug !== slug).slice(0, 2);

  usePageSeo({
    title: post ? `${post.title} | Hayyan Mohamed` : "Article Not Found | Hayyan Mohamed",
    description: post ? post.description : "The requested article could not be found.",
    canonicalPath: post ? `/blog/${post.slug}` : "/blog",
    ogType: "article",
    schema: post ? {
      "@context": "https://schema.org",
      "@type": "Article",
      "headline": post.title,
      "description": post.description,
      "datePublished": post.date,
      "dateModified": post.date,
      "author": {
        "@type": "Person",
        "name": post.author || "Hayyan Mohamed",
        "url": "https://7yyanmo7.ai.studio/"
      },
      "publisher": {
        "@type": "Person",
        "name": "Hayyan Mohamed",
        "url": "https://7yyanmo7.ai.studio/"
      },
      "mainEntityOfPage": {
        "@type": "WebPage",
        "@id": `https://7yyanmo7.ai.studio/blog/${post.slug}`
      }
    } : undefined
  });

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 3000);
    }
  };

  if (!post) {
    return (
      <div className="min-h-screen bg-white dark:bg-[#0A0A0A] text-zinc-900 dark:text-white">
        <Navbar activeSection="blog" />
        <main className="pt-36 pb-24 max-w-2xl mx-auto px-4 text-center">
          <div className="w-16 h-16 rounded-2xl bg-zinc-100 dark:bg-zinc-900 flex items-center justify-center mx-auto mb-6">
            <BookOpen className="w-8 h-8 text-zinc-400" />
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold mb-3">Article Not Found</h1>
          <p className="text-zinc-500 dark:text-zinc-400 text-sm mb-8">
            The article you are looking for may have been moved, renamed, or unpublished.
          </p>
          <Link
            to="/blog"
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-sky-500 text-white font-semibold text-xs shadow-sm hover:bg-sky-600 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Return to All Articles</span>
          </Link>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white dark:bg-[#0A0A0A] text-zinc-900 dark:text-white selection:bg-sky-500 selection:text-white transition-colors">
      <ScrollProgress />
      <Navbar activeSection="blog" />

      <main className="pt-28 pb-20">
        <article className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-left">
          
          {/* Breadcrumbs & Back Link */}
          <div className="flex items-center justify-between gap-4 mb-8">
            <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs font-medium text-zinc-500 dark:text-zinc-400">
              <Link to="/" className="hover:text-sky-500 transition-colors">Home</Link>
              <span>/</span>
              <Link to="/blog" className="hover:text-sky-500 transition-colors">Blog</Link>
              <span>/</span>
              <span className="text-zinc-900 dark:text-white truncate max-w-[200px] sm:max-w-xs">{post.title}</span>
            </nav>

            <Link
              to="/blog"
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-zinc-600 dark:text-zinc-400 hover:text-sky-500 transition-colors shrink-0"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to Articles</span>
            </Link>
          </div>

          {/* Article Header */}
          <header className="mb-10 pb-8 border-b border-zinc-200/80 dark:border-zinc-800/80">
            {/* Tags */}
            {post.tags && post.tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-4">
                {post.tags.map((tag, idx) => (
                  <span
                    key={idx}
                    className="px-2.5 py-1 rounded-md text-xs font-semibold bg-sky-500/10 text-sky-600 dark:text-sky-400"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}

            {/* Title */}
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-zinc-900 dark:text-white tracking-tight leading-[1.2] mb-6 font-heading">
              {post.title}
            </h1>

            {/* Meta bar */}
            <div className="flex flex-wrap items-center justify-between gap-4 text-xs sm:text-sm text-zinc-500 dark:text-zinc-400">
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-full bg-sky-500/20 text-sky-600 dark:text-sky-400 flex items-center justify-center font-bold text-xs">
                    H
                  </div>
                  <span className="font-semibold text-zinc-800 dark:text-zinc-200">
                    {post.author || 'Hayyan Mohamed'}
                  </span>
                </div>

                <span>•</span>

                <div className="flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5" />
                  <time dateTime={post.date}>
                    {new Date(post.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                  </time>
                </div>

                {post.readingTime && (
                  <>
                    <span>•</span>
                    <div className="flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5" />
                      <span>{post.readingTime}</span>
                    </div>
                  </>
                )}
              </div>

              {/* Share Button */}
              <button
                onClick={handleShare}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 text-zinc-700 dark:text-zinc-300 text-xs font-semibold transition-colors"
                aria-label="Share article"
              >
                {copied ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-500" />
                    <span>Link Copied!</span>
                  </>
                ) : (
                  <>
                    <Share2 className="w-3.5 h-3.5" />
                    <span>Share</span>
                  </>
                )}
              </button>
            </div>
          </header>

          {/* Article Body Content */}
          <div className="prose dark:prose-invert prose-zinc max-w-none text-base sm:text-lg leading-relaxed text-zinc-700 dark:text-zinc-300 space-y-6">
            {post.content.split('\n\n').map((paragraph, index) => {
              if (paragraph.startsWith('### ')) {
                return (
                  <h3 key={index} className="text-xl sm:text-2xl font-bold text-zinc-900 dark:text-white pt-4 pb-1">
                    {paragraph.replace('### ', '')}
                  </h3>
                );
              }
              if (paragraph.startsWith('1. ') || paragraph.startsWith('- ')) {
                const lines = paragraph.split('\n');
                return (
                  <ul key={index} className="list-disc list-inside space-y-2 pl-2">
                    {lines.map((line, liIdx) => (
                      <li key={liIdx} className="text-zinc-700 dark:text-zinc-300">
                        {line.replace(/^[0-9]+\.\s+/, '').replace(/^-\s+/, '')}
                      </li>
                    ))}
                  </ul>
                );
              }
              return (
                <p key={index} className="text-zinc-700 dark:text-zinc-300 leading-relaxed">
                  {paragraph}
                </p>
              );
            })}
          </div>

          {/* Author Card Footer */}
          <div className="mt-16 pt-8 border-t border-zinc-200/80 dark:border-zinc-800/80">
            <div className="p-6 rounded-2xl bg-zinc-50 dark:bg-[#111111] border border-zinc-200/80 dark:border-zinc-800/80 flex flex-col sm:flex-row items-start sm:items-center gap-5">
              <div className="w-16 h-16 rounded-2xl bg-sky-500/20 text-sky-600 dark:text-sky-400 flex items-center justify-center font-heading font-black text-xl shrink-0">
                H
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="font-bold text-base text-zinc-900 dark:text-white">
                    {post.author || 'Hayyan Mohamed'}
                  </h3>
                  <span className="text-xs text-sky-500 font-medium" dir="rtl">(حيان محمد)</span>
                </div>
                <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed mb-3">
                  Sudanese Developer, Medical Student & Photographer based in Kassala, Sudan. Documenting technology, healthcare systems, and visual stories.
                </p>
                <div className="flex items-center gap-4 text-xs font-semibold text-sky-600 dark:text-sky-400">
                  <Link to="/about" className="hover:underline">About Hayyan</Link>
                  <span>•</span>
                  <Link to="/contact" className="hover:underline">Get in Touch</Link>
                </div>
              </div>
            </div>
          </div>

          {/* Related Articles */}
          {otherPosts.length > 0 && (
            <div className="mt-16 pt-8 border-t border-zinc-200/80 dark:border-zinc-800/80">
              <h2 className="text-lg font-bold text-zinc-900 dark:text-white mb-6 font-heading">
                More Articles & Notes
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {otherPosts.map((op) => (
                  <Link
                    key={op.id}
                    to={`/blog/${op.slug}`}
                    className="p-5 rounded-2xl bg-zinc-50 dark:bg-[#111111] border border-zinc-200/80 dark:border-zinc-800/80 hover:border-sky-500/50 transition-all block group"
                  >
                    <span className="text-[11px] text-zinc-400 block mb-1">
                      {new Date(op.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                    </span>
                    <h3 className="text-sm font-bold text-zinc-900 dark:text-white group-hover:text-sky-500 transition-colors line-clamp-2">
                      {op.title}
                    </h3>
                  </Link>
                ))}
              </div>
            </div>
          )}

        </article>
      </main>

      <Footer />
      <BackToTop />
      <FloatingWhatsApp />
    </div>
  );
};

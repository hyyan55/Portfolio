import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Mail, MapPin, Send, MessageCircle, Instagram, Github, CheckCircle2, ArrowUpRight } from 'lucide-react';
import { Navbar } from '../components/layout/Navbar';
import { ScrollProgress } from '../components/layout/ScrollProgress';
import { Footer } from '../components/layout/Footer';
import { BackToTop } from '../components/layout/BackToTop';
import { FloatingWhatsApp } from '../components/layout/FloatingWhatsApp';
import { useData } from '../context/DataContext';
import { usePageSeo } from '../utils/seo';

export const ContactPage: React.FC = () => {
  const { socials, sendMessage } = useData();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [submitting, setSubmitting] = useState(false);
  const [sent, setSent] = useState(false);

  usePageSeo({
    title: "Contact | Hayyan Mohamed (حيان محمد) - Kassala, Sudan",
    description: "Get in touch with Hayyan Mohamed. Email: hyyanmohamed55@gmail.com. Location: Kassala, Sudan. Connect regarding web projects, development, or creative collaborations.",
    canonicalPath: "/contact",
    schema: {
      "@context": "https://schema.org",
      "@type": "ContactPage",
      "name": "Contact Hayyan Mohamed",
      "description": "Contact channels and communication form for Hayyan Mohamed.",
      "url": "https://hayyanmohamed.com/contact",
      "mainEntity": {
        "@type": "Person",
        "name": "Hayyan Mohamed",
        "email": "hyyanmohamed55@gmail.com",
        "address": {
          "@type": "PostalAddress",
          "addressLocality": "Kassala",
          "addressCountry": "Sudan"
        }
      }
    }
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;

    setSubmitting(true);
    const res = await sendMessage(formData);
    setSubmitting(false);

    if (res.success) {
      setSent(true);
      setFormData({ name: '', email: '', subject: '', message: '' });
      setTimeout(() => setSent(false), 5000);
    }
  };

  return (
    <div className="min-h-screen bg-white dark:bg-[#0A0A0A] text-zinc-900 dark:text-white selection:bg-sky-500 selection:text-white transition-colors">
      <ScrollProgress />
      <Navbar activeSection="contact" />

      <main className="pt-28 pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Breadcrumbs */}
          <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs font-medium text-zinc-500 dark:text-zinc-400 mb-8">
            <Link to="/" className="hover:text-sky-500 transition-colors">Home</Link>
            <span>/</span>
            <span className="text-zinc-900 dark:text-white">Contact</span>
          </nav>

          {/* Header */}
          <div className="max-w-3xl mb-12 text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-500/10 text-sky-600 dark:text-sky-400 text-xs font-bold mb-3 uppercase tracking-wider">
              <Mail className="w-3.5 h-3.5" />
              <span>Communication</span>
            </div>
            <h1 className="text-3xl sm:text-5xl font-extrabold text-zinc-900 dark:text-white tracking-tight mb-4 font-heading">
              Contact Hayyan Mohamed
            </h1>
            <p className="text-base sm:text-lg text-zinc-600 dark:text-zinc-400 leading-relaxed">
              Reach out directly for technical questions, development inquiries, creative photography projects, or general correspondence.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 text-left">
            
            {/* Left Column: Direct Contact Info */}
            <div className="lg:col-span-5 space-y-6">
              
              {/* Primary Email Card */}
              <div className="p-6 rounded-2xl bg-zinc-50 dark:bg-[#111111] border border-zinc-200/80 dark:border-zinc-800/80">
                <div className="w-10 h-10 rounded-xl bg-sky-500/10 text-sky-500 flex items-center justify-center mb-4">
                  <Mail className="w-5 h-5" />
                </div>
                <div className="text-xs font-bold text-zinc-400 uppercase tracking-wider mb-1">
                  Primary Email
                </div>
                <a
                  href="mailto:hyyanmohamed55@gmail.com"
                  className="text-base sm:text-lg font-bold text-zinc-900 dark:text-white hover:text-sky-500 transition-colors block break-all"
                >
                  hyyanmohamed55@gmail.com
                </a>
                <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1">
                  Responds to technical, professional, and academic inquiries.
                </p>
              </div>

              {/* Location Card */}
              <div className="p-6 rounded-2xl bg-zinc-50 dark:bg-[#111111] border border-zinc-200/80 dark:border-zinc-800/80">
                <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-500 flex items-center justify-center mb-4">
                  <MapPin className="w-5 h-5" />
                </div>
                <div className="text-xs font-bold text-zinc-400 uppercase tracking-wider mb-1">
                  Location
                </div>
                <p className="text-base font-bold text-zinc-900 dark:text-white">
                  Kassala, Sudan
                </p>
                <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1">
                  Timezone: Central Africa Time (CAT / UTC+2)
                </p>
              </div>

              {/* Social Channels List */}
              <div className="p-6 rounded-2xl bg-zinc-50 dark:bg-[#111111] border border-zinc-200/80 dark:border-zinc-800/80 space-y-3">
                <div className="text-xs font-bold text-zinc-400 uppercase tracking-wider mb-2">
                  Online Profiles & Channels
                </div>
                {socials.filter(s => s.active).map((social) => (
                  <a
                    key={social.id}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between p-3 rounded-xl bg-white dark:bg-zinc-900 border border-zinc-200/60 dark:border-zinc-800/80 hover:border-sky-500/50 hover:bg-zinc-50 dark:hover:bg-zinc-800/60 transition-all text-xs font-semibold"
                  >
                    <span className="text-zinc-800 dark:text-zinc-200">{social.label}</span>
                    <ArrowUpRight className="w-3.5 h-3.5 text-zinc-400" />
                  </a>
                ))}
              </div>

            </div>

            {/* Right Column: Message Form */}
            <div className="lg:col-span-7">
              <div className="p-8 rounded-3xl bg-zinc-50 dark:bg-[#111111] border border-zinc-200/80 dark:border-zinc-800/80">
                <h2 className="text-xl font-bold text-zinc-900 dark:text-white mb-2 font-heading">
                  Send a Direct Message
                </h2>
                <p className="text-xs sm:text-sm text-zinc-500 dark:text-zinc-400 mb-6">
                  Fill out the form below to deliver a message straight to Hayyan Mohamed's inbox.
                </p>

                {sent ? (
                  <div className="p-8 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400 flex flex-col items-center text-center">
                    <CheckCircle2 className="w-12 h-12 mb-3" />
                    <h3 className="text-lg font-bold mb-1">Message Delivered</h3>
                    <p className="text-xs text-emerald-600/80 dark:text-emerald-400/80 max-w-sm">
                      Thank you for getting in touch. Your message has been sent successfully.
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-semibold text-zinc-700 dark:text-zinc-300 mb-1.5">
                          Your Name *
                        </label>
                        <input
                          type="text"
                          required
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          placeholder="Full Name"
                          className="w-full px-4 py-2.5 rounded-xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-sm text-zinc-900 dark:text-white placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-sky-500"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-zinc-700 dark:text-zinc-300 mb-1.5">
                          Email Address *
                        </label>
                        <input
                          type="email"
                          required
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          placeholder="name@example.com"
                          className="w-full px-4 py-2.5 rounded-xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-sm text-zinc-900 dark:text-white placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-sky-500"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-zinc-700 dark:text-zinc-300 mb-1.5">
                        Subject
                      </label>
                      <input
                        type="text"
                        value={formData.subject}
                        onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                        placeholder="What is your message regarding?"
                        className="w-full px-4 py-2.5 rounded-xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-sm text-zinc-900 dark:text-white placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-sky-500"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-zinc-700 dark:text-zinc-300 mb-1.5">
                        Message *
                      </label>
                      <textarea
                        required
                        rows={5}
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        placeholder="Write your message here..."
                        className="w-full px-4 py-2.5 rounded-xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-sm text-zinc-900 dark:text-white placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-sky-500 resize-none"
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={submitting}
                      className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3 rounded-xl bg-zinc-900 hover:bg-zinc-800 dark:bg-white dark:hover:bg-zinc-100 text-white dark:text-zinc-900 font-semibold text-sm shadow-md transition-all disabled:opacity-50"
                    >
                      {submitting ? (
                        <span>Sending...</span>
                      ) : (
                        <>
                          <span>Send Message</span>
                          <Send className="w-4 h-4" />
                        </>
                      )}
                    </button>
                  </form>
                )}
              </div>
            </div>

          </div>

        </div>
      </main>

      <Footer />
      <BackToTop />
      <FloatingWhatsApp />
    </div>
  );
};

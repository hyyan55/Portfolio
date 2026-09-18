import React, { useState } from 'react';
import { Send, MessageCircle, Instagram, Github, Mail, Globe, CheckCircle2, ArrowUpRight } from 'lucide-react';
import { useData } from '../../context/DataContext';

export const Contact: React.FC = () => {
  const { socials, sendMessage, settings } = useData();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [submitting, setSubmitting] = useState(false);
  const [sent, setSent] = useState(false);

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

  const getSocialIcon = (platform: string) => {
    switch (platform.toLowerCase()) {
      case 'whatsapp':
        return <MessageCircle className="w-4 h-4 text-[#25D366]" />;
      case 'instagram':
        return <Instagram className="w-4 h-4 text-pink-500" />;
      case 'github':
        return <Github className="w-4 h-4 text-zinc-400" />;
      case 'email':
        return <Mail className="w-4 h-4 text-sky-400" />;
      default:
        return <Globe className="w-4 h-4 text-zinc-400" />;
    }
  };

  return (
    <section id="contact" className="py-24 relative border-t border-zinc-200/60 dark:border-zinc-800/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 text-left">
          
          {/* Left Column: Context & Social Links */}
          <div className="lg:col-span-5 flex flex-col justify-between">
            <div>
              <h2 className="text-xs font-bold tracking-widest text-sky-500 uppercase mb-2 font-heading">
                Get in Touch
              </h2>
              <h3 className="text-3xl sm:text-4xl font-extrabold text-zinc-900 dark:text-white tracking-tight mb-4">
                Let's Connect
              </h3>
              <p className="text-base text-zinc-600 dark:text-zinc-400 leading-relaxed mb-8">
                Have an idea, project, or just want to say hello? Feel free to reach out. I'm always open to discussing technology, medical innovations, creative visual projects, or collaboration.
              </p>

              {/* Direct Social Channels */}
              <div className="space-y-3 mb-8">
                <p className="text-xs font-bold text-zinc-400 uppercase tracking-wider mb-2">
                  Direct Channels
                </p>
                {socials.filter(s => s.active).map((social) => (
                  <a
                    key={social.id}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between p-3.5 rounded-xl bg-white dark:bg-[#111111] border border-zinc-200/80 dark:border-zinc-800/80 hover:border-sky-500/50 hover:bg-zinc-50 dark:hover:bg-zinc-800/60 transition-all duration-200 group"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-zinc-100 dark:bg-zinc-900 flex items-center justify-center">
                        {getSocialIcon(social.platform)}
                      </div>
                      <span className="text-sm font-semibold text-zinc-800 dark:text-zinc-200">
                        {social.label}
                      </span>
                    </div>
                    <ArrowUpRight className="w-4 h-4 text-zinc-400 group-hover:text-sky-500 transition-colors" />
                  </a>
                ))}
              </div>
            </div>

            <div className="p-4 rounded-xl bg-sky-500/10 border border-sky-500/20 text-xs text-sky-700 dark:text-sky-300">
              <span className="font-bold">{settings.contactLocationText || 'Kassala & Sudan'}:</span> Active across medical studies, frontend web projects, and local photography documentation.
            </div>
          </div>

          {/* Right Column: Direct Message Form */}
          <div className="lg:col-span-7">
            <div className="p-8 sm:p-10 rounded-2xl bg-white dark:bg-[#111111] border border-zinc-200/80 dark:border-zinc-800/80 shadow-md">
              <h4 className="text-xl font-bold text-zinc-900 dark:text-white mb-2 font-heading">
                Send a Message
              </h4>
              <p className="text-xs sm:text-sm text-zinc-500 dark:text-zinc-400 mb-6">
                Your note will be received directly in my inbox and private message hub.
              </p>

              {sent && (
                <div className="mb-6 p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400 text-sm flex items-center gap-2.5">
                  <CheckCircle2 className="w-4 h-4 shrink-0" />
                  <span>Your message has been sent successfully. Thank you!</span>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-zinc-700 dark:text-zinc-300 mb-1.5">
                      Your Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Sarah"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-zinc-900 dark:text-white placeholder-zinc-400 text-sm focus:outline-none focus:border-sky-500 transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-zinc-700 dark:text-zinc-300 mb-1.5">
                      Your Email *
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="sarah@example.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-zinc-900 dark:text-white placeholder-zinc-400 text-sm focus:outline-none focus:border-sky-500 transition-colors"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-zinc-700 dark:text-zinc-300 mb-1.5">
                    Subject (Optional)
                  </label>
                  <input
                    type="text"
                    placeholder="Project Inquiry / Photography / Hello"
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-zinc-900 dark:text-white placeholder-zinc-400 text-sm focus:outline-none focus:border-sky-500 transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-zinc-700 dark:text-zinc-300 mb-1.5">
                    Message *
                  </label>
                  <textarea
                    required
                    rows={4}
                    placeholder="Write your note here..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-zinc-900 dark:text-white placeholder-zinc-400 text-sm focus:outline-none focus:border-sky-500 transition-colors resize-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3 rounded-xl bg-zinc-900 hover:bg-zinc-800 dark:bg-white dark:hover:bg-zinc-100 text-white dark:text-zinc-900 font-bold text-sm shadow-md hover:shadow-lg transition-all duration-200 disabled:opacity-60"
                >
                  <Send className="w-4 h-4" />
                  <span>{submitting ? 'Sending...' : 'Send Message'}</span>
                </button>
              </form>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};

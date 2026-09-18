import React, { useState } from 'react';
import { Mail, MailOpen, Trash2, Calendar, CheckCircle2, User, Inbox } from 'lucide-react';
import { useData } from '../../../context/DataContext';
import { ContactMessage } from '../../../types';
import { ConfirmModal } from '../../../components/common/ConfirmModal';

export const MessagesTab: React.FC = () => {
  const { messages, markMessageRead, deleteMessage } = useData();
  const [deleteTarget, setDeleteTarget] = useState<ContactMessage | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const unreadCount = messages.filter((m) => !m.read).length;

  const handleConfirmDelete = async () => {
    if (!deleteTarget) return;
    setIsDeleting(true);
    try {
      await deleteMessage(deleteTarget.id);
      setDeleteTarget(null);
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div className="space-y-6 text-left max-w-4xl">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-white font-heading">
            Inbox & Messages
          </h2>
          <p className="text-xs sm:text-sm text-zinc-400 mt-1">
            Incoming inquiries submitted through your portfolio contact form.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="px-3 py-1 rounded-full text-xs font-bold bg-sky-500/10 text-sky-400 border border-sky-500/20">
            {unreadCount} Unread
          </span>
        </div>
      </div>

      {messages.length === 0 ? (
        <div className="p-12 rounded-2xl bg-zinc-900/50 border border-zinc-800 text-center">
          <Inbox className="w-12 h-12 text-zinc-600 mx-auto mb-3" />
          <h3 className="text-base font-bold text-white font-heading">No messages yet</h3>
          <p className="text-xs text-zinc-400 mt-1 max-w-sm mx-auto">
            When recruiters, collaborators, or photography clients reach out via the contact form, their messages will appear here.
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`p-5 rounded-2xl border transition-all ${
                msg.read
                  ? 'bg-zinc-900/40 border-zinc-800/80 text-zinc-400'
                  : 'bg-zinc-900 border-sky-500/30 shadow-lg text-zinc-200'
              }`}
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3 pb-3 border-b border-zinc-800/60">
                <div className="flex items-center gap-2">
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs ${
                      msg.read
                        ? 'bg-zinc-800 text-zinc-400'
                        : 'bg-sky-500 text-black shadow-md shadow-sky-500/20'
                    }`}
                  >
                    {msg.name.charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-white font-heading leading-tight">
                      {msg.name}
                    </h4>
                    <a
                      href={`mailto:${msg.email}`}
                      className="text-xs text-sky-400 hover:underline"
                    >
                      {msg.email}
                    </a>
                  </div>
                </div>

                <div className="flex items-center gap-3 text-[11px] text-zinc-500">
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3 h-3" />
                    <span>{new Date(msg.createdAt).toLocaleDateString()}</span>
                  </span>
                  {!msg.read && (
                    <span className="w-2 h-2 rounded-full bg-sky-400 animate-pulse" />
                  )}
                </div>
              </div>

              {msg.subject && (
                <p className="text-xs font-semibold text-white mb-2">
                  Subject: {msg.subject}
                </p>
              )}

              <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed whitespace-pre-wrap bg-zinc-950/50 p-3.5 rounded-xl border border-zinc-800/60">
                {msg.message}
              </p>

              <div className="flex items-center justify-between pt-3 mt-3">
                <div>
                  {!msg.read && (
                    <button
                      type="button"
                      onClick={() => markMessageRead(msg.id)}
                      className="inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-300 hover:text-white transition-colors cursor-pointer"
                    >
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                      <span>Mark as Read</span>
                    </button>
                  )}
                </div>

                <button
                  type="button"
                  onClick={() => setDeleteTarget(msg)}
                  className="p-1.5 rounded-lg hover:bg-rose-950/40 text-zinc-500 hover:text-rose-400 transition-colors cursor-pointer"
                  title="Delete message"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Confirm Delete Modal */}
      <ConfirmModal
        isOpen={Boolean(deleteTarget)}
        title="Delete Message"
        message={`Are you sure you want to delete the message from "${deleteTarget?.name}"?`}
        confirmLabel="Delete Message"
        cancelLabel="Cancel"
        isDestructive={true}
        isLoading={isDeleting}
        onConfirm={handleConfirmDelete}
        onCancel={() => setDeleteTarget(null)}
      />
    </div>
  );
};

import { motion } from 'motion/react';
import { MessageSquare, ThumbsUp, Share2, Plus, Hash, BadgeCheck, Send } from 'lucide-react';
import { MOCK_FORUM_POSTS, FORUM_TOPICS } from '../constants';
import { ForumPost } from '../types';
import { useState, useEffect, type FormEvent } from 'react';
import Modal from './Modal';
import { useToast } from '../App';

export default function Forum() {
  const { addToast } = useToast();
  const [modalOpen, setModalOpen] = useState(false);
  const [activeTopic, setActiveTopic] = useState<string | null>(null);
  const [posts, setPosts] = useState<ForumPost[]>(() => {
    try {
      const saved = localStorage.getItem('wigglywoosh-forum-posts');
      return saved ? JSON.parse(saved) : MOCK_FORUM_POSTS;
    } catch {
      return MOCK_FORUM_POSTS;
    }
  });

  useEffect(() => {
    localStorage.setItem('wigglywoosh-forum-posts', JSON.stringify(posts));
  }, [posts]);

  const [form, setForm] = useState({ title: '', content: '', tags: [] as string[] });

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!form.title || !form.content) return;

    const newPost: ForumPost = {
      id: Date.now().toString(),
      author: 'You',
      avatar: '/images/avatar-1.png',
      title: form.title,
      content: form.content,
      likes: 0,
      comments: 0,
      tags: form.tags,
      date: 'Just now',
    };
    setPosts(prev => [newPost, ...prev]);
    setForm({ title: '', content: '', tags: [] });
    setModalOpen(false);
    addToast('success', 'Post Published!', 'Your discussion is now live in the community.');
  };

  const toggleLike = (postId: string) => {
    setPosts(prev => prev.map(post =>
      post.id === postId
        ? { ...post, likes: post.isLiked ? post.likes - 1 : post.likes + 1, isLiked: !post.isLiked }
        : post
    ));
  };

  const toggleTag = (tag: string) => {
    setForm(f => ({
      ...f,
      tags: f.tags.includes(tag) ? f.tags.filter(t => t !== tag) : [...f.tags, tag],
    }));
  };

  const filteredPosts = activeTopic
    ? posts.filter(p => p.tags.some(t => t.toLowerCase() === activeTopic.toLowerCase()))
    : posts;

  const handleShare = (title: string) => {
    if (navigator.share) {
      navigator.share({ title, url: window.location.href });
    } else {
      navigator.clipboard.writeText(window.location.href);
      addToast('info', 'Link Copied', 'Post link has been copied to your clipboard.');
    }
  };

  return (
    <section className="py-16 sm:py-24 bg-brand-surface/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-6 mb-10">
          <div className="max-w-2xl">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold mb-4">Community</h2>
            <p className="text-base sm:text-lg text-white/50">
              Connect with pet owners, share advice, and get support from verified experts.
            </p>
          </div>
          <button
            onClick={() => setModalOpen(true)}
            className="w-full sm:w-auto bg-brand-teal text-brand-dark px-5 py-3 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-brand-teal-dark transition-colors active:scale-[0.98]"
          >
            <Plus size={18} />
            Start Discussion
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:block space-y-6 order-2 lg:order-1">
            {/* Topics — horizontal scroll on mobile, vertical on desktop */}
            <div className="glass p-4 sm:p-5 rounded-2xl">
              <h3 className="text-xs font-bold text-white/30 uppercase tracking-widest mb-3">Topics</h3>
              <div className="flex lg:flex-col gap-2 overflow-x-auto lg:overflow-x-visible pb-2 lg:pb-0 -mx-1 px-1">
                <button
                  onClick={() => setActiveTopic(null)}
                  className={`flex items-center gap-2 px-3 py-2 rounded-xl text-sm whitespace-nowrap transition-all ${
                    !activeTopic ? 'bg-brand-teal/10 text-brand-teal font-bold' : 'text-white/50 hover:bg-white/5'
                  }`}
                >
                  All Posts
                </button>
                {FORUM_TOPICS.map((tag) => (
                  <button
                    key={tag}
                    onClick={() => setActiveTopic(activeTopic === tag ? null : tag)}
                    className={`flex items-center gap-2 px-3 py-2 rounded-xl text-sm whitespace-nowrap transition-all ${
                      activeTopic === tag ? 'bg-brand-teal/10 text-brand-teal font-bold' : 'text-white/50 hover:bg-white/5'
                    }`}
                  >
                    <Hash size={14} />
                    {tag}
                  </button>
                ))}
              </div>
            </div>

            {/* Experts Card */}
            <div className="glass p-5 rounded-2xl bg-brand-teal/5 border-brand-teal/10 hidden lg:block">
              <div className="flex items-center gap-2 mb-2">
                <BadgeCheck size={16} className="text-brand-teal" />
                <h3 className="font-bold text-sm">Verified Experts</h3>
              </div>
              <p className="text-xs text-white/40 mb-4 leading-relaxed">Look for the badge to find advice from certified vets and trainers.</p>
              <div className="flex -space-x-2">
                <img src="/images/avatar-1.png" className="w-8 h-8 rounded-full border-2 border-brand-dark object-cover" alt="Expert" />
                <img src="/images/avatar-2.png" className="w-8 h-8 rounded-full border-2 border-brand-dark object-cover" alt="Expert" />
                <div className="w-8 h-8 rounded-full bg-brand-teal text-brand-dark text-[10px] font-bold flex items-center justify-center border-2 border-brand-dark">
                  +12
                </div>
              </div>
            </div>
          </div>

          {/* Feed */}
          <div className="lg:col-span-3 space-y-5 order-1 lg:order-2">
            {filteredPosts.length === 0 ? (
              <div className="glass rounded-2xl p-12 text-center">
                <MessageSquare size={48} className="text-white/10 mx-auto mb-4" />
                <p className="text-white/40 font-medium">No posts in this topic yet</p>
                <p className="text-white/20 text-sm mt-1">Be the first to start a discussion!</p>
              </div>
            ) : (
              filteredPosts.map((post, index) => (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-30px' }}
                  transition={{ delay: Math.min(index * 0.05, 0.2) }}
                  key={post.id}
                  className="glass p-5 sm:p-7 rounded-2xl border border-white/5 hover:border-white/10 transition-all"
                >
                  {/* Author */}
                  <div className="flex items-center gap-3 mb-4">
                    <img
                      src={post.avatar}
                      className="w-10 h-10 rounded-full object-cover"
                      alt={post.author}
                    />
                    <div>
                      <div className="flex items-center gap-1.5">
                        <h4 className="font-bold text-sm">{post.author}</h4>
                        {post.author.startsWith('Dr.') && (
                          <BadgeCheck size={14} className="text-brand-teal" />
                        )}
                      </div>
                      <p className="text-xs text-white/30">{post.date}</p>
                    </div>
                  </div>

                  {/* Content */}
                  <h3 className="text-lg sm:text-xl font-display font-bold mb-3">{post.title}</h3>
                  <p className="text-white/50 text-sm sm:text-base mb-5 leading-relaxed">{post.content}</p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 mb-5">
                    {post.tags.map((tag) => (
                      <button
                        key={tag}
                        onClick={() => setActiveTopic(tag)}
                        className="px-3 py-1 rounded-full bg-white/5 border border-white/5 text-xs font-medium text-white/40 hover:bg-white/10 hover:text-white/60 transition-all"
                      >
                        #{tag}
                      </button>
                    ))}
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-5 pt-4 border-t border-white/5">
                    <button
                      onClick={() => toggleLike(post.id)}
                      className={`flex items-center gap-2 transition-colors ${
                        post.isLiked ? 'text-brand-teal' : 'text-white/40 hover:text-brand-teal'
                      }`}
                    >
                      <ThumbsUp size={16} className={post.isLiked ? 'fill-brand-teal' : ''} />
                      <span className="text-sm font-bold">{post.likes}</span>
                    </button>
                    <button className="flex items-center gap-2 text-white/40 hover:text-white/60 transition-colors">
                      <MessageSquare size={16} />
                      <span className="text-sm font-bold">{post.comments}</span>
                    </button>
                    <button
                      onClick={() => handleShare(post.title)}
                      className="flex items-center gap-2 text-white/40 hover:text-white/60 transition-colors ml-auto"
                    >
                      <Share2 size={16} />
                    </button>
                  </div>
                </motion.div>
              ))
            )}
          </div>
        </div>
      </div>

      {/* New Post Modal */}
      <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)} title="Start a Discussion" size="lg">
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-white/50 mb-1.5">Title *</label>
            <input
              type="text"
              required
              value={form.title}
              onChange={(e) => setForm(f => ({ ...f, title: e.target.value }))}
              placeholder="What's on your mind?"
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-brand-teal transition-colors"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-white/50 mb-1.5">Description *</label>
            <textarea
              required
              value={form.content}
              onChange={(e) => setForm(f => ({ ...f, content: e.target.value }))}
              placeholder="Share your thoughts, ask a question, or seek advice..."
              rows={5}
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-brand-teal transition-colors resize-none"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-white/50 mb-2">Tags (select up to 3)</label>
            <div className="flex flex-wrap gap-2">
              {FORUM_TOPICS.map((tag) => (
                <button
                  key={tag}
                  type="button"
                  onClick={() => toggleTag(tag)}
                  disabled={form.tags.length >= 3 && !form.tags.includes(tag)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-medium transition-all ${
                    form.tags.includes(tag)
                      ? 'bg-brand-teal text-brand-dark'
                      : 'bg-white/5 text-white/40 hover:bg-white/10 disabled:opacity-30 disabled:cursor-not-allowed'
                  }`}
                >
                  #{tag}
                </button>
              ))}
            </div>
          </div>
          <div className="flex gap-3 pt-2">
            <button type="button" onClick={() => setModalOpen(false)} className="flex-1 py-3 rounded-xl border border-white/10 font-bold hover:bg-white/5 transition-colors">
              Cancel
            </button>
            <button type="submit" className="flex-1 py-3 rounded-xl bg-brand-teal text-brand-dark font-bold hover:bg-brand-teal-dark transition-colors flex items-center justify-center gap-2">
              <Send size={16} />
              Post Discussion
            </button>
          </div>
        </form>
      </Modal>
    </section>
  );
}

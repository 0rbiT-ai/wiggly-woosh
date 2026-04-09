import { motion } from 'motion/react';
import { MessageSquare, ThumbsUp, Share2, Plus, Hash } from 'lucide-react';
import { MOCK_FORUM_POSTS } from '../constants';

export default function Forum() {
  return (
    <section className="py-24 bg-brand-gray/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-end gap-8 mb-16">
          <div className="max-w-2xl">
            <h2 className="text-4xl md:text-5xl font-display font-bold mb-6">Community Forum</h2>
            <p className="text-lg text-white/60">
              Connect with fellow pet owners, share advice, and get support from our verified community members.
            </p>
          </div>
          <button className="bg-brand-teal text-brand-dark px-6 py-3 rounded-xl font-bold flex items-center gap-2 hover:scale-105 transition-transform">
            <Plus size={20} />
            Start Discussion
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar / Categories */}
          <div className="hidden lg:block space-y-6">
            <div className="glass p-6 rounded-2xl">
              <h3 className="text-sm font-bold text-white/40 uppercase tracking-widest mb-4">Popular Topics</h3>
              <div className="space-y-2">
                {['Nutrition', 'Training', 'Health', 'Puppies', 'Behavior', 'Grooming'].map((tag) => (
                  <button key={tag} className="flex items-center gap-2 w-full px-3 py-2 rounded-lg hover:bg-white/5 text-white/70 hover:text-brand-teal transition-all">
                    <Hash size={16} />
                    <span>{tag}</span>
                  </button>
                ))}
              </div>
            </div>
            
            <div className="glass p-6 rounded-2xl bg-brand-teal/5 border-brand-teal/20">
              <h3 className="font-bold mb-2">Verified Experts</h3>
              <p className="text-xs text-white/50 mb-4">Look for the teal badge to find advice from certified vets and trainers.</p>
              <div className="flex -space-x-2">
                {[1, 2, 3, 4].map((i) => (
                  <img
                    key={i}
                    src={`https://picsum.photos/seed/user${i}/100/100`}
                    className="w-8 h-8 rounded-full border-2 border-brand-dark"
                    alt="User"
                    referrerPolicy="no-referrer"
                  />
                ))}
                <div className="w-8 h-8 rounded-full bg-brand-teal text-brand-dark text-[10px] font-bold flex items-center justify-center border-2 border-brand-dark">
                  +12
                </div>
              </div>
            </div>
          </div>

          {/* Feed */}
          <div className="lg:col-span-3 space-y-6">
            {MOCK_FORUM_POSTS.map((post, index) => (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                key={post.id}
                className="glass p-8 rounded-3xl border border-white/5 hover:border-white/10 transition-all"
              >
                <div className="flex items-center gap-4 mb-6">
                  <img
                    src={`https://picsum.photos/seed/${post.author}/100/100`}
                    className="w-12 h-12 rounded-full"
                    alt={post.author}
                    referrerPolicy="no-referrer"
                  />
                  <div>
                    <h4 className="font-bold">{post.author}</h4>
                    <p className="text-xs text-white/40">{post.date}</p>
                  </div>
                </div>
                <h3 className="text-2xl font-display font-bold mb-4">{post.title}</h3>
                <p className="text-white/70 mb-6 leading-relaxed">{post.content}</p>
                <div className="flex flex-wrap gap-2 mb-8">
                  {post.tags.map((tag) => (
                    <span key={tag} className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-medium text-white/50">
                      #{tag}
                    </span>
                  ))}
                </div>
                <div className="flex items-center gap-6 pt-6 border-t border-white/5">
                  <button className="flex items-center gap-2 text-white/50 hover:text-brand-teal transition-colors">
                    <ThumbsUp size={18} />
                    <span className="text-sm font-bold">{post.likes}</span>
                  </button>
                  <button className="flex items-center gap-2 text-white/50 hover:text-brand-teal transition-colors">
                    <MessageSquare size={18} />
                    <span className="text-sm font-bold">{post.comments}</span>
                  </button>
                  <button className="flex items-center gap-2 text-white/50 hover:text-brand-teal transition-colors ml-auto">
                    <Share2 size={18} />
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

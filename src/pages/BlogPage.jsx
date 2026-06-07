import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import rehypeRaw from 'rehype-raw'
import { useReveal } from '../hooks/useReveal.js'
import { BLOG_POSTS } from '../blog/posts'

export default function BlogPage({ selectedBlogId, setSelectedBlogId }) {
  useReveal()

  const selectedPost = selectedBlogId != null ? BLOG_POSTS.find((post) => post.id === selectedBlogId) : null

  const handleBack = () => {
    setSelectedBlogId(null)
    window.scrollTo(0, 0)
  }

  if (selectedPost) {
    return <BlogPost key={`post-${selectedPost.id}`} post={selectedPost} onBack={handleBack} />
  }

  return (
    <div key="blog-list" className="smv-section">
      <div className="section-tag">words & thoughts</div>
      <h2 className="section-title reveal">The <span>Blog</span></h2>
      <p className="reveal" style={{ fontSize: '1rem', color: 'var(--brown-mid)', marginBottom: '0.5rem' }}>
        tech rants, book reviews, and whatever else spills out of my brain ✦
      </p>
      <div className="blog-grid">
        {BLOG_POSTS.map((post) => (
          <button
            key={post.id}
            type="button"
            className="blog-card reveal"
            onClick={() => {
              setSelectedBlogId(post.id)
              window.scrollTo(0, 0)
            }}
          >
            <div className="blog-cat">{post.cat}</div>
            <div className="blog-title">{post.title}</div>
            <div className="blog-excerpt">{post.excerpt}</div>
            <div className="blog-meta">
              <span>{post.date}</span>
              <span>{post.read}</span>
            </div>
            <div className="blog-more">Read Full Post</div>
          </button>
        ))}
        <div className="blog-card reveal" style={{ borderStyle: 'dashed', cursor: 'default', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', minHeight: '200px' }}>
          <div style={{ fontSize: '2.5rem', opacity: 0.3, marginBottom: '0.8rem' }}>✍</div>
          <div className="blog-title" style={{ fontSize: '1rem' }}>Add More Posts</div>
          <p style={{ fontSize: '0.85rem', color: 'var(--brown-mid)', marginTop: '0.4rem' }}>
            copy the blog-card block above ♡
          </p>
        </div>
      </div>
    </div>
  )
}

function BlogPost({ post, onBack }) {
  useReveal()

  return (
    <div className="smv-section">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '1rem', flexWrap: 'wrap' }}>
        <div>
          <div className="section-tag">blog post</div>
          <h2 className="section-title reveal">{post.title}</h2>
          <div className="blog-meta" style={{ marginTop: '0.8rem', gap: '1rem' }}>
            <span>{post.cat}</span>
            <span>{post.date}</span>
            <span>{post.read}</span>
          </div>
        </div>
        <button type="button" className="smv-btn" onClick={onBack} style={{ alignSelf: 'center' }}>
          Back to all posts
        </button>
      </div>
      <div className="blog-article reveal" style={{ marginTop: '2rem' }}>
        <ReactMarkdown
          remarkPlugins={[remarkGfm]}
          rehypePlugins={[rehypeRaw]}
          components={{
            img: ({ node, ...props }) => (
              <img {...props} style={{ display: 'block', maxWidth: '100%', borderRadius: '16px', margin: '1.5rem auto' }} />
            ),
            iframe: ({ node, ...props }) => (
              <div style={{ position: 'relative', width: '100%', paddingBottom: '56.25%', margin: '1.5rem 0' }}>
                <iframe {...props} style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }} />
              </div>
            ),
            a: ({ node, ...props }) => (
              <a {...props} target="_blank" rel="noreferrer" style={{ color: 'var(--terracotta)' }} />
            ),
          }}
        >
          {post.content}
        </ReactMarkdown>
      </div>
    </div>
  )
}

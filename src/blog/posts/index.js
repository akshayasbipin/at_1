import postOneContent from './post-1.md?raw'
import postTwoContent from './post-2.md?raw'

export const BLOG_POSTS = [
  {
    id: 1,
    slug: 'a-beginners-guide-to-simple-agent-architectures',
    cat: 'Tech · AI · Agents',
    title: "A Beginner's Guide to Simple Agent Architectures",
    excerpt: 'So you want to start making agents and don\'t know where to begin. Relatable. Here are the five patterns I actually used — from a plain LLM call to multi-agent orchestration.',
    date: 'Apr 25, 2026',
    read: '5 min read',
    content: postOneContent,
  },
  {
    id: 2,
    slug: 'women-who-refused-permission',
    cat: 'Books · History · Women',
    title: 'Women Who Refused Permission',
    excerpt: 'Heroines: Powerful Indian Women of Myth & History — a review of women who authored their own authority.',
    date: 'Feb 14, 2026',
    read: '6 min read',
    content: postTwoContent,
  },
]

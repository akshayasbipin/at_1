import { useEffect, useState } from 'react'
import { useReveal } from '../hooks/useReveal.js'
import { BOOKS } from '../books'

const DETAIL_FIELDS = [
  ['Status', 'status'],
  ['Author', 'author'],
  ['Published', 'published'],
  ['Publisher', 'publisher'],
  ['Type', 'type'],
  ['Score', 'score'],
]

export default function BooksPage() {
  useReveal()
  const [selectedBook, setSelectedBook] = useState(null)
  const [query, setQuery] = useState('')

  useEffect(() => {
    if (!selectedBook) return undefined

    const closeOnEscape = (event) => {
      if (event.key === 'Escape') setSelectedBook(null)
    }
    window.addEventListener('keydown', closeOnEscape)
    return () => window.removeEventListener('keydown', closeOnEscape)
  }, [selectedBook])

  const normalizedQuery = query.trim().toLowerCase()
  const visibleBooks = BOOKS.filter((book) =>
    `${book.title} ${book.author || ''}`.toLowerCase().includes(normalizedQuery)
  )

  return (
    <div className="smv-section books-page">
      <div className="section-tag">stories on my shelf</div>
      <h1 className="section-title reveal">The <span>Bookshelf</span></h1>
      <p className="books-intro reveal">
        Books I have read, loved, questioned, or am still thinking about.
      </p>

      <div className="books-toolbar reveal">
        <label className="books-search-label" htmlFor="books-search">Find a book</label>
        <input
          id="books-search"
          className="books-search"
          type="search"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Search title or author"
        />
        <span className="books-count">{visibleBooks.length} {visibleBooks.length === 1 ? 'book' : 'books'}</span>
      </div>

      {visibleBooks.length > 0 ? (
        <div className="books-grid">
          {visibleBooks.map((book) => (
            <button
              className="book-card reveal"
              key={book.id}
              type="button"
              onClick={() => setSelectedBook(book)}
              aria-label={`View details for ${book.title}`}
            >
              <span className="book-cover-frame">
                {book.cover ? (
                  <img className="book-cover" src={book.cover} alt={`Cover of ${book.title}`} loading="lazy" />
                ) : (
                  <span className="book-cover-placeholder" aria-hidden="true">A book<br />without a cover</span>
                )}
              </span>
              <span className="book-card-info">
                <span className="book-card-title">{book.title}</span>
                {book.author && <span className="book-card-author">{book.author}</span>}
                {book.status && <span className="book-status">{book.status}</span>}
              </span>
            </button>
          ))}
        </div>
      ) : (
        <p className="books-empty">No books match that search.</p>
      )}

      {selectedBook && (
        <div
          className="book-dialog-backdrop"
          onClick={(event) => {
            if (event.target === event.currentTarget) setSelectedBook(null)
          }}
        >
          <section className="book-dialog" role="dialog" aria-modal="true" aria-labelledby="book-dialog-title">
            <button
              className="book-dialog-close"
              type="button"
              onClick={() => setSelectedBook(null)}
              aria-label="Close book details"
            >
              ×
            </button>
            <div className="book-dialog-cover-wrap">
              {selectedBook.cover ? (
                <img className="book-dialog-cover" src={selectedBook.cover} alt={`Cover of ${selectedBook.title}`} />
              ) : (
                <div className="book-dialog-cover-placeholder">Cover image<br />can be added later</div>
              )}
            </div>
            <div className="book-dialog-content">
              <div className="section-tag">book details</div>
              <h2 className="book-dialog-title" id="book-dialog-title">{selectedBook.title}</h2>
              <dl className="book-details">
                {DETAIL_FIELDS.map(([label, field]) => selectedBook[field] != null && selectedBook[field] !== '' && (
                  <div className="book-detail-row" key={field}>
                    <dt>{label}</dt>
                    <dd>{field === 'score' ? `${selectedBook[field]} / 5` : selectedBook[field]}</dd>
                  </div>
                ))}
              </dl>
              {selectedBook.description && (
                <div className="book-long-description">
                  <h3>About this book</h3>
                  <p>{selectedBook.description}</p>
                </div>
              )}
              {selectedBook.note && (
                <div className="book-note">
                  <h3>My note</h3>
                  <p>{selectedBook.note}</p>
                </div>
              )}
              {selectedBook.link && (
                <a className="book-external-link" href={selectedBook.link} target="_blank" rel="noreferrer">
                  More about this book ↗
                </a>
              )}
            </div>
          </section>
        </div>
      )}
    </div>
  )
}
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { CreatorCard } from '../components/CreatorCard';
import { ensureStarterCreators, fetchCreators, getErrorMessage } from '../services/creators';
import type { Creator } from '../types';

export function ShowCreators() {
  const [creators, setCreators] = useState<Creator[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [reloadKey, setReloadKey] = useState(0);

  useEffect(() => {
    let isCurrent = true;

    async function loadCreators() {
      setIsLoading(true);
      setError(null);

      try {
        const creators = await fetchCreators();
        const seededCreators = await ensureStarterCreators(creators);

        if (isCurrent) {
          setCreators(seededCreators);
        }
      } catch (loadError) {
        if (isCurrent) {
          setError(getErrorMessage(loadError, 'Could not load creators.'));
        }
      } finally {
        if (isCurrent) {
          setIsLoading(false);
        }
      }
    }

    void loadCreators();

    return () => {
      isCurrent = false;
    };
  }, [reloadKey]);

  return (
    <section className="page-section">
      <div className="page-heading">
        <div>
          <h1>Content creators collection</h1>
        </div>
        <Link className="button button-primary" to="/new">
          Add creator
        </Link>
      </div>

      {isLoading ? <p className="status-message">Loading creators...</p> : null}

      {error ? (
        <div className="status-panel" role="alert">
          <p>{error}</p>
          <button className="button button-secondary" type="button" onClick={() => setReloadKey((key) => key + 1)}>
            Retry
          </button>
        </div>
      ) : null}

      {!isLoading && !error && creators.length === 0 ? (
        <div className="status-panel">
          <p>No creators have been added yet.</p>
          <Link className="button button-primary" to="/new">
            Add the first creator
          </Link>
        </div>
      ) : null}

      {!isLoading && !error && creators.length > 0 ? (
        <div className="creator-grid">
          {creators.map((creator) => (
            <CreatorCard key={creator.id} creator={creator} />
          ))}
        </div>
      ) : null}
    </section>
  );
}

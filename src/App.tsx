import { useEffect, useState } from 'react';
import { BrowserRouter, Link, useLocation, useRoutes } from 'react-router-dom';
import { AddCreator } from './pages/AddCreator';
import { EditCreator } from './pages/EditCreator';
import { ShowCreators } from './pages/ShowCreators';
import { ViewCreator } from './pages/ViewCreator';
import { fetchCreator } from './services/creators';
import './App.css';

type Breadcrumb = {
  label: string;
  to?: string;
};

type CreatorRoute = {
  id: string;
  isEditing: boolean;
};

type LoadedCreatorName = {
  id: string;
  name: string;
};

function getCreatorRoute(pathname: string): CreatorRoute | null {
  const creatorMatch = pathname.match(/^\/creator\/([^/]+)(\/edit)?\/?$/);

  if (!creatorMatch) return null;

  return {
    id: creatorMatch[1],
    isEditing: Boolean(creatorMatch[2])
  };
}

function getBreadcrumbs(pathname: string, creatorName: string | null): Breadcrumb[] {
  const creatorRoute = getCreatorRoute(pathname);

  if (pathname === '/') {
    return [{ label: 'Creators' }];
  }

  if (pathname === '/new') {
    return [{ label: 'Creators', to: '/' }, { label: 'Add creator' }];
  }

  if (creatorRoute) {
    const creatorPath = `/creator/${creatorRoute.id}`;

    if (!creatorName) {
      return [{ label: 'Creators', to: '/' }];
    }

    if (creatorRoute.isEditing) {
      return [{ label: 'Creators', to: '/' }, { label: creatorName, to: creatorPath }, { label: 'Edit' }];
    }

    return [{ label: 'Creators', to: '/' }, { label: creatorName }];
  }

  return [{ label: 'Creators', to: '/' }, { label: 'Not found' }];
}

function AppRoutes() {
  return useRoutes([
    { path: '/', element: <ShowCreators /> },
    { path: '/new', element: <AddCreator /> },
    { path: '/creator/:id', element: <ViewCreator /> },
    { path: '/creator/:id/edit', element: <EditCreator /> },
    { path: '*', element: <NotFound /> }
  ]);
}

function NotFound() {
  return (
    <section className="page-section narrow">
      <div className="status-panel">
        <p>That page does not exist.</p>
      </div>
    </section>
  );
}

function AppHeader() {
  const location = useLocation();
  const creatorRoute = getCreatorRoute(location.pathname);
  const creatorId = creatorRoute?.id ?? null;
  const [loadedCreatorName, setLoadedCreatorName] = useState<LoadedCreatorName | null>(null);
  const creatorName = loadedCreatorName?.id === creatorId ? loadedCreatorName.name : null;
  const breadcrumbs = getBreadcrumbs(location.pathname, creatorName);

  useEffect(() => {
    let isCurrent = true;

    if (!creatorId) return;

    async function loadCreatorName() {
      if (!creatorId) return;

      try {
        const creator = await fetchCreator(creatorId);

        if (isCurrent) {
          setLoadedCreatorName({ id: creatorId, name: creator.name });
        }
      } catch {
        if (isCurrent) {
          setLoadedCreatorName({ id: creatorId, name: '' });
        }
      }
    }

    void loadCreatorName();

    return () => {
      isCurrent = false;
    };
  }, [creatorId]);

  return (
    <header className="app-header">
      <nav className="breadcrumbs" aria-label="Breadcrumb">
        <ol>
          <li>
            <Link className="brand" to="/">
              Creatorverse
            </Link>
          </li>
          {breadcrumbs.map((breadcrumb) => (
            <li key={`${breadcrumb.label}-${breadcrumb.to ?? 'current'}`}>
              {breadcrumb.to ? (
                <Link className="breadcrumb-link" to={breadcrumb.to}>
                  {breadcrumb.label}
                </Link>
              ) : (
                <span className="breadcrumb-current" aria-current="page">
                  {breadcrumb.label}
                </span>
              )}
            </li>
          ))}
        </ol>
      </nav>
    </header>
  );
}

function App() {
  return (
    <BrowserRouter>
      <div className="app-shell">
        <AppHeader />
        <main>
          <AppRoutes />
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;

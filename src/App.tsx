import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';
import './App.scss';
import {
  Routes,
  Route,
  Navigate,
  Link,
  useLocation,
  useParams,
  useNavigate, // Додано useNavigate
} from 'react-router-dom';
import { Tabs, TabList, Tab, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';

const HomePage = () => (
  <div className="section">
    <div className="container">
      <h1 className="title" data-cy="HomePageTitle">
        Home page
      </h1>
    </div>
  </div>
);

const TabsPage = () => {
  const { tabId } = useParams<{ tabId?: string }>();
  const navigate = useNavigate(); // Ініціалізовано useNavigate

  const tabs = [
    { id: 'tab-1', title: 'Tab 1', content: 'Some text 1' },
    { id: 'tab-2', title: 'Tab 2', content: 'Some text 2' },
    { id: 'tab-3', title: 'Tab 3', content: 'Some text 3' },
  ];

  const selectedIndex = tabs.findIndex(tab => tab.id === tabId);
  const isTabSelected = selectedIndex !== -1;
  const safeSelectedIndex = isTabSelected ? selectedIndex : undefined;

  const handleTabSelect = index => {
    const selectedTab = tabs[index];

    if (selectedTab) {
      navigate(`/tabs/${selectedTab.id}`);
    }
  };

  return (
    <div className="section">
      <div className="container">
        <h1 className="title" data-cy="TabsPageTitle">
          Tabs page
        </h1>

        <Tabs
          selectedIndex={safeSelectedIndex}
          selectedTabClassName="is-active"
          focusTabOnClick={false}
          data-cy="Tabs"
          onSelect={handleTabSelect}
        >
          <TabList data-cy="TabList">
            {tabs.map(tab => (
              <Tab
                key={tab.id}
                data-cy="Tab"
                className={tab.id === tabId ? 'is-active' : ''}
              >
                <Link
                  to={`/tabs/${tab.id}`}
                  data-cy="TabLink"
                  className={tab.id === tabId ? 'is-active' : ''}
                >
                  {tab.title}
                </Link>
              </Tab>
            ))}
          </TabList>

          {tabs.map(tab => (
            <TabPanel key={tab.id}>
              {isTabSelected && tab.id === tabId && (
                <div data-cy="TabContent">{tab.content}</div>
              )}
            </TabPanel>
          ))}
        </Tabs>

        {!isTabSelected && <div data-cy="TabContent">Please select a tab</div>}
      </div>
    </div>
  );
};

const NotFoundPage = () => (
  <div className="section">
    <div className="container">
      <h1 className="title" data-cy="NotFoundPageTitle">
        Page not found
      </h1>
    </div>
  </div>
);

export const App = () => {
  const location = useLocation();
  const isHomeActive = location.pathname === '/';
  const isTabsActive =
    location.pathname === '/tabs' || location.pathname.startsWith('/tabs/');

  return (
    <>
      <nav className="navbar is-light" data-cy="Nav">
        <div className="container">
          <div className="navbar-menu">
            <div className="navbar-start">
              <Link
                to="/"
                className={`navbar-item ${isHomeActive ? 'is-active' : ''}`}
                data-cy="NavLink-Home"
              >
                Home
              </Link>
              <Link
                to="/tabs"
                className={`navbar-item ${isTabsActive ? 'is-active' : ''}`}
                data-cy="NavLink-Tabs"
              >
                Tabs
              </Link>
            </div>
          </div>
        </div>
      </nav>

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/home" element={<Navigate to="/" replace />} />
        <Route path="tabs">
          <Route index element={<TabsPage />} />
          <Route path=":tabId" element={<TabsPage />} />
        </Route>
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </>
  );
};

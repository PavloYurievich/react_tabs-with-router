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
} from 'react-router-dom';
import { Tabs, TabList, Tab, TabPanel } from 'react-Tabs';
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

  const tabs = [
    { id: 'tab-1', title: 'Tab 1', content: 'Some text 1' },
    { id: 'tab-2', title: 'Tab 2', content: 'Some text 2' },
    { id: 'tab-3', title: 'Tab 3', content: 'Some text 3' },
  ];

  const selectedIndex = tabs.findIndex(tab => tab.id === tabId);
  const isTabSelected = selectedIndex !== -1;

  return (
    <div className="section">
      <div className="container">
        <h1 className="title" data-cy="TabsPageTitle">
          Tabs page
        </h1>
        <Tabs
          selectedIndex={selectedIndex}
          onSelect={() => {}} // onSelect потрібен, але навігацією керує Link
          selectedTabClassName="is-active" // Додаємо клас, який очікують тести
          focusTabOnClick={false}
          data-cy="Tabs"
        >
          <TabList data-cy="TabList">
            {tabs.map(tab => (
              <Tab key={tab.id} data-cy="Tab">
                <Link to={`/tabs/${tab.id}`} data-cy="TabLink">
                  {tab.title}
                </Link>
              </Tab>
            ))}
          </TabList>

          {isTabSelected &&
            tabs.map(tab => (
              <TabPanel key={tab.id}>
                <div data-cy="TabContent">{tab.content}</div>
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
  const isTabsActive = location.pathname.startsWith('/tabs');
  const isHomeActive = location.pathname === '/';

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
        <Route path="/tabs" element={<TabsPage />} />
        <Route path="/tabs/:tabId" element={<TabsPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </>
  );
};

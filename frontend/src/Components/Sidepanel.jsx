import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Sidepanel.css';
import {
  LayoutDashboard,
  Users,
  Calendar,
  ClipboardCheck,
  FileText,
  Bell,
  BarChart2,
  QrCode,
  Settings,
  ChevronLeft,
  ChevronRight,
  Menu,
  X
} from 'lucide-react';

const SidePanel = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  const menuItems = [
    { title: 'Dashboard', icon: <LayoutDashboard size={20} />, path: '/home' },
    { title: 'Participant Management', icon: <Users size={20} />, path: '/ParticipantManagement' },
    { title: 'Session Management', icon: <Calendar size={20} />, path: '/SessionManagement' },
    { title: 'Attendance', icon: <ClipboardCheck size={20} />, path: '/attendance' },
    { title: 'Proceedings', icon: <FileText size={20} />, path: '/proceedings' },
    { title: 'Notifications', icon: <Bell size={20} />, path: '/notifications' },
    { title: 'Reports & Analytics', icon: <BarChart2 size={20} />, path: '/reports' },
    { title: 'QR Code Management', icon: <QrCode size={20} />, path: '/qr-code' },
    { title: 'Admin Settings', icon: <Settings size={20} />, path: '/settings' }
  ];

  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth <= 768);
      if (window.innerWidth <= 768) {
        setIsExpanded(false);
      }
    };

    checkIfMobile();
    window.addEventListener('resize', checkIfMobile);
    return () => window.removeEventListener('resize', checkIfMobile);
  }, []);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
    if (isMobile) {
      setIsExpanded(true);
    }
  };

  const handleMenuItemClick = () => {
    if (isMobile) {
      setIsMobileMenuOpen(false);
    }
  };

  return (
    <>
      {/* Mobile Hamburger Menu */}
      <button 
        className="mobile-menu-button"
        onClick={toggleMobileMenu}
        aria-label={isMobileMenuOpen ? "Close mobile menu" : "Open mobile menu"}
      >
        {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Overlay for mobile */}
      {isMobileMenuOpen && (
        <div className="mobile-overlay" onClick={toggleMobileMenu}></div>
      )}

      <div className={`side-panel ${isExpanded ? 'expanded' : ''} ${isMobileMenuOpen ? 'mobile-open' : ''}`}>
        <div className="panel-container">
          {!isMobile && (
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="toggle-button"
            >
              {isExpanded ? <ChevronLeft size={20} /> : <ChevronRight size={20} />}
            </button>
          )}

          <nav className="nav-menu">
            <ul>
              {menuItems.map((item, index) => (
                <li key={index}>
                  <Link to={item.path} className="menu-item" onClick={handleMenuItemClick}>
                    <span className="icon">{item.icon}</span>
                    {(isExpanded || isMobileMenuOpen) && (
                      <span className="title">{item.title}</span>
                    )}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </div>
    </>
  );
};

export default SidePanel;

import { useEffect, useState } from 'react';

const links = [
  ['Experience', '#experience'],
  ['Projects', '#projects'],
  ['Volunteering', '#volunteering'],
  ['Tech Stack', '#tech-stack'],
  ['Courses', '#courses'],
  ['Contact', '#contact'],
];

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`nav ${scrolled ? 'nav-scrolled' : ''}`}>
      <ul className="nav-links">
        {links.map(([label, href]) => (
          <li key={href}>
            <a href={href}>{label}</a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
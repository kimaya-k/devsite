import { useEffect, useState } from 'react';

const links = [
  ['About', '#about'],
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
    function onScroll() {
      setScrolled(window.scrollY > 40);
    }
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <nav className={`nav ${scrolled ? 'nav-scrolled' : ''}`}>
      <a className="nav-mark" href="#top">KD</a>
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
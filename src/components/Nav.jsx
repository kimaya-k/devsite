const links = [
  ['About', '#about'],
  ['Experience', '#experience'],
  ['Projects', '#projects'],
  ['Contact', '#contact'],
];

export default function Nav() {
  return (
    <nav className="nav">
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

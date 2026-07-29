const links = [
  ['Experience', '#experience'],
  ['Projects', '#projects'],
  ['Volunteering', '#volunteering'],
  ['Tech Stack', '#tech-stack'],
  ['Courses', '#courses'],
  ['Contact', '#contact'],
];

export default function Nav() {
  return (
    <nav className="nav">
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

import Reveal from './Reveal';
import { courses } from '../data';

export default function Courses() {
  return (
    <section id="courses" className="section">
      <Reveal className="section-head">
        <h2>Coursework</h2>
        <p>Head in the clouds, feet in the algo books.</p>
      </Reveal>

      <div className="courses-grid">
        {courses.map((course, index) => (
          <Reveal as="div" delay={index * 0.05} key={course.name} className="course-card" y={18}>
            <span className="course-index">{String(index + 1).padStart(2, '0')}</span>
            <h3>{course.name}</h3>
            <span className="course-note">{course.note}</span>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

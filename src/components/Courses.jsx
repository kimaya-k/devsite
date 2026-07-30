import Reveal from './Reveal';
import { courses } from '../data';

const RADIUS = 38; // percent distance from center

function getPosition(index, total) {
  const angle = (index / total) * Math.PI * 2 - Math.PI / 2;
  const x = 50 + RADIUS * Math.cos(angle);
  const y = 50 + RADIUS * Math.sin(angle);
  return { x, y };
}

export default function Courses() {
  return (
    <section id="courses" className="section">
      <Reveal className="section-head">
        <h2 className="section-heading-accent">Coursework</h2>
        <p>Head in the clouds, fingers at the keyboard.</p>
      </Reveal>

      {/* Flowchart — desktop */}
      <div className="courses-flowchart">
        <svg className="courses-connector-svg" viewBox="0 0 100 100">
          {courses.map((course, index) => {
            const { x, y } = getPosition(index, courses.length);
            return (
              <line
                key={course}
                x1="50"
                y1="50"
                x2={x}
                y2={y}
                className="courses-connector-line"
              />
            );
          })}
        </svg>

        <div className="course-cloud-wrap">
          <Reveal as="div" delay={0.1} className="course-cloud">
            <svg viewBox="0 0 200 130" className="course-cloud-svg" aria-hidden="true">
              <path d="M45,95 a30,30 0 0,1 -5,-59 a35,35 0 0,1 68,-14 a30,30 0 0,1 40,32 a26,26 0 0,1 -8,51 z" />
            </svg>
            <span className="course-cloud-label">CS</span>
          </Reveal>
        </div>

        {courses.map((course, index) => {
          const { x, y } = getPosition(index, courses.length);
          return (
            <div
              className="course-bubble-wrap"
              style={{ left: `${x}%`, top: `${y}%` }}
              key={course}
            >
              <Reveal as="div" delay={0.15 + index * 0.05} className="course-bubble">
                <span className="course-bubble-index">{String(index + 1).padStart(2, '0')}</span>
                <span className="course-bubble-text">{course}</span>
              </Reveal>
            </div>
          );
        })}
      </div>

      {/* Grid fallback — mobile */}
      <div className="courses-grid">
        {courses.map((course, index) => (
          <Reveal as="div" delay={index * 0.05} key={course} className="course-card" y={18}>
            <span className="course-index">{String(index + 1).padStart(2, '0')}</span>
            <h3>{course}</h3>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
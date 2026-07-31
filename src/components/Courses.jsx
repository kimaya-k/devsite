import Reveal from './Reveal';
import { courses } from '../data';

const RADIUS_X = 42; // percent — horizontal reach (wider = more oval)
const RADIUS_Y = 30; // percent — vertical reach (smaller = flatter)
const CENTER_Y = 40; // percent — pushes the whole diagram down, cloud lower, courses higher

function getPosition(index, total) {
  const angle = (index / total) * Math.PI * 2 - Math.PI / 2;
  const x = 50 + RADIUS_X * Math.cos(angle);
  const y = CENTER_Y + RADIUS_Y * Math.sin(angle);
  return { x, y };
}

export default function Courses() {
  return (
    <section id="courses" className="section">
      <Reveal className="section-head">
        <h2 className="section-heading-accent">Coursework</h2>
        <p>Taking the best courses of action.</p>
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
                y1={CENTER_Y}
                x2={x}
                y2={y}
                className="courses-connector-line"
              />
            );
          })}
        </svg>

        <div
          className="course-cloud-wrap"
          style={{ left: '50%', top: `${CENTER_Y}%` }}
        >
          <Reveal as="div" delay={0.1} className="course-cloud">
            <svg viewBox="0 0 200 120" className="course-cloud-svg" aria-hidden="true">
              <path d="M40,90
                       a24,24 0 0,1 0,-48
                       a30,30 0 0,1 58,-14
                       a26,26 0 0,1 50,10
                       a22,22 0 0,1 12,52
                       z" />
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
            <h3>{course}</h3>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
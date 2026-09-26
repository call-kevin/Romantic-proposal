import { motion } from 'framer-motion';
import { config } from '../config';

export default function Timeline() {
  return (
    <section className="section timeline-section">
      <motion.h2
        className="section-title"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        Our Story So Far ⏳
      </motion.h2>
      <div className="timeline">
        {config.specialDates.map((item, i) => (
          <motion.div
            key={i}
            className={`timeline-item ${i % 2 === 0 ? 'left' : 'right'}`}
            initial={{ opacity: 0, x: i % 2 === 0 ? -80 : 80 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <div className="timeline-dot">❤</div>
            <div className="timeline-content">
              <span className="timeline-date">
                {new Date(item.date).toLocaleDateString('en-US', {
                  year: 'numeric', month: 'long', day: 'numeric'
                })}
              </span>
              <h3>{item.title}</h3>
              <p>{item.description}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
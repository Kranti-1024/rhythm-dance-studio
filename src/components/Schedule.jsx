import './Schedule.css'

const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']

// color classes keyed by style
const styleColors = {
  'Bollywood':             'sched-tag--bollywood',
  'Hip-Hop':               'sched-tag--hiphop',
  'Contemporary':          'sched-tag--contemporary',
  'Kids Dance':            'sched-tag--kids',
  'Dance Fitness':         'sched-tag--fitness',
  'Wedding Choreography':  'sched-tag--wedding',
  'Off':                   'sched-tag--off',
}

// Schedule data — rows = time slots, cols = days
const timeSlots = [
  {
    time: '7:00 – 8:00 AM',
    slots: {
      Monday:    'Dance Fitness',
      Tuesday:   null,
      Wednesday: 'Dance Fitness',
      Thursday:  null,
      Friday:    'Dance Fitness',
      Saturday:  null,
      Sunday:    null,
    },
  },
  {
    time: '10:00 – 11:30 AM',
    slots: {
      Monday:    null,
      Tuesday:   'Kids Dance',
      Wednesday: null,
      Thursday:  'Kids Dance',
      Friday:    null,
      Saturday:  'Kids Dance',
      Sunday:    null,
    },
  },
  {
    time: '11:30 AM – 1:00 PM',
    slots: {
      Monday:    null,
      Tuesday:   'Bollywood',
      Wednesday: null,
      Thursday:  'Bollywood',
      Friday:    null,
      Saturday:  'Contemporary',
      Sunday:    null,
    },
  },
  {
    time: '4:00 – 5:30 PM',
    slots: {
      Monday:    'Hip-Hop',
      Tuesday:   null,
      Wednesday: 'Hip-Hop',
      Thursday:  null,
      Friday:    'Contemporary',
      Saturday:  'Hip-Hop',
      Sunday:    null,
    },
  },
  {
    time: '5:30 – 7:00 PM',
    slots: {
      Monday:    'Bollywood',
      Tuesday:   'Contemporary',
      Wednesday: 'Bollywood',
      Thursday:  'Contemporary',
      Friday:    'Bollywood',
      Saturday:  'Wedding Choreography',
      Sunday:    null,
    },
  },
  {
    time: '7:00 – 8:30 PM',
    slots: {
      Monday:    'Contemporary',
      Tuesday:   'Dance Fitness',
      Wednesday: 'Hip-Hop',
      Thursday:  'Dance Fitness',
      Friday:    'Hip-Hop',
      Saturday:  'Bollywood',
      Sunday:    null,
    },
  },
]

export default function Schedule() {
  const scrollToContact = () => {
    const el = document.querySelector('#contact')
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section id="schedule" className="schedule section" aria-label="Class schedule">
      <div className="container">
        <div className="section-header fade-up">
          <span className="section-label">Plan Your Week</span>
          <h2 className="section-title">Class Schedule</h2>
          <p className="section-subtitle">
            Sample timetable — timings are indicative and subject to change. Contact us to confirm current slots.
          </p>
        </div>

        {/* Legend */}
        <div className="sched-legend fade-up" aria-label="Schedule legend">
          {Object.entries(styleColors)
            .filter(([k]) => k !== 'Off')
            .map(([style, cls]) => (
              <span key={style} className={`sched-tag ${cls}`}>{style}</span>
            ))}
        </div>

        {/* Table wrapper (scrollable on mobile) */}
        <div className="sched-wrap fade-up fade-up-delay-1" role="region" aria-label="Weekly schedule table" tabIndex={0}>
          <table className="sched-table" aria-label="Class timetable">
            <thead>
              <tr>
                <th scope="col" className="sched-th sched-th--time">Time</th>
                {days.map((day) => (
                  <th scope="col" key={day} className="sched-th">
                    {day}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {timeSlots.map(({ time, slots }) => (
                <tr key={time} className="sched-row">
                  <td className="sched-time">{time}</td>
                  {days.map((day) => {
                    const val = slots[day]
                    return (
                      <td key={day} className="sched-cell">
                        {val ? (
                          <span className={`sched-tag ${styleColors[val] || ''}`}>{val}</span>
                        ) : (
                          <span className="sched-empty" aria-label="No class">—</span>
                        )}
                      </td>
                    )
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Note */}
        <p className="sched-note fade-up fade-up-delay-2">
          📌 <em>This is a sample schedule for demo purposes only. All timings are editable.</em>
          &nbsp;
          <button className="sched-cta-link" onClick={scrollToContact}>
            Contact us to book your slot →
          </button>
        </p>
      </div>
    </section>
  )
}

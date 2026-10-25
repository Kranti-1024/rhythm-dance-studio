import { useState } from 'react'
import { Calendar, Clock, Sparkles, User, ArrowRight, LayoutGrid, List } from 'lucide-react'
import './Schedule.css'

const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']

// Color styling classes for dance disciplines (Rich Crimson & Rose tuned)
const styleColors = {
  'Bollywood':             'sched-tag--bollywood',
  'Hip-Hop':               'sched-tag--hiphop',
  'Contemporary':          'sched-tag--contemporary',
  'Kids Dance':            'sched-tag--kids',
  'Dance Fitness':         'sched-tag--fitness',
  'Wedding Choreography':  'sched-tag--wedding',
}

const instructorMap = {
  'Bollywood': 'Aryan Sharma',
  'Hip-Hop': "Rohan 'Rush' Verma",
  'Contemporary': 'Maya Rao',
  'Kids Dance': 'Priya Sen',
  'Dance Fitness': 'Priya Sen',
  'Wedding Choreography': 'Aryan & Maya',
}

// Detailed Schedule Items
const timeSlots = [
  {
    time: '07:00 – 08:00 AM',
    label: 'Morning Pulse',
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
    label: 'Kids & Technique',
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
    time: '11:30 AM – 01:00 PM',
    label: 'Matinee Grooves',
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
    time: '04:00 – 05:30 PM',
    label: 'Street & Flow',
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
    time: '05:30 – 07:00 PM',
    label: 'Prime Evening',
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
    time: '07:00 – 08:30 PM',
    label: 'Night Session',
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

export default function Schedule({ onSelectSlot }) {
  const [activeDay, setActiveDay] = useState('Monday')
  const [viewMode, setViewMode] = useState('day') // 'day' | 'table'
  const [selectedStyleFilter, setSelectedStyleFilter] = useState('All')

  // Collect classes for the selected day in Day View
  const daySchedule = timeSlots
    .map((ts) => ({
      time: ts.time,
      batchLabel: ts.label,
      classType: ts.slots[activeDay],
    }))
    .filter((item) => item.classType !== null)
    .filter((item) =>
      selectedStyleFilter === 'All' ? true : item.classType === selectedStyleFilter
    )

  return (
    <section id="schedule" className="schedule section" aria-label="Class schedule">
      <div className="container">
        <div className="section-header fade-up">
          <span className="section-label">
            <Calendar size={13} /> Timetable & Batches
          </span>
          <h2 className="section-title">Studio Class Schedule</h2>
          <p className="section-subtitle">
            Flexible morning and evening batches 6 days a week. Click any class slot to reserve your free trial pass.
          </p>

          {/* Controls: View Mode Toggle & Legend */}
          <div className="sched-controls">
            <div className="sched-view-toggle">
              <button
                type="button"
                className={`sched-view-btn ${viewMode === 'day' ? 'active' : ''}`}
                onClick={() => setViewMode('day')}
                aria-label="Day-by-Day timeline view"
              >
                <List size={15} /> Day View (Mobile Friendly)
              </button>
              <button
                type="button"
                className={`sched-view-btn ${viewMode === 'table' ? 'active' : ''}`}
                onClick={() => setViewMode('table')}
                aria-label="Full week table view"
              >
                <LayoutGrid size={15} /> Full Week Table
              </button>
            </div>
          </div>
        </div>

        {/* Style Filter Legend */}
        <div className="sched-legend fade-up" aria-label="Filter schedule by style">
          <button
            type="button"
            className={`sched-filter-tag ${selectedStyleFilter === 'All' ? 'sched-filter-tag--active' : ''}`}
            onClick={() => setSelectedStyleFilter('All')}
          >
            All Styles
          </button>
          {Object.entries(styleColors).map(([style, cls]) => (
            <button
              type="button"
              key={style}
              className={`sched-filter-tag ${cls} ${selectedStyleFilter === style ? 'sched-filter-tag--active' : ''}`}
              onClick={() => setSelectedStyleFilter(selectedStyleFilter === style ? 'All' : style)}
            >
              {style}
            </button>
          ))}
        </div>

        {/* ================= DAY-BY-DAY VIEW (MOBILE OPTIMIZED) ================= */}
        {viewMode === 'day' && (
          <div className="sched-day-view fade-up">
            {/* Day Selector Tabs */}
            <div className="sched-day-tabs" role="tablist" aria-label="Days of the week">
              {days.map((day) => (
                <button
                  type="button"
                  key={day}
                  role="tab"
                  aria-selected={activeDay === day}
                  className={`sched-day-tab ${activeDay === day ? 'sched-day-tab--active' : ''}`}
                  onClick={() => setActiveDay(day)}
                >
                  <span className="sched-day-abbr">{day.slice(0, 3)}</span>
                  <span className="sched-day-full">{day}</span>
                </button>
              ))}
            </div>

            {/* Daily Timeline Cards */}
            <div className="sched-day-list" role="tabpanel">
              {daySchedule.length > 0 ? (
                daySchedule.map(({ time, batchLabel, classType }) => {
                  const instructor = instructorMap[classType] || 'Senior Faculty'
                  return (
                    <div key={time + classType} className="sched-card glass-card">
                      <div className="sched-card__time-col">
                        <span className="sched-card__time">
                          <Clock size={14} /> {time}
                        </span>
                        <span className="sched-card__batch-label">{batchLabel}</span>
                      </div>

                      <div className="sched-card__info-col">
                        <div className="sched-card__header">
                          <span className={`sched-tag ${styleColors[classType] || ''}`}>
                            {classType}
                          </span>
                        </div>
                        <h3 className="sched-card__title">{classType}</h3>
                        <div className="sched-card__mentor">
                          <User size={13} /> Mentor: <strong>{instructor}</strong>
                        </div>
                      </div>

                      <button
                        type="button"
                        className="btn btn-primary sched-card__book-btn"
                        onClick={() => onSelectSlot && onSelectSlot(classType, activeDay, time)}
                        aria-label={`Book free trial for ${classType} on ${activeDay} at ${time}`}
                      >
                        <Sparkles size={14} /> Book This Slot
                      </button>
                    </div>
                  )
                })
              ) : (
                <div className="sched-empty-day glass-card">
                  <p>No regular public batches scheduled for {activeDay} under this filter.</p>
                  <small>Private choreography sessions and open studio rehearsals available upon request.</small>
                </div>
              )}
            </div>
          </div>
        )}

        {/* ================= FULL TABLE VIEW (DESKTOP) ================= */}
        {viewMode === 'table' && (
          <div
            className="sched-wrap fade-up"
            role="region"
            aria-label="Weekly schedule matrix"
            tabIndex={0}
          >
            <table className="sched-table" aria-label="Class timetable matrix">
              <thead>
                <tr>
                  <th scope="col" className="sched-th sched-th--time">Time Slot</th>
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
                      const isHighlighted =
                        selectedStyleFilter === 'All' || selectedStyleFilter === val
                      return (
                        <td key={day} className="sched-cell">
                          {val ? (
                            <button
                              type="button"
                              className={`sched-slot-btn ${styleColors[val] || ''} ${
                                !isHighlighted ? 'sched-slot--faded' : ''
                              }`}
                              onClick={() => onSelectSlot && onSelectSlot(val, day, time)}
                              title={`Click to book ${val} on ${day} (${time})`}
                            >
                              <span>{val}</span>
                            </button>
                          ) : (
                            <span className="sched-empty" aria-label="No class">
                              —
                            </span>
                          )}
                        </td>
                      )
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Note & Action */}
        <div className="sched-note-card glass-card fade-up">
          <p>
            📌 <em>Timetable updated weekly. Need a different timing or weekend private batch?</em>
          </p>
          <button
            type="button"
            className="btn btn-outline"
            onClick={() => onSelectSlot && onSelectSlot('Custom', 'Flexible', 'Flexible')}
          >
            Request Custom Slot <ArrowRight size={14} />
          </button>
        </div>
      </div>
    </section>
  )
}

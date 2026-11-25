import { useEffect, useState } from 'react'
import './App.css'

const iconPaths = {
  arrow: <path d="M5 12h14m-6-6 6 6-6 6" />,
  check: <path d="m5 12 4 4L19 6" />,
  calendar: <><rect width="18" height="18" x="3" y="4" rx="2" /><path d="M16 2v4M8 2v4M3 10h18" /></>,
  milestone: <><path d="M5 21V4" /><path d="m5 4 14 2-4 4 4 4-14 2" /></>,
  menu: <><path d="M4 7h16M4 12h16M4 17h16" /></>,
  close: <><path d="m18 6-12 12M6 6l12 12" /></>,
}

function Icon({ name, size = 20 }) {
  return (
    <svg
      aria-hidden="true"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {iconPaths[name]}
    </svg>
  )
}

function GetStartedLink({ className, iconSize = 16 }) {
  const [isLoading, setIsLoading] = useState(false)

  const handleClick = (event) => {
    if (isLoading) {
      event.preventDefault()
      return
    }

    if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return
    setIsLoading(true)
  }

  return (
    <a
      aria-busy={isLoading}
      className={`${className}${isLoading ? ' is-loading' : ''}`}
      href="/signup"
      onClick={handleClick}
    >
      {isLoading ? (
        <>
          <span aria-hidden="true" className="button-spinner" />
          <span aria-live="polite">Opening sign up...</span>
        </>
      ) : (
        <>
          Get Started
          <span className="button-icon"><Icon name="arrow" size={iconSize} /></span>
        </>
      )}
    </a>
  )
}

const boardColumns = [
  {
    name: 'To Do',
    status: 'todo',
    tasks: [
      { title: 'Outline launch requirements', label: 'Planning', priority: 'High', owner: 'AM', due: 'Due Jun 18' },
      { title: 'Gather customer feedback', label: 'Research', priority: 'Normal', owner: 'JK', due: 'Due Jun 20' },
    ],
  },
  {
    name: 'In Progress',
    status: 'progress',
    tasks: [
      { title: 'Build onboarding flow', label: 'Development', priority: 'High', owner: 'LS', due: 'Due Jun 21' },
    ],
  },
  {
    name: 'In Review',
    status: 'review',
    tasks: [
      { title: 'Review landing page copy', label: 'Content', priority: 'Normal', owner: 'RD', due: 'Due Jun 22' },
    ],
  },
  {
    name: 'Done',
    status: 'done',
    tasks: [
      { title: 'Confirm project scope', label: 'Planning', priority: 'Normal', owner: 'AM', due: 'Completed' },
    ],
  },
]

const productTabs = [
  {
    id: 'projects',
    label: 'Projects',
    heading: 'See the whole project at a glance.',
    description: 'Bring active work, recent updates, and upcoming deadlines into one clear view.',
    preview: 'projects',
  },
  {
    id: 'kanban',
    label: 'Kanban Board',
    heading: 'Move every task forward.',
    description: 'Organize work by stage and keep task owners, priorities, and due dates visible.',
    preview: 'kanban',
  },
  {
    id: 'team',
    label: 'Team Collaboration',
    heading: 'Keep people and work connected.',
    description: 'Assign an owner and keep useful discussion beside the task it belongs to.',
    preview: 'team',
  },
  {
    id: 'milestones',
    label: 'Milestones',
    heading: 'Stay focused on what comes next.',
    description: 'Track important checkpoints and see which milestones are complete or upcoming.',
    preview: 'milestones',
  },
]

const workflowSteps = [
  { title: 'Create your project.', description: 'Set a goal and key deadline.' },
  { title: 'Organize tasks and assign your team.', description: 'Give every task a clear owner.' },
  { title: 'Track progress and reach your milestones.', description: 'See what is done and what is next.' },
]

function TaskCard({ task }) {
  return (
    <article className="task-card">
      <div className="task-title">{task.title}</div>
      <div className="task-label-row">
        <span className="task-tag">{task.label}</span>
        <span className={`priority priority-${task.priority.toLowerCase()}`}>{task.priority}</span>
      </div>
      <div className="task-meta">
        <span className={`avatar avatar-${task.owner}`} aria-label={`Assigned to ${task.owner}`}>{task.owner}</span>
        <span className="task-date"><Icon name="calendar" size={12} />{task.due}</span>
      </div>
    </article>
  )
}

function BoardPreview({ compact = false }) {
  return (
    <div className={`app-window ${compact ? 'compact-board' : ''}`} role="img" aria-label="TaskFlow Kanban board with tasks in To Do, In Progress, In Review, and Done">
      <div className="window-top">
        <div className="window-dots"><i /><i /><i /></div>
        <div className="window-address"><span className="mini-mark">T</span> app.taskflow.com</div>
        <span className="window-more">···</span>
      </div>
      <div className="workspace">
        <aside className="sidebar">
          <div className="sidebar-brand"><span className="brand-mark small-mark">T</span><span>TaskFlow</span><span className="sidebar-chevron">⌄</span></div>
          <div className="sidebar-section">Workspace</div>
          <div className="side-link">Dashboard</div>
          <div className="side-link selected">Website refresh</div>
          <div className="side-link">My tasks</div>
          <div className="sidebar-section projects-label">Projects <span>+</span></div>
          <div className="project-link"><b className="project-dot dot-pink" /> Product launch</div>
          <div className="project-link"><b className="project-dot dot-navy" /> Mobile app</div>
          <div className="sidebar-bottom"><span>Team workspace</span><div className="profile-pic">AM</div></div>
        </aside>
        <div className="board-main">
          <div className="board-heading">
            <div><h3>Website refresh</h3><p>Plan, build, and review the new website.</p></div>
            <div className="board-people" aria-label="Project members">
              <span className="avatar avatar-AM">AM</span><span className="avatar avatar-JK">JK</span><span className="avatar avatar-LS">LS</span>
              <span className="member-count">+2</span>
            </div>
          </div>
          <div className="board-toolbar">
            <div className="board-tabs"><span className="active-tab">Board</span><span>List</span><span>Timeline</span></div>
            <div className="toolbar-actions"><span>Filter</span><button>＋ Add task</button></div>
          </div>
          <div className="kanban">
            {boardColumns.map((column) => (
              <div className="kanban-column" key={column.status}>
                <div className="column-heading"><span className={`status-dot status-${column.status}`} />{column.name}<span className="column-count">{column.tasks.length}</span></div>
                {column.tasks.map((task) => <TaskCard task={task} key={task.title} />)}
                <div className="add-task">＋ Add task</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

function DashboardPreview() {
  return (
    <div className="dashboard-preview" role="img" aria-label="Project dashboard showing active projects, recent activity, and deadlines">
      <div className="preview-heading"><h3>Project overview</h3><span className="preview-date">This week <span>⌄</span></span></div>
      <div className="overview-strip">
        <div><span>Active projects</span><b>Website refresh</b><small>Product launch</small></div>
        <div><span>Completed tasks</span><b>Approve wireframes</b><small>Completed today</small></div>
        <div><span>Upcoming deadline</span><b>Design review</b><small>Due Thursday</small></div>
        <div><span>Overdue work</span><b>Review mobile content</b><small>Needs attention</small></div>
      </div>
      <div className="dashboard-list-title"><b>Recent project activity</b><span>View projects <Icon name="arrow" size={12} /></span></div>
      <div className="dashboard-row"><span className="project-symbol">W</span><span><b>Website refresh</b><small>Last updated today</small></span><span className="dashboard-status">In progress</span></div>
      <div className="dashboard-row"><span className="project-symbol">P</span><span><b>Product launch</b><small>Next milestone: Content review</small></span><span className="dashboard-status status-text-review">In review</span></div>
    </div>
  )
}

function TaskDetailsPreview() {
  return (
    <div className="task-details-preview" role="img" aria-label="Task details with an assignee, priority, deadline, subtasks, and comment">
      <div className="task-detail-top"><span className="detail-project">Website refresh <span>/</span> Tasks</span><span>···</span></div>
      <span className="task-detail-status"><i /> In progress</span>
      <h3>Prepare homepage content</h3>
      <p className="task-detail-description">Gather the approved copy and assets for the new homepage.</p>
      <div className="task-attributes">
        <div><span>Assignee</span><b><i className="avatar avatar-JK">JK</i> Jordan Kim</b></div>
        <div><span>Priority</span><b className="priority-high-text">↑ High</b></div>
        <div><span>Due date</span><b><Icon name="calendar" size={13} /> Jun 21</b></div>
      </div>
      <div className="subtask-heading"><b>Subtasks</b><span>2 of 3 complete</span></div>
      <div className="subtask-row"><span className="subtask-checked"><Icon name="check" size={11} /></span><span>Collect product screenshots</span></div>
      <div className="subtask-row"><span className="subtask-checked"><Icon name="check" size={11} /></span><span>Review brand guidelines</span></div>
      <div className="subtask-row"><span className="subtask-empty" /><span>Get final copy approval</span></div>
      <div className="task-comment"><span className="avatar avatar-AM">AM</span><p><b>Alex Morgan</b> <span>· 2 hours ago</span><small>Added the latest draft for review.</small></p></div>
    </div>
  )
}

function MilestonePreview() {
  const milestones = [
    { title: 'Project kickoff', date: 'Jun 10', state: 'complete' },
    { title: 'Design approved', date: 'Jun 18', state: 'complete' },
    { title: 'Content review', date: 'Jun 24', state: 'current' },
    { title: 'Website launch', date: 'Jul 02', state: 'upcoming' },
  ]

  return (
    <div className="milestone-preview" role="img" aria-label="Project milestones showing completed, current, and upcoming work">
      <div className="milestone-preview-head"><h3>Project milestones</h3><Icon name="milestone" size={18} /></div>
      <div className="milestone-track">
        {milestones.map((milestone) => (
          <div className={`milestone-row milestone-${milestone.state}`} key={milestone.title}>
            <span className="milestone-node">{milestone.state === 'complete' ? <Icon name="check" size={12} /> : null}</span>
            <div><b>{milestone.title}</b><small>{milestone.date}</small></div>
            <span className="milestone-state">{milestone.state === 'complete' ? 'Complete' : milestone.state === 'current' ? 'In progress' : 'Upcoming'}</span>
          </div>
        ))}
      </div>
      <div className="milestone-footer"><span>Project progress</span><span className="milestone-progress-track"><i /></span><b>On track</b></div>
    </div>
  )
}

function ProductPreview({ type }) {
  if (type === 'projects') return <DashboardPreview />
  if (type === 'kanban') return <BoardPreview compact />
  if (type === 'team') return <TaskDetailsPreview />
  return <MilestonePreview />
}

function App() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [activeProductIndex, setActiveProductIndex] = useState(0)
  const activeProduct = productTabs[activeProductIndex]

  useEffect(() => {
    const revealTargets = document.querySelectorAll('[data-scroll-reveal]')

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches || !('IntersectionObserver' in window)) {
      revealTargets.forEach((target) => target.classList.add('is-visible'))
      return
    }

    const observer = new IntersectionObserver((entries, currentObserver) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return
        entry.target.classList.add('is-visible')
        currentObserver.unobserve(entry.target)
      })
    }, { threshold: 0.12, rootMargin: '0px 0px -32px 0px' })

    revealTargets.forEach((target) => observer.observe(target))
    return () => observer.disconnect()
  }, [])

  const handleTabKeyDown = (event, index) => {
    let nextIndex = index
    if (event.key === 'ArrowRight') nextIndex = (index + 1) % productTabs.length
    else if (event.key === 'ArrowLeft') nextIndex = (index + productTabs.length - 1) % productTabs.length
    else if (event.key === 'Home') nextIndex = 0
    else if (event.key === 'End') nextIndex = productTabs.length - 1
    else return

    event.preventDefault()
    setActiveProductIndex(nextIndex)
    document.getElementById(`product-tab-${nextIndex}`)?.focus()
  }

  return (
    <div className="site-shell">
      <header className="site-header">
        <a className="wordmark" href="#home" aria-label="TaskFlow home">
          <span className="brand-mark">T</span><span>TaskFlow</span>
        </a>
        <button
          className="mobile-menu-toggle"
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={menuOpen}
          aria-controls="primary-navigation"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <Icon name={menuOpen ? 'close' : 'menu'} />
        </button>
        <nav className={`main-nav ${menuOpen ? 'nav-open' : ''}`} id="primary-navigation" aria-label="Account navigation">
          <div className="mobile-nav-actions">
            <a className="nav-login" href="/login">Log In</a>
            <GetStartedLink className="button button-primary" />
          </div>
        </nav>
        <div className="header-actions">
          <a className="nav-login" href="/login">Log In</a>
          <GetStartedLink className="button button-primary header-cta" />
        </div>
      </header>

      <main>
        <section className="hero-section" id="home">
          <div className="hero-inner">
            <div className="hero-copy page-enter">
              <h1>Plan projects.<br />Organize tasks.<br />Deliver together.</h1>
              <p>Manage your projects, assign tasks, and track your team's progress in one collaborative workspace.</p>
              <div className="hero-actions">
                <GetStartedLink className="button button-primary button-large" iconSize={17} />
                <a href="#how-it-works" className="button button-secondary button-large">See How It Works</a>
              </div>
            </div>
            <div className="hero-visual page-enter page-enter-delay">
              <BoardPreview />
            </div>
          </div>
        </section>

        <section className="product-section" id="product" aria-labelledby="product-title">
          <div className="section-shell" data-scroll-reveal>
            <div className="product-heading">
              <h2 id="product-title">Everything you need to move work forward.</h2>
            </div>
            <div className="product-tabs" role="tablist" aria-label="TaskFlow product features">
              {productTabs.map((tab, index) => (
                <button
                  aria-controls="product-panel"
                  aria-selected={activeProductIndex === index}
                  className={`product-tab ${activeProductIndex === index ? 'active' : ''}`}
                  id={`product-tab-${index}`}
                  key={tab.id}
                  onClick={() => setActiveProductIndex(index)}
                  onKeyDown={(event) => handleTabKeyDown(event, index)}
                  role="tab"
                  tabIndex={activeProductIndex === index ? 0 : -1}
                  type="button"
                >
                  {tab.label}
                </button>
              ))}
            </div>
            <div
              aria-labelledby={`product-tab-${activeProductIndex}`}
              className="product-panel"
              id="product-panel"
              key={activeProduct.id}
              role="tabpanel"
              tabIndex={0}
            >
              <div className="product-copy">
                <h3>{activeProduct.heading}</h3>
                <p>{activeProduct.description}</p>
              </div>
              <div className="product-preview">
                <ProductPreview type={activeProduct.preview} />
              </div>
            </div>
          </div>
        </section>

        <section className="collaboration-section" aria-labelledby="collaboration-title">
          <div className="section-shell collaboration-layout" data-scroll-reveal>
            <div className="collaboration-visual">
              <TaskDetailsPreview />
            </div>
            <div className="collaboration-copy">
              <h2 id="collaboration-title">Keep everyone on the same page.</h2>
              <p>Give every task a clear owner and keep the details your team needs close to the work.</p>
              <ul>
                <li>Know who is responsible for every task.</li>
                <li>Keep progress and deadlines visible.</li>
                <li>Keep your team's work and conversations organized.</li>
              </ul>
              <GetStartedLink className="text-link" />
            </div>
          </div>
        </section>

        <section className="workflow-section" id="how-it-works" aria-labelledby="workflow-title">
          <div className="section-shell" data-scroll-reveal>
            <div className="workflow-heading">
              <h2 id="workflow-title">From idea to done.</h2>
              <p>Three clear steps help your team move from a project goal to completed work.</p>
            </div>
            <ol className="workflow-timeline">
              {workflowSteps.map((step, index) => (
                <li className="workflow-step" key={step.title}>
                  <span className="workflow-number">0{index + 1}</span>
                  <div className="workflow-copy"><h3>{step.title}</h3><p>{step.description}</p></div>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section className="final-cta" aria-labelledby="final-cta-title">
          <div className="section-shell final-cta-inner" data-scroll-reveal>
            <h2 id="final-cta-title">Your next project starts here.</h2>
            <div className="final-cta-actions">
              <GetStartedLink className="button button-primary button-large" iconSize={17} />
            </div>
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <div className="section-shell footer-inner">
          <div className="footer-main">
            <div className="footer-brand">
              <a className="wordmark" href="#home"><span className="brand-mark">T</span><span>TaskFlow</span></a>
              <p>Projects, tasks, and teamwork in one workspace.</p>
            </div>
            <nav className="footer-links" aria-label="Footer navigation">
              <span className="footer-links-label">Explore</span>
              <a href="#product">Product</a>
              <a href="#how-it-works">How It Works</a>
            </nav>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default App

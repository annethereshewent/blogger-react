import '../../styles/logo.scss'

export function DashboardLogo() {
  return (
    <div>
      <h1 id="title" className="dashboard">
        <span className="bracket">[</span>
        <span className="title-text">B</span>
        <span className="bracket">]</span>
        <span className="period">.</span>
      </h1>
      <div style={{ clear: 'right' }} />
    </div>
  )
}

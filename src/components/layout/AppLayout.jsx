import LoadingBarPackage from 'react-redux-loading-bar'
import LeftSidebar from './LeftSidebar'
import RightSidebar from './RightSidebar'

const LoadingBar = LoadingBarPackage.default || LoadingBarPackage

function AppLayout ({ children }) {
  return (
    <div className="app-container">
      <LoadingBar
        style={{
          backgroundColor: '#111827',
          height: '3px',
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 99999
        }}
      />
      <div className="layout-wrapper">
        <LeftSidebar />
        <main className="main-content">{children}</main>
        <RightSidebar />
      </div>
    </div>
  )
}

export default AppLayout

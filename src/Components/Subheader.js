import React, { useState, useEffect, useContext } from 'react'
import { GlobalState } from '../App'
import useScroll from '../Hooks/useScroll'

function Subheader({ page }) {
  const { scrollPosition, scrollDirection } = useScroll()
  const { dispatch } = useContext(GlobalState)

  // ${page === "events" ? "" : ""}
  return (
    <div
      id="subheader"
      className={
        `${scrollPosition > window.innerHeight ? "fixed" : ""} ${scrollDirection === "up" ? "offset" : ""}`
      }
    >
      {
        page === "projects" ? 
        <ProjectViewToggle dispatch={dispatch} scrollPosition={scrollPosition} /> : 
        <DateFilter dispatch={dispatch} scrollPosition={scrollPosition} />
      }
    </div>
  )
}

function ProjectViewToggle({ dispatch, scrollPosition }) {
  const [viewMode, setViewMode] = useState("category")


  const handleProjectToggle = (event) => {
    if (scrollPosition > window.innerHeight) window.scrollTo(0, window.innerHeight - 60);
    const viewMode = event.target.innerHTML.toLowerCase()
    setViewMode(viewMode)
    dispatch({ type: "toggle-projects-view-mode", viewMode })
  }

  useEffect(() => {
    dispatch({ type: "toggle-projects-view-mode", viewMode: "category" })
    return () => {
      dispatch({ type: "toggle-projects-view-mode", viewMode: "category" })
    }
  }, [dispatch])

  return (
    <div id="project-view-toggle">
      <h6>View by</h6>
      <div id="toggle-buttons">
        <button
          className={viewMode === "category" ? "selected" : ""}
          onClick={handleProjectToggle}
        >
          CATEGORY
            </button>
        <button
          className={viewMode === "student" ? "selected" : ""}
          onClick={handleProjectToggle}
        >
          STUDENT
            </button>
      </div>
    </div>
  )

}

function DateFilter({ dispatch, scrollPosition }) {
  const [dateFilter, setDateFilter] = useState("all")

  const handleDateFilter = (event) => {
    // const filter = event.target.innerHTML.toLowerCase().replace(/ /g, "-");
    if (scrollPosition > window.innerHeight) window.scrollTo(0, window.innerHeight - 60);
    const filter = event.target.id;
    setDateFilter(filter);
    dispatch({ type: "set-date-filter", filter })
  }

  useEffect(() => {
    dispatch({ type: "set-date-filter", filter: "all" })
    return () => {
      dispatch({ type: "set-date-filter", filter: "all" })
    }
  }, [dispatch])

  return (
    <div id="date-filter">
      <button
        className={dateFilter === "all" ? "selected" : ""}
        id="all"
        onClick={handleDateFilter}
      >
        ALL
      </button>
      <button
        className={dateFilter === "august-27" ? "selected" : ""}
        id="august-27"
        onClick={handleDateFilter}
      >
        AUG 27
      </button>
      <button
        className={dateFilter === "august-28" ? "selected" : ""}
        id="august-28"
        onClick={handleDateFilter}
      >
        AUG 28
      </button>
      <button
        className={dateFilter === "august-29" ? "selected" : ""}
        id="august-29"
        onClick={handleDateFilter}
      >
        AUG 29
      </button>
    </div>
  )
}

export default Subheader

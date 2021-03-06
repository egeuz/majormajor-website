import React, { useState, useEffect, useContext } from 'react'
import { GlobalState } from '../App'

import fetchPageContent from '../CMS/fetchPageContent'
import useWindowSize from '../Hooks/useWindowSize'
import useScroll from '../Hooks/useScroll'

/* COMPONENTS */
import VideoBackground from '../Components/VideoBackground'
import ProjectsLanding from '../Components/ProjectsLanding'
import ProjectsShowcase from '../Components/ProjectsShowcase'

function Projects() {
  const [content, setContent] = useState("");
  const { state, dispatch } = useContext(GlobalState);

  const { windowWidth, windowHeight } = useWindowSize();
  const { scrollPosition } = useScroll();


  useEffect(() => {
    window.scrollTo(0, 0);
    fetchPageContent("projects_landing", setContent);

  }, [dispatch])

  return (
    <React.Fragment>
      {
        content && state.projects &&
        <div id="projects">
          <VideoBackground
            videoURL={windowWidth < 500 ? "" : scrollPosition < windowHeight / 3 ? content.hero_video.url : state.currentCategory ? state.currentCategory.category_video.url : content.hero_video.url}
            imageURL={content.hero_image.url}
            position={
              windowWidth >= 750 && scrollPosition > windowHeight / 3 ? "left" :
                windowWidth < 750 ? "right" :
                  "center"
            }
            attachment={windowWidth >= 750 ? "fixed" : ""}
          />

          <ProjectsLanding
            leftHand={content.left_hand}
            rightHand={content.right_hand}
            logotype={content.logotype}
          />

          <ProjectsShowcase categories={content.categories} bgVideo={content.student_view_video} bgImage={content.student_view_image} />
        </div>
      }
    </React.Fragment>
  )
}

export default Projects

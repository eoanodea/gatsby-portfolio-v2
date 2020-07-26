import React, { useEffect, useCallback } from "react"

import { Text, Heading, Box } from "rebass/styled-components"
import CountUp from "react-countup"

import styled from "styled-components"
import { motion } from "framer-motion"
import { TOGGL_KEY } from "gatsby-env-variables"
import { Fade, Flip } from "react-reveal"

const StyledToolSubHeading = styled(Heading)`
  font-size: 1.8em;
  font-weight: 600;
  margin: 20px 0;
  @media (max-width: 400px) {
    font-size: 1.5em;
  }
`
const StyledToolText = styled(Text)`
  font-size: 1.5em;
  margin: 20px;
  @media (max-width: 400px) {
    font-size: 1.4em;
  }
`

const StyledLoadingAnimation = styled(motion.div)`
  background: ${props => props.theme.colors.primaryDark};
  border-radius: 30px;
  width: 25px;
  height: 25px;
`

const ProjectHours = ({ togglId, setWorkSpaceIdFromProps }) => {
  const [hours, setHours] = React.useState(0)
  const [running, setRunning] = React.useState(false)

  const [loading, setLoading] = React.useState(true)

  const fetchProject = useCallback(() => {
    if (!running) {
      setRunning(true)
      const auth = `Basic ${Buffer.from(TOGGL_KEY + ":api_token").toString(
        "base64"
      )}`

      fetch(`/api/v8/projects/${togglId}`, {
        method: "GET",
        headers: {
          Authorization: auth,
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
      })
        .then(res => res.json())
        .then(res => {
          setHours(res.data.actual_hours)
          setLoading(false)
          setWorkSpaceIdFromProps({
            wid: res.data.wid,
            created: res.data.created_at,
          })
        })
        .catch(err => {
          console.log("response err!", err)
          setLoading(false)
        })
    }
  })

  useEffect(() => {
    console.log("running effect")
    if (togglId && loading) {
      fetchProject()
    }

    // if (hours === 0 && togglId && loading) fetchProject()
  }, [togglId, loading, fetchProject])

  if (togglId) {
    return (
      <Box minWidth={[2 / 4, 1 / 3]} p={2}>
        <div
          style={{
            textAlign: "left",
            backgroundColor: "#000",
            borderRadius: 12,
          }}
        >
          {hours === 0 && loading ? (
            <Fade>
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  margin: 22,
                }}
              >
                <StyledLoadingAnimation
                  animate={{
                    scale: [1, 1.8, 1.8, 1, 1],
                    rotate: [0, 0, 270, 270, 0],
                    borderRadius: ["20%", "20%", "50%", "50%", "20%"],
                  }}
                  transition={{
                    duration: 2,
                    ease: "easeInOut",
                    times: [0, 0.2, 0.5, 0.8, 1],
                    loop: Infinity,
                    repeatDelay: 1,
                  }}
                ></StyledLoadingAnimation>
              </div>
              <StyledToolText color="white" textAlign="center">
                Checking..
              </StyledToolText>
            </Fade>
          ) : (
            <Flip bottom cascade>
              <StyledToolSubHeading color="white">Hours:</StyledToolSubHeading>
              <StyledToolText color="background">
                <CountUp end={hours} duration={6} />
              </StyledToolText>
            </Flip>
          )}
        </div>
      </Box>
    )
  }

  return <></>
}

export default ProjectHours

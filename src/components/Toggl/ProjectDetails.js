import React from "react"

import { Text, Heading, Box, Flex } from "rebass/styled-components"

import styled from "styled-components"
import { motion } from "framer-motion"
import { TOGGL_KEY } from "gatsby-env-variables"
import { Fade, Flip } from "react-reveal"
import moment from "moment"
import ProjectHours from "./ProjectHours"

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

const ProjectDetails = ({ togglId }) => {
  const [workSpaceObj, setWorkSpaceObj] = React.useState(null)

  const setWorkSpaceIdFromProps = obj => {
    console.log("yeehaw", obj)
    setWorkSpaceObj(obj)
    fetchProjectSummary(obj)
  }

  const [entries, setEntries] = React.useState([])
  const [totalEntries, setTotalEntries] = React.useState(0)
  const [loading, setLoading] = React.useState(true)

  const fetchProjectSummary = obj => {
    if (togglId && obj) {
      const auth = `Basic ${Buffer.from(TOGGL_KEY + ":api_token").toString(
        "base64"
      )}`

      fetch(
        `/reports/api/v2/summary?since=${moment(obj.created).format(
          "YYYY-MM-DD"
        )}&workspace_id=${obj.wid}&project_ids=${togglId}&user_agent=api_test`,
        {
          method: "GET",
          headers: {
            Authorization: auth,
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
          },
        }
      )
        .then(res => res.json())
        .then(res => {
          console.log("response success!", res)
          setEntries(res.data[0].items)
          setTotalEntries(res.data[0].items.length)
          setLoading(false)
        })
        .catch(err => {
          console.log("response err!", err)
          setLoading(false)
        })
    }
  }

  const loadingAnimation = () => (
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
  )

  if (togglId) {
    return (
      <Flex justifyContent="space-between" flexWrap="wrap">
        <ProjectHours
          setWorkSpaceIdFromProps={setWorkSpaceIdFromProps}
          togglId={togglId}
        />
        {workSpaceObj && (
          <React.Fragment>
            <Box minWidth={[2 / 4, 1 / 3]} p={2}>
              <div
                style={{
                  textAlign: "left",
                  backgroundColor: "#000",
                  borderRadius: 12,
                }}
              >
                {workSpaceObj.created && loading ? (
                  loadingAnimation()
                ) : (
                  <Flip bottom cascade delay={200}>
                    <StyledToolSubHeading color="white">
                      Started:
                    </StyledToolSubHeading>
                    <StyledToolText color="background">
                      {moment(workSpaceObj.created).format("MM / YY")}
                    </StyledToolText>
                  </Flip>
                )}
              </div>
            </Box>
            <Box minWidth={[1, 1 / 3]} p={2}>
              <div
                style={{
                  textAlign: "left",
                  backgroundColor: "#000",
                  borderRadius: 12,
                }}
              >
                {totalEntries !== 0 && loading ? (
                  loadingAnimation()
                ) : (
                  <Flip bottom cascade delay={200}>
                    <StyledToolSubHeading color="white">
                      # of Entries:
                    </StyledToolSubHeading>
                    <StyledToolText color="background">
                      {totalEntries}
                    </StyledToolText>
                  </Flip>
                )}
              </div>
            </Box>
          </React.Fragment>
        )}
      </Flex>
    )
  }

  return <></>
  //   return <CountUp start={0} end={hours} duration={5} useEasing={true} />
}

export default ProjectDetails

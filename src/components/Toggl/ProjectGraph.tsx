import React from "react"
import { ColumnChart } from "@opd/g2plot-react"
import { Box } from "rebass"
import moment from "moment"
import { Fade } from "react-reveal"

let config = {
  title: {
    visible: true,
    text: "Yeehaw title",
  },
  autoFit: true,
  smooth: true,
  color: `#fa26a0`,
  data: [],
  padding: "none",
  xField: "week",
  yField: "hours",
  xAxis: {
    tickCount: 10,
  },
  meta: {
    week: {
      alias: "alias",
    },
    hours: {
      alias: "hours",
    },
  },
}

const convertSecondsToHours = seconds =>
  parseInt(moment.utc(seconds * 1000).format("hh"))

const ProjectGraph = ({ entries, start, end }) => {
  if (entries.length > 0) {
    const data = entries.map((dat, i) => ({
      hours: convertSecondsToHours(dat.seconds),
      week: `Week ${i + 1}`,
    }))

    config.data = data

    return (
      <Box width={1}>
        {/* <Fade delay={50}> */}
        <ColumnChart {...config} />
        {/* </Fade> */}
      </Box>
    )
  }

  return <></>
}

export default ProjectGraph

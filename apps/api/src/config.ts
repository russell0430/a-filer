import path from "node:path"
import { MediaOption } from "./prisma/uploadStat/types"

const BackendDeomainAndPort = "https://russell0430.github.io/static"

const option: MediaOption = {
  audio: {
    name: "audio",
    create: ({ pathname, label }) => {
      return {
        name: label,
        url: `${BackendDeomainAndPort}${pathname}`,
        label: pathname,
      }
    },
    ext: "mp3",
  },
  video: {
    name: "video",
    create: ({ pathname, label }) => {
      return {
        name: label,
        url: `${BackendDeomainAndPort}${pathname}`,
      }
    },
    ext: "mp4",
  },
  markdown: {
    name: "markdown",
    create: ({ pathname, label }) => {
      return {
        name: label,
        url: `${BackendDeomainAndPort}${pathname}`,
      }
    },
    ext: "md",
  },
  image: {
    name: "image",
    create: ({ pathname, label }) => {
      return {
        name: label,
        url: `${BackendDeomainAndPort}${pathname}`,
      }
    },
    ext: ["jpg", "png"],
  },
}

export default option

// format
// 89 to '01:29'
// 29 to '00:29'
export const formatTime = (time: number): string => {
    let remainingTime = Math.round(time)
    const times: string[] = []
    if (remainingTime < 60) {
      return `00:${remainingTime.toString().padStart(2, "0")}`
    }
    while (remainingTime >= 60) {
      const timeNum = Math.floor(remainingTime / 60)
      times.push(
        Math.ceil(remainingTime - 60 * timeNum)
          .toString()
          .padStart(2, "0")
      )
      remainingTime = timeNum
    }
    times.push(remainingTime.toString().padStart(2, "0"))
    return times.reverse().join(":")
  }
  
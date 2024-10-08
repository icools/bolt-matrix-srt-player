interface Subtitle {
  start: number
  end: number
  text: string
}

export const parseSRT = (srtContent: string): Subtitle[] => {
  const subtitles: Subtitle[] = []
  const subtitleBlocks = srtContent.trim().split('\n\n')

  for (const block of subtitleBlocks) {
    const lines = block.split('\n')
    if (lines.length < 3) continue

    const timeLine = lines[1]
    const [startTime, endTime] = timeLine.split(' --> ')

    const start = timeToSeconds(startTime)
    const end = timeToSeconds(endTime)
    const text = lines.slice(2).join(' ')

    subtitles.push({ start, end, text })
  }

  return subtitles
}

const timeToSeconds = (timeString: string): number => {
  const [hours, minutes, seconds] = timeString.split(':')
  const [secs, ms] = seconds.split(',')
  return parseInt(hours) * 3600 + parseInt(minutes) * 60 + parseInt(secs) + parseInt(ms) / 1000
}
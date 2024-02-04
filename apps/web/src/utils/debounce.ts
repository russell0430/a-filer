// 这里需要处理 video 组件的一个 handler
// 在 video 中 ,鼠标在视频的元素里运动, 会使下面的控制板出现,
// 并且在未触发这个监听函数后几秒钟消失,
// 同时在一定时间连续触发后, 需要续这个时间
function debounce<T extends (...args: unknown[]) => void>(
  trigger: T,
  end: () => void,
  delay: number
): T {
  let timer: NodeJS.Timeout | null = null
  return ((...args) => {
    if (timer === null) {
      trigger(...args)
    } else if (timer) clearTimeout(timer)
    timer = setTimeout(() => {
      //
      timer = null
      end()
    }, delay)
  }) as T
}

export { debounce }

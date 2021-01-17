export function dist(x1, y1, x2, y2) {
  const X = x2 - x1
  const Y = y2 - y1
  return Math.sqrt(X**2 + Y**2)
}

export function inCircle(x1, y1, x2, y2, cx, cy, r) {
  const len = dist(x1, y1, x2, y2)
  const X = x2 - x1
  const Y = y2 - y1
  const p = (
    (cx - x1) * X +
    (cy - y1) * Y
  ) / len**2

  return dist(
    x1 + p * X,
    y1 + p * Y,
    cx, cy
  ) < r
}
export function* accord () {
  for (let x = 1; x <= 3; x++) {
    for (let y = 1; y <= 3; y++) {
      for (let z = 1; z <= 3; z++) {
        yield [ x, y, z ]
      }
    }
  }
}

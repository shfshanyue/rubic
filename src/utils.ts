export function permutation (order: number, list: number[][] = []): number[][] {
  if (order === 1) {
    return [[1]]
  }
  const newList = []
  for (let i = order; i > 0; i--) {
    const prevPermutation = permutation(order-1)
    for (const item of prevPermutation) {
      newList.push([...item, i])
    }
  }
  return newList
}

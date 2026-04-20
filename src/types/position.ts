export const FILES = ["a", "b", "c", "d", "e", "f", "g", "h"] as const
export type File = (typeof FILES)[number]

export const RANKS = [1, 2, 3, 4, 5, 6, 7, 8] as const
export type Rank = (typeof RANKS)[number]

export function isFile(value: string): value is File {
  return FILES.includes(value as File)
}

export function isRank(value: number): value is Rank {
  return RANKS.includes(value as Rank)
}

export type Position = {
  file: File
  rank: Rank
}

export type PositionString = `${File}${Rank}`

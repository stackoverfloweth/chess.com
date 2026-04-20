import { FILES, RANKS, isFile, isRank, type Position } from "@/types/position"

export function getFileIndex(file: string): number {
  if (!isFile(file)) {
    return NaN
  }

  return FILES.indexOf(file)
}

export function getRankIndex(rank: number): number {
  if (!isRank(rank)) {
    return NaN
  }

  return RANKS.indexOf(rank)
}

export function isDarkSquare(position: Position) {
  return (getFileIndex(position.file) + getRankIndex(position.rank)) % 2 === 0
}

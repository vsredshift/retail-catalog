export function damerauLevenshtein(a: string, b: string): number {
  const lenA = a.length;
  const lenB = b.length;
  const INF = lenA + lenB;

  const score: number[][] = [];

  for (let i = 0; i <= lenA + 1; i++) {
    score[i] = [];
    for (let j = 0; j <= lenB + 1; j++) {
      score[i][j] = 0;
    }
  }

  const da: Record<string, number> = {};

  score[0][0] = INF;
  for (let i = 0; i <= lenA; i++) {
    score[i + 1][1] = i;
    score[i + 1][0] = INF;
  }
  for (let j = 0; j <= lenB; j++) {
    score[1][j + 1] = j;
    score[0][j + 1] = INF;
  }

  for (let d of a + b) {
    da[d] = 0;
  }

  for (let i = 1; i <= lenA; i++) {
    let db = 0;
    for (let j = 1; j <= lenB; j++) {
      const i1 = da[b[j - 1]];
      const j1 = db;

      const cost = a[i - 1] === b[j - 1] ? 0 : 1;
      if (cost === 0) db = j;

      score[i + 1][j + 1] = Math.min(
        score[i][j] + cost, // substitution
        score[i + 1][j] + 1, // insertion
        score[i][j + 1] + 1, // deletion
        score[i1] && j1
          ? score[i1][j1] +
              (i - i1 - 1) +
              1 +
              (j - j1 - 1) // transposition
          : INF
      );
    }
    da[a[i - 1]] = i;
  }

  return score[lenA + 1][lenB + 1];
}

function shouldNestBullet(lines: string[], currentIndex: number) {
  for (let i = currentIndex + 1; i < lines.length; i++) {
    const trimmed = lines[i].trim();
    if (!trimmed) {
      continue;
    }
    return /^-\s+/.test(trimmed);
  }
  return false;
}

export function formatInterviewAnswer(content: string) {
  const normalized = content
    .replace(/\r\n/g, '\n')
    .replace(/([：:。；;）)])\s*(\d+\.\s)/g, '$1\n$2')
    .replace(/([：:。；;）)])\s*(-\s)/g, '$1\n$2')
    .replace(/\n{3,}/g, '\n\n')
    .trim();

  const lines = normalized.split('\n');
  const result: string[] = [];
  let insideOrderedItem = false;

  for (let i = 0; i < lines.length; i++) {
    const rawLine = lines[i];
    const trimmed = rawLine.trim();

    if (!trimmed) {
      if (insideOrderedItem && shouldNestBullet(lines, i)) {
        continue;
      }
      result.push('');
      continue;
    }

    if (/^\d+\.\s+/.test(trimmed)) {
      insideOrderedItem = true;
      result.push(trimmed);
      continue;
    }

    if (insideOrderedItem && /^-\s+/.test(trimmed)) {
      result.push(`   ${trimmed}`);
      continue;
    }

    if (/^(###|##|#)\s+/.test(trimmed)) {
      insideOrderedItem = false;
      result.push(trimmed);
      continue;
    }

    insideOrderedItem = false;
    result.push(rawLine);
  }

  return result.join('\n').replace(/\n{3,}/g, '\n\n').trim();
}

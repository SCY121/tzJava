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
    .replace(/【面试回答重点】/g, '### 回答建议')
    .replace(/###\s*面试回答重点/g, '### 回答建议')
    .replace(/###\s*面试里重点讲哪几个/g, '### 回答建议')
    .replace(/###\s*面试重点说哪几个/g, '### 回答建议')
    .replace(/###\s*面试重点/g, '### 回答建议')
    .replace(/###\s*答题重点/g, '### 回答建议')
    .replace(/答题重点：/g, '回答建议：')
    .replace(/面试官真正想听的重点/g, '面试官真正想听什么')
    .replace(/面试里重点说哪几个/g, '面试里常说哪几个')
    .replace(/面试重点通常讲/g, '通常先讲')
    .replace(/重点讲/g, '通常先讲')
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

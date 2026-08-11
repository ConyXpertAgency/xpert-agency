export function updatePath(data: unknown, path: string[], next: unknown): unknown {
  if (path.length === 0) return next;
  const [head, ...rest] = path;
  if (Array.isArray(data)) {
    const idx = Number(head);
    const copy = [...data];
    copy[idx] = updatePath(copy[idx], rest, next);
    return copy;
  }
  if (data === null || typeof data !== "object") {
    return updatePath(/^\d+$/.test(head) ? [] : {}, path, next);
  }
  const clone = { ...(data as Record<string, unknown>) };
  clone[head] = updatePath(clone[head], rest, next);
  return clone;
}

export function removeAtPath(data: unknown, path: string[]): unknown {
  if (path.length === 0) return data;
  const [head, ...rest] = path;
  if (Array.isArray(data)) {
    const idx = Number(head);
    const copy = [...data];
    copy.splice(idx, 1);
    return copy;
  }
  if (data === null || typeof data !== "object") return data;
  const obj = data as Record<string, unknown>;
  if (rest.length === 0) {
    const restObj = { ...obj };
    delete restObj[head];
    return restObj;
  }
  return { ...obj, [head]: removeAtPath(obj[head], rest) };
}

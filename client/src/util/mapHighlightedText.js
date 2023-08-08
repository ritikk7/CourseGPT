export default function mapHighlightedTextToArray(result) {
  if (!result || !result.highlights) return [];
  const texts = result.highlights[0].texts;
  return [...texts].filter(text => text.type === 'hit').map(text => text.value);
}

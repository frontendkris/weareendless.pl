import type { PortableTextBlock } from '@portabletext/types';

export function truncateText(portableText: PortableTextBlock[], maxLength: number = 160): string {
  const plainText = portableText
    .map((block: PortableTextBlock) => {
      if (block._type === 'block' && block.children) {
        return block.children.map(child => child.text).join('');
      }
      return '';
    })
    .join(' ');

  if (plainText.length > maxLength) {
    return plainText.substring(0, maxLength) + '...';
  }
  return plainText;
}

export const isSpecialCharacter = (char: string): boolean => {
  const regExp = /^[A-Za-z]$/;
  return char !== ' ' && !regExp.test(char);
}
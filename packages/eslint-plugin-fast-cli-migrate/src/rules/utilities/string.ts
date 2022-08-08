export function spinalCase(text: string): string {
    return text
        .replace(/(?!^)([A-Z])/g, ' $1')
        .replace(/[_\s]+(?=[a-zA-Z])/g, '-').toLowerCase();
  }
/**
 * Returns a formatted URL for a given Storybook fixture.
 *
 * @param id - The Storybook fixture ID
 * @returns - the local URL for the Storybook fixture iframe
 */
 export const fixtureURL = (id: string): string => `iframe.html?id=${id.replace("-", "")}--${id}&viewMode=story`;
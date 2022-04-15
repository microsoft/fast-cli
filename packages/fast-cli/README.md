# FAST CLI

## Local Installation

`npm install --save-dev @microsoft/fast-cli`

## Global Installation

`npm install -g @microsoft/fast-cli`

> Tip
>
> Note that this is not a recommended practice, as this could cause issues if you have multiple projects which may need different versions. Instead use the local installation above and alias the commands into your project's `package.json` scripts.

## Usage

### Init

local/global install - `fast init`
npx - `npx @microsoft/fast-cli init`

Argument | Shorthand | Description | Required
---------|-----------|-------------|---------
`--defaults` | `-d` | Use defaults | No
`--template <path/to/template>` | `-t <path/to/template>` | Use a local template | No
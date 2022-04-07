# FAST CLI

## Local Installation

`npm install --save-dev @microsoft/fast-cli`

> Tip
>
> Whether to use `--save-dev` or not depends on your use case. If you are only using the FAST CLI for project setup then it's suggested to use `--save-dev`.

## Global Installation

`npm install -g @microsoft/fast-cli`

> Tip
>
> Note that this is not a recommended practice, as this could cause issues if you have multiple projects which may need different versions of webpack.
 No newline at end of file

## Usage

`npx @microsoft/fast-cli`

## Options

Argument | Shorthand | Description
---------|-----------|------------
`--defaults` | `-d` | Use defaults
`--template <path/to/template>` | `-t <path/to/template>` | Use a local template
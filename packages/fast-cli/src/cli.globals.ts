import path from "path";

export const __dirname = path.resolve(path.dirname(""));
export const defaultTemplatePath = path.join("@microsoft", "cfp-template");
export const cliPath = path.resolve(__dirname, "node_modules", "@microsoft", "fast-cli");
export const templateFolderName = "template";
/* eslint-disable no-useless-escape */
export const folderMatches = process.cwd().match(/[^(\\|\/)]+(?=$)/);
export const ascii = `

  ███████╗ █████╗ ███████╗████████╗     ██████╗██╗     ██╗
  ██╔════╝██╔══██╗██╔════╝╚══██╔══╝    ██╔════╝██║     ██║
  █████╗  ███████║███████╗   ██║       ██║     ██║     ██║
  ██╔══╝  ██╔══██║╚════██║   ██║       ██║     ██║     ██║
  ██║     ██║  ██║███████║   ██║       ╚██████╗███████╗██║
  ╚═╝     ╚═╝  ╚═╝╚══════╝   ╚═╝        ╚═════╝╚══════╝╚═╝
           A creation tool for FAST projects

`;
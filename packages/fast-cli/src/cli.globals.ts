import path from "path";

export const __dirname = path.resolve(path.dirname(""));
export const initDefaultTemplate = path.join("@microsoft", "cfp-template");
export const initDefaultFilePath = path.join("dist", "esm", "index.js");
export const initDefaultExportName = "cfpAppTemplate";
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
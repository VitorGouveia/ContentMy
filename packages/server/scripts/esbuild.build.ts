import esbuild from "esbuild"
import TsconfigPathsPlugin from "@esbuild-plugins/tsconfig-paths"
import { nodeExternalsPlugin } from "esbuild-node-externals"

const formattedFiles: string[] = []

process.argv
  .forEach(arg => {
  if(!(arg.includes("node_modules") || arg.includes("esbuild"))) {
    formattedFiles.push(arg)
  }
})

esbuild.build({
  // entryPoints: formattedFiles.sort((prev, curr) => prev.length < curr.length ? -1 : 1),
  entryPoints: ["./src/index.ts"],
  platform: "node",
  bundle: true,
  // minify: true,
  format: "cjs",
  outdir: "dist",
  // external: ["../../../../../node_modules/*"],
  // treeShaking: true,
  loader: {
    ".ts": "ts"
  },
  plugins: [nodeExternalsPlugin(), TsconfigPathsPlugin({ tsconfig: "../tsconfig.json" })]
})
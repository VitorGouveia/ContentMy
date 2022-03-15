import esbuild from "esbuild"
import TsconfigPathsPlugin from "@esbuild-plugins/tsconfig-paths"

esbuild.build({
  entryPoints: ["./src/index.ts"],
  platform: "node",
  bundle: true,
  minify: true,
  format: "cjs",
  outdir: "dist",
  loader: {
    ".ts": "ts"
  },
  plugins: [TsconfigPathsPlugin({ tsconfig: "../tsconfig.json" })]
})
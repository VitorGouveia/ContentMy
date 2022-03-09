import { app } from "./app"

import { port } from "../constants"

app.listen(port, () => console.log(`[App]: listening on ${port}`))
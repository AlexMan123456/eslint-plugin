import path from "node:path";

import hashFiles, { getFiles } from "src/utility/private/hashFiles";

hashFiles(getFiles(path.resolve("src/configs")));

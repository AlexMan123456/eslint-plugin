import path from "path";

import hashFiles, { getFiles } from "src/utility/hashFiles";

hashFiles(getFiles(path.resolve("src/configs")));

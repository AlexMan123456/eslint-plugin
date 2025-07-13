import {name, version} from "../package.json"

const plugin = {
	meta: {
		name,
		version,
		namespace: "alextheman"
	},
	configs: {},
	rules: {}
};

// for ESM
export default plugin;

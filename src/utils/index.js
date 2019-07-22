const delve = (obj, key) => (key.split('.').map(_ => obj = (obj && obj[_])), obj);

export default {
	delve,
};

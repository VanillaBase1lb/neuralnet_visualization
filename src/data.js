export async function getNodes() {
	let res = await fetch("/nodes.json");
	let data = await res.json();
	return data;
}

export async function getWeights() {
	let res = await fetch("/weights.json");
	let data = await res.json();
	return data;
}

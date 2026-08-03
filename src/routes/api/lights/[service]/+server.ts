import { error } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { env } from '$env/dynamic/private';

export const prerender = false;

const ALLOWED = new Set(['turn_on', 'turn_off']);

export const POST: RequestHandler = async ({ params, request }) => {
	if (!ALLOWED.has(params.service)) {
		throw error(400, 'Unknown light service');
	}
	const { HA_BASE_URL, HA_TOKEN, HA_ENTITY_IDS } = env;
	if (!HA_BASE_URL || !HA_TOKEN) {
		throw error(503, 'Home Assistant is not configured on the server');
	}

	let body: Record<string, unknown> = {};
	try {
		body = await request.json();
	} catch {
		// empty body is fine
	}
	if (HA_ENTITY_IDS) {
		body.entity_id = HA_ENTITY_IDS.split(',').map((s) => s.trim()).filter(Boolean);
	}

	const res = await fetch(`${HA_BASE_URL}/api/services/light/${params.service}`, {
		method: 'POST',
		headers: {
			Authorization: `Bearer ${HA_TOKEN}`,
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(body)
	});

	return new Response(res.body, {
		status: res.status,
		headers: { 'content-type': 'application/json' }
	});
};

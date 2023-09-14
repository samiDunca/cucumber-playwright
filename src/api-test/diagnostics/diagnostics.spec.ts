import { test, expect } from "@playwright/test";

test('get diagnostics', async ({request}) => {
    const _response = await request.get("/diagnostics")
    expect(_response.status()).toBe(200);
    expect(_response.ok()).toBeTruthy();
})
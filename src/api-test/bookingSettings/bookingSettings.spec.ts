import { test, expect } from "@playwright/test";

let bookingSettingId = "7cf3c7e7-aaba-4944-9a54-a10bf956e1a0"

test.describe.parallel("Verify all Get endpoints for booking settings", () => {
  test("Verify that all booking settings can be retrieved", async ({ request }) => {
    const _response = await request.get("/bookingSettings");
    expect(_response.status()).toBe(200);
    expect(_response.ok()).toBeTruthy();
  });

  test("Verify that a booking setting can be retrieved by id", async ({request}) => {
    const _response = await request.get(`/bookingSettings/${bookingSettingId}`)
    expect(_response.status()).toBe(200);
    expect(_response.ok()).toBeTruthy();
  })
});

test.describe.parallel("Verify all Put endpoints for booking settings", () => {
    test("Verify that a booking setting can be updated by id", async ({request}) => {
        const _response = await request.put(`/bookingSettings/${bookingSettingId}`, {
            data: {
                bookingURL: "https://dev-samiDunca.com" 
            }
        })
        expect(_response.status()).toBe(200);
        expect(_response.ok()).toBeTruthy();
    })

    test("Verify that a booking setting with false id returns an error", async ({request}) => {
        const _response = await request.put(`/bookingSettings/false-id`, {
            data: {
                bookingURL: "https://dev-samiDunca.com" 
            }
        })
        expect(_response.status()).toBe(404);
        expect(_response.ok()).toBeFalsy();
    })

    test("Verify that a booking setting with wrond data type in payload is not updated", async ({request}) => {
        const _response = await request.put(`/bookingSettings/${bookingSettingId}`, {
            data: {
                bookingURL: 4
            }
        })
        expect(_response.status()).toBe(400);
        expect(_response.ok()).toBeFalsy();
    })
});
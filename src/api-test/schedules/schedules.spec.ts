import { test, expect } from "@playwright/test";
import { faker } from "@faker-js/faker";

let servicePointsSettingId = "2bc88bac-34b9-43b3-bfb3-d260fad6d941";
let scheduleId = "3fa83d6d-94df-45c6-89b0-bb24e75a253e";
let scheduleDeleteId = "0df955be-8baa-46ab-9996-e1fb82ee52d1"

test("Verify get all schedules", async ({ request }) => {
  const _response = await request.get("/schedules");
  expect(_response.status()).toBe(200);
  expect(_response.ok()).toBeTruthy();
});

test("Verify post new schedule", async ({ request }) => {
  const _response = await request.post(
    `/schedules?servicePointsSettingId=${servicePointsSettingId}`,
    {
      data: {
        occurrences: [],
        color: "#F5A5A5",
        startDate: "2023-08-04T04:48:10",
        fees: [],
        name: `${faker.internet.userName()}`,
        startTime: "01:00:00",
        endTime: "01:30:00",
        recurrence: 0,
        endDate: null,
        scheduleServicePointRules: [
          {
            servicePointId: "341c919d-1913-47a4-9259-015ec992f978",
            allowOnlineBooking: true,
          },
          {
            servicePointId: "252e4a31-04a9-4066-b625-26e467214df3",
            allowOnlineBooking: true,
          },
          {
            servicePointId: "9f1a84e3-edb0-4f53-91c2-70934d8db879",
            allowOnlineBooking: true,
          },
          {
            servicePointId: "8fc0f272-83ef-4dd0-9493-79e53cf91ee4",
            allowOnlineBooking: false,
          },
        ],
        scheduleBookingGroupRules: [
          {
            bookingGroupId: "9fd2274f-fbbb-4f9b-9c94-29389a3129c3",
            allowBooking: false,
          },
        ],
        servicePointsSettingId: "2bc88bac-34b9-43b3-bfb3-d260fad6d941",
      },
    }
  );
  expect(_response.status()).toBe(200);
  expect(_response.ok()).toBeTruthy();
});

test("Verify get schedule by ID", async ({ request }) => {
  const _response = await request.get(`/schedules/${scheduleId}`);
  expect(_response.status()).toBe(200);
  expect(_response.ok()).toBeTruthy();
});

test.describe.parallel("Verify all PUT endpoints for schedule", () => {
  test("Verify update a schedule", async ({ request }) => {
    const _response = await request.put(`/schedules/${scheduleId}`, {
      data: {
        id: `${scheduleId}`,
        isDefault: false,
        fees: [],
        scheduleServicePointRules: [
          {
            servicePointId: "8fc0f272-83ef-4dd0-9493-79e53cf91ee4",
            allowOnlineBooking: false,
          },
          {
            servicePointId: "252e4a31-04a9-4066-b625-26e467214df3",
            allowOnlineBooking: false,
          },
          {
            servicePointId: "341c919d-1913-47a4-9259-015ec992f978",
            allowOnlineBooking: false,
          },
          {
            servicePointId: "9f1a84e3-edb0-4f53-91c2-70934d8db879",
            allowOnlineBooking: false,
          },
        ],
        scheduleBookingGroupRules: [
          {
            bookingGroupId: "f6a3a549-1f73-4890-85e5-f83d0df4888e",
            allowBooking: false,
          },
        ],
        name: "salutare x2",
        color: "#9ef9a5",
        startDate: "2023-09-13T03:49:26",
        endDate: null,
        startTime: null,
        endTime: null,
        recurrence: 2,
        servicePointsSettingId: "2bc88bac-34b9-43b3-bfb3-d260fad6d941",
        occurrences: [],
      },
    });
    expect(_response.status()).toBe(200);
    expect(_response.ok()).toBeTruthy();
  });

  test("Verify that a schedule with invalid id can not be accessed", async ({ request }) => {
    const _response = await request.put(`/schedules/invalid-id`);
    expect(_response.status()).toBe(404);
    expect(_response.ok()).toBeFalsy();
  });

  test("Verify that a schedule with bad data can not be updated", async ({ request }) => {
    const _response = await request.put(`/schedules/${scheduleId}`, {
      data: {
        id: `${scheduleId}`,
        isDefault: false,
        fees: [],
        scheduleServicePointRules: [
          {
            servicePointId: "8fc0f272-83ef-4dd0-9493-79e53cf91ee",
            allowOnlineBooking: false,
          },
          {
            servicePointId: "252e4a31-04a9-4066-b625-26e467214df3",
            allowOnlineBooking: false,
          },
          {
            servicePointId: "341c919d-1913-47a4-9259-015ec992f978",
            allowOnlineBooking: false,
          },
          {
            servicePointId: "9f1a84e3-edb0-4f53-91c2-70934d8db879",
            allowOnlineBooking: false,
          },
        ],
        scheduleBookingGroupRules: [
          {
            bookingGroupId: "f6a3a549-1f73-4890-85e5-f83d0df4888e",
            allowBooking: false,
          },
        ],
        name: "salutare x2",
        color: "#9ef9a5",
        startDate: "2023-09-13T03:49:26",
        endDate: null,
        startTime: null,
        endTime: null,
        recurrence: 2,
        servicePointsSettingId: "2bc88bac-34b9-43b3-bfb3-d260fad6d941",
        occurrences: [],
      },
    });
    expect(_response.status()).toBe(400);
    expect(_response.ok()).toBeFalsy();
  });
});

test('Verify get all schedule occurrences', async ({request}) => {
    const _response = await request.get(`/schedules/occurrences?servicePointsSettingId=${servicePointsSettingId}&start=2023-08-13T00:00:00Z&end=2023-08-13T00:00:00Z`)
    expect(_response.status()).toBe(200);
    expect(_response.ok()).toBeTruthy();
})

test.describe.parallel('Verify all DELETE endpoints for schedules', () => {
    test('Verify delete schedule by Id', async ({request}) => {
        const _response = await request.delete(`/schedules/${scheduleDeleteId}`)
        expect(_response.status()).toBe(200);
        expect(_response.ok()).toBeTruthy();
    })

    test.only('Verify that a schedule with valid endpoit returns an error', async ({request}) => {
        const _response = await request.delete(`/schedules/invalid-endpoint`)
        expect(_response.status()).toBe(404);
    expect(_response.ok()).toBeFalsy();
    })
})




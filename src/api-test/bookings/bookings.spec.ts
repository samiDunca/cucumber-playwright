import { test, expect } from "@playwright/test";
import { faker } from "@faker-js/faker";

let bookingId = "e4f2becf-f6c1-4b27-9f22-976cf095b8d1"
let servicePointId = "8fc0f272-83ef-4dd0-9493-79e53cf91ee4"

test.describe.parallel("Verify all POST endpoints for Booking create-indoor", () => {
    test("POST booking create indoor ", async ({ request }) => {
      const _response = await request.post(`/bookings/create-indoor`, {
        data: {
          reservationType:0,
          bookedByUserOrganizationId:"556d2b84-8088-4fb3-a5c0-709f93a7d94c",
          startTeeTime:"2023-10-12T23:00:00",
          duration:"01:00:00",
          servicePointId:`${servicePointId}`
       }
      });
      expect(_response.status()).toBe(200);
      expect(_response.ok()).toBeTruthy();
    });

    test("POST booking create indoor - without servicePointId ", async ({ request }) => {
      const _response = await request.post(`/bookings/create-indoor`, {
        data: {
          reservationType:0,
          bookedByUserOrganizationId:"556d2b84-8088-4fb3-a5c0-709f93a7d94c",
          startTeeTime:"2023-10-12T20:30:00",
          duration:"01:00:00"
       }
      });
      expect(_response.status()).toBe(404);
      expect(_response.ok()).toBeFalsy();
    });

    test("POST booking create indoor - invalid payload ", async ({ request }) => {
      const _response = await request.post(`/bookings/create-indoor`, {
        data: {
          reservationType: "here should not be a string",
       }
      });
      expect(_response.status()).toBe(400);
      expect(_response.ok()).toBeFalsy();
    });
})

test.describe.parallel("Verify all PUT endpoints for Booking create-indoor", () => {
  test("PUT update booking", async ({request}) => {
    const _response = await request.put(`/bookings/${bookingId}/update-indoor`, {
      data: {
       id: `${bookingId}`,
       startTeeTime:"2023-12-10T15:30:00",
       servicePointId:`${servicePointId}`,
       duration:"01:30:00"
      }
    })
    expect(_response.status()).toBe(200);
    expect(_response.ok()).toBeTruthy();
  })

  test("PUT update booking - invalid payload", async ({request}) => {
    const _response = await request.put(`/bookings/${bookingId}/update-indoor`, {
      data: {
       startTeeTime:"2023-10-10T15:30:00",
      }
    })
    expect(_response.status()).toBe(400);
    expect(_response.ok()).toBeFalsy();
  })

  test("PUT update booking - invalid id", async ({request}) => {
    const _response = await request.put(`/bookings/'invalid id'/update-indoor`, {
      data: {
       startTeeTime:"2023-10-12T15:30:00",
      }
    })
    expect(_response.status()).toBe(404);
    expect(_response.ok()).toBeFalsy();
  })
})
  
test.describe.parallel("Verify all PUT endpoints for Booking move-indoor", () => {
  test.skip("PUT update booking", async ({request}) => {
    const _response = await request.put(`/bookings/${bookingId}/move-indoor`, {
      data: {
       id: `${bookingId}`,
       startTeeTime:"2023-10-13T08:00:00",
       servicePointId:`${servicePointId}`,
       duration:"01:00:00"
      }
    })
    expect(_response.status()).toBe(200);
    expect(_response.ok()).toBeTruthy();
  })

  test("PUT update booking move-indoor - invalid payload", async ({request}) => {
    const _response = await request.put(`/bookings/${bookingId}/move-indoor`, {
      data: {
       startTeeTime:"2023-12-14T15:30:00",
      }
    })
    expect(_response.status()).toBe(400);
    expect(_response.ok()).toBeFalsy();
  })

  test("PUT update booking move-indoor - invalid id", async ({request}) => {
    const _response = await request.put(`/bookings/'invalid id'/move-indoor`, {
      data: {
       startTeeTime:"2023-12-15T15:30:00",
      }
    })
    expect(_response.status()).toBe(404);
    expect(_response.ok()).toBeFalsy();
  })
})

test.describe.parallel("Verify all POST endpoints for booking/{id}/split", () => {
  test("POST successfully created", async ({request}) => {
    const _response = await request.post(`/bookings/${bookingId}/split`, {
      data: {
        id: `${bookingId}`,
        startTeeTime:"2023-12-16T08:00:00",
        servicePointId:`8fc0f272-83ef-4dd0-9493-79e53cf91ee4`,
        duration:"01:00:00"
      }
    })
    expect(_response.status()).toBe(200);
    expect(_response.ok()).toBeTruthy();
  })

  test("POST not found", async ({request}) => {
    const _response = await request.post(`/bookings/${bookingId}/unexisting-endpoit`, {
      data: {
        id: `${bookingId}`,
        startTeeTime:"2023-12-16T08:00:00",
        servicePointId:`8fc0f272-83ef-4dd0-9493-79e53cf91ee4`,
        duration:"01:00:00"
      }
    })
    expect(_response.status()).toBe(404);
    expect(_response.ok()).toBeFalsy();
  })
})

test.describe.parallel("Verify all PATCH endpoints for booking status", () => {
  test("Patch booking status", async ({request}) => {
    const _response = await request.patch(`/bookings/${bookingId}/status`, {
      data: {
        status: 4
      }
    })
    expect(_response.status()).toBe(200);
    expect(_response.ok()).toBeTruthy();
  })

  test("Patch booking status - invalid endpoint", async ({request}) => {
    const _response = await request.patch(`/bookings/${bookingId}/statu`, {
      data: {
        status: 10
      }
    })
    expect(_response.status()).toBe(404);
    expect(_response.ok()).toBeFalsy();
  })
})
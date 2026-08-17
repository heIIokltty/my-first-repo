import { test, expect } from '@playwright/test';

test.describe.configure({ mode: 'serial' });

test.describe('API-тесты для Restful-booker', () => {

    const baseURL = 'https://restful-booker.herokuapp.com';

    let bookingId;
    let authToken;

    const bookingData = {
        firstname: 'Test',
        lastname: 'User',
        totalprice: 150,
        depositpaid: true,
        bookingdates: {
            checkin: '2026-08-20',
            checkout: '2026-08-25'
        },
        additionalneeds: 'Breakfast'
    };


    test('1. Создание бронирования - POST', async ({ request }) => {

        const response = await request.post(`${baseURL}/booking`, {
            data: bookingData
        });

        console.log('Статус:', response.status());

        expect(response.status()).toBe(200);

        const responseBody = await response.json();

        console.log('Ответ:', responseBody);

        expect(responseBody).toHaveProperty('bookingid');

        bookingId = responseBody.bookingid;

        expect(responseBody.booking.firstname).toBe(bookingData.firstname);
        expect(responseBody.booking.lastname).toBe(bookingData.lastname);
        expect(responseBody.booking.totalprice).toBe(bookingData.totalprice);
        expect(responseBody.booking.depositpaid).toBe(bookingData.depositpaid);
        expect(responseBody.booking.bookingdates.checkin)
            .toBe(bookingData.bookingdates.checkin);
        expect(responseBody.booking.bookingdates.checkout)
            .toBe(bookingData.bookingdates.checkout);
        expect(responseBody.booking.additionalneeds)
            .toBe(bookingData.additionalneeds);
    });


    test('2. Получение бронирования - GET', async ({ request }) => {

        const response = await request.get(
            `${baseURL}/booking/${bookingId}`
        );

        console.log('Статус:', response.status());

        expect(response.status()).toBe(200);

        const responseBody = await response.json();

        console.log('Ответ:', responseBody);

        expect(responseBody.firstname).toBe(bookingData.firstname);
        expect(responseBody.lastname).toBe(bookingData.lastname);
        expect(responseBody.totalprice).toBe(bookingData.totalprice);
        expect(responseBody.depositpaid).toBe(bookingData.depositpaid);
        expect(responseBody.bookingdates.checkin)
            .toBe(bookingData.bookingdates.checkin);
        expect(responseBody.bookingdates.checkout)
            .toBe(bookingData.bookingdates.checkout);
        expect(responseBody.additionalneeds)
            .toBe(bookingData.additionalneeds);
    });


    test('3. Обновление бронирования - PUT', async ({ request }) => {

        const authResponse = await request.post(`${baseURL}/auth`, {
            data: {
                username: 'admin',
                password: 'password123'
            }
        });

        expect(authResponse.status()).toBe(200);

        const authBody = await authResponse.json();

        console.log('Auth response:', authBody);

        expect(authBody).toHaveProperty('token');

        authToken = authBody.token;

        const updatedBookingData = {
            firstname: 'Updated',
            lastname: 'User',
            totalprice: 300,
            depositpaid: false,
            bookingdates: {
                checkin: '2026-09-01',
                checkout: '2026-09-05'
            },
            additionalneeds: 'Lunch'
        };

        const response = await request.put(
            `${baseURL}/booking/${bookingId}`,
            {
                headers: {
                    Cookie: `token=${authToken}`
                },
                data: updatedBookingData
            }
        );

        console.log('Статус:', response.status());

        expect(response.status()).toBe(200);

        const responseBody = await response.json();

        console.log('Обновленный ответ:', responseBody);

        expect(responseBody.firstname)
            .toBe(updatedBookingData.firstname);

        expect(responseBody.lastname)
            .toBe(updatedBookingData.lastname);

        expect(responseBody.totalprice)
            .toBe(updatedBookingData.totalprice);

        expect(responseBody.depositpaid)
            .toBe(updatedBookingData.depositpaid);

        expect(responseBody.bookingdates.checkin)
            .toBe(updatedBookingData.bookingdates.checkin);

        expect(responseBody.bookingdates.checkout)
            .toBe(updatedBookingData.bookingdates.checkout);

        expect(responseBody.additionalneeds)
            .toBe(updatedBookingData.additionalneeds);
    });


    test('4. Удаление бронирования - DELETE', async ({ request }) => {

        const response = await request.delete(
            `${baseURL}/booking/${bookingId}`,
            {
                headers: {
                    Cookie: `token=${authToken}`
                }
            }
        );

        console.log('Статус удаления:', response.status());

        expect(response.status()).toBe(201);

        const getResponse = await request.get(
            `${baseURL}/booking/${bookingId}`
        );

        console.log('Статус после удаления:', getResponse.status());

        expect(getResponse.status()).toBe(404);
    });

});
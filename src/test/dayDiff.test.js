const request = require('supertest')

import { calcDayDiff } from '../client/js/api.js'

describe("calcDayDiff function", () => {
    it("should return 0 for the same dates", () => {
        const now = new Date()
        const expected = 0
        const actual = calcDayDiff(now, now)
        expect(actual).toBe(expected)
    })
    it("should return -9 for 9 days difference", () => {
        const date1 = new Date("2020-01-01")
        const date2 = new Date("2020-01-10")
        const expected = -9
        const actual = calcDayDiff(date1, date2)
        expect(actual).toBe(expected)
    })
})
import chai from "chai"

describe("Robot tests", () => {
	it("1+1 should equal 2", function () {
		const result = () => 1 + 1

		chai.expect(result()).equal(2)
	})
})

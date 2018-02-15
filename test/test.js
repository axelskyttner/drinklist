var expect = require("chai").expect
var utils = require("../util.js")

describe("",()=>{
    it("example with constant diff", ()=>{
            console.log("utils",utils)
            list = [1,2,3,4]
            const res = utils.calculateMeanDifference(list)
            expect(res).to.equal(1)
    })

    it("example with only one element", ()=>{
            console.log("utils",utils)
            list = [1]
            const res = utils.calculateMeanDifference(list)
            expect(res).to.equal(0)
    })
    it("", ()=>{
            list = [1,2,3,4]
            const res = utils.parseTime("01:04")
            expect(res).to.equal(3600 + 4* 60)
    })
})

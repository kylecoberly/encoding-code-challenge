const {
  encode, binaryToDecimal, scrambleBits,
  characterToBinary, decimalToBinary, padBinary,
  padBytes,
} = require("../index")

describe("Encoding examples", () => {
  it("returns the correct decimal value for 'A'", () => {
    const input = "A"
    const output = 16777217

    expect(encode(input)).toEqual(output)
  })
  it("returns the correct decimal value for 'FRED'", () => {
    const input = "FRED"
    const output = 251792692

    expect(encode(input)).toEqual(output)
  })
  it("returns the correct decimal value for 'A'", () => {
    const input = " :^)"
    const output = 79094888

    expect(encode(input)).toEqual(output)
  })
})

describe("binaryToDecimal", () => {
  it("converts 0 from binary to decimal", () => {
    const binary = [0]
    const decimal = 0
    expect(binaryToDecimal(binary)).toEqual(decimal)
  })
  it("converts 1 from binary to decimal", () => {
    const binary = [1]
    const decimal = 1
    expect(binaryToDecimal(binary)).toEqual(decimal)
  })
  it("converts 2 from binary to decimal", () => {
    const binary = [1, 0]
    const decimal = 2
    expect(binaryToDecimal(binary)).toEqual(decimal)
  })
  it("converts 16777217 from binary to decimal", () => {
    const binary = [
      0,0,0,0,0,0,0,1,
      0,0,0,0,0,0,0,0,
      0,0,0,0,0,0,0,0,
      0,0,0,0,0,0,0,1,
    ]
    const decimal = 16777217
    expect(binaryToDecimal(binary)).toEqual(decimal)
  })
})

describe("scrambleBits", () => {
  it("should scramble the bits from example #1 correctly", () => {
    const inputBinary = [
      0,0,0,0,0,0,0,0,
      0,0,0,0,0,0,0,0,
      0,0,0,0,0,0,0,0,
      0,1,0,0,0,0,0,1,
    ]
    const outputBinary = [
      0,0,0,0,0,0,0,1,
      0,0,0,0,0,0,0,0,
      0,0,0,0,0,0,0,0,
      0,0,0,0,0,0,0,1,
    ]
    expect(scrambleBits(inputBinary)).toEqual(outputBinary)
  })
  it("should scramble the bits from example #2 correctly", () => {
    const inputBinary = [
      0,1,0,0,0,1,0,0,
      0,1,0,0,0,1,0,1,
      0,1,0,1,0,0,1,0,
      0,1,0,0,0,1,1,0,
    ]
    const outputBinary = [
      0,0,0,0,1,1,1,1,
      0,0,0,0,0,0,1,0,
      0,0,0,0,1,1,0,1,
      0,0,1,1,0,1,0,0,
    ]
    expect(scrambleBits(inputBinary)).toEqual(outputBinary)
  })
})

describe("characterToBinary", () => {
  it("should encode 'A' in binary", () => {
    const input = "A"
    const output = [0,1,0,0,0,0,0,1]
    expect(characterToBinary(input)).toEqual(output)
  })
})

describe("decimalToBinary", () => {
  it("should encode 0 as binary", () => {
    const input = 0
    const output = [0,0,0,0,0,0,0,0]
    
    expect(decimalToBinary(input)).toEqual(output)
  })
  it("should encode 1 as binary", () => {
    const input = 1
    const output = [0,0,0,0,0,0,0,1]
    
    expect(decimalToBinary(input)).toEqual(output)
  })
  it("should encode 70 as binary", () => {
    const input = 70
    const output = [0,1,0,0,0,1,1,0]
    
    expect(decimalToBinary(input)).toEqual(output)
  })
})

describe("padBinary", () => {
  it("should not pad a full binary number", () => {
    const input = [0, 0]
    expect(padBinary(input, 2)).toEqual(input)
  })
  it("should pad a 1 position number to 2", () => {
    const input = [0]
    const output = [0, 0]
    expect(padBinary(input, 2)).toEqual(output)
  })
  it("should pad a 1 position number to 8", () => {
    const input = [0]
    const output = [0,0,0,0,0,0,0,0]
    expect(padBinary(input, 8)).toEqual(output)
  })
})

describe("padBytes", () => {
  it("should not pad full bytes", () => {
    const input = [[0,0,0,0,0,0,0,0]]
    const output = [[0,0,0,0,0,0,0,0]]
    expect(padBytes(input, 1)).toEqual(output)
  })
  it("should not pad partial bytes", () => {
    const input = [[0,0,0,0,0,0,0,0]]
    const output = [[0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0]]
    expect(padBytes(input, 2)).toEqual(output)
  })
})

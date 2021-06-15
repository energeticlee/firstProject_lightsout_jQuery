// address1 = "1.1.1.1"
// address2 = "255.100.50.0"

// splitDot = (input) => input.split(".").join("[.]")

// // console.log(splitDot(address1))

nums1 = [1, 2, 3, 4]
nums2 = [1, 1, 1, 1, 1]

// newArray = []


newArray = (input) => {
    const array = []
    let runningSum = input[0]
    array.push(runningSum)
    for (i = 1; i < input.length; i++) {
        runningSum += input[i]
        array.push(runningSum)
    }
    return array
}

console.log(newArray(nums2))
let number = document.getElementById(`number`)
let iterations = document.getElementById(`iterations`)
let squareRootButton = document.getElementById(`squareRootButton`)
let squareRootParagraph = document.getElementById(`squareRootParagraph`)

squareRootButton.addEventListener(`click`, calculateSquareRoot)

number.addEventListener(`keydown`, keyPressed)
iterations.addEventListener(`keydown`, keyPressed)

number.focus()

function calculateSquareRoot() {
  let numberValue = number.value.trim()
  let iterationsValue = iterations.value.trim()

  if (numberValue == ``) {
    squareRootParagraph.innerHTML = `Type a number.`
  } else if (numberValue < 0) {
    squareRootParagraph.innerHTML = `Number cannot be negative.`
  } else if (numberValue != Math.floor(numberValue)) {
    squareRootParagraph.innerHTML = `Number must be an integer.`
  } else if (iterationsValue < 1 || iterationsValue > 25) {
    squareRootParagraph.innerHTML = `Number of iterations must be between 1 and 25.`
  } else {
    numberValue = Number(numberValue)
    numberValue = String(numberValue)

    let parts = getParts(numberValue)
    let dividend = parts[0]
    let divisor = ``
    let quotient = ``

    for (let i = 0; i < iterationsValue; i++) {
      let largestDigit = getLargestDigit(divisor, dividend)

      if (largestDigit == null) {
        break
      }

      divisor += largestDigit
      quotient += largestDigit

      let remainder = dividend - divisor * largestDigit

      if (remainder == 0 && parts[i + 1] == null) {
        break
      }

      dividend = remainder + (parts[i + 1] || `00`)
      divisor = String(quotient * 2)
    }

    let squareRoot = getSquareRoot(numberValue, quotient)
    squareRootParagraph.innerHTML = `Square root of ${numberValue} = ${squareRoot}`
  }
}

function getParts(numberValue) {
  let parts = []

  for (let i = numberValue.length - 1; i >= 0; i -= 2) {
    if (i > 0) {
      parts[Math.floor(i / 2)] = numberValue[i - 1] + numberValue[i]
    } else {
      parts[Math.floor(i / 2)] = numberValue[i]
    }
  }

  return parts
}

function getLargestDigit(divisor, dividend) {
  for (let digit = 9; digit >= 0; digit--) {
    let newDivisor = divisor + digit

    if (newDivisor * digit <= dividend) {
      return digit
    }
  }

  return null
}

function getSquareRoot(numberValue, quotient) {
  let squareRootNumDigits = Math.ceil(numberValue.length / 2)

  if (quotient.length < squareRootNumDigits) {
    return quotient.padEnd(squareRootNumDigits, `0`)
  } else if (quotient.length > squareRootNumDigits) {
    let quotientArray = quotient.split(``)
    quotientArray.splice(squareRootNumDigits, 0, `.`)

    return quotientArray.join(``)
  }

  return quotient
}

function keyPressed(event) {
  if (event.keyCode == 13) {
    calculateSquareRoot()
  }
}

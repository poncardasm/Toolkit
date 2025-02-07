// Get references to the DOM elements
const inputText = document.getElementById('inputText');
const convertButton = document.getElementById('convertButton');
const outputText = document.getElementById('outputText');

// Function to transform the text and copy it to the clipboard
function transformAndCopyText() {
  const text = inputText.value.trim(); // Trim spaces from the beginning and end
  const transformedText = text.toLowerCase().replace(/\s+/g, '-'); // Transform it
  outputText.textContent = transformedText; // Display the transformed text

  // Copy the transformed text to the clipboard
  navigator.clipboard
    .writeText(transformedText)
    .then(() => {
      // Change the button to indicate success
      convertButton.textContent = 'Text Copied!'; // Change button text
      convertButton.style.backgroundColor = 'green'; // Change button color
      convertButton.style.color = 'white'; // Ensure text is visible

      // Revert the button back to its original state after 2 seconds
      setTimeout(() => {
        convertButton.textContent = 'Convert'; // Reset button text
        convertButton.style.backgroundColor = '#007bff'; // Reset button color
        convertButton.style.color = 'white'; // Reset text color
      }, 3000);
    })
    .catch((err) => {
      console.error('Failed to copy text: ', err);
    });
}

// Function to enable or disable the Convert button based on input
function toggleButtonState() {
  const text = inputText.value.trim(); // Get the trimmed value of the text area
  if (text === '') {
    convertButton.disabled = true; // Disable the button if the text area is empty
    convertButton.style.backgroundColor = '#6c757d'; // Change to a disabled color (gray)
    convertButton.style.cursor = 'not-allowed'; // Change cursor to indicate it's disabled
    outputText.textContent = ''; // Clear the output text if the text area is empty
  } else {
    convertButton.disabled = false; // Enable the button if there's text
    convertButton.style.backgroundColor = '#007bff'; // Reset to the original blue color
    convertButton.style.cursor = 'pointer'; // Reset cursor to pointer
  }
}

// Add event listener to the Convert button
convertButton.addEventListener('click', transformAndCopyText);

// Add event listener to the text area to monitor input changes
inputText.addEventListener('input', toggleButtonState);

// Initialize the button state on page load
toggleButtonState();

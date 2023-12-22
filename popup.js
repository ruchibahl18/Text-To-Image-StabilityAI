// popup.js
document.addEventListener('DOMContentLoaded', function () {
    const textInput = document.getElementById('textInput');
    const generateBtn = document.getElementById('generateBtn');
    const resultContainer = document.getElementById('resultContainer');
  
    generateBtn.addEventListener('click', function () {
      const text = textInput.value;
  
      if (!text) {
        alert('Please enter text');
        return;
      }
  
      const options = {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: "Bearer YOUR_API_KEY" // Replace with your Stability.ai API key
        },
        body: JSON.stringify({
          samples: 1,
          height: 1024,
          width: 1024,
          steps: 40,
          cfg_scale: 5,
          text_prompts: [
            {
              "text": text,
              "weight": 1
            },
            {
              "text": "blurry, bad",
              "weight": -1
            }
          ],
        })
      };
  
      fetch("https://api.stability.ai/v1/generation/stable-diffusion-xl-1024-v1-0/text-to-image", options)
        .then(response => response.json())
        .then(data => {
          console.log(data)
          const imageUrl = 'data:image/png;base64,'+data.artifacts[0].base64;
          resultContainer.innerHTML = `<img src="${imageUrl}" alt="Generated Image">`;
        })
        .catch(error => {
          console.error('Error:', error);
          alert('An error occurred while generating the image');
        });
    });
  });
  
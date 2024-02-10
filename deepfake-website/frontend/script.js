document.addEventListener('DOMContentLoaded', function () {
    const uploadButton = document.getElementById('uploadButton');
    const videoFileInput = document.getElementById('videoFileInput');
    const resultText = document.getElementById('resultText');
    // Enable drag and drop functionality
    const dropArea = document.getElementById('dropArea');
    const dragMsg = document.getElementById('dragMsg');

    dropArea.addEventListener('dragover', function (event) {
        event.preventDefault();
        dropArea.classList.add('dragover');
        // added yellow border when user drags a video over the container
        dropArea.style.border = "2px dashed yellow";
        dragMsg.innerText = 'release to upload';
    });

    dropArea.addEventListener('dragleave', function (event) {
        event.preventDefault();
        dropArea.classList.remove('dragover');
        // remove yellow border when the user leaves the video file
        dropArea.style.border = "";
        dragMsg.innerText = 'or drag and drop your video file here';
    });

    dropArea.addEventListener('drop', function (event) {
        event.preventDefault();
        dropArea.classList.remove('dragover');
        dropArea.style.border = "";
        const file = event.dataTransfer.files[0];
        // check the type of the file
        if (file.type.startsWith('video/')) {
            // if the file is a video, only then accept and upload
            uploadFile(file);
        } else {
            resultText.innerText = "Sorry, only video is accepted!";
            resultText.style.color = 'red';
        }
    });

    uploadButton.addEventListener('click', function () {
        videoFileInput.click();
    });

    videoFileInput.addEventListener('change', function () {
        const file = this.files[0];
        // check the video type
        if (file.type.startsWith('video/')) {
            // if the file is a video, only then accept and upload
            uploadFile(file);
        } else {
            resultText.innerText = "Sorry, only video is accepted!";
            resultText.style.color = 'red';
        }
    });

    function uploadFile(file) {
        const formData = new FormData();
        formData.append('video', file);

        resultText.innerText = 'Waiting for result...';

        // Use fetch to send the video file to the backend
        fetch('http://localhost:8000/upload/', {
            method: 'POST',
            body: formData
        })
        .then(response => response.json())
        .then(data => {
            // Display the result received from the backend
            resultText.innerText = data.result;
            if (data.result.includes('FAKE')) {
                resultText.style.color = 'red';
            } else {
                resultText.style.color = 'green';
            }
        })
        .catch(error => {
            console.error('Error:', error);
            resultText.innerText = "An error occurred while processing the video.";
            resultText.style.color = 'red';
        });
    }
});

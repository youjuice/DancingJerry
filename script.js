let songInfoContainer = document.getElementById('songInfo');

function openModal() {
    const modal = document.getElementById('recommendationModal');
    modal.style.display = 'block';
    resetForm();
    songInfoContainer.innerHTML = '';
}

function closeModal() {
    const modal = document.getElementById('recommendationModal');
    modal.style.display = 'none';
}

window.addEventListener('click', function(event) {
    const modal = document.getElementById('recommendationModal');
    if (event.target === modal) {
        modal.style.display = 'none';
    }
});

function displaySongRecommendations(event) {
    event.preventDefault();

    const genre = document.getElementById('genre').value;
    const artist = document.getElementById('artist').value;
    const title = document.getElementById('title').value;
    const youtubeLink = document.getElementById('youtubeLink').value;

    const songInfo = [
        `[${genre}] ♫ "${title}" by ${artist}`
    ];

    if (!songInfoContainer) {
        songInfoContainer = document.createElement('div');
        songInfoContainer.id = 'songInfo';
        document.querySelector('.modal-content').appendChild(songInfoContainer);
    }

    songInfoContainer.innerHTML = '';

    songInfo.forEach(song => {
        const songItem = document.createElement('p');
        songItem.textContent = song;
        songInfoContainer.appendChild(songItem);
    });

    let url;
    if (youtubeLink.includes('youtu.be')) {
        let startIndex = youtubeLink.lastIndexOf('/') + 1;
        url = youtubeLink.substring(startIndex);
    } else if (youtubeLink.includes('v=')) {
        let startIndex = youtubeLink.indexOf('v=') + 2;
        let endIndex = youtubeLink.indexOf('&', startIndex);
        url = endIndex === -1 ? youtubeLink.substring(startIndex) : youtubeLink.substring(startIndex, endIndex);
    }

    if (!url) {
        const errorItem = document.createElement('p');
        errorItem.textContent = "Invalid YouTube URL";
        errorItem.style.color = "red";
        songInfoContainer.appendChild(errorItem);
        return;
    }
    else {
        document.getElementById('recommendationForm').style.display = 'none';
        const successItem = document.createElement('p');
        successItem.textContent = "Thank you ʕتʔ";
        songInfoContainer.appendChild(successItem);
    }

    const songData = {
        genre: genre,
        title: title,
        artist: artist,
        youtubeLink: youtubeLink
    };

    postSongRecommendations(songData).then(() => console.log('Success'));
}

function showYouTubeVideo() {
    let youtubeLink = document.getElementById("youtubeLink").value;
    let videoContainer = document.getElementById("videoContainer");

    let videoId;
    if (youtubeLink.includes('youtu.be')) {
        let startIndex = youtubeLink.lastIndexOf('/') + 1;
        videoId = youtubeLink.substring(startIndex);
    } else if (youtubeLink.includes('v=')) {
        let startIndex = youtubeLink.indexOf('v=') + 2;
        let endIndex = youtubeLink.indexOf('&', startIndex);
        videoId = endIndex === -1 ? youtubeLink.substring(startIndex) : youtubeLink.substring(startIndex, endIndex);
    }

    if (videoId) {
        let iframe = document.createElement("iframe");
        iframe.width = "560";
        iframe.height = "315";
        iframe.src = "https://www.youtube.com/embed/" + videoId;
        iframe.frameBorder = "0";
        iframe.allow = "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture";
        iframe.allowFullscreen = true;
        iframe.style.width = "100%";
        iframe.style.height = "315px";

        videoContainer.innerHTML = "";
        videoContainer.appendChild(iframe);
    }
    return false;
}

document.addEventListener('DOMContentLoaded', function() {
    const openModalBtn = document.getElementById('openModalBtn');
    const closeBtn = document.querySelector('.close');
    const recommendationForm = document.getElementById('recommendationForm');

    openModalBtn.addEventListener('click', openModal);
    closeBtn.addEventListener('click', closeModal);
    recommendationForm.addEventListener('submit', displaySongRecommendations);

    window.openModal = openModal;
    window.closeModal = closeModal;
});

async function postSongRecommendations(data) {
    try {
        console.log(data);
        const response = await fetch('http://192.168.0.113:8080/recommendations', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        });

        if (response.ok) {
            const jsonResponse = await response.json();
            console.log('Success:', jsonResponse);
        } else {
            console.error('Error:', response.statusText);
        }
    } catch (error) {
        console.error('Error:', error);
    }
}

function resetForm() {
    // 폼 요소들의 값을 초기화합니다.
    document.getElementById('genre').value = '';
    document.getElementById('artist').value = '';
    document.getElementById('title').value = '';
    document.getElementById('youtubeLink').value = '';

    // 추천하기 버튼 폼을 보여줍니다.
    document.getElementById('recommendationForm').style.display = 'block';
}
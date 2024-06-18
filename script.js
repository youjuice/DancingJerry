function openModal() {
    const modal = document.getElementById('recommendationModal');
    modal.style.display = 'block';
    displaySongRecommendations();
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

    const songList = [
        `[${genre}] ♫ "${title}" by ${artist}`,
        `Thank you ʕتʔ`
    ];

    const songListContainer = document.getElementById('songList');
    songListContainer.innerHTML = '';

    songList.forEach(song => {
        const songItem = document.createElement('p');
        songItem.textContent = song;
        songListContainer.appendChild(songItem);
    });
}

function showYouTubeVideo() {
    var youtubeLink = document.getElementById("youtubeLink").value;
    var videoContainer = document.getElementById("videoContainer");

    var videoId;
    if (youtubeLink.includes('youtu.be')) {
        var startIndex = youtubeLink.lastIndexOf('/') + 1;
        videoId = youtubeLink.substring(startIndex);
    } else if (youtubeLink.includes('v=')) {
        var startIndex = youtubeLink.indexOf('v=') + 2;
        var endIndex = youtubeLink.indexOf('&', startIndex);
        videoId = endIndex === -1 ? youtubeLink.substring(startIndex) : youtubeLink.substring(startIndex, endIndex);
    }

    if (videoId) {
        var iframe = document.createElement("iframe");
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
    } else {
        videoContainer.innerHTML = "Invalid YouTube URL";
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

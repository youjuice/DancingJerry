async function getSongRecommendations() {
    try {
        const response = await fetch('http://192.168.0.113:8080/recommendations');
        if (!response.ok) {
            console.error('Network response was not ok');
            return [];
        }
        return await response.json();
    } catch (error) {
        console.error('There was a problem with fetching the song list:', error);
        return [];
    }
}

async function deleteSongRecommendation(id) {
    try {
        const response = await fetch(`http://192.168.0.113:8080/recommendations/${id}`, {
            method: 'DELETE',
        });
        if (!response.ok) {
            console.error('Network response was not ok');
            return;
        }
        renderSongList();
    } catch (error) {
        console.error('There was a problem with deleting the song recommendation:', error);
    }
}

function showYouTubeVideo(youtubeLink) {
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

        return iframe;
    }
    return null;
}

async function renderSongList() {
    const songList = await getSongRecommendations();
    const songListContainer = document.getElementById('songList');
    songListContainer.innerHTML = ''; 

    songList.forEach(song => {
        const card = document.createElement('div');
        card.classList.add('card');

        const title = document.createElement('h3');
        title.innerHTML = `[${song.genre}]<br>${song.title} by ${song.artist}`;

        const youtubeContainer = document.createElement('div');
        youtubeContainer.classList.add('youtube-container');

        const iframe = showYouTubeVideo(song.youtubeLink);
        if (iframe) {
            youtubeContainer.appendChild(iframe);
        }

        const deleteButton = document.createElement('button');
        deleteButton.textContent = '삭제';
        deleteButton.addEventListener('click', () => deleteSongRecommendation(song.id));

        card.appendChild(title);
        card.appendChild(youtubeContainer);
        card.appendChild(deleteButton);

        songListContainer.appendChild(card);
    });
}

renderSongList();

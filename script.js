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

function displaySongRecommendations() {
    const songList = [
        '노래 1',
        '노래 2',
        '노래 3',
        '노래 4',
        '노래 5'
    ];

    const songListContainer = document.getElementById('songList');
    songListContainer.innerHTML = '';

    songList.forEach(song => {
        const songItem = document.createElement('p');
        songItem.textContent = song;
        songListContainer.appendChild(songItem);
    });
}

document.addEventListener('DOMContentLoaded', function() {
    const openModalBtn = document.getElementById('openModalBtn');
    const closeBtn = document.querySelector('.close');

    openModalBtn.addEventListener('click', openModal);
    closeBtn.addEventListener('click', closeModal);

    // 전역 스코프에 함수 노출
    window.openModal = openModal;
    window.closeModal = closeModal;
});

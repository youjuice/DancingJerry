document.addEventListener('DOMContentLoaded', function() {
    const modal = document.getElementById('recommendationModal');
    const openModalBtn = document.getElementById('openModalBtn');
    const closeBtn = document.querySelector('.close');

    console.log(modal, openModalBtn, closeBtn);  // 요소가 제대로 참조되는지 확인

    openModalBtn.addEventListener('click', function() {
        modal.style.display = 'block';
        displaySongRecommendations();
    });

    closeBtn.addEventListener('click', function() {
        modal.style.display = 'none';
    });

    window.addEventListener('click', function(event) {
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
});

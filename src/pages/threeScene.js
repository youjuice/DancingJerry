import React, { useEffect } from 'react';
import '../App.css';
import setup from '../main';
import '../assets/script';

function ThreeScene() {
  useEffect(() => {
    setup();
  }, []);

  return (
    <div className="ThreeScene">
      <span id="scrollProgress"></span>
      <main>
        <h1>Animate on Scroll</h1>
        <section>
          <h2>Begin scrolling to see Jerry's dancing</h2>
        </section>
        <section>
          <h2>Dancing Jerry~</h2>
        </section>
        <section>
          <h2>둠칫 둠칫</h2>
          <p>노래 듣는 중</p>
        </section>
        <section></section>
        <section></section>
        <section>
          <h3>아 노래 멈춤</h3>
          <p>Now you can scroll back to the top to reverse the animation</p>
        </section>
        <section>
          <h2>ㅠ.ㅠ</h2>
        </section>
        <section>
          <h2>Jerry에게 노래 추천하기</h2>
          <p>
            <button id="openModalBtn">추천 하기</button>
          </p>
        </section>
        <div id="recommendationModal" className="modal">
          <div className="modal-content">
            <span className="close">&times;</span>
            <h2>노래 추천</h2>
            <div id="songList"></div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default ThreeScene;

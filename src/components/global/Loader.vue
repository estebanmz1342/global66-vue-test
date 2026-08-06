<script lang="ts" setup></script>

<template>
  <div class="loader-container">
    <img class="wobble" src="/src/assets/Loader.svg" alt="Pokeball Loader" />
  </div>
</template>

<style>
@keyframes pulse {
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.1);
  }
  100% {
    transform: scale(1);
  }
}
@keyframes myAnim {
  0%,
  100% {
    transform: translateX(0%);
    transform-origin: 50% 50%;
  }

  15% {
    transform: translateX(-30px) rotate(-6deg);
  }

  30% {
    transform: translateX(15px) rotate(6deg);
  }

  45% {
    transform: translateX(-15px) rotate(-3.6deg);
  }

  60% {
    transform: translateX(9px) rotate(2.4deg);
  }

  75% {
    transform: translateX(-6px) rotate(-1.2deg);
  }
}
.pulse {
  width: 100px;
  height: 100px;
  background-color: #3498db;
  border-radius: 50%;
  animation: pulse 2s infinite;
}
.wobble {
  animation: myAnim 2s ease 0s infinite normal forwards;
}

.loader-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  width: 100vw;
  position: absolute;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 9999;
  /* opacity: 0.8; */
  /* filter: alpha(opacity=80); */
  /* zoom: 1; */
}
</style>

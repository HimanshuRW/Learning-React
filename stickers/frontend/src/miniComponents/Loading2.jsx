import { styled } from "styled-components";

const CSSWrapper = styled.div`
.container {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: row;
    margin: 0 auto;
    width: 100%;
    height:100vh;
    transform : scale(0.7);
}
@keyframes rotate {
    0% {
        transform: rotateX(-37.5deg) rotateY(45deg);
   }
    50% {
        transform: rotateX(-37.5deg) rotateY(405deg);
   }
    100% {
        transform: rotateX(-37.5deg) rotateY(405deg);
   }
}
.cube, .cube * {
    position: absolute;
    width: 151px;
    height: 151px;
}
.sides {
    animation: rotate 3s ease infinite;
    animation-delay: 0.8s;
    transform-style: preserve-3d;
    transform: rotateX(-37.5deg) rotateY(45deg);
}
.cube .sides * {
    box-sizing: border-box;
    background-color: rgba(242, 119, 119, .5);
    border: 15px solid white;
}
.cube .sides .top {
    animation: top-animation 3s ease infinite;
    animation-delay: 0ms;
    transform: rotateX(90deg) translateZ(150px);
    animation-fill-mode: forwards;
    transform-origin: 50% 50%;
}
@keyframes top-animation {
    0% {
        opacity: 1;
        transform: rotateX(90deg) translateZ(150px);
   }
    20% {
        opacity: 1;
        transform: rotateX(90deg) translateZ(75px);
   }
    70% {
        opacity: 1;
        transform: rotateX(90deg) translateZ(75px);
   }
    90% {
        opacity: 1;
        transform: rotateX(90deg) translateZ(150px);
   }
    100% {
        opacity: 1;
        transform: rotateX(90deg) translateZ(150px);
   }
}
.cube .sides .bottom {
    animation: bottom-animation 3s ease infinite;
    animation-delay: 0ms;
    transform: rotateX(-90deg) translateZ(150px);
    animation-fill-mode: forwards;
    transform-origin: 50% 50%;
}
@keyframes bottom-animation {
    0% {
        opacity: 1;
        transform: rotateX(-90deg) translateZ(150px);
   }
    20% {
        opacity: 1;
        transform: rotateX(-90deg) translateZ(75px);
   }
    70% {
        opacity: 1;
        transform: rotateX(-90deg) translateZ(75px);
   }
    90% {
        opacity: 1;
        transform: rotateX(-90deg) translateZ(150px);
   }
    100% {
        opacity: 1;
        transform: rotateX(-90deg) translateZ(150px);
   }
}
.cube .sides .front {
    animation: front-animation 3s ease infinite;
    animation-delay: 100ms;
    transform: rotateY(0deg) translateZ(150px);
    animation-fill-mode: forwards;
    transform-origin: 50% 50%;
}
@keyframes front-animation {
    0% {
        opacity: 1;
        transform: rotateY(0deg) translateZ(150px);
   }
    20% {
        opacity: 1;
        transform: rotateY(0deg) translateZ(75px);
   }
    70% {
        opacity: 1;
        transform: rotateY(0deg) translateZ(75px);
   }
    90% {
        opacity: 1;
        transform: rotateY(0deg) translateZ(150px);
   }
    100% {
        opacity: 1;
        transform: rotateY(0deg) translateZ(150px);
   }
}
.cube .sides .back {
    animation: back-animation 3s ease infinite;
    animation-delay: 100ms;
    transform: rotateY(-180deg) translateZ(150px);
    animation-fill-mode: forwards;
    transform-origin: 50% 50%;
}
@keyframes back-animation {
    0% {
        opacity: 1;
        transform: rotateY(-180deg) translateZ(150px);
   }
    20% {
        opacity: 1;
        transform: rotateY(-180deg) translateZ(75px);
   }
    70% {
        opacity: 1;
        transform: rotateY(-180deg) translateZ(75px);
   }
    90% {
        opacity: 1;
        transform: rotateY(-180deg) translateZ(150px);
   }
    100% {
        opacity: 1;
        transform: rotateY(-180deg) translateZ(150px);
   }
}
.cube .sides .left {
    animation: left-animation 3s ease infinite;
    animation-delay: 100ms;
    transform: rotateY(-90deg) translateZ(150px);
    animation-fill-mode: forwards;
    transform-origin: 50% 50%;
}
@keyframes left-animation {
    0% {
        opacity: 1;
        transform: rotateY(-90deg) translateZ(150px);
   }
    20% {
        opacity: 1;
        transform: rotateY(-90deg) translateZ(75px);
   }
    70% {
        opacity: 1;
        transform: rotateY(-90deg) translateZ(75px);
   }
    90% {
        opacity: 1;
        transform: rotateY(-90deg) translateZ(150px);
   }
    100% {
        opacity: 1;
        transform: rotateY(-90deg) translateZ(150px);
   }
}
.cube .sides .right {
    animation: right-animation 3s ease infinite;
    animation-delay: 100ms;
    transform: rotateY(90deg) translateZ(150px);
    animation-fill-mode: forwards;
    transform-origin: 50% 50%;
}
@keyframes right-animation {
    0% {
        opacity: 1;
        transform: rotateY(90deg) translateZ(150px);
   }
    20% {
        opacity: 1;
        transform: rotateY(90deg) translateZ(75px);
   }
    70% {
        opacity: 1;
        transform: rotateY(90deg) translateZ(75px);
   }
    90% {
        opacity: 1;
        transform: rotateY(90deg) translateZ(150px);
   }
    100% {
        opacity: 1;
        transform: rotateY(90deg) translateZ(150px);
   }
}
.text {
    margin-top: 450px;
    color: rgba(242, 119, 119, 1);
    font-size: 1.5rem;
    width: 100%;
    font-weight: 600;
    text-align: center;
}

`;

export default function Loading() {
  return (
    <CSSWrapper>
      <div class="container">
        <div class="cube">
          <div class="sides">
            <div class="top"></div>
            <div class="right"></div>
            <div class="bottom"></div>
            <div class="left"></div>
            <div class="front"></div>
            <div class="back"></div>
          </div>
        </div>
        {/* <div class="text">BUNDLING DEPENDENCIES</div> */}
      </div>
    </CSSWrapper>
  );
}

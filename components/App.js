export default ({ children }) => (
  <main style={{ marginBottom: 50 }}>
    {children}
    <style jsx global>{`
      @import url('https://fonts.googleapis.com/css?family=Lato:400,400i,900&display=swap');
      * {
      }
      body {
        margin: 0;
        font-family: 'Lato', sans-serif;
        text-rendering: optimizeLegibility;
        -webkit-font-smoothing: antialiased;
        letter-spacing: -0.015em;
      }
      a {
        color: #22bad9;
      }
      p {
        font-size: 14px;
        line-height: 24px;
      }
      article {
        margin: 0 auto;
        max-width: 650px;
      }
      input[type='text'] {
        padding: 9px 15px;
        border: 0;
        border: 1px solid #ccc;
        outline: none;
      }
      button {
        align-items: center;
        background-color: #22bad9;
        border: 0;
        color: white;
        display: flex;
        border-radius: 17px;
        padding: 10px 20px;
        transition: background-color 0.3s;
      }
      button.active {
        background-color: #017790;
        font-weight: bold;
      }
      button:active {
        background-color: #1b9db7;
      }
      button:disabled {
        background-color: #b5bebf;
      }
      button:focus {
        outline: none;
      }
      .lds-ripple {
        display: inline-block;
        position: relative;
        width: 30px;
        height: 30px;
      }
      .lds-ripple div {
        position: absolute;
        border: 4px solid #21bad9;
        opacity: 1;
        border-radius: 50%;
        animation: lds-ripple 1s cubic-bezier(0, 0.2, 0.8, 1) infinite;
      }
      .lds-ripple div:nth-child(2) {
        animation-delay: -0.5s;
      }
      @keyframes lds-ripple {
        0% {
          top: 12px;
          left: 12px;
          width: 0;
          height: 0;
          opacity: 1;
        }
        100% {
          top: 0px;
          left: 0px;
          width: 24px;
          height: 24px;
          opacity: 0;
        }
      }
    `}</style>
  </main>
)

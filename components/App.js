export default ({ children }) => (
  <main>
    {children}
    <style jsx global>{`
      @import url('https://fonts.googleapis.com/css?family=Roboto:400,700&display=swap');
      * {
        font-family: 'Roboto', sans-serif;
      }
      body {
        margin: 0;
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

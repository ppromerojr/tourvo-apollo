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
        padding: 10px;
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
    `}</style>
  </main>
)

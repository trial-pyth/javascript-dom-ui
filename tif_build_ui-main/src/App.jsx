import Intro from "./components/intro/Intro.component";
import About from "./components/about/About.component";
import Latest from "./components/latest/Latest.component";
import Footer from "./components/footer/Footer.component";

function App() {
  return (
    <div className="App">
      <Intro />
      <About />
      <Latest />
      <Footer />
    </div>
  );
}

export default App;

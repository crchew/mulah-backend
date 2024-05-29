import { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [titles, setTitles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("functions/title-aggregator")
      .then((response) => response.text())
      .then((htmlContent) => {
        setTitles(htmlContent);
        const parser = new DOMParser();
        const doc = parser.parseFromString(htmlContent, "text/html");
        const boxTitleLinks = doc.querySelectorAll("a.box_title");

        const titlesArray = [];
        // Break down each link
        boxTitleLinks.forEach((link) => {
          const titleText = link.textContent;
          const titleLink = link.getAttribute("href");

          titlesArray.push({ titleText, titleLink });
          console.log("Title:", titleText);
          console.log("Link:", titleLink);
        });
        setTitles(titlesArray);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error loading content:", error);
        setLoading(false);
      });
  }, []);

  return (
    <>
      <div>
        <h1>Mashable Site Title Aggregator</h1>

        {loading ? (
          <>
            <h2>Loading ... </h2>
            <p>It might take a while for the content to load. Please wait.</p>
          </>
        ) : (
          <ul>
            {titles.map((title, index) => (
              <li key={index}>
                <a href={title.titleLink}>{title.titleText}</a>
              </li>
            ))}
          </ul>
        )}
      </div>
    </>
  );
}

export default App;

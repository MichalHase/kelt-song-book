import { useState, useEffect } from "react";

const PageNavigation = (props) => {
  const [pages, setPages] = useState(props.length);

  useEffect(() => {
    setPages(props.length);
  }, [props.length]);

  return (
    <div className="btn-group" role="group">
      <button 
        className={`btn btn-primary ${props.actualPage === 0 ? "disabled" : ""}`}
        onClick={props.previousPageChangeHandler}>
          &#60;
      </button>
      
      {(() => {
        const rows = [];
        for (let i = 0; i < pages; i++) {
          rows.push(
            <button 
              key={i}
              className={`btn btn-primary ${props.actualPage === i ? "active" : ""}`}
              onClick={props.pageChangeHandler} value={i}>{i}</button>
              );
        }
        return rows;
      })()}
      <button
        className={`btn btn-primary ${props.actualPage === parseInt(pages, 10) ? "disabled" : ""}`}
        onClick={props.nextPageChangeHandler}>
          &#62;
      </button>
    </div>
  );
};

export default PageNavigation;

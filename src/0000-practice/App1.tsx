import { useEffect, useRef } from "react";

function App1() {
  const nameRef = useRef<HTMLInputElement>(null);

  // after render
  useEffect(() => {
    if (nameRef.current) {
      nameRef.current.focus();
    }
  },[]);

  useEffect(() => {
    document.title = "My App"
  },[]);

  return (
    <div>
      <label htmlFor="name">Name:</label>
      <input ref={nameRef} id="name" type="text" className="form-control" /> 
    </div>
  );
}

export default App1;

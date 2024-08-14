import { useEffect, useContext } from "react";
import { useLocation } from "react-router-dom";
import { LoadingContext } from "../context/loadingContext";

const Loader = () => {
  return (
    <div className="flex items-center justify-center gap-4 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
      <span className="block h-8 w-8 bg-blue-500 rounded-full animate-bounce delay-0"></span>
      <span className="block h-8 w-8 bg-blue-500 rounded-full animate-bounce delay-100"></span>
      <span className="block h-8 w-8 bg-blue-500 rounded-full animate-bounce delay-200"></span>
    </div>
  );
};

const App = () => {
  const location = useLocation();
  const { loading, setLoading } = useContext(LoadingContext);

  useEffect(() => {
    // Start loading on route change
    setLoading(true);
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000); // Simulate a minimum loading time of 1 second

    return () => {
      clearTimeout(timer); // Cleanup timer on unmount
    };
  }, [location, setLoading]);

  return (
    <>
      {loading && <Loader />}
      {/* Rest of your component rendering */}
    </>
  );
};

export default App;

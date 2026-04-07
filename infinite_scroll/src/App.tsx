import { useCallback, useEffect, useRef, useState } from "react";

type Post = {
  id: number;
  title: string
}

export default function App() {
  const [data, setData] = useState<Post[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState<boolean>(true);

  const observer = useRef<IntersectionObserver| null>(null);

  async function fetchData(pageNumber: number) {
    try {
      setLoading(true);
      const res = await fetch(`https://jsonplaceholder.typicode.com/posts?_limit=10&_page=${pageNumber}`);
      const newData = await res.json();
      setData((prev) => [...prev, ...newData]);
      if(newData.length === 0) setHasMore(false);
    } catch(e) {
      console.log(e);
    } finally {
      setLoading(false);
    }
  }


  useEffect(() => {
    fetchData(page)
  }, [page])


  const lastElementRef = useCallback((node: HTMLDivElement| null) => {
    if(loading) return; // API still running, don't create new observer. Prevent duplicate API calls.

    if(observer.current) observer.current.disconnect(); // cleans previous observer.

    observer.current = new IntersectionObserver((entries) => { // create new observer(This watches when element enters viewport).
      if(entries[0].isIntersecting && hasMore) { // checks if last element is visible on screen(User has reached last data, time to load more elements).
        setPage(prev => prev + 1)
      }
    }, { threshold: 0}); // threshold: controls when API call has to be made, 1 -> after 100% data loads, 0.5 -> after 50% data loads.

    if(node) observer.current.observe(node); // Attach observer to current last element in list.

  }, [loading, hasMore])

  return (
    <div>
      <h2>Infinite Scroll</h2>
      {data && data.map((dat, index) => <h4 ref={lastElementRef} key={index}>{dat.id}{" "}{dat.title}</h4>)}
      {loading ? <span>Loading...</span> : null}
      {!hasMore && <span>No more data...</span>}
    </div>
  )
}
import moment from "moment";
import { useEffect } from "react";
import { useState } from "react"
import { CartesianGrid, Legend, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"

const RECALLS_ENDPOINT = 'http://localhost:3000/recall';


const formatDate = (datetimeItem) => {
  return moment(datetimeItem).format('YYYY-MM-DD')
}

const App = () => {
  const [from_ts, setFrom_ts] = useState('');
  const [to_ts, setTo_ts] = useState('');

  const [recalls, setRecalls] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    // TODO: add debounce here
    setIsLoading(true);
    const recallEndpoint = new URL(RECALLS_ENDPOINT);
    recallEndpoint.search = new URLSearchParams({
      from_ts,
      to_ts,
    }).toString()
    fetch(recallEndpoint)
      .then(res => res.json())
      .then(recallsFromBackend => setRecalls(recallsFromBackend))
      .catch(err => setError(err))
      .finally(() => setIsLoading(false))
  }, [from_ts, to_ts])

  return (
    <div className='mx-auto max-w-7xl h-4/5 flex flex-col gap-2 p-4 border-2 rounded-lg'>
      <p className="text-3xl border w-fit rounded-lg p-2 font-bold">Superwise</p>
      {isLoading && <h1>Loading...</h1>}
      {error && <h1 className="text-red-400">Error {error}</h1>}
      <div className="w-full h-4/5">
        {recalls !== null && (
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              width={500}
              height={300}
              data={recalls}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" tickFormatter={formatDate} />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="recall" stroke="#82ca9d" activeDot={{ r: 8 }} />
            </LineChart>
          </ResponsiveContainer>
        )}
      </div>
      {/* date pickers */}
      <div className="flex justify-around gap-2">
        <div className="w-fit border-2 rounded-lg">
          <p>
            From:
          </p>
          <input
            type="date"
            onChange={event => setFrom_ts(event.target.value)}
            value={from_ts}
          />
        </div>
        <div className="w-fit border-2 rounded-lg">
          <p>
            To:
          </p>
          <input
            type="date"
            onChange={event => setTo_ts(event.target.value)}
            value={to_ts}
          />
        </div>
      </div>
      {/* end of date pickers */}
    </div>

  )
}

export default App

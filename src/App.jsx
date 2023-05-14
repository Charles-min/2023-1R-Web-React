import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(0);
  const [row, setRow] = useState([]);
  const tableId = "resTable";

  useEffect(() => {
    document.title = `you clicked ${count} times`;

    return () => {
      document.title = "Vite + React";
    };
  }, [count]);

  useEffect(() => {
    console.log('mount or update');
    return () => {
      console.log('Unmount');
    }
  })

  useEffect(() => {
    console.log('mount only');
  }, [])

  useEffect(() => {
    console.log('update only row');
  }, [row])

  function handleClick(){
    if(row.length === 0){
      const res = fetch("http://openapi.seoul.go.kr:8088/5659444e78746b6436367775615452/json/RealtimeCityAir/1/25/").then(
      function(res2){
        res2.json().then(function(res3){
          setRow(res3.RealtimeCityAir.row)
          })
        }
      )
    }
  }

  return (
    <>
      <button onClick={count => setCount((count) => count + 1)}>Count</button>
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + Resort</h1>
      <button onClick={handleClick}>
        미세먼지 불러오기
      </button>
      <table id={tableId}>
        <thead>
          <tr>
          <th>이름</th>
          <th>PM10</th>
          <th>O3</th>
          <th>상태</th>
          </tr>
        </thead>
        <tbody id="rowData">
          {
          row.map((gu, idx) => {
            return <tr key={idx}>
              <td>{gu.MSRSTE_NM}</td>
              <td>{gu.PM10}</td>
              <td>{gu.O3}</td>
              <td>{gu.IDEX_NM}</td>
              </tr>
          })
          }
        </tbody>
      </table>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  )
}

export default App

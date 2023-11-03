import "./App.css"
import Select from "react-select"
import { useEffect, useState } from "react"

function App() {
  const [datas, setDatas] = useState([]) // State untuk menampung data dari API
  const [userSelect, setUserSelect] = useState("") // State untuk menampung pilihan dari pengguna yang diambil dari API
  const [isShow, setIsShow] = useState(false) // State untuk tombol menampilkan pilihan / select pengguna

  const getItems = async () => {
    const items = await fetch("https://pokeapi.co/api/v2/item") // Mengambil data item dari API
    const value = await items.json() // Mengonversi data item menjadi objek JSON
    let result = value.results.map(data => {
      return {
        label: data.name, // Menyimpan nama item sebagai label
        value: data.name, // Menyimpan nama item sebagai value
      }
    })
    setDatas(result.sort((a,b) => a.label.localeCompare(b.label))) // Mengupdate state 'datas' dengan hasil pengolahan data item dari API
    // console.log(datas)
  } // Fungsi untuk mengambil data dari API dan mengurutkannya secara ASCENDING (berurutan dari A - Z) berdasarkan label item

  useEffect(() => {
    getItems() // Memanggil fungsi getItems saat komponen dirender pertama kali
  },[]) 

  const handleSubmit = () => {
    setIsShow(state => !state) // Mengubah nilai state 'isShow' menjadi kebalikan dari nilai sebelumnya
  }

  const handleChange = (value) => {
    setUserSelect(value) // Mengubah nilai state 'userSelect' dengan nilai yang dipilih oleh pengguna
  }

  return (
    <>
      <div>
        <button onClick={() => handleSubmit()} disabled={!userSelect}>{isShow ? "Sembunyikan Nilai" : "Tampilkan Nilai"}</button> 
        {/* Tombol untuk menampilkan/menyembunyikan nilai */}
        <br/>
        <br/>
        <Select options={datas} onChange={(e) => handleChange(e.value)}></Select>
        {/* Komponen Select untuk memilih nilai dari 'datas' dan memanggil handleChange saat nilai berubah */}
        <br/>
        <h1>{isShow ? userSelect : ""}</h1>
        {/* Menampilkan nilai 'userSelect' jika 'isShow' bernilai true */}
      </div>
    </>
  );
}

export default App

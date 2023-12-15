import React, { useState } from 'react'

import './App.css'

import Header from '../Header'
import CardList from '../CardList'
import AppPagination from '../AppPagination'

export default function App() {
  const [currentList, setCurrentList] = useState('trending')
  const [searchRequest, setSearchRequest] = useState(null)
  const [currentPage, setCurrentPage] = useState('1')

  const searchFilm = (req) => {
    setSearchRequest(req)
  }

  const changeList = (list) => {
    setCurrentList(list)
  }

  const handleChangePage = (page) => {
    setCurrentPage(page)
  }

  return (
    <>
      <Header changeList={changeList} searchRequest={searchFilm} currentList={currentList} />
      <CardList currentList={currentList} searchRequest={searchRequest} currentPage={currentPage} />
      <AppPagination currentList={currentList} handleChangePage={handleChangePage} />
    </>
  )
}

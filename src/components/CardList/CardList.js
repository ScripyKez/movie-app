import React, { useEffect, useState } from 'react'
import './CardList.css'

import FilmCard from '../FilmCard'

import { Spin, Alert } from 'antd'
import MovieService from '../../services/movie-service'

export default function CardList({ currentList, currentPage, searchRequest }) {
  const [isLoading, setIsLoading] = useState(true)
  const [itemList, setItemList] = useState(null)
  const [error, setError] = useState({ state: false, message: '' })

  const movieService = new MovieService()

  useEffect(() => {
    requestItems()
  }, [currentPage, searchRequest])

  useEffect(() => {
    if (currentList === 'userRates') renderFromLocal()
    if (currentList !== 'search' && currentList !== 'userRates') requestItems()
    if (currentList === 'search' && searchRequest) {
      this.requestItems()
    }
  }, [currentList])

  const renderFromLocal = () => {
    let local = localStorage.getItem('rated')
    if (local) {
      local = JSON.parse(local)
      const newArr = [...local.results]
      setItemList(newArr)
      setIsLoading(false)
    }
  }

  const requestItems = async () => {
    setIsLoading(true)
    setItemList(null)
    setError({ state: false, message: '' })

    try {
      let itemList = []
      switch (currentList) {
        case 'trending':
          itemList = await movieService.requestTopTrending(true, currentPage)
          break
        case 'rated':
          itemList = await movieService.requestTopRated(currentPage)
          break
        case 'search':
          itemList = await movieService.getResourceBySearch(searchRequest, currentPage)
          break
        default:
      }
      const genresList = await movieService.getResource('genre/movie/list')
      const newArr = itemList.results.map((element) => {
        return {
          id: `${element.id}`,
          title: element.title,
          genres: element.genre_ids,
          overview: element.overview,
          releaseDate: element.release_date,
          voteAverage: element.vote_average,
          img: element.poster_path,
        }
      })
      for (let i = 0; i < newArr.length; i++) {
        const element = newArr[i]
        try {
          element.img = await movieService.getImage(element.img)
        } catch (err) {
          element.img = 'https://cdn-icons-png.flaticon.com/512/4054/4054617.png'
        }
        if (currentList !== 'userRates') {
          element.genres = element.genres.map((el) => {
            genresList.genres.forEach((e) => {
              if (e.id === el) el = e.name
            })
            return el
          })
        }
      }

      setItemList(newArr)
      setIsLoading(false)
    } catch (err) {
      onError(err)
    }
  }

  const onError = (err) => {
    setError({ state: true, message: err.message })
  }

  if (currentList === 'userRates') {
    if (!localStorage.getItem('rated' || localStorage.getItem('rated').results.length <= 0)) {
      return <Alert message="No rated films yet" style={{ margin: '30px 30px', height: '100px' }} />
    }
  }
  if (itemList !== null && itemList.length <= 0) {
    return <Alert message="No movies found matching your request" style={{ margin: '30px 30px', height: '100px' }} />
  }
  if (currentList === 'search' && searchRequest === null) {
    return <Alert type="info" message="Type to search a film" style={{ margin: '30px 30px', height: '100px' }} />
  }
  if (error.state) {
    return (
      <Alert type="error" style={{ margin: '30px 30px', height: '100px' }} message={`${error.message}`} banner={true} />
    )
  }
  if (isLoading) return <Spin size="large" style={{ top: '50%', left: '50%', position: 'absolute' }} />
  return (
    <ul className="card-list">
      {itemList.map((el) => {
        return <FilmCard key={el.id}>{el}</FilmCard>
      })}
    </ul>
  )
}

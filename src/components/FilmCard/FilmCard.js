import React from 'react'

import AppVotesRating from '../AppVotesRating'
import './FilmCard.css'

import { Card, Rate } from 'antd'

export default function FilmCard({ children }) {
  const { title, overview, releaseDate, img, voteAverage, id } = children
  const displayedDate = new Date(releaseDate)

  const genresToTags = () => {
    const { genres } = children
    if (genres) {
      return (
        <>
          {genres.map((element, index) => (
            <div className="tag-list__tag" key={`${index}`}>
              {element}
            </div>
          ))}
        </>
      )
    }
  }

  const searchInLocal = (id) => {
    let local = localStorage.getItem('rated')
    let rate = 0
    if (local) {
      local = JSON.parse(local)
      local.results.forEach((element) => {
        if (element.id === id) rate = element.rate
      })
    }

    return rate
  }

  const rateFilm = (value) => {
    const { id } = children
    const local = localStorage.getItem('rated')
    if (local) {
      const parsedLocal = JSON.parse(local)
      if (isExist(id)) {
        parsedLocal.results = [
          ...parsedLocal.results,
          {
            ...children,
            rate: value,
          },
        ]
        localStorage.setItem('rated', JSON.stringify(parsedLocal))
      }
    } else {
      const obj = {
        results: [],
      }
      obj.results.push({ ...children, rate: value })
      localStorage.setItem('rated', JSON.stringify(obj))
    }
  }

  const isExist = (id) => {
    const local = JSON.parse(localStorage.getItem('rated'))
    let isExisted = true
    local.results.forEach((element) => {
      if (element.id === id) isExisted = false
    })
    return isExisted
  }

  return (
    <li className="card-list__element">
      <Card
        hoverable={true}
        loading={title === null}
        className="card"
        style={{
          height: '320px',
          width: '550px',
          margin: 0,
        }}
        bodyStyle={{
          display: 'flex',
          padding: 0,
          margin: 0,
          position: 'relative',
        }}
      >
        <img
          alt="film poster"
          className="card-list__element--film-poster"
          src={img}
          style={{
            height: '320px',
            maxWidth: '220px',
            margin: 0,
            marginRight: '20px',
          }}
        />
        <div
          style={{
            paddingTop: '10px',
            paddingRight: '20px',
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <h2 className="card-list__element--film-title">{title}</h2>
          <div className="card-list__element--info-container">
            <p className="card-list__element--release-date">
              {`${displayedDate.toLocaleString('en-us', {
                month: 'long',
              })} ${displayedDate.getDate()}, ${displayedDate.getFullYear()}`}
            </p>
            <div className="tag-list">{genresToTags()}</div>
          </div>
          <p className="card-list__element--text">{overview}</p>
          <Rate
            style={{
              marginTop: 'auto',
              marginBottom: '10px',
            }}
            count={10}
            allowHalf
            allowClear
            onChange={rateFilm}
            defaultValue={searchInLocal(id)}
          />
        </div>
        <AppVotesRating rating={voteAverage} />
      </Card>
    </li>
  )
}

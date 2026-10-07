import { Link } from 'react-router-dom'
import { useState, useEffect } from 'react'
import axios from 'axios'

/**
 * A React component that represents the About us page of the app.
 * @param {*} param0 insert later
 * @returns The contents of this component, in JSX form.
 */
const About = props => {
  const [aboutName, setAboutName] = useState('')
  const [paragraphs, setParagraphs] = useState([])
  const [image, setImage] = useState('')
  const [error, setError] = useState('')

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_SERVER_HOSTNAME}/about`)
      .then(response => { 
        setAboutName(response.data.name)
        setParagraphs(response.data.paragraphs)
        setImage(response.data.imageUrl)
      })
      .catch(err => {
        console.error(err)
        setError('Failed to load about us content.')
      })
  }, [])

  if (error) {
    return <p className="error">{error}</p>
  }

  return (
    <>
      <div className="about-us">
        <h1>About us</h1>

        {aboutName && <h2>{aboutName}</h2>}

        {image && (
          <img
            src={image}
            alt={`Photo of ${aboutName || 'me'}`}
            style={{ maxWidth: '300px', height: 'auto', borderRadius: '8px' }}
          />
        )}

        <div className="bio-paragraphs">
          {paragraphs.map((para, index) => (
            <p key={index}>{para}</p>
          ))}
        </div>

      </div>
    </>
  )
}

// make this component available to be imported into any other file
export default About

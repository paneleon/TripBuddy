import React, {useState, useEffect} from 'react'
import PostCard from '../components/PostCard'
import ContentProviders from '../components/ContentProviders'
import SearchBar from '../components/SearchBar'
import styles from '../styles/Browse.module.css'
import axios from 'axios'
import { useAuth } from '../context/authContext'
import NotFound from '../components/NotFound'
import { useNavigate } from 'react-router-dom'


const sampleContentProviders = [
  {
      id: "6414b57dc06b4508f6ba7512",
      username: "paneleon"
  },
  {
      id: "6414b67f443e853b13c0e89b",
      username: "joe"
  },
  {
      id: "64167b5ce5ddd47be70b28f2",
      username: "chandlerbing"
  },
  {
      id: "6413d579b97c5ac5f24cef22",
      username: "eleonora"
  }
]

const Browse = () => {

  const [posts, setPosts] = useState([])
  const [categories, setCategories] = useState([])
  const [followedContentProviders, setFollowedContentProviders] = useState([])

  const [keyword, setKeyword] = useState(null)
  const [selectedCategory, setSelectedCategory] = useState(null)
  const [selectedContentProviders, setSelectedContentProviders] = useState([])

  const {token} = useAuth()
  const url = process.env.REACT_APP_SERVER_URL
  const [error, setError] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    getCategories()
    setFollowedContentProviders(sampleContentProviders)
  }, [])

  useEffect(() => {
      console.log("selectedContentProviders", selectedContentProviders)
      console.log("selectedCategory", selectedCategory)
      console.log("keyword", keyword)
      if (selectedCategory == ""){
        setSelectedCategory(null)
      }
      searchPosts()
  }, [selectedCategory, keyword, selectedContentProviders])

  const searchPosts = async () => {
    let requestBody = {
        category: selectedCategory,
        contentProviders: selectedContentProviders,
        keyword: keyword
    }

    try {
        const response = await axios.put(`${url}/posts/search`, requestBody, { headers: {
            'Authorization': 'Bearer ' + token
        }})
        setPosts(response.data)
        setError(false)
    } catch (error) {
        setError(true)
    }
    }

    const getCategories = async () => {
        try {
            const response = await axios.get(`${url}/category/getAll`)
            setCategories(response.data)
            setError(false)
        } catch (error) {
            setError(true)
        }
    }
    

  return (
      <div className={styles['browsing-posts-layout']}>
          <SearchBar categories={categories} selectedCategory={selectedCategory} setSelectedCategory={setSelectedCategory} setKeyword={setKeyword} keyword={keyword} search={searchPosts}/>
          <ContentProviders contentProviders={followedContentProviders} selectedContentProviders={selectedContentProviders} setSelectedContentProviders={setSelectedContentProviders}/>
          {posts.length > 0 ? 
          <div className={styles['posts-grid']}>
                  {
                      posts?.map((post) => {
                          return <PostCard post={post} viewPost={() => navigate(`/browse/${post?._id}`)}/>
                      })
                  }

          </div>

          : <div className={styles['not-found']}><NotFound /></div>}
      </div>
      
  )
}

export default Browse
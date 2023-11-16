/* eslint-disable react-hooks/exhaustive-deps */

// external imports
import { useEffect, useState } from 'react'
import { useLocation, useNavigate, Link } from 'react-router-dom'

// internal imports
import { getVans } from "../../api.js"
 

export default function Vans() {
    const [vans, setVans] = useState([])
    const location = useLocation()
    const navigate = useNavigate()
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)
    const searchParams = new URLSearchParams(location.search)
    // read search params from url
    const getFilterFromURL = () => {
        return searchParams.get('type') || ""
    }
    // set filter state to the value from the url
    const [filter, setFilter] = useState(getFilterFromURL())

    useEffect(() => {
        async function loadVans() {
            setLoading(true)
            try {
                const data = await getVans()
                setVans(data)
            } catch (err) {
                setError(err)
            } finally {
                setLoading(false)
            }
        }
        loadVans()

            const currentFilter = getFilterFromURL()
            if(filter !== currentFilter) {
                setFilter(currentFilter)
            }
    }, [location])

    // handle filter change
    const handleFilterChange =(type) => {
        navigate(`?type=${type}`)
    }

    // clear filter
    const clearFilter = () => {
        navigate(`?`)
    }

    if (loading) {
        return <h1>Loading...</h1>
    }

    if (error) {
        return <h1>There was an error: {error.message}</h1>
    }

    const filteredVans = vans.filter(van => filter === "" || van.type === filter)

    // display elements from the vans array
    const vanElements = filteredVans.map(van => (
        <div key={van.id} className='van-tile'>
            <Link to={van.id} state={{ search: `?${searchParams.toString()}`, type: getFilterFromURL() }}>
            <img src={van.imageUrl} alt="vans" />
            <div className="van-info">
                <h3>{van.name}</h3>
                <p>${van.price}<span>/day</span></p>
            </div>
            <i className={`van-type ${van.type} selected`}>{van.type}</i>
            </Link>
        </div>
    ))
    
    return (
        <div className="van-list-container">
            <h1>Explore our van options</h1>
            <div>
                <button className={`van-type simple ${filter === 'simple' ? 'selected' : ''}`}  onClick={() => handleFilterChange('simple')}>Simple</button>
                <button className={`van-type luxury ${filter === 'luxury' ? 'selected' : ''}`}  onClick={() => handleFilterChange('luxury')}>Luxury</button>
                <button  className={`van-type rugged ${filter === 'rugged' ? 'selected' : ''}`}  onClick={() => handleFilterChange('rugged')}>Rugged</button>
                {filter && <button className="van-type clear-filters" onClick={clearFilter}>Clear filters</button>}
            </div>
            <div className='van-list'>
        {vanElements}
            </div>
        </div>
    )
}
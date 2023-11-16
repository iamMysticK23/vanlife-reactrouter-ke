
// external imports
import { useEffect, useState } from "react"
import { useParams, NavLink, Link, Outlet } from "react-router-dom"

// internal imports
import { getVan } from "../../api.js"

export default function HostVanDetail(){

    const { id } = useParams()
    const [currentVan, setCurrentVan] = useState(null)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)


    const activeStyles = {
        fontWeight: "bold",
        textDecoration: "underline",
        color: "#E17654"
    }


    useEffect(() => {
        async function loadVans() {
            setLoading(true)
            try {
                const data = await getVan(id)
                setCurrentVan(data)
            } catch (err) {
                setError(err)
            } finally {
                setLoading(false)
            }
        }

        loadVans()
    }, [id])

    if (!currentVan) 
    return (
        <h1>Loading...</h1>
    )

    if (loading) {
        return <h1>Loading...</h1>
    }

    if (error) {
        return <h1>There was an error: {error.message}</h1>
    }
    

    return (
        <section>
            <Link to="/host/vans" relative="path" className="back-button">&larr; <span>Back to all vans</span></Link>
                <div className="host-van-detail-layout-container">
                    <div className="host-van-detail">
                        <img src={currentVan.imageUrl} width={150} alt={currentVan.name} />
                    <div className="host-van-detail-info-text">
                        <i className={`van-type van-type-${currentVan.type}`}>
                            {currentVan.type}
                        </i>
                        <h3>{currentVan.name}</h3>
                        <h4>${currentVan.price}/day</h4>
                    </div>
                </div>
                    <nav className="host-van-detail-nav">
                        <NavLink to="." end style={({ isActive }) => isActive ? activeStyles : null }>Details</NavLink>
                        <NavLink to="pricing" style={({ isActive }) => isActive ? activeStyles : null }>Pricing</NavLink>
                        <NavLink to="photos" style={({ isActive }) => isActive ? activeStyles : null }>Photos</NavLink>
                    </nav>
                <Outlet context={{ currentVan }} />
            </div>  
        </section>
    )
}
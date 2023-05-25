import React, { useState, useEffect } from "react";
import './InputSearchs.css';

export default function InputSearchs() {
    const [trabajos, setTrabajos] = useState([]);
    const [users, setUsers] = useState([]);
    const [publicaciones, setPublicaciones] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [filteredTrabajos, setFilteredTrabajos] = useState([]);
    const [filteredUsers, setFilteredUsers] = useState([]);
    const [filteredPublicaciones, setFilteredPublicaciones] = useState([]);
    const [showResults, setShowResults] = useState(false);
    const [noResults, setNoResults] = useState(false);

    useEffect(() => {
        fetch("https://dev2-lv2s.onrender.com/trabajos")
            .then((response) => response.json())
            .then((data) => {
                console.log(data.trabajos);
                setTrabajos(data.trabajos);
            })
            .catch((error) => {
                console.log(error);
                setTimeout(() => {
                    setTrabajos([]);
                    setFilteredTrabajos([]);
                    setShowResults(false);
                    setNoResults(false);
                }, 3000);
            });

        fetch("https://dev2-lv2s.onrender.com/users")
            .then((response) => response.json())
            .then((data) => {
                console.log(data.users);
                setUsers(data.users);
            })
            .catch((error) => {
                console.log(error);
                setTimeout(() => {
                    setUsers([]);
                    setFilteredUsers([]);
                }, 3000);
            });

        fetch("https://dev2-lv2s.onrender.com/publicacion")
            .then((response) => response.json())
            .then((data) => {
                console.log(data.publicaciones);
                setPublicaciones(data.publicaciones);
            })
            .catch((error) => {
                console.log(error);
                setTimeout(() => {
                    setPublicaciones([]);
                    setFilteredPublicaciones([]);
                }, 3000);
            });
    }, []);

    useEffect(() => {
        if (trabajos && trabajos.length > 0) {
            const results = trabajos.filter((trabajo) => {
                return trabajo.title && trabajo.title.toLowerCase().includes(searchTerm.toLowerCase());
            });
            setFilteredTrabajos(results);
            setShowResults(searchTerm !== "");
            setNoResults(searchTerm !== "" && results.length === 0);
        }

        if (users && users.length > 0) {
            const userResults = users.filter((user) => {
                return user.name && user.name.toLowerCase().includes(searchTerm.toLowerCase());
            });
            setFilteredUsers(userResults);
        }

        if (publicaciones && publicaciones.length > 0) {
            const publicacionResults = publicaciones.filter((publicacion) => {
                return publicacion.title && publicacion.title.toLowerCase().includes(searchTerm.toLowerCase());
            });
            setFilteredPublicaciones(publicacionResults);
        }
    }, [trabajos, users, publicaciones, searchTerm]);

    const handleSearch = (event) => {
        setSearchTerm(event.target.value);
    };

    return (
        <div className="search-container">
            <input
                type="text"
                placeholder="Buscar trabajos..."
                value={searchTerm}
                onChange={handleSearch}
                className="inputJobs"
            />
            {showResults && (
                <div className="modal">
                    {filteredTrabajos.map((trabajo) => (
                        <div key={trabajo._id}>
                            <a href={`/details/${trabajo._id}`}>{trabajo.title} - trabajo</a>
                            <hr />
                        </div>
                    ))}
                    {filteredPublicaciones.map((publicacion) => (
                        <div key={publicacion._id}>
                            <a href={`/details/${publicacion._id}`}>{publicacion.title} - publicacion</a>
                            <hr />
                        </div>
                    ))}
                    {filteredUsers.map((user) => (
                        <div key={user._id}>
                            <div className="photo-name-input-perfil">
                                <a href={`/perfil/${user._id}/${user.name}`}><img src={user.photo} alt="" /></a>
                                <a href={`/perfil/${user._id}/${user.name}`}>{user.name} - usuario</a>
                            </div>
                            <hr />
                        </div>
                    ))}
                    {noResults && <p className="results-no-found-2">No se encontraron resultados.</p>}
                </div>
            )}
        </div>
    );
}

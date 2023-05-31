import React, { useState, useEffect } from "react";
import { Container } from "react-bootstrap";
import useAuth from "../../hooks/useAuth"
import FilterData from './utils/FilterData'
import SearchBar from './utils/SearchBar'

const ShowList_podst = () => {
  const { showAdminBoard, showAddUserBoard, showFileUploadBoard,
    currentUser, logOut } = useAuth();

  const apiURL = "http://localhost:8080/api/files_podst/"

  const [stories, setStories] = useState([]);
  const [allStories, setAllStories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [keyword, setKeyword] = useState('');

  const fetchStories = async () => {
    try {
      const data = await (await fetch(apiURL)).json();
      const stortedStories = data.sort((a, b) => (a.id < b.id ? 1 : -1));
      setAllStories(stortedStories);
      setStories(stortedStories);
      setError(null);
    } catch (err) {
      setError(err.message);
      setStories(null);
    } finally {
      setLoading(false);
    }
  };

  const updateKeyword = (keyword) => {
    const filtered = allStories.filter(story => {
      return `${story.title.toLowerCase()} ${story.description.toLowerCase()}`
        .includes(keyword.toLowerCase());
    })
    setKeyword(keyword);
    setStories(filtered);
  }

  useEffect(() => {
    fetchStories();
  }, []);

  return (
    <>
      <div className="mainpanel mt">
        <div className="content">
          <Container fluid>
            {loading ? (
              <div className="d-flex justify-content-center align-items-center w-100 h-100">Ładowanie...</div>
            ) : error ? (
              <div className="d-flex justify-content-center align-items-center w-100 h-100">{`Problem z załadowaniem - ${error}`}</div>
            ) : stories.length === 0 ? (
              <div>Ups, narazie jest tu pusto.</div>
            ): null}
            <SearchBar keyword={keyword} onChange={updateKeyword} />
            <FilterData stories={stories} apiURL={apiURL} />
          </Container>
        </div>
      </div>
    </>
  );
}

export default ShowList_podst;

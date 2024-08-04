import React, { useState } from 'react';
import './App.css';

const App = () => {
  const [Order] = useState([
    { id: 1, Titre: 'film1', Genre: 'Comédie', Année: 2020, Note: '4.6', Synopsis: 'Un synopsis pour film1' },
    { id: 2, Titre: 'film2', Genre: 'Horreur', Année: 2022, Note: '3.9', Synopsis: 'Un synopsis pour film2' },
    { id: 3, Titre: 'film3', Genre: 'Action', Année: 2023, Note: '4.9', Synopsis: 'Un synopsis pour film3' }
  ]);

  const [Articles, setArticles] = useState(Order);
  const [NouveauArticle, setNouveauArticle] = useState({ Titre: "", Genre: "", Année: 0, Note: 0, Synopsis: "" });
  const [Annulation, setAnnulation] = useState([]);

  const AjouterArticle = () => {
    if (NouveauArticle.Titre && NouveauArticle.Genre && NouveauArticle.Année && NouveauArticle.Note && NouveauArticle.Synopsis) {
      setArticles((x) => [...x, { ...NouveauArticle, id: x.length + 1 }]);
      setNouveauArticle({ Titre: "", Genre: "", Année: 0, Note: 0, Synopsis: "" });
    }
  };

  const SupprimerArticle = (id) => {
    setArticles(Articles.filter((x) => x.id !== id));
  };

  const SelectionDeCheckbox = (id) => {
    if (Annulation.includes(id)) {
      setAnnulation(Annulation.filter((x) => x !== id));
    } else {
      setAnnulation([...Annulation, id]);
    }
  };

  const AfficherNombreDeFilms = () => {
    return (
      <p>Nombre des films dans la liste : {Articles.length}</p>
    );
  };

  const genres = ['Toutes', 'Comédie', 'Horreur', 'Action'];

  const FiltrerParGenre = (genre) => {
    if (genre === 'Toutes') {
      setArticles(Order);
    } else {
      const filteredArticles = Order.filter((x) => x.Genre === genre);
      setArticles(filteredArticles);
    }
  };

  return (
    <div className="container">
      <h1>Liste des Films</h1> <br />
      {genres.map((genre) => (
        <button key={genre} onClick={() => FiltrerParGenre(genre)}>
          {genre}
        </button>
      ))}
      <div className="mb-3">
        <input
          type="text"
          className="form-control"
          value={NouveauArticle.Titre}
          onChange={(e) => setNouveauArticle({ ...NouveauArticle, Titre: e.target.value })}
          placeholder="Titre"
        />
      </div>

      <div className="mb-3">
        <input
          type="text"
          className="form-control"
          value={NouveauArticle.Genre}
          onChange={(e) => setNouveauArticle({ ...NouveauArticle, Genre: e.target.value })}
          placeholder="Genre"
        />
      </div>

      <div className="row mb-3">
        <div className="col">
          <input
            type="number"
            className="form-control"
            value={NouveauArticle.Année}
            onChange={(e) => setNouveauArticle({ ...NouveauArticle, Année: parseInt(e.target.value) })}
            placeholder="Année de sortie"
          />
        </div>
      </div>

      <div className="col">
        <input
          type="number"
          className="form-control"
          value={NouveauArticle.Note}
          onChange={(e) => setNouveauArticle({ ...NouveauArticle, Note: e.target.value })}
          placeholder="Note"
        />
      </div>

      <div className="col">
        <input
          type="text"
          className="form-control"
          value={NouveauArticle.Synopsis}
          onChange={(e) => setNouveauArticle({ ...NouveauArticle, Synopsis: e.target.value })}
          placeholder="Synopsis"
        />
      </div>

      <div className="col-auto">
        <button className="btn btn-primary" onClick={AjouterArticle}>AJOUTER UN FILM</button>
      </div>

      <table className="table">
        <thead>
          <tr>
            <th>Titre de film</th>
            <th>Genre</th>
            <th>Année de sortie</th>
            <th>Note</th>
            <th>Synopsis</th>
            <th>SUPPRIMER</th>
          </tr>
        </thead>
        <tbody>
          {Articles.map((x) => (
            <tr key={x.id}>
              <td style={Annulation.includes(x.id) ? { textDecoration: 'line-through' } : {}}>
                <input
                  type="checkbox"
                  checked={Annulation.includes(x.id)}
                  onChange={() => SelectionDeCheckbox(x.id)}
                />
                {x.Titre}
              </td>
              <td>{x.Genre}</td>
              <td>{x.Année}</td>
              <td>{x.Note}</td>
              <td>{x.Synopsis}</td>
              <td>
                <button className="btn btn-danger" onClick={() => SupprimerArticle(x.id)}>Supprimer</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <AfficherNombreDeFilms />
    </div>
  );
};

export default App;

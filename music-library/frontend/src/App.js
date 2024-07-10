import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import ArtistList from './components/ArtistList';
import AlbumList from './components/AlbumList';

const App = () => {
    return (
        <Router>
            <Switch>
                <Route path="/" exact component={ArtistList} />
                <Route path="/albums/:artistId" component={AlbumList} />
            </Switch>
        </Router>
    );
};

export default App;

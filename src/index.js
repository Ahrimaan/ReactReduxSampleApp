import _ from 'lodash';
import React from 'react';
import ReactDOM from 'react-dom';
import YTSearch from 'youtube-api-search';

import SearchBar from './components/searchbar';
import VideoList from './components/video-list';
import VideoDetail from './components/video-detail';

const API_KEY = 'AIzaSyCm0lcc-y3juS-8u-1pDbCu2b4TAf43Z-I';

class App extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            videos: [],
            selectedVideo: null
        };       

        this.videoSearch('Born to be Epic');
    };

    videoSearch(term) {
        YTSearch({ key: API_KEY, term: term }, videos => {
            this.setState({
                videos: videos,
                selectedVideo: videos[0]
            });
        });
    };

    render() {
        const videoSearch = _.debounce(term => { this.videoSearch(term) }, 500 );
        return (
            <div>
                <SearchBar onSearchTermChanged={ videoSearch }/>
                <VideoDetail video={this.state.selectedVideo } />
                <VideoList
                    videos={this.state.videos}
                    onVideoSelect={selected => this.setState({selectedVideo:selected})}
                />
            </div>
        );
    };
}

ReactDOM.render(<App />, document.querySelector('.container'));

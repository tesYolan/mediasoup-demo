'use strict';

import React from 'react';
import PropTypes from 'prop-types';
import ReactPlayer from 'react-player';

import Logger from '../Logger';

const logger = new Logger('StreamVideo');

export default class StreamVideo extends React.Component {
    constructor(props)
    {
        super(props);

        this.state = 
            {
                url: '',
            };
    }

    render()
    {
        let props = this.props;
        let state = this.state;
        let micMuted= false;
        let videoQuality= 'high';
        let playing= true;

        return (
	<div
		data-component='StreamVideo'
	>
		<ReactPlayer 
			className='StreamVideo'
			width='100%'
			height='100%'
			playing={playing}
			url={this.state.url}
			onError={e => logger.log('onError', e)}
			onEnded={() => this.setState({ playing: false })}
		/>
	</div>
        );
    }
    componentWillReceiveProps(nextProps)
    {
        this.setState({ url: nextProps.url });
    }
}
StreamVideo.propTypes = 
    {
        url: PropTypes.string.isRequired,
    };

import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import * as appPropTypes from './appPropTypes';
import { Appear } from './transitions';
import Peer from './Peer';
import config from '../../config';
import StreamVideo from './StreamVideo';
import UrlParse from 'url-parse';

const Peers = ({ peers, roomId, activeSpeakerName }) =>
{
	return (
		<div data-component='Peers'>
			{
				peers.map((peer) =>
				{
					return (
						<Appear key={peer.name} duration={1000}>
							<div
								className={classnames('peer-container', {
									'active-speaker' : peer.name === activeSpeakerName
								})}
							>
								<Peer name={peer.name} />
							</div>
						</Appear>
					);
				})
			}
			<StreamVideo url={`https://${config.stream.listenIp}:${config.stream.listenPort}/live/${ roomId }.m3u8`}/>
		</div>
	);
};

Peers.propTypes =
{
	peers             : PropTypes.arrayOf(appPropTypes.Peer).isRequired,
	roomId            : PropTypes.string.isRequired,
	activeSpeakerName : PropTypes.string
};

const mapStateToProps = (state) =>
{
	// TODO: This is not OK since it's creating a new array every time, so triggering a
	// component rendering
	const peersArray = Object.values(state.peers);

	const urlParser = new UrlParse(state.room.url, true);
	
	return {
		peers             : peersArray,
		roomId            : urlParser.query.roomId,
		activeSpeakerName : state.room.activeSpeakerName
	};
};

const PeersContainer = connect(mapStateToProps)(Peers);

export default PeersContainer;

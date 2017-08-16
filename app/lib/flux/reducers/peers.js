const initialState = {};

const producers = (state = initialState, action) =>
{
	switch (action.type)
	{
		case 'NEW_PEER':
		{
			const { peer } = action.payload;

			return { ...state, [peer.name]: peer };
		}

		case 'PEER_CLOSED':
		{
			const { peerName } = action.payload;
			const newState = { ...state };

			delete newState[peerName];

			return newState;
		}

		case 'NEW_CONSUMER':
		{
			const { consumer } = action.payload;
			const { peerName } = consumer;
			const peer = state[peerName];

			if (!peer)
				throw new Error('no Peer found for new Consumer');

			const newConsumers = [ ...peer.consumers, consumer.id ];
			const newPeer = { ...peer, consumers: newConsumers };

			return { ...state, [newPeer.name]: newPeer };
		}

		case 'CONSUMER_CLOSED':
		{
			const { consumerId, peerName } = action.payload;
			const peer = state[peerName];

			// NOTE: This means that the Peer was closed before, so it's ok.
			if (!peer)
				return state;

			const idx = peer.consumers.indexOf(consumerId);

			if (idx === -1)
				throw new Error('Consumer not found');

			const newConsumers = peer.consumers.slice();

			newConsumers.splice(idx, 1);

			const newPeer = { ...peer, consumers: newConsumers };

			return { ...state, [newPeer.name]: newPeer };
		}

		default:
			return state;
	}
};

export default producers;
const initialState =
{
	state               : 'new', // new/connecting/connected/disconnected/closed
	audioOnly           : false,
	audioOnlyInProgress : false
};

const room = (state = initialState, action) =>
{
	switch (action.type)
	{
		case 'SET_ROOM_STATE':
		{
			const roomState = action.payload.state;

			return { ...state, state: roomState };
		}

		case 'SET_AUDIO_ONLY_STATE':
		{
			const { enabled } = action.payload;

			return { ...state, audioOnly: enabled };
		}

		case 'SET_AUDIO_ONLY_IN_PROGRESS':
		{
			const { flag } = action.payload;

			return { ...state, audioOnlyInProgress: flag };
		}

		default:
			return state;
	}
};

export default room;

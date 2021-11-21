import React, { FC } from 'react';

import { BlockFormControlLabel, FormLoader, SectionContent } from '../components';

import { LightState } from './types';
import { useWs } from '../utils/useWs';
import { WEB_SOCKET_ROOT } from '../api/endpoints';
import { Box, Switch, Typography } from '@mui/material';
import { updateValue } from '../utils';

export const LIGHT_SETTINGS_WEBSOCKET_URL = WEB_SOCKET_ROOT + "lightState";

const LightStateWebSocketForm: FC = () => {
  const { connected, updateData, data } = useWs<LightState>(LIGHT_SETTINGS_WEBSOCKET_URL);

  const updateFormValue = updateValue(updateData);

  const content = () => {
    if (!connected || !data) {
      return (<FormLoader message="Connecting to WebSocket…" />);
    }
    return (
      <>
        <Box bgcolor="primary.main" color="primary.contrastText" p={2} mt={2} mb={2}>
          <Typography variant="body1">
            The switch below controls the LED via the WebSocket. It will automatically update whenever the LED state changes.
          </Typography>
        </Box>
        <BlockFormControlLabel
          control={
            <Switch
              name="led_on"
              checked={data.led_on}
              onChange={updateFormValue}
              color="primary"
            />
          }
          label="LED State?"
        />
      </>
    );
  };

  return (
    <SectionContent title='WebSocket Example' titleGutter>
      {content()}
    </SectionContent>
  );
};

export default LightStateWebSocketForm;
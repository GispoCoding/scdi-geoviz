import React from 'react';
import styled from "styled-components";
import { Icons,
  MapControlButton,
  MapControlFactory,
  MapDrawPanelFactory,
  Toggle3dButtonFactory,
  SplitMapButtonFactory,
  MapLegendPanelFactory } from 'kepler.gl/components';
import { Tooltip } from "kepler.gl";
import { MAPS_MODAL_OPTIONS } from "../constants/settings";
import InfoPanel from './info-panel';
import StyledFloatingPanel from './styled-floating-panel';

// can't use the factory like this, we must use individual control components instead
// const MapControl = MapControlFactory();
const MapControl = MapControlFactory(
  MapDrawPanelFactory(), Toggle3dButtonFactory(), SplitMapButtonFactory(), MapLegendPanelFactory());

const StyledMapControlOverlay = styled.div`
  position: absolute;
  top: 0px;
  right: 0px;
  z-index: 1;
`;

const StyledMapControlAction = styled.div`
  padding: 0 0;
  display: flex;
  justify-content: flex-end;
`;

const ActionPanel = ({className, children}) => (
  <StyledMapControlAction className={className}>{children}</StyledMapControlAction>
);

const ToggleMapsModalButton = React.memo(({openModal}) => (
  <StyledFloatingPanel>
    <MapControlButton
      onClick={e => {
        e.preventDefault()
        openModal(MAPS_MODAL_OPTIONS)
      }}
    >
      <Icons.Layers height="30px" />
      <Tooltip id={'toggle-maps-modal'} place="left" effect="solid">
        <span>Show map selection</span>
      </Tooltip>
    </MapControlButton>
  </StyledFloatingPanel>
));

const CustomMapControl = props => (
  <StyledMapControlOverlay>
    <ActionPanel key={1}>
      <ToggleMapsModalButton {...props} />
    </ActionPanel>
      {props.currentDetails ? <InfoPanel {...props} /> : null}
    <MapControl {...props} />
  </StyledMapControlOverlay>
);
  
export default CustomMapControl;
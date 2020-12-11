import styled from 'styled-components';

export const GliderContainer = styled.div`
  position: relative;
`;

export const GliderLoader = styled.div`
  transition: opacity 500ms;
  
  background-color: #fff;
  position: absolute;
  top: 0; left: 0; right: 0; bottom: 0;
  opacity: ${props => props.isLoading ? 1: 0};
  pointer-events: ${props => props.isLoading ? 'all': 'none'};
`;